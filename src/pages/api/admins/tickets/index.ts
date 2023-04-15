import { withSessionRoute } from "../../../../../lib/config/withSession";
import { NextApiRequest, NextApiResponse } from "next";

import { Ticket, TicketProps } from "../../../../../models/ticket";
import { ValidationError, Attributes } from "sequelize";


interface ExtendedApiRequest extends NextApiRequest {
    body: Attributes<Ticket>
}


export default withSessionRoute(
    async function handler(req: NextApiRequest, res: NextApiResponse) {

        const { adminId } = req.session

        if (adminId) {

            if (req.method === "GET") {
                const ticketList = await Ticket.findAll()
                res.status(200).send(ticketList)

            } else if (req.method === "POST") {

                const { body } = req
                const data: TicketProps = JSON.parse(body)

                try {
                    const createdTicket = await Ticket.create(data)
                    res.status(201).send(createdTicket)
                } catch (e) {
                    if (e instanceof ValidationError) {
                        res.status(400).send(e.errors)
                    } else {
                        res.status(400).end()
                    }
                }

            } else {
                res.status(404).end()
            }

        } else {
            res.status(403).end()
        }

    }
)
