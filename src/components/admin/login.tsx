import React, { useState, Suspense } from "react";
import Link from "next/link"
import { Container, Avatar, Typography, Box, TextField, Grid } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import { Copyright } from "../footer";
import { useRouter } from "next/router";
import { Login } from "@mui/icons-material";

interface ErrorType {
    email?: string
    password?: string
}

interface JSONResponse {
    ok?: boolean,
    error?: ErrorType
}

const LoginPage = () => {

    const regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const router = useRouter()

    const [emailErrorText, setEmailErrorText] = useState('')
    const [passwordErrorText, setPasswordErrorText] = useState('')
    const [emailErrorStatus, setEmailErrorStatus] = useState(false)
    const [passwordErrorStatus, setPasswordErrorSatatus] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loadingStatus, setLoadingStatus] = useState(false)

    const handleErrorEmail = (currentEmail: string) => {

        if (!regx.test(currentEmail) && currentEmail !== '') {
            setEmailErrorStatus(true)
            setEmailErrorText('Invalid Email')
        } else if (currentEmail === '' || regx.test(currentEmail)) {
            setEmailErrorStatus(false)
            setEmailErrorText('')
        }
    }

    const handleErrorPassword = (currentPassword: string) => {

        if (currentPassword.length < 6 && currentPassword !== '') {
            setPasswordErrorSatatus(true)
            setPasswordErrorText('Password tidak kurang dari 6 karakter')
        } else if (currentPassword === '' || !(currentPassword.length < 6)) {
            setPasswordErrorSatatus(false)
            setPasswordErrorText('')
        }

    }

    const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const currentEmail = e.target.value
        handleErrorEmail(currentEmail)
        setEmail(currentEmail)
    }

    const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const currentPassword = e.target.value
        handleErrorPassword(currentPassword)
        setPassword(currentPassword)
    }

    const handleErrorSubmit = (err: ErrorType) => {
        if (err.password) {
            setPasswordErrorSatatus(true)
            setPasswordErrorText(err.password)
        } else {
            setPasswordErrorSatatus(false)
            setPasswordErrorText('')
        }

        if (err.email) {
            setEmailErrorStatus(true)
            setEmailErrorText(err.email)
        } else {
            setEmailErrorStatus(false)
            setEmailErrorText('')
        }

    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }

        setLoadingStatus(prev => !prev)
        const res = await fetch('/api/admins/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).finally(() => {
            setLoadingStatus(prev => !prev)
        })

        const { ok, error }: JSONResponse = await res.json()

        if (error) {
            handleErrorSubmit(error)
        } else if (ok) {
            router.push('/admin/dashboard')
        }

    }


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
                    <Avatar
                        sx={{ m: 1, width: 56, height: 56 }}
                        src="/national-monument-jakarta.png"
                    />

                    <Suspense
                        fallback={<div>...loading</div>}
                    >
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                    </Suspense>


                    <Box
                        component="form"
                        sx={{ mt: 1 }}
                        onSubmit={handleSubmit}
                    >

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={email}
                            onChange={handleChangeEmail}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            error={emailErrorStatus}
                            helperText={emailErrorText}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={password}
                            onChange={handleChangePassword}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            error={passwordErrorStatus}
                            helperText={passwordErrorText}
                        />

                        <LoadingButton
                            loading={loadingStatus}
                            loadingPosition="start"
                            startIcon={<Login />}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </LoadingButton>
                    </Box>


                    <Grid container>
                        <Grid
                            mt={3}
                            item xs>
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

                <Copyright />
            </Container>


        </>
    )

}

export default LoginPage
