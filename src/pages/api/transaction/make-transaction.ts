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

export default async function handler(
  req: ExtendedApiRequest,
  res: NextApiResponse
) {
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

      try {
        const rest = await fetch(process.env.MIDTRANSAPIURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Basic " + Buffer.from(process.env.SERVERKEY).toString("base64"),
            // Above is API server key for the Midtrans account, encoded to base64
          },
          body: JSON.stringify(data),
        });

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
