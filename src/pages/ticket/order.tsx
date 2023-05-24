import React, { useEffect, useState, ReactElement, useMemo } from "react";
import {
  Button,
  Alert,
  Grid,
  TextField,
  FormControlLabel,
  Typography,
  StepLabel,
  Step,
  Stepper,
  Paper,
  Container,
  Card,
  CardMedia,
  CardContent,
  Box,
  CardActions,
  IconButton,
  createTheme,
  ThemeProvider,
  Snackbar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  MarkEmailRead,
  MarkEmailUnread,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import { useRouter } from "next/router";

import { useEmailInput } from "@/components/hooks";
import { NextPageWithLayout } from "../_app";
import { Layout } from "@/components/components";
import { DatePicker } from "@mui/x-date-pickers";
import SkeletonCards from "@/components/components/card_skeleton";
import { TicketProps } from "../../../models/ticket";
import ShowMoreText from "@/components/components/ticket_page_components/text_hiders";
import transaction, { CreateTransaction } from "../api/transaction";
import {
  TransactionProps,
  DetailTransactionProps,
} from "../../../models/transaction";
import { Transaction, DetailTransaction } from "../../../models/transaction";
import { Add, Remove } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";

import { withSessionSsr } from "../../../lib/config/withSession";

const steps = [
  "Order details",
  "Email authentication",
  "Payment details",
  "Finish",
];

interface ErrorType {
  email?: string;
}

interface TicketOrder {
  ticket: TicketProps;
  quantity: number;
}
interface JSONResponse {
  ok?: boolean;
  error?: ErrorType;
  transaction?: CreateTransaction;
}

const theme = createTheme({
  palette: {
    secondary: {
      main: "#A9A9A9",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

interface Props {
  currentTransaction?:
    | (TransactionProps & { detailtransactions: DetailTransactionProps[] })
    | null;
}

const OrderPage: NextPageWithLayout<Props> = ({
  currentTransaction,
}: Props) => {
  const router = useRouter();
  const [transaction, setTransaction] = useState<CreateTransaction | null>(
    null
  );
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeError, setVerificationCodeError] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "warning" | "error" | "info"
  >("success");
  const [alertMessage, setAlertMessage] = useState("");

  const [date, setDate] = useState<Dayjs | null>(null);
  const [order, setOrder] = useState<TicketOrder[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [ticketList, setTicketList] = useState<TicketProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const {
    email,
    emailErrorStatus,
    emailErrorText,
    handleChangeEmail,
    handleChangeErrorStatus,
    handleChangeErrorText,
  } = useEmailInput({});

  useEffect(() => {
    setLoading(true);
    fetch("/api/tickets")
      .then((res) => res.json())
      .then((tickets: TicketProps[]) => setTicketList(tickets))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [subTotalOrderedTicket, subTotalOrderedPrice] = useMemo(() => {
    const { totalPrice, totalTicket } = order.reduce(
      (prev, current) => {
        const currentPrice = current.ticket.actual_price * current.quantity;

        return {
          totalPrice: prev.totalPrice + currentPrice,
          totalTicket: prev.totalTicket + current.quantity,
        };
      },
      { totalPrice: 0, totalTicket: 0 }
    );
    return [totalTicket, totalPrice];
  }, [order]);

  const handleErrorSubmit = (err: ErrorType) => {
    if (err.email) {
      handleChangeErrorStatus(true);
      handleChangeErrorText(err.email);
    } else {
      handleChangeErrorStatus(false);
      handleChangeErrorText("");
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = {
      email_customer: email,
      date: date?.toDate(),
      detail_transaction: [
        ...order.map(
          ({ ticket: { id_ticket, price, discount }, quantity }) => ({
            price,
            discount,
            ticket_id: id_ticket,
            quantity,
          })
        ),
      ],
    };

    setLoadingStatus((prev) => !prev);
    const res = await fetch("/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setLoadingStatus((prev) => !prev);

    const { ok, error, transaction }: JSONResponse = await res.json();
    if (error) {
      handleErrorSubmit(error);
      setAlertSeverity("error");
      setAlertMessage("Send email verification failed");
      setOpenSnackbar(true);
    } else if (ok) {
      setVerificationSent(true);
      setAlertSeverity("success");
      setAlertMessage("Send email verification success");
      setOpenSnackbar(true);
      if (transaction) {
        setTransaction(transaction);
      }
    }
  };

  const handleSubmitVerificationEmail = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (transaction) {
      const { id_transaction } = transaction;
      const data = {
        email_verification_code: verificationCode,
      };
      const res = await fetch(`/api/transaction/${id_transaction}`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const { verified }: { verified?: boolean } = await res.json();

      if (verified) {
        setEmailVerified(true);
        setActiveStep(2);
        setAlertSeverity("success");
        setAlertMessage("Email verified");
        setOpenSnackbar(true);
      } else {
        setVerificationCodeError(true);
        setAlertSeverity("error");
        setAlertMessage("Invalid verification code");
        setOpenSnackbar(true);
      }
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleCreateTransaction = async () => {
    const res = await fetch(
      `/api/transaction/make-transaction?transactionId=${transaction?.id_transaction}`
    );
    const { token, ok }: { token: string; redirect_url: string; ok: boolean } =
      await res.json();

    if (ok) {
      console.log(token, ok);
      (window as any).snap.pay(token);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    const midtransScriptUrl = process.env.NEXT_PUBLIC_MIDTRANSSNAPURL;
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_CLIENTKEY
    );

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    const { payment } = router.query as { payment: string };
    if (payment === "success") {
      setActiveStep(3);
    }
    if (emailVerified) {
      setActiveStep(2);
    }
  }, [router.query]);

  useEffect(() => {
    if (currentTransaction) {
      const { detailtransactions, ...rest } = currentTransaction;
      setTransaction({ ...rest, detail_transaction: detailtransactions });
      if (rest.email_verified) {
        setEmailVerified(true);
      }
    }
  }, [currentTransaction]);

  return (
    <Container maxWidth="md" sx={{ mb: 4 }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Send email verification success"
      >
        <Alert severity={alertSeverity}>{alertMessage}</Alert>
      </Snackbar>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Order Ticket
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Grid container>
            <Grid item xs={8}>
              <DatePicker
                value={date}
                onChange={(newValue) => setDate(newValue)}
                sx={{
                  width: "100%",
                }}
                disablePast
                label="Pilih tanggal"
                format="dddd, MMMM D, YYYY"
              />
            </Grid>
            {loading ? (
              <SkeletonCards />
            ) : (
              <>
                <Alert severity="info" sx={{ my: 2 }}>
                  Hanya untuk pengunjung yang{" "}
                  <b>
                    {" "}
                    sudah vaksinasi Covid-19 (min Dosis pertama dan kedua){" "}
                  </b>
                  .<b> Pengunjung Wajib menunjukan bukti sudah vaksinasi</b>
                </Alert>
                {ticketList.map((ticket) => {
                  const {
                    id_ticket,
                    image,
                    name,
                    description,
                    how_to_use,
                    terms,
                    price,
                    actual_price,
                    discount,
                  } = ticket;

                  const ordered = order.some(
                    ({ ticket: { id_ticket: idTicket } }) =>
                      idTicket === id_ticket
                  );

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
                            {name}
                          </Typography>
                          {/* <Typography paragraph variant="caption" gutterBottom>
                            {description}
                          </Typography> */}
                          <ShowMoreText
                            howToUse={how_to_use}
                            description={description}
                            terms={terms}
                          />
                          <CardActions
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            <div>
                              {discount === 0 ? (
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
                                  }).format(Number(actual_price))}
                                </Typography>
                              ) : (
                                <>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body1"
                                    color="red"
                                  >
                                    -{discount}%
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
                                    }).format(Number(price))}
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
                                    }).format(Number(actual_price))}
                                  </Typography>
                                </>
                              )}
                            </div>
                            {ordered ? (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Box
                                  component={Paper}
                                  elevation={0}
                                  sx={{ backgroundColor: "#0288d1" }}
                                >
                                  <IconButton
                                    sx={{ color: "#FFFFFF" }}
                                    aria-label="remove from shopping cart"
                                    onClick={() => {
                                      setOrder((prev) =>
                                        prev.map((eachTicket) => {
                                          const { ticket, quantity } =
                                            eachTicket;
                                          const { id_ticket: idTicket } =
                                            ticket;
                                          if (idTicket === id_ticket) {
                                            return {
                                              ticket,
                                              quantity: quantity - 1,
                                            };
                                          }
                                          return eachTicket;
                                        })
                                      );

                                      setOrder((prev) =>
                                        prev.filter(
                                          ({ quantity }) => quantity !== 0
                                        )
                                      );
                                    }}
                                  >
                                    <Remove />
                                  </IconButton>
                                </Box>
                                <Typography mx={2}>
                                  {ordered
                                    ? order.find(
                                        ({ ticket: { id_ticket: idTicket } }) =>
                                          idTicket === id_ticket
                                      )?.quantity
                                    : 0}
                                </Typography>
                                <Box
                                  component={Paper}
                                  elevation={0}
                                  sx={{ backgroundColor: "#0288d1" }}
                                >
                                  <IconButton
                                    onClick={() => {
                                      setOrder((prev) =>
                                        prev.map((eachTicket) => {
                                          const { ticket, quantity } =
                                            eachTicket;
                                          const { id_ticket: idTicket } =
                                            ticket;
                                          if (idTicket === id_ticket) {
                                            return {
                                              ticket,
                                              quantity: quantity + 1,
                                            };
                                          }
                                          return eachTicket;
                                        })
                                      );
                                    }}
                                    sx={{ color: "#FFFFFF" }}
                                    aria-label="add to shopping cart"
                                  >
                                    <Add />
                                  </IconButton>
                                </Box>
                              </div>
                            ) : (
                              <Button
                                variant="contained"
                                size="large"
                                sx={{ ml: 2 }}
                                onClick={() => {
                                  setOrder((prev) => [
                                    ...prev,
                                    { ticket, quantity: 1 },
                                  ]);
                                }}
                              >
                                Tambah
                              </Button>
                            )}
                          </CardActions>
                        </CardContent>
                      </Box>
                    </Card>
                  );
                })}
              </>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                width: "100%",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <div>
                <Typography>
                  Subtotal ({subTotalOrderedTicket} tiket)
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "end",
                }}
              >
                <Typography fontWeight={650}>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(Number(subTotalOrderedPrice))}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  size="large"
                  sx={{ ml: 2 }}
                  disabled={order.length === 0 || date === null}
                >
                  Beli tiket
                </Button>
              </div>
            </div>
          </Grid>
        )}

        {activeStep === 1 && (
          <>
            {verificationSent ? (
              <Box
                component={"form"}
                sx={{
                  justifyContent: "flex-end",
                }}
                onSubmit={handleSubmitVerificationEmail}
              >
                <Alert sx={{ mt: 2, mb: 4 }}>
                  Kode verifikasi email telah terkirim
                </Alert>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  disabled
                  value={email}
                  onChange={handleChangeEmail}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                  error={emailErrorStatus}
                  helperText={emailErrorText}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  error={verificationCodeError}
                  helperText={
                    verificationCodeError
                      ? "Kode verifikasi invalid"
                      : "Masukkan kode verifikasi email anda"
                  }
                  value={verificationCode}
                  onChange={(e) => {
                    setVerificationCodeError(false);
                    setVerificationCode(e.target.value);
                  }}
                  id="verification_code"
                  label="Kode verifikasi"
                  placeholder="Masukkan kode verifikasi"
                />

                <LoadingButton
                  loading={loadingStatus}
                  startIcon={<MarkEmailRead />}
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Submit
                </LoadingButton>
              </Box>
            ) : (
              <Box component={"form"} onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={email}
                  onChange={handleChangeEmail}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                  error={emailErrorStatus}
                  helperText={emailErrorText}
                />
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    onClick={handleBack}
                    size="large"
                    sx={{ ml: 2 }}
                    color="secondary"
                  >
                    Back
                  </Button>
                  <LoadingButton
                    loading={loadingStatus}
                    startIcon={<MarkEmailUnread />}
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ ml: 2 }}
                  >
                    Submit
                  </LoadingButton>
                </ThemeProvider>
              </Box>
            )}
          </>
        )}

        {activeStep === 2 && (
          <>
            <Typography variant="h4" align="center">
              Detail payment
            </Typography>
            <List disablePadding>
              {order.map(
                ({ ticket: { id_ticket, name, actual_price }, quantity }) => {
                  return (
                    <ListItem key={id_ticket}>
                      <ListItemText primary={`${quantity} ${name}`} />
                      <Typography variant="body2">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(Number(actual_price))}
                      </Typography>
                    </ListItem>
                  );
                }
              )}
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Total Amount" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(Number(subTotalOrderedPrice))}
                </Typography>
              </ListItem>
            </List>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{ my: 4 }}
                onClick={handleCreateTransaction}
                variant="contained"
                startIcon={<ShoppingCartCheckout />}
              >
                Beli Tiket
              </Button>
            </div>
          </>
        )}

        {activeStep === 3 && (
          <>
            <Alert sx={{ mt: 2, mb: 4 }}>Payment Success</Alert>{" "}
          </>
        )}
      </Paper>
    </Container>
  );
};

OrderPage.getLayout = (orderPage: ReactElement) => {
  return <Layout>{orderPage}</Layout>;
};

export default OrderPage;

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    if (req.session.currentTransaction) {
      const { id_transaction } = req.session.currentTransaction;
      const transaction = await Transaction.findByPk(Number(id_transaction), {
        include: DetailTransaction,
      });
      if (transaction) {
        const parsedTransaction = JSON.stringify(transaction);
        return {
          props: {
            currentTransaction: JSON.parse(parsedTransaction),
          },
        };
      }
    }

    return {
      props: {
        currentTransaction: null,
      },
    };
  }
);
