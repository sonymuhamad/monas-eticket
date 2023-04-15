
import { withSessionRoute } from "../../../../../lib/config/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import Review, { ReviewProps } from "../../../../../models/review";
import multer from 'multer';
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
        const { reviewId } = req.query

        if (reviewId) {

            if (req.method === 'GET') {

                const review = await Review.findByPk(Number(reviewId))
                res.status(200).send(review)

            }
            else if (req.method === "PUT") {

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
                    }
                });

                await runMiddleware(req, res, upload.single("avatar"))

                const review = await Review.findByPk(Number(reviewId))
                const { name, text, shown } = req.body

                if (review) {
                    if (req.file) {
                        const { filename } = req.file
                        review.avatar = filename
                    }
                    review.text = text
                    review.name = name
                    review.shown = shown
                    try {
                        const updatedReview = await review.save()
                        res.status(200).send({ ok: true, updatedReview: updatedReview })
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


            } else if (req.method === "DELETE") {
                const review = await Review.findByPk(Number(reviewId))
                await review?.destroy()
                res.status(204).end()

            } else {
                res.status(404).end()
            }

        } else {
            res.status(403).end()
        }
    }
)

export const config = {
    api: {
        bodyParser: false,
    },
};