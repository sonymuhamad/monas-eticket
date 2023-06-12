import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import {
  TransactionProps,
  Transaction,
  DetailTransactionProps,
  DetailTransaction,
} from "../../../../models/transaction";
import { Ticket, TicketProps } from "../../../../models/ticket";

import { Layout } from "@/components/components";
import { NextPageWithLayout } from "../../_app";
import { ReactElement } from "react";
import { sequelize } from "../../../../models/transaction";

import dayjs from "dayjs";
import {
  Grid,
  Paper,
  Container,
  Card,
  Typography,
  Chip,
  Alert,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  CardActions,
} from "@mui/material";
import { AccessTime, CheckCircleOutline, Close } from "@mui/icons-material";

import ShowMoreText from "@/components/components/ticket_page_components/text_hiders";

interface Props {
  transaction: TransactionProps & {
    DetailTransactions: Array<DetailTransactionProps & { Ticket: TicketProps }>;
  };
}

const TransactionDetailPage: NextPageWithLayout<Props> = ({
  transaction,
}: Props) => {
  const {
    email_verified,
    email_customer,
    createdAt,
    date,
    DetailTransactions,
  } = transaction;

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: 5,
      }}
    >
      <Grid container spacing={3}>
        <Grid item md={3} xs={6}>
          <Card
            elevation={2}
            sx={{
              padding: 2,
            }}
            component={Paper}
          >
            <Typography variant="h5" gutterBottom>
              Email Customer
            </Typography>
            <Typography>{email_customer}</Typography>
          </Card>
        </Grid>
        <Grid item md={3} xs={6}>
          <Card
            elevation={2}
            sx={{
              padding: 2,
            }}
            component={Paper}
          >
            <Typography variant="h5" gutterBottom>
              Tanggal Transaksi
            </Typography>
            <Typography>
              {dayjs(new Date(createdAt)).format("DD MMMM YYYY HH:mm")}
            </Typography>
          </Card>
        </Grid>
        <Grid item md={3} xs={6}>
          <Card
            elevation={2}
            sx={{
              padding: 2,
            }}
            component={Paper}
          >
            <Typography variant="h5" gutterBottom>
              Tanggal Kedatangan
            </Typography>
            <Typography>
              {dayjs(new Date(date)).format("DD MMMM YYYY")}
            </Typography>
          </Card>
        </Grid>
        <Grid item md={3} xs={6}>
          <Card
            elevation={1}
            sx={{
              padding: 2,
            }}
            component={Paper}
          >
            <Typography variant="h5" gutterBottom>
              Status
            </Typography>
            {new Date().getTime() - new Date(createdAt).getTime() >
              60 * 60 * 1000 && !email_verified ? (
              <Alert
                severity="error"
                iconMapping={{
                  error: <Close fontSize="inherit" />,
                }}
              >
                Invalid
              </Alert>
            ) : email_verified ? (
              <Alert
                iconMapping={{
                  success: <CheckCircleOutline fontSize="inherit" />,
                }}
              >
                Settlement
              </Alert>
            ) : (
              <Alert
                severity="warning"
                iconMapping={{
                  success: <AccessTime fontSize="inherit" />,
                }}
              >
                Pending
              </Alert>
            )}
          </Card>
        </Grid>
      </Grid>

      {DetailTransactions.map((detailTransaction) => {
        const {
          Ticket,
          actual_price: detailActualPrice,
          price: detailPrice,
          discount: detailDiscount,
          quantity,
        } = detailTransaction;

        const { id_ticket, image, name, description, how_to_use, terms } =
          Ticket;

        return (
          <Card
            key={id_ticket}
            sx={{
              display: "flex",
              p: 2,
              my: 2,
              width: "100%",
            }}
            component={Paper}
            elevation={2}
          >
            <CardMedia
              component="img"
              sx={{
                width: 100,
                backgroundSize: "contain",
                maxHeight: 200,
              }}
              image={`/ticket-images/${image}`}
              alt="ticket-card-images"
            />
            <Box width={"100%"}>
              <CardContent>
                <Typography variant="h5" fontWeight={550}>
                  {quantity} {name}
                </Typography>
                <ShowMoreText
                  howToUse={how_to_use}
                  description={description}
                  terms={terms}
                />
                <CardActions
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <div>
                    {detailDiscount === 0 ? (
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body1"
                        color="text.primary"
                        fontWeight={600}
                      >
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(
                          detailActualPrice
                            ? Number(detailActualPrice) * quantity
                            : 0
                        )}
                      </Typography>
                    ) : (
                      <>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body1"
                          color="red"
                        >
                          -{detailDiscount}%
                        </Typography>{" "}
                        <Typography
                          sx={{
                            textDecorationLine: "line-through",
                            display: "inline",
                          }}
                          component="span"
                          variant="body1"
                          color="text.secondary"
                        >
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(Number(detailPrice) * quantity)}
                        </Typography>
                        <br />
                        <Typography
                          mt={2}
                          ml={5}
                          fontWeight={600}
                          component={"span"}
                          variant="body1"
                          color="text.primary"
                        >
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(
                            detailActualPrice
                              ? Number(detailActualPrice) * quantity
                              : 0
                          )}
                        </Typography>
                      </>
                    )}
                  </div>
                </CardActions>
              </CardContent>
            </Box>
          </Card>
        );
      })}
    </Container>
  );
};

TransactionDetailPage.getLayout = (detailPage: ReactElement) => {
  return <Layout>{detailPage}</Layout>;
};

export default TransactionDetailPage;

export const getServerSideProps: GetServerSideProps<{
  transaction: Props;
}> = async (req) => {
  const { transactionsId } = req.query as { transactionsId: string };

  const transaction = await Transaction.findByPk(Number(transactionsId), {
    include: {
      model: DetailTransaction,
      nested: true,
      all: true,
    },
  });

  const testTransact = await Transaction.findAll({
    attributes: [
      [sequelize.fn("MONTH", sequelize.col("date")), "months"],
      [sequelize.fn("YEAR", sequelize.col("date")), "years"],
      [sequelize.fn("COUNT", sequelize.col("date")), "total_transaction"],
    ],
    group: [sequelize.fn("MONTH", sequelize.col("date")), "months", "years"],
  });

  console.log(JSON.stringify(testTransact, null, 4));

  if (transaction) {
    const parsedTransaction = JSON.stringify(transaction);
    return {
      props: {
        transaction: JSON.parse(parsedTransaction),
      },
    };
  }

  return {
    props: {
      transaction: null,
    },
    notFound: true,
  };
};
