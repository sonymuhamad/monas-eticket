import { NextApiRequest, NextApiResponse } from "next";
import {
  Transaction,
  DetailTransaction,
  TransactionProps,
  DetailTransactionProps,
  sequelize,
} from "../../../../models/transaction";
import { Ticket } from "../../../../models/ticket";

export type CreateTransaction = TransactionProps & {
  detail_transaction: DetailTransactionProps[];
};

interface ExtendedApiRequest extends NextApiRequest {
  body: CreateTransaction;
}

export default async function handler(
  req: ExtendedApiRequest,
  res: NextApiResponse
) {
  await Transaction.sync({ alter: true });
  await DetailTransaction.sync({ alter: true });
  await Ticket.sync({ alter: true });
  if (req.method === "GET") {
    const transactions = await Transaction.findAll({
      include: ["detail_transactions"],
    });

    res.send(transactions);
  }
  if (req.method === "POST") {
    const { detail_transaction, ...rest } = req.body;
    const transactSequelize = await sequelize.transaction();

    try {
      const transaction = await Transaction.create(rest);

      for (const eachDetailTransact of detail_transaction) {
        const ticket = await Ticket.findByPk(eachDetailTransact.ticket_id);
        const detailTicket = await transaction.createDetailTransaction(
          eachDetailTransact
        );
        if (ticket) {
          detailTicket.setTicket(ticket);
        }
      }
      await transaction.sendEmail();
      await transactSequelize.commit();
      res.send({ ok: true, transaction });
    } catch (error) {
      console.log(error);
      res.status(404).send({ ok: false });
      await transactSequelize.rollback();
    }
  }
}
