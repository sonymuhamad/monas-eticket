import {
  Avatar,
  Typography,
  Badge,
  Box,
  Paper,
  Grid,
  Tab,
} from "@mui/material";
import { FormatQuote } from "@mui/icons-material";
import { TabPanel, TabContext, TabList } from "@mui/lab";

import { PanoramaFishEye } from "@mui/icons-material";
import React, { useState, useEffect } from "react";

const Review = () => {
  const [tabVal, setTabVal] = useState("1");

  const onChangeTab = (e: React.SyntheticEvent, value: unknown): void => {
    if (value && typeof value === "string") {
      setTabVal(value);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTabVal((prev) => {
        if (Number(prev) === 3) {
          return String(1);
        }
        return String(Number(prev) + 1);
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [tabVal]);

  return (
    <>
      <Grid>
        <Grid
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            p: 5,
          }}
        >
          <TabContext value={tabVal}>
            <Grid
              display="grid"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <TabPanel value={"1"}>
                <Box
                  component={Paper}
                  elevation={0}
                  sx={{
                    maxWidth: "650px",
                    p: 5,
                  }}
                >
                  <Grid
                    display="flex"
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={<FormatQuote color="info" />}
                    >
                      <Avatar
                        alt="selfie"
                        src="selfie.jpg"
                        sx={{ width: 85, height: 85 }}
                      />
                    </Badge>
                  </Grid>

                  <Typography
                    align="center"
                    component="h3"
                    variant="h6"
                    sx={{
                      fontFamily: "Segoe UI Symbol",
                      mt: 3,
                    }}
                  >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Adipisci asperiores non, minima ipsum autem doloribus!
                    Consectetur, neque quia tempore illum et vel eaque, ipsum ex
                    nulla quod accusantium possimus. Ducimus.
                  </Typography>

                  <Typography
                    align="center"
                    component="h6"
                    variant="body1"
                    fontWeight={750}
                    sx={{
                      fontFamily: "Segoe UI Symbol",
                      my: 2,
                      color: "#696969",
                    }}
                  >
                    - Mama Tia. Pengunjung
                  </Typography>

                  <Typography
                    align="right"
                    fontWeight={750}
                    component="h6"
                    variant="h6"
                    sx={{
                      fontFamily: "Segoe UI Symbol",
                      color: "#696969",
                      mt: 4,
                    }}
                  >
                    #Ayokemonas
                  </Typography>
                </Box>
              </TabPanel>

              <TabPanel value={"2"}>
                <Box
                  component={Paper}
                  elevation={0}
                  sx={{
                    maxWidth: "650px",
                    p: 5,
                  }}
                >
                  <Grid
                    display="flex"
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={<FormatQuote color="info" />}
                    >
                      <Avatar
                        alt="foto-di-monas"
                        src="foto-di-monas.jpg"
                        sx={{ width: 85, height: 85 }}
                      />
                    </Badge>
                  </Grid>

                  <Typography
                    align="center"
                    component="h3"
                    variant="h6"
                    sx={{
                      fontFamily: "Segoe UI Symbol",
                      mt: 3,
                    }}
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Praesentium quod ipsa eaque dolor debitis minima cumque
                    nisi, quae eius culpa, ab vero quam eum facere cupiditate
                    dolorem quos sed molestias?
                  </Typography>

                  <Typography
                    align="center"
                    component="h6"
                    variant="body1"
                    fontWeight={750}
                    sx={{
                      fontFamily: "Segoe UI Symbol",
                      my: 2,
                      color: "#696969",
                    }}
                  >
                    - Mas Cahyo. Pedagang Starling
                  </Typography>

                  <Typography
                    align="right"
                    fontWeight={750}
                    component="h6"
                    variant="h6"
                    sx={{
                      fontFamily: "Segoe UI Symbol",
                      color: "#696969",
                      mt: 4,
                    }}
                  >
                    #Ayokemonas
                  </Typography>
                </Box>
              </TabPanel>

              <TabPanel value={"3"}>
                <Box
                  component={Paper}
                  elevation={0}
                  sx={{
                    maxWidth: "650px",
                    p: 5,
                  }}
                >
                  <Grid
                    display="flex"
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={<FormatQuote color="info" />}
                    >
                      <Avatar
                        alt="ibu-anak-selfie"
                        src="ibu-anak-selfie.jpeg"
                        sx={{ width: 85, height: 85 }}
                      />
                    </Badge>
                  </Grid>

                  <Typography
                    align="center"
                    component="h3"
                    variant="h6"
                    sx={{
                      fontFamily: "Segoe UI Symbol",
                      mt: 3,
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Soluta quibusdam esse quos similique sunt ducimus explicabo
                    quasi iure perspiciatis distinctio debitis in, eius unde
                    tempore, ex architecto obcaecati ipsa quidem.
                  </Typography>

                  <Typography
                    align="center"
                    component="h6"
                    variant="body1"
                    fontWeight={750}
                    sx={{
                      fontFamily: "Segoe UI Symbol",
                      my: 2,
                      color: "#696969",
                    }}
                  >
                    - Putri Chandrawinata. Mantan kepala pengurus Monumen
                    Nasional
                  </Typography>

                  <Typography
                    align="right"
                    fontWeight={750}
                    component="h6"
                    variant="h6"
                    sx={{
                      fontFamily: "Segoe UI Symbol",
                      color: "#696969",
                      mt: 4,
                    }}
                  >
                    #Ayokemonas
                  </Typography>
                </Box>
              </TabPanel>

              <Grid
                display="flex"
                alignItems={"center"}
                justifyContent={"center"}
              >
                <TabList
                  value={tabVal}
                  onChange={onChangeTab}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab
                    icon={<PanoramaFishEye />}
                    value={"1"}
                    aria-label="Item One"
                  />
                  <Tab
                    icon={<PanoramaFishEye />}
                    value={"2"}
                    aria-label="Item Two"
                  />
                  <Tab
                    icon={<PanoramaFishEye />}
                    value={"3"}
                    aria-label="Item Three"
                  />
                </TabList>
              </Grid>
            </Grid>
          </TabContext>
        </Grid>
      </Grid>
    </>
  );
};

export default Review;
