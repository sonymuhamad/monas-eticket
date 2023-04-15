import { withSessionRoute } from "../../../../../lib/config/withSession";

import { NextApiRequest, NextApiResponse } from "next";

import { Ticket, TicketProps } from "../../../../../models/ticket";
import { ValidationError } from "sequelize";



export default withSessionRoute(
    async function handler(req: NextApiRequest, res: NextApiResponse) {

        const { adminId } = req.session
        const { ticketId } = req.query
        const ticket = await Ticket.findByPk(Number(ticketId))

        if (adminId) {

            if (req.method === "GET") {
                if (ticket) {
                    res.status(200).send(ticket)
                } else {
                    res.status(404).send("ticket not found")
                }

            } else if (req.method === "PUT") {

                if (ticket) {

                    const { body } = req
                    const data: TicketProps = JSON.parse(body)
                    const { name, how_to_use, terms, price, discount } = data

                    try {
                        ticket.set({
                            name: name,
                            how_to_use: how_to_use,
                            terms: terms,
                            price: price,
                            discount: discount
                        })

                        const updatedTicket = await ticket.save()
                        res.status(200).send(updatedTicket)

                    } catch (e) {
                        console.log(e)
                        if (e instanceof ValidationError) {
                            res.status(400).send(e.errors)
                        } else {
                            res.status(400).send("Invalid input")
                        }
                    }



                } else {
                    res.status(404).send("ticket not found")
                }


            } else if (req.method === "DELETE") {
                if (ticket) {
                    await ticket.destroy()
                    res.status(204).end()
                } else {
                    res.status(404).send("ticket not found")
                }

            } else {
                res.status(404).end()
            }


        } else {
            res.status(403).end()
        }

    }
)


