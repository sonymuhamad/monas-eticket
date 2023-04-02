import type { NextApiRequest, NextApiResponse } from "next";
import Admin from "../../../../models/admin";
import { InferCreationAttributes, ValidationError } from "sequelize";
import { withSessionRoute } from "../../../../lib/config/withSession";


const updateHandler = async (instanceAdmin: Admin, params: InferCreationAttributes<Admin>) => {
    try {
        instanceAdmin.username = params.username
        instanceAdmin.email = params.email
        instanceAdmin.updated_at = new Date()
        await instanceAdmin.save()
        return instanceAdmin
    } catch (e) {
        if (e instanceof ValidationError) {
            throw new Error(e.errors[0].message)
        }
    }

}


export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { adminId } = req.query

    if (adminId) {

        const retrievedAdmin = await Admin.findByPk(Number(adminId[0]))
        if (retrievedAdmin) {

            switch (req.method) {
                case 'GET':
                    if (adminId[1] && adminId[1] === "request-change-password") {
                        retrievedAdmin.generateChiperText()
                        res.status(200).send({ ok: true })
                    } else {
                        res.status(200).send(retrievedAdmin)
                    }
                    break

                case 'PUT':

                    if (adminId[1] && adminId[1] === "set-password") {

                        // matched with url /api/admins/{adminId}/set-password
                        const newPass = req.body.password
                        if (newPass && typeof newPass === 'string') {
                            const { ok, error } = await retrievedAdmin.setNewPassword(newPass)
                            if (ok) {
                                req.session.destroy()
                                res.send({ ok: true })
                            } else {
                                res.status(400).send({ error: { password: error } })
                            }

                        }

                    } else {

                        // matched with url /api/admins/{adminId}
                        try {
                            const updatedAdmin = await updateHandler(retrievedAdmin, req.body)
                            res.status(200).send(updatedAdmin)

                        } catch (e) {
                            if (e instanceof Error) {
                                res.status(400).json({ message: e.message })
                            } else {
                                res.status(400).json({ message: "Edit admin failed" })
                            }
                        }
                    }
                    break

                default:
                    throw new Error(`Handler for method ${req.method} is not available`)

            }

        } else {
            res.status(404).json({ Error: "Admin not found" })
        }

    }

})
