
import { Container, Paper, Box, Grid, Typography } from "@mui/material"

const HomePage = () => {

  return (
    <>

      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          mt: 3,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(head-monas-pict.jpg)`,
        }}
      >

        <Grid
          container
        >
          <Grid
            item
            md={6}
          >
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >

              <Typography
                component='h1'
                variant='h2'
                color='inherit'
                gutterBottom
              >
                Monumen Nasional Indonesia
              </Typography>

              <Typography
                component='h5'
                color='inherit'
                paragraph
              >
                Platform pembelian tiket online
              </Typography>

            </Box>

          </Grid>

        </Grid>

      </Paper>

    </>
  )
}

export default HomePage