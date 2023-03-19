
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
          backgroundPosition: '25% 55%',
          backgroundImage: `url(head-monas-pict.jpg)`,
        }}
      >

        <Grid
          container
        >
          <Grid
            item
            md={7}
            mb={20}
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
                component='h1'
                color='inherit'
                paragraph
              >
                Jakarta's famous landmark in the heart of the city
              </Typography>

            </Box>

          </Grid>

        </Grid>

      </Paper>

    </>
  )
}

export default HomePage