import React, { useState } from "react";
import Link from "next/link"
import { Container, Avatar, Typography, Box, TextField, Grid } from "@mui/material"
import { LoadingButton } from "@mui/lab";
import { Copyright } from "../footer";
import { useRouter } from "next/router";
import { Login } from "@mui/icons-material";
import { useEmailInput, usePasswordInput } from "@/components/hooks";

interface ErrorType {
    email?: string
    password?: string
}

interface JSONResponse {
    ok?: boolean,
    error?: ErrorType
}

const LoginPage = () => {

    const router = useRouter()
    const { email,
        emailErrorStatus,
        emailErrorText,
        handleChangeEmail,
        handleChangeErrorStatus,
        handleChangeErrorText } = useEmailInput({})

    const {
        password,
        passwordErrorStatus,
        passwordErrorText,
        handleChangeErrorPasswordStatus,
        handleChangePassword,
        handleChangeErrorPasswordText

    } = usePasswordInput()

    const [loadingStatus, setLoadingStatus] = useState(false)


    const handleErrorSubmit = (err: ErrorType) => {
        if (err.password) {
            handleChangeErrorPasswordStatus(true)
            handleChangeErrorPasswordText(err.password)
        } else {
            handleChangeErrorPasswordStatus(false)
            handleChangeErrorPasswordText('')
        }

        if (err.email) {
            handleChangeErrorStatus(true)
            handleChangeErrorText(err.email)
        } else {
            handleChangeErrorStatus(false)
            handleChangeErrorText('')
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

                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

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
