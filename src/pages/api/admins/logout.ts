
import { withSessionRoute } from "../../../../lib/config/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const logoutRoute = (req: NextApiRequest, res: NextApiResponse) => {

    req.session.destroy()
    res.send({ ok: true })

}

export default withSessionRoute(logoutRoute)