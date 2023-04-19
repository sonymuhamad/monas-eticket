import { Typography, Box, Paper, Grid } from "@mui/material";
import React from "react";

const History = () => {
  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        mb={5}
        align="center"
        color="inherit"
        gutterBottom={true}
        fontWeight={800}
        sx={{
          fontFamily: "Segoe UI Symbol",
          color: "#696969",
        }}
      >
        Tentang <br />
        Monumen Nasional Indonesia
      </Typography>

      <Grid
        container
        spacing={3}
        p={5}
        component="main"
        sx={{
          height: "100vh",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            backgroundImage: "url(1.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "50% 20%",
          }}
          sm={6}
          component={Paper}
        ></Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              paragraph={true}
              gutterBottom={true}
              sx={{
                fontFamily: "Georgia",
              }}
            >
              Monumen Nasional didirikan untuk mengenang perlawanan dan
              perjuangan rakyat Indonesia dalam merebut kemerdekaan dari
              pemerintahan kolonial Kekaisaran Belanda.
            </Typography>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              paragraph={true}
              gutterBottom={true}
              sx={{
                fontFamily: "Georgia",
              }}
            >
              Mahkota lidah api yang dilapisi lembaran emas melambangkan
              semangat perjuangan yang menyala-nyala dari rakyat Indonesia.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default History;
