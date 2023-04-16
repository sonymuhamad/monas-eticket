import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Phone, Email, Instagram, Twitter } from "@mui/icons-material";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export function Copyright() {
  return (
    <Typography mt={5} align="center" variant="body2" color="#FFFF">
      {"Copyright © "} monas.com {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "20vh",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "rgba(67, 134, 189, 1)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={10}>
            <Grid item sm={6} xs={12}>
              <Typography component={"h4"} color={"#FFFF"} variant="h5">
                Kontak Kami
              </Typography>
              <Typography variant="body1" color={"#FFFF"}>
                Jl. Silang Monas, Gambir, RT.5/RW.2, Central Jakarta City, DKI
                Jakarta 10110, Indonesia.
              </Typography>

              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Phone htmlColor="#FFFF" />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color: "#FFFF",
                      }}
                      primary="(021) 3822255"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Email htmlColor="#FFFF" />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color: "#FFFF",
                      }}
                      primary="mtugumonas@yahoo.co.id"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Instagram htmlColor="#FFFF" />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color: "#FFFF",
                      }}
                      primary="monumen.nasional"
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <Twitter htmlColor="#FFFF" />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color: "#FFFF",
                      }}
                      primary="MonasDKIJakarta"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>
            <Grid item sm={6} xs={12}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666307543373!2d106.82458402490462!3d-6.175408343811999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2db8c5617%3A0x4e446b7ac891d847!2sMonas%2C%20Gambir%2C%20Kecamatan%20Gambir%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sen!2sid!4v1681631606901!5m2!1sen!2sid"
                width="400"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  borderRadius: "15px",
                }}
              />
            </Grid>
          </Grid>
        </Container>

        <Copyright />
      </Box>
    </Box>
  );
}
