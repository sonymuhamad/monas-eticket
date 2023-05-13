import { NextApiRequest, NextApiResponse } from "next";
import {
  Transaction,
  DetailTransaction,
  TransactionProps,
  DetailTransactionProps,
  sequelize,
} from "../../../../models/transaction";
import { Ticket } from "../../../../models/ticket";

export type MakeTransaction = {
  total_amount: number;
};

interface ExtendedApiRequest extends NextApiRequest {
  body: MakeTransaction;
}

const config = {
  client_key: "SB-Mid-client-QkEj2aR8V6QNDtVQ",
  server_key: "SB-Mid-server-1HLNYb5kVEPfZ-g90odkMU_i",
  // mode: ""  you can set to sandbox or production. Default is sandbox if empty.
};

export default async function handler(
  req: ExtendedApiRequest,
  res: NextApiResponse
) {
  await Transaction.sync({ alter: true });
  await DetailTransaction.sync({ alter: true });
  await Ticket.sync({ alter: true });
  if (req.method === "GET") {
    const { transactionId } = req.query as { transactionId: string };
    const transaction = await Transaction.findByPk(Number(transactionId));

    if (transaction) {
      const detailTransact = await transaction.getDetailTransactions();
      const total_amount = detailTransact.reduce((prev, current) => {
        const { actual_price, quantity } = current;
        if (actual_price) {
          const currentPrice = actual_price * quantity;
          return currentPrice + prev;
        }
        return prev;
      }, 0);

      const data = {
        transaction_details: {
          order_id: transaction.id_transaction,
          gross_amount: total_amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: transaction.email_customer,
          email: transaction.email_customer,
        },
      };
      console.log(data);
      try {
        const rest = await fetch(
          "https://app.sandbox.midtrans.com/snap/v1/transactions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization:
                "Basic " +
                Buffer.from(process.env.SERVERKEY).toString("base64"),
              // Above is API server key for the Midtrans account, encoded to base64
            },
            body: JSON.stringify(data),
          }
        );

        const response: { token: string; redirect_url: string } =
          await rest.json();
        console.log(response);
        res.send({ ...response, ok: true });
      } catch (e) {
        res.status(400).send({ ok: false });
        console.log(e);
      }
    }
  }
}
