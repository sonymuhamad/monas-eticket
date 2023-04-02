
import { NextApiRequest, NextApiResponse } from "next";
import Admin from "../../../../models/admin";

type AdminEmailProps = Pick<Admin, 'email'>

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        const { email }: AdminEmailProps = req.body

        const admin = await Admin.findOne({ where: { email: email } })
        if (admin) {
            admin.generateChiperText()
            res.send({ ok: true })

        } else {
            res.status(404).send({ error: { email: 'Invalid email' } })
        }

    } else {
        res.status(404).send("Method not provided")
    }

}
