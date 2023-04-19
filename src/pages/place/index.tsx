import Head from "next/head";
import { Layout } from "@/components/components";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import {
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

const PlacePage: NextPageWithLayout = () => {
  const router = useRouter();
  const onClickTicketButton = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/ticket");
  };

  return (
    <>
      <Head>
        <title>Monas | Wisata</title>
      </Head>

      <Box
        component={Paper}
        sx={{
          backgroundImage: "url(monas-full.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 20%",
        }}
        p={10}
      >
        <div
          style={{
            justifyContent: "center",
            verticalAlign: "middle",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Typography
            variant="h2"
            fontWeight={550}
            align="center"
            alignItems="center"
            color="#FFFFFF"
          >
            EXPLORE
          </Typography>
          <Typography
            color="#FFFFFF"
            variant="h2"
            align="center"
            fontWeight={550}
            alignItems="center"
          >
            MONUMEN NASIONAL INDONESIA
          </Typography>
          <Grid
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
            my={10}
          >
            <Button
              size="large"
              LinkComponent="a"
              href="/ticket"
              onClick={onClickTicketButton}
              variant="contained"
            >
              Beli tiket sekarang
            </Button>
          </Grid>
        </div>
      </Box>
      <Typography
        component="h1"
        variant="h4"
        mb={5}
        mt={10}
        align="center"
        color="inherit"
        gutterBottom={true}
        fontWeight={800}
        sx={{
          fontFamily: "Segoe UI Symbol",
          color: "#696969",
        }}
      >
        Wisata Terpopuler
      </Typography>

      <Grid container p={5} spacing={4}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              p: 3,
              borderRadius: "5px",
            }}
          >
            <CardMedia component="img" image="lidah-api.png" alt="lidah-api" />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Lidah Api
              </Typography>
              <Typography>
                Simbol semangat perjuangan rakyat Indonesia yang ingin meraih
                kemerdekaan yang tampak mencolok dengan bentuk seperti kobaran
                api keemasan.
              </Typography>
            </CardContent>
          </Card>{" "}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              p: 3,
              borderRadius: "5px",
            }}
          >
            <CardMedia
              component="img"
              sx={{}}
              image="ruang-kemerdekaan.png"
              alt="ruang-kemerdekaan"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Ruang Kemerdekaan
              </Typography>
              <Typography>
                Ruangan ini menyimpan simbol kenegaraan dan kemerdekaan Republik
                Indonesia, diantaranya seperti Naskah asli Proklamasi
                Kemerdekaan Indonesia yang disimpan dalam kotak kaca di dalam
                gerbang berlapis emas
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              p: 5,
              borderRadius: "5px",
            }}
          >
            <CardMedia
              component="img"
              sx={{}}
              image="pelataran-puncak-monas.png"
              alt="pelataran-monas"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Pelataran Puncak
              </Typography>
              <Typography>
                Pelataran puncak terletak di bagian paling atas Tugu Monas.
                Wisatawan dapat melihat pemandangan Kota Jakarta.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

PlacePage.getLayout = (placePage: ReactElement) => {
  return <Layout>{placePage}</Layout>;
};

export default PlacePage;
