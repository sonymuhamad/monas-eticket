import { Typography, Fade, Box, Paper, Grid } from "@mui/material"



const History = () => {

    return (
        <>

            <Fade
                in={true}
                timeout={{
                    enter: 2000
                }}
            >

                <Typography
                    component='h1'
                    variant="h4"
                    mb={5}
                    align="center"
                    color='inherit'
                    gutterBottom={true}
                    fontWeight={800}
                    sx={{
                        fontFamily: 'Segoe UI Symbol',
                        color: '#696969'
                    }}
                >
                    Sejarah <br />
                    Monumen Nasional Indonesia
                </Typography>

            </Fade>

            <Grid
                container
                component='main'
                sx={{
                    height: '100vh',
                }}
            >
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={5}
                    sx={{
                        backgroundImage: 'url(monas-full-tempo-dulu.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: '50% 20%',
                        borderRadius: '50%',
                    }}
                />

                <Grid
                    item
                    xs={12}
                    md={5}
                    ml={'10%'}
                    component={Paper}
                    elevation={0}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <Typography
                            component='h1'
                            variant="h6"
                            color='inherit'
                            paragraph={true}
                            gutterBottom={true}
                            sx={{
                                fontFamily: 'Georgia'
                            }}
                        >
                            Monumen Nasional didirikan untuk mengenang perlawanan dan perjuangan rakyat Indonesia dalam merebut kemerdekaan dari pemerintahan kolonial Kekaisaran Belanda.
                        </Typography>

                        <Typography

                            component='h1'
                            variant="h6"
                            color='inherit'
                            paragraph={true}
                            gutterBottom={true}
                            sx={{
                                fontFamily: 'Georgia'
                            }}
                        >
                            Mahkota lidah api yang dilapisi lembaran emas melambangkan semangat perjuangan yang menyala-nyala dari rakyat Indonesia.
                        </Typography>

                    </Box>

                </Grid>
            </Grid>
        </>
    )
}

export default History