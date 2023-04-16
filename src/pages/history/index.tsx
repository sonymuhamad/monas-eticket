import Head from "next/head";
import { Layout } from "@/components/components";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import {
  Box,
  Grid,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Container,
  StepContent,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import Image from "next/image";

const useStyles = makeStyles(() => ({
  container: {
    opacity: 1,
    mixBlendMode: "normal",
    backgroundColor: "rgba(67, 134, 189, 1)",
    alignItems: "inherit",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    justifyContent: "flex-start",
    borderRadius: "10px",
    padding: 10,
  },
  itemContainer: {
    opacity: 1,
    mixBlendMode: "normal",
    alignItems: "inherit",
  },
  title: {
    lineHeight: "108.52272510528564%",
    letterSpacing: "0%",
    marginBottom: "15px",
    textTransform: "none",
    textAlign: "center",
    verticalAlign: "top",
    fontFamily: "Inter",
    fontSize: "16px",
    color: "#000000",
    fontWeight: 500,
    width: "100%",
  },
  subtitle: {
    lineHeight: "108.52272510528564%",
    letterSpacing: "0%",
    marginBottom: "15px",
    textTransform: "none",
    textAlign: "center",
    verticalAlign: "top",
    fontFamily: "Inter",
    fontSize: "18px",
    color: "#000000",
    fontWeight: 500,
    width: "100%",
    height: "100%",
  },
  divider: {
    opacity: 1,
    mixBlendMode: "normal",
    borderColor: "#000000",
    borderWidth: "3px",
    borderStyle: "solid",
    borderRadius: "10px",
  },
}));

const HistoryPage: NextPageWithLayout = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Head>
        <title>Monas | History</title>
      </Head>

      <Box className={classes.container}>
        <Grid container spacing={4}>
          <Grid item sm={6} xs={12}>
            <Typography component={"h1"} variant="h2" color={"#FFFFFF"}>
              Sejarah Pembangunan Monas
            </Typography>

            <Typography variant="body2" paragraph color={"#FFFFFF"} mt={5}>
              Gagasan awal pembangunan Monas muncul setelah sembilan tahun
              kemerdekaan diproklamirkan. Pembangunan tugu Monas dilaksanakan
              melalui tiga tahapan yaitu tahap pertama (1961-1965), kedua
              (1966-1968), dan tahap ketiga (1969-1976). Monas mulai dibuka
              untuk umum sejak tanggal 12 Juli 1975.
            </Typography>
          </Grid>

          <Grid item sm={6} xs={12}>
            <div>
              <div className={classes.itemContainer}>
                <p className={classes.title}>Th1945</p>
                <div className={classes.divider}></div>
                <p className={classes.subtitle}>Kemerdekaan Indonesia</p>
              </div>
              <div className={classes.itemContainer}>
                <p className={classes.title}>Th1961</p>
                <div className={classes.divider}></div>
                <p className={classes.subtitle}>Pembangunan Monas Tahap 1</p>
              </div>
              <div className={classes.itemContainer}>
                <p className={classes.title}>Th1966</p>
                <div className={classes.divider}></div>
                <p className={classes.subtitle}>Pembangunan Monas Tahap 2</p>
              </div>
              <div className={classes.itemContainer}>
                <p className={classes.title}>Th1969</p>
                <div className={classes.divider}></div>
                <p className={classes.subtitle}>Pembangunan Monas Tahap 3</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>

      <Container
        maxWidth={"lg"}
        sx={{
          my: 7,
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step completed={true}>
            <StepLabel>Th 1961</StepLabel>
            <StepContent>
              <Grid container spacing={5}>
                <Grid item sm={4}>
                  <Box>
                    <Image
                      alt="part-1-Developing Monumen National"
                      src={"/Img2_1.png"}
                      width={350}
                      height={400}
                    />
                  </Box>
                </Grid>

                <Grid item sm={8}>
                  <Typography component="h1" variant="h3">
                    Pembangunan Monas Tahap 1
                  </Typography>

                  <Typography variant="body2" paragraph mt={5}>
                    Pembangunan tahap pertama dimulai secara resmi yaitu pada
                    tanggal 17 Agustus 1961 dengan Soekarno secara seremonial
                    menancapkan pasak beton pertama. Total 284 pasak beton
                    digunakan sebagai fondasi bangunan. Sebanyak 360 pasak bumi
                    ditanamkan untuk fondasi museum sejarah nasional.
                    Keseluruhan pemancangan fondasi rampung pada bulan Maret
                    1962. Dinding museum di dasar bangunan selesai pada bulan
                    Oktober. Pembangunan kemudian dimulai dan akhirnya rampung
                    pada bulan Agustus 1963.
                  </Typography>
                </Grid>
              </Grid>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Continue
                </Button>
                <Button disabled onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step completed={true}>
            <StepLabel>Th 1966</StepLabel>
            <StepContent>
              <Grid container spacing={5}>
                <Grid item sm={4}>
                  <Box>
                    <Image
                      alt="part-2-Developing Monumen National"
                      src={"/Img3_1.png"}
                      width={350}
                      height={400}
                    />
                  </Box>
                </Grid>

                <Grid item sm={8}>
                  <Typography component="h1" variant="h3">
                    Pembangunan Monas Tahap 2
                  </Typography>

                  <Typography variant="body2" paragraph mt={5}>
                    Pembangunan tahap kedua mengalami penundaan dan relatif
                    lebih lama dari rencana awal dikarenakan terjadinya Gerakan
                    30 September sehingga tahap ini sempat tertunda. Pembangunan
                    ini berlangsung pada kurun 1966 hingga 1968.
                  </Typography>
                </Grid>
              </Grid>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Continue
                </Button>
                <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Th 1966</StepLabel>
            <StepContent>
              <Grid container spacing={5}>
                <Grid item sm={4}>
                  <Box>
                    <Image
                      alt="part-3-Developing Monumen National"
                      src={"/Img4_1.png"}
                      width={350}
                      height={400}
                    />
                  </Box>
                </Grid>

                <Grid item sm={8}>
                  <Typography component="h1" variant="h3">
                    Pembangunan Monas Tahap 3
                  </Typography>

                  <Typography variant="body2" paragraph mt={5}>
                    Tahap akhir berlangsung pada tahun 1969-1976 dengan
                    menambahkan diorama pada museum sejarah. Meskipun
                    pembangunan telah rampung, masalah masih saja terjadi,
                    antara lain kebocoran air yang menggenangi museum. Hal
                    tersebut ditangani satu persatu sehingga masalah telah
                    selesai dan berfungsi dengan baik.
                  </Typography>
                </Grid>
              </Grid>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Continue
                </Button>
                <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Th 1975</StepLabel>
            <StepContent>
              <Grid container spacing={5}>
                <Grid item sm={4}>
                  <Box>
                    <Image
                      alt="part-3-Developing Monumen National"
                      src={"/Img4_1.png"}
                      width={350}
                      height={400}
                    />
                  </Box>
                </Grid>

                <Grid item sm={8}>
                  <Typography component="h1" variant="h3">
                    Monas Resmi Dibuka
                  </Typography>

                  <Typography variant="body2" paragraph mt={5}>
                    Monumen secara resmi dibuka untuk umum dan diresmikan pada
                    tanggal 12 Juli 1975 oleh Presiden Republik Indonesia
                    Soeharto. Lokasi pembangunan monumen ini dikenal dengan nama
                    Medan Merdeka. Di sekeliling tugu terdapat taman, dua buah
                    kolam dan beberapa lapangan terbuka tempat berolahraga. Pada
                    hari-hari libur Medan Merdeka dipenuhi pengunjung yang
                    berekreasi menikmati pemandangan Tugu Monas dan melakukan
                    berbagai aktivitas dalam taman.
                  </Typography>
                </Grid>
              </Grid>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  disabled
                >
                  Continue
                </Button>
                <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                  Back
                </Button>
              </div>
            </StepContent>
          </Step>
        </Stepper>

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
          Rancang Bangun Monumen Nasional
        </Typography>

        <Grid container spacing={5}>
          <Grid item sm={4}>
            <Box>
              <Image
                alt="part-3-Developing Monumen National"
                src={"/Img 6_1.png"}
                width={350}
                height={400}
              />
            </Box>
          </Grid>
          <Grid item sm={8}>
            <Typography variant="body2" paragraph mt={5}>
              Rancang bangun Tugu Monas berdasarkan pada konsep pasangan
              universal yang abadi, Lingga dan Yoni. Tugu obelisk yang menjulang
              tinggi adalah lingga yang melambangkan laki-laki, elemen maskulin
              yang bersifat aktif dan positif, serta melambangkan siang hari.
              Sementara pelataran cawan landasan obelisk adalah Yoni yang
              melambangkan perempuan, elemen feminin yang pasif dan negatif
              serta melambangkan malam hari. Lingga dan yoni merupakan lambang
              kesuburan dan kesatuan harmonis yang saling melengkapi sedari masa
              prasejarah Indonesia. Bentuk Tugu Monas juga dapat ditafsirkan
              sebagai sepasang "alu" dan "Lesung", alat penumbuk padi yang
              didapati dalam setiap rumah tangga petani tradisional Indonesia.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

HistoryPage.getLayout = (historyPage: ReactElement) => {
  return <Layout>{historyPage}</Layout>;
};

export default HistoryPage;
