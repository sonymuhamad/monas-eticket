import { NextApiRequest, NextApiResponse } from "next";
import { Ticket } from "../../../models/ticket";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const tickets = await Ticket.findAll();
    res.status(200).send(tickets);
  }
}
