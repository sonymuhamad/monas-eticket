import type { NextApiRequest, NextApiResponse } from "next";
import Admin from "../../../../models/admin";

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
                res.status(200).send({ status: retrievedAdmin.valid_password(req.body.password) })

            } else {
                res.status(404).json({ Error: "Admin not found" })
            }
            break

        default:
            throw new Error(`Handler for method ${req.method} is not available`)

    }

}
