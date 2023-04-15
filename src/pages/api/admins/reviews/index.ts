import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../../../lib/config/withSession";
import multer from "multer";

import Review, { ReviewProps } from "../../../../../models/review";
import { ValidationError } from "sequelize";



interface ExtendedApiRequest extends NextApiRequest {
    file?: Express.Multer.File
    body: ReviewProps
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

export default withSessionRoute(
    async function handler(req: ExtendedApiRequest, res: NextApiResponse) {

        const adminId = req.session.adminId

        if (true) {

            if (req.method === "POST") {

                let storage = multer.diskStorage({
                    destination: (req, file, cb) => {
                        cb(null, "public/review-images/");
                    },
                    filename: (req, file, cb) => {
                        cb(null, `${Date.now()}-monas-eticket-${file.originalname}`);
                    },
                });
                const upload = multer({
                    storage: storage,
                    fileFilter: (req, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
                        if (file.mimetype.startsWith("image")) {
                            cb(null, true);
                        } else {
                            cb(null, false);
                        }
                    },
                });

                await runMiddleware(req, res, upload.single("avatar"))

                if (req.file) {
                    const { filename } = req.file
                    const { body } = req
                    const createdReview = Review.build(body)
                    createdReview.avatar = filename
                    try {
                        await createdReview.save()
                        res.status(201).send({ ok: true, createdReview: createdReview })

                    } catch (err) {
                        if (err instanceof ValidationError) {
                            res.status(400).send(err.errors)
                        } else {
                            res.status(400).end()
                        }
                    }

                } else {
                    res.status(400).send({ error: "Avatar with Image type is required" })
                }

            } else if (req.method === "GET") {
                const reviewList = await Review.findAll()
                res.status(200).send(reviewList)
            }

        } else {
            res.status(403).end()
        }

    }
)

export const config = {
    api: {
        bodyParser: false
    }
}
