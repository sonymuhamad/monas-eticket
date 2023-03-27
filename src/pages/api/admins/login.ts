import { withSessionRoute } from "../../../../lib/config/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import Admin from "../../../../models/admin";

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === "POST") {

        const { email, password } = req.body
        const admin = await Admin.findOne({ where: { username: email } })

        if (admin === null) {
            res.status(404).send({ error: { email: "Invalid email" } })
        } else {
            const valid_password = await admin.valid_password(password)
            if (!valid_password) {
                res.status(404).send({ error: { password: "Invalid password" } })
            }

            req.session.userId = admin.id
            await req.session.save()
            res.send({ ok: true })

        }
    }
    res.status(404).send("Method not provided")

}

export default withSessionRoute(loginRoute)

