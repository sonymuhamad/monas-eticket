import { withSessionRoute } from "../../../../lib/config/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import Admin from "../../../../models/admin";

type AdminLogin = Pick<Admin, 'email' | 'password'>

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.session.userId)
    if (req.method === "POST") {
        const { email, password }: AdminLogin = req.body
        const admin = await Admin.findOne({ where: { email: email } })

        if (admin === null) {
            res.status(404).send({ error: { email: "Invalid email" } })
        } else {
            const valid_password = await admin.valid_password(password)

            if (valid_password) {
                req.session.userId = admin.id
                await req.session.save()
                res.send({ ok: true })
            } else {
                res.status(404).send({ error: { password: "Invalid password" } })
            }


        }
    } else {
        res.status(404).send("Method not provided")
    }

}

export default withSessionRoute(loginRoute)

