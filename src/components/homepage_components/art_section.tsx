import { Fade, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material"
import { useOnScreen } from "@/components/hooks"
import { useRef } from "react"

const Art = () => {

    const artRef = useRef<HTMLDivElement>(null)
    const { alreadySeen } = useOnScreen(artRef)

    return (
        <>
            <div
                ref={artRef}
            >
                {alreadySeen && <Fade
                    in={true}
                    timeout={{
                        enter: 4000
                    }}
                >

                    <Typography
                        component='h1'
                        variant="h4"
                        mb={5}
                        mt={10}
                        align="center"
                        color='inherit'
                        gutterBottom={true}
                        fontWeight={800}
                        sx={{
                            fontFamily: 'Segoe UI Symbol',
                            color: '#696969'
                        }}
                    >
                        Wisata Sejarah <br />
                    </Typography>

                </Fade>
                }

            </div>

            <Grid container spacing={4} >
                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardMedia
                            component="img"
                            sx={{
                            }}
                            image="relief-monas-majapahit.JPG"
                            alt="relief-monas-majapahit"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Relief Kerajaan di Indonesia
                            </Typography>
                            <Typography>
                                Pada halaman luas mengelilingi Monas, tampak relief timbul yang menggambarkan sejarah Indonesia
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardMedia
                            component="img"
                            sx={{
                            }}
                            image="ruang-kemerdekaan-monas.jpg"
                            alt="ruang-kemerdekaan"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Ruang Kemerdekaan
                            </Typography>
                            <Typography>
                                Ruangan ini menyimpan simbol kenegaraan dan kemerdekaan Republik Indonesia, diantaranya seperti Naskah asli Proklamasi Kemerdekaan Indonesia yang disimpan dalam kotak kaca di dalam gerbang berlapis emas
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardMedia
                            component="img"
                            sx={{
                            }}
                            image="museum-sejarah-nasional.jpg"
                            alt="museum-sejarah-nasional"
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Museum Sejarah Nasional
                            </Typography>
                            <Typography>
                                Museum ini memamerkan Diorama sejarah Indonesia sejak masa pra sejarah hingga masa orde baru.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}


export default Art