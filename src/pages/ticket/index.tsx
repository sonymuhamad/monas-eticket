import Head from "next/head";
import { Layout } from "@/components/components";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useMemo } from "react";
import {
  Paper,
  Grid,
  Card,
  Typography,
  Container,
  CardMedia,
  Box,
  CardContent,
  Button,
  CardActionArea,
  List,
  ListItemText,
  ListItem,
  Alert,
} from "@mui/material";
import SkeletonCards from "@/components/components/card_skeleton";
import { useState, useEffect } from "react";
import { TicketProps } from "../../../models/ticket";

const TicketPage: NextPageWithLayout = () => {
  const [ticketList, setTicketList] = useState<TicketProps[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedTicket, setSelectedTicket] = useState<null | TicketProps>(
    null
  );

  const {
    name,
    how_to_use,
    description,
    terms,
    price,
    discount,
    actual_price,
  } = useMemo(() => {
    if (selectedTicket) {
      return {
        ...selectedTicket,
      };
    } else {
      return {
        name: "",
        description: "",
        how_to_use: "",
        terms: "",
        actual_price: "",
        price: "",
        discount: "",
      };
    }
  }, [selectedTicket]);

  const onClickSelectTicket = (selectedTicket: TicketProps) => {
    setSelectedTicket(selectedTicket);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch("/api/tickets");
        const ticket: TicketProps[] = await res.json();
        setTicketList(ticket);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Monas | E-Ticket</title>
      </Head>

      <Container
        maxWidth="xl"
        sx={{
          my: 5,
        }}
      >
        <Grid container spacing={4}>
          <Grid item sm={5} xs={5}>
            <Paper
              sx={{ maxHeight: 500, overflow: "auto", p: 2 }}
              elevation={3}
            >
              <Typography variant="h6">Daftar tiket</Typography>
              {loading ? (
                <SkeletonCards />
              ) : (
                ticketList.map((ticket) => {
                  const { id_ticket, image, name, description } = ticket;
                  return (
                    <Card
                      key={id_ticket}
                      sx={{ display: "flex", p: 2, my: 2 }}
                      component={Paper}
                      elevation={2}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 100 }}
                        image={`/ticket-images/${image}`}
                        alt="ticket-card-images"
                      />
                      <CardActionArea
                        onClick={() => onClickSelectTicket(ticket)}
                      >
                        <Box>
                          <CardContent>
                            <Typography variant="h6">{name}</Typography>
                            <Typography paragraph variant="caption">
                              {description}
                            </Typography>
                          </CardContent>
                        </Box>
                      </CardActionArea>
                    </Card>
                  );
                })
              )}
            </Paper>
          </Grid>

          <Grid item xs={7} sm={7}>
            {selectedTicket && (
              <Paper
                sx={{
                  p: 5,
                  maxHeight: 500,
                  overflow: "auto",
                }}
              >
                <Typography variant="h4">{name}</Typography>
                <Alert severity="info">
                  Hanya untuk pengunjung yang{" "}
                  <b>
                    {" "}
                    sudah vaksinasi Covid-19 (min Dosis pertama dan kedua){" "}
                  </b>
                  .<b> Pengunjung Wajib menunjukan bukti sudah vaksinasi</b>
                </Alert>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 750,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Description"
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {description}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Terms"
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {terms}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="How to use"
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {how_to_use}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary="Price"
                      secondary={
                        <>
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
                        </>
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
            )}
          </Grid>
        </Grid>

        <Grid
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            p: 5,
          }}
        >
          <Button
            variant="contained"
            LinkComponent="a"
            href="/ticket"
            size="large"
          >
            Beli tiket sekarang
          </Button>
        </Grid>
      </Container>
    </>
  );
};

TicketPage.getLayout = function getLayout(ticketPage: ReactElement) {
  return <Layout>{ticketPage}</Layout>;
};

export default TicketPage;
