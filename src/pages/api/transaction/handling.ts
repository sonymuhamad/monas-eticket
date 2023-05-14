import { NextApiRequest, NextApiResponse } from "next";
import { Transaction, DetailTransaction } from "../../../../models/transaction";
import { Ticket } from "../../../../models/ticket";

type CreatedTransactionData = {
  transaction_time: string;
  transaction_status: string;
  transaction_id: string;
  three_ds_version: string;
  status_message: string;
  status_code: string;
  signature_key: string;
  payment_type: string;
  order_id: string;
  merchant_id: string;
  masked_card: string;
  gross_amount: string;
  fraud_status: string;
  expiry_time: string;
  eci: string;
  currency: string;
  channel_response_message: string;
};

interface ExtendedApiRequest extends NextApiRequest {
  body: CreatedTransactionData;
}

export default async function handler(
  req: ExtendedApiRequest,
  res: NextApiResponse
) {
  await Transaction.sync({ alter: true });
  await DetailTransaction.sync({ alter: true });
  await Ticket.sync({ alter: true });

  if (req.method === "POST") {
    const { order_id, transaction_id, transaction_status } = req.body;

    try {
      const transaction = await Transaction.findByPk(Number(order_id));
      if (transaction && transaction_status === "success") {
        transaction.payment_valid = true;
        transaction.payment_transaction_id = transaction_id;
        await transaction.sendEmailSuccessPayment();
        await transaction.save();
      }
      res.send({ ok: true });
    } catch (error) {
      console.log(error);
      res.status(404).send({ ok: false });
    }
  }
}
