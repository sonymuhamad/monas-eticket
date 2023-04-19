import { Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

const Art = () => {
  return (
    <>
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
        Wisata Sejarah
      </Typography>

      <Grid container p={5} spacing={4}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              component="img"
              sx={{}}
              image="relief-monas-majapahit.JPG"
              alt="relief-monas-majapahit"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Relief Kerajaan di Indonesia
              </Typography>
              <Typography>
                Pada halaman luas mengelilingi Monas, tampak relief timbul yang
                menggambarkan sejarah Indonesia
              </Typography>
            </CardContent>
          </Card>{" "}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              component="img"
              sx={{}}
              image="ruang-kemerdekaan-monas.jpg"
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
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              component="img"
              sx={{}}
              image="museum-sejarah-nasional.jpg"
              alt="museum-sejarah-nasional"
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                Museum Sejarah Nasional
              </Typography>
              <Typography>
                Museum ini memamerkan Diorama sejarah Indonesia sejak masa pra
                sejarah hingga masa orde baru.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Art;
