import type { NextApiRequest, NextApiResponse } from "next";
import Admin from "../../../../models/admin";
import { InferCreationAttributes } from "sequelize";
import { ValidationError } from "sequelize";


type ResponseError = {
    message: string
}

const postHandler = async (newAdmin: InferCreationAttributes<Admin>) => {
    try {
        const addedAdmin = await Admin.create(newAdmin)
        return addedAdmin
    } catch (e) {
        if (e instanceof ValidationError) {
            throw new Error(e.errors[0].message)
        }

    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Admin[] | Admin | undefined | ResponseError>) {

    // endpoints for GET and POST Admin

    switch (req.method) {

        case 'POST':
            try {
                const newUser = await postHandler(req.body)
                res.send(newUser)
            } catch (e) {
                if (e instanceof Error) {
                    res.status(400).json({ message: e.message })
                } else {
                    res.status(400).json({ message: "Add new user failed" })
                }
            }
            break

        case 'GET':
            const userList = await Admin.findAll()
            res.status(200).send(userList)
            break

        default:
            throw new Error(`Handler for method ${req.method} is not available`)
    }
}

