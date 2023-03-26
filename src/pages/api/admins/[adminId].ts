import type { NextApiRequest, NextApiResponse } from "next";
import Admin from "../../../../models/admin";
import { InferCreationAttributes, ValidationError } from "sequelize";


const updateHandler = async (instanceAdmin: Admin, params: InferCreationAttributes<Admin>) => {
    try {
        instanceAdmin.username = params.username
        instanceAdmin.password = params.password
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


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { adminId } = req.query
    const retrievedAdmin = await Admin.findByPk(Number(adminId))

    switch (req.method) {
        case 'GET':
            if (retrievedAdmin) {
                res.status(200).send(retrievedAdmin)
            } else {
                res.status(404).json({ "Error": "Admin not found" })
            }
            break

        case 'PUT':
            if (retrievedAdmin) {
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


            } else {
                res.status(404).json({ Error: "Admin not found" })
            }
            break

        default:
            throw new Error(`Handler for method ${req.method} is not available`)

    }

}
