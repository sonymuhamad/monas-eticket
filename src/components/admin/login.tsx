import { Copyright } from "../footer";
import Link from "next/link"

import {
    Container,
    Avatar,
    Typography,
    Box,
    TextField,
    Button,
    Grid,
} from "@mui/material"
import { LockOutlined } from "@mui/icons-material";



const LoginPage = () => {

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    href={'/admin/forgot-password'}
                                    style={{
                                        color: '#353edc'
                                    }}
                                >
                                    Forgot password?
                                </Link>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright />
            </Container>


        </>
    )

}

export default LoginPage
