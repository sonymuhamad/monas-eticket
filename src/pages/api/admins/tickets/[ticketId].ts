import { withSessionRoute } from "../../../../../lib/config/withSession";

import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { Ticket, TicketProps } from "../../../../../models/ticket";
import { ValidationError } from "sequelize";

interface ExtendedApiRequest extends NextApiRequest {
  file?: Express.Multer.File;
  body: TicketProps;
}

function runMiddleware(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse,
  fn: (...args: any[]) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default withSessionRoute(async function handler(
  req: ExtendedApiRequest,
  res: NextApiResponse
) {
  const { adminId } = req.session;
  const { ticketId } = req.query;
  const ticket = await Ticket.findByPk(Number(ticketId));

  if (adminId) {
    if (req.method === "GET") {
      if (ticket) {
        res.status(200).send(ticket);
      } else {
        res.status(404).send("ticket not found");
      }
    } else if (req.method === "PUT") {
      if (ticket) {
        let storage = multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, "public/ticket-images/");
          },
          filename: (req, file, cb) => {
            cb(null, `${Date.now()}-monas-eticket-${file.originalname}`);
          },
        });
        const upload = multer({
          storage: storage,
          fileFilter: (
            req,
            file: Express.Multer.File,
            cb: multer.FileFilterCallback
          ) => {
            if (file.mimetype.startsWith("image")) {
              cb(null, true);
            } else {
              cb(null, false);
            }
          },
        });
        await runMiddleware(req, res, upload.single("image"));

        const { body } = req;
        const { name, how_to_use, terms, price, discount, description } = body;

        try {
          ticket.set({
            name,
            how_to_use,
            terms,
            price,
            discount,
            description,
            image: req.file?.filename,
          });
          const updatedTicket = await ticket.save();
          res.status(200).send({ updatedTicket, ok: true });
        } catch (e) {
          console.log(e);
          if (e instanceof ValidationError) {
            res.status(400).send({ ok: false, errors: e.errors });
          } else {
            res.status(400).send("Invalid input");
          }
        }
      } else {
        res.status(404).send("ticket not found");
      }
    } else if (req.method === "DELETE") {
      if (ticket) {
        await ticket.destroy();
        res.status(204).end();
      } else {
        res.status(404).send("ticket not found");
      }
    } else {
      res.status(404).end();
    }
  } else {
    res.status(403).end();
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};
