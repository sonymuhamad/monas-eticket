import { useEmailInput } from "@/components/hooks/useEmailInput"
import { Container, Box, TextField, Alert, Collapse, AlertTitle, IconButton, Avatar, Typography, List, ListItem, ListItemText, ListItemIcon } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import React, { useState } from "react"
import { Close, ForwardToInbox, Circle } from "@mui/icons-material"
import Footer from "@/components/components/footer"

type JSONResponse = {
    ok?: boolean,
    error?: {
        email: string
    }
}

const ForgotPasswordPage = () => {

    const [loadingStatus, setLoadingStatus] = useState(false)
    const [open, setOpen] = useState(false)
    const { email,
        emailErrorStatus,
        emailErrorText,
        handleChangeEmail,
        handleChangeErrorStatus,
        handleChangeErrorText } = useEmailInput({})

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const data = {
            email: email
        }
        setLoadingStatus(true)
        const res = await fetch('/api/admins/forgot-password', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).finally(() => {
            setLoadingStatus(false)
        })

        const { ok, error }: JSONResponse = await res.json()

        if (ok) {
            setOpen(true)
        }
        if (error && error.email) {
            handleChangeErrorText(error.email)
            handleChangeErrorStatus(true)
        }


    }

    return (
        <>
            <Container
                maxWidth='xs'
                component='main'
            >
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar
                        sx={{ m: 1, width: 56, height: 56 }}
                        src="/national-monument-jakarta.png"
                    />

                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>


                    <Collapse
                        in={open}
                    >
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close-alert"
                                    color='inherit'
                                    size='small'
                                    onClick={() => {
                                        setOpen(false)
                                    }}
                                >
                                    <Close fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2, mt: 2 }}
                            severity="info"
                            variant="outlined"
                        >
                            <AlertTitle>
                                Request Success
                            </AlertTitle>
                            <p>
                                Silahkan cek <strong>Email</strong> anda untuk melakukan <strong>Reset Password</strong>
                            </p>
                        </Alert>
                    </Collapse>


                    <Box
                        component='form'
                        sx={{
                            mt: 1,
                            mb: 5
                        }}
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

                        <List
                            dense={true}
                            disablePadding={true}
                        >
                            <ListItem
                                disableGutters
                                disablePadding
                            >
                                <ListItemIcon>
                                    <Circle />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Input Email anda lalu tekan Send Request"
                                    primaryTypographyProps={{
                                        variant: 'body2'
                                    }}
                                />
                            </ListItem>

                            <ListItem
                                disableGutters
                                disablePadding
                            >

                                <ListItemIcon>
                                    <Circle />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Periksa email anda"
                                    secondary="Harap periksa juga di bagian Spam"
                                    primaryTypographyProps={{
                                        variant: 'body2'
                                    }}
                                    secondaryTypographyProps={{
                                        variant: 'caption'
                                    }}
                                />
                            </ListItem>

                            <ListItem
                                disableGutters
                                disablePadding
                            >

                                <ListItemIcon>
                                    <Circle />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Klik link Reset Password"
                                    primaryTypographyProps={{
                                        variant: 'body2'
                                    }}
                                />
                            </ListItem>

                            <ListItem
                                disableGutters
                                disablePadding
                            >

                                <ListItemIcon>
                                    <Circle />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Input password baru anda lalu tekan tombol Save"
                                    primaryTypographyProps={{
                                        variant: 'body2'
                                    }}
                                />
                            </ListItem>

                        </List>

                        <LoadingButton
                            loading={loadingStatus}
                            loadingPosition="start"
                            startIcon={<ForwardToInbox />}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}

                        >
                            Send Request
                        </LoadingButton>

                    </Box>
                </Box>

            </Container>
            <Footer />
        </>
    )
}

export default ForgotPasswordPage