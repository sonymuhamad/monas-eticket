import { NextApiRequest, NextApiResponse } from "next";
import { Transaction } from "../../../../models/transaction";
import { withSessionRoute } from "../../../../lib/config/withSession";

interface ExtendedApiRequest extends NextApiRequest {
  body: {
    email_verification_code: string;
  };
}

export default withSessionRoute(async function handler(
  req: ExtendedApiRequest,
  res: NextApiResponse
) {
  const { transactionId } = req.query;

  if (req.method === "POST") {
    const transaction = await Transaction.findByPk(Number(transactionId));
    if (transaction) {
      const {
        body: { email_verification_code },
      } = req;

      if (email_verification_code === transaction.email_verification_code) {
        transaction.email_verified = true;
        req.session.currentTransaction = transaction;
        await req.session.save();
        await transaction.save();
        res.send({ verified: true });
      } else {
        res.status(404).send({ verified: false });
      }
    } else {
      res.status(404).end();
    }
  } else {
    res.status(404).end();
  }
});
