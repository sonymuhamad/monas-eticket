import React, { useState } from "react"
import { useRouter } from "next/router"
const CryptoJS = require('crypto-js')
import { GetServerSideProps } from "next"
import Admin from "../../../../models/admin"
import { Container, Box, TextField, Avatar, Typography } from "@mui/material"

import { LoadingButton } from "@mui/lab"
import { SaveAlt } from "@mui/icons-material"
import { usePasswordInput } from "@/components/hooks"


type AdminProps = {
    email: string
    id: number
}

const SetNewPassword = ({ email, id }: AdminProps) => {
    // this page contain feature to change admin's password, 
    // this page only can be visited within the link that generated by system through email

    const {
        password,
        handleChangeErrorPasswordStatus,
        handleChangePassword,
        passwordErrorStatus,
        passwordErrorText,
        handleChangeErrorPasswordText
    } = usePasswordInput()

    const [loadingStatus, setLoadingStatus] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const data = {
            password: password
        }

        setLoadingStatus(true)
        const res = await fetch(`/api/admins/${id}/set-password`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'PUT',
            body: JSON.stringify(data)
        }).finally(() => {
            setLoadingStatus(false)
        })

        const { ok, error } = await res.json()
        if (ok) {
            router.push('/admin')
        } else if (error) {
            handleChangeErrorPasswordStatus(true)
            handleChangeErrorPasswordText(error.password)
        }

    }

    return (
        <>
            <Container
                maxWidth='xs'
                component={'main'}
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
                        Set New Password
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
                            id="email"
                            label="Email Address"
                            name="email"
                            inputProps={{
                                readOnly: true
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            autoFocus
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
                            startIcon={<SaveAlt />}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save
                        </LoadingButton>
                    </Box>


                </Box>

            </Container>
        </>
    )
}

export default SetNewPassword

export const getServerSideProps: GetServerSideProps = async (context) => {

    const query = context.query

    if (query) {
        const hashId = query.hashId

        if (hashId) {
            const convertedHashId = hashId.toString().replace('xMl3Jk', '+').replace('Por21Ld', '/').replace('Ml32', '=')
            const decrypted = CryptoJS.AES.decrypt(convertedHashId, process.env.CHIPERKEY)
            const originalId = decrypted.toString(CryptoJS.enc.Utf8)
            const admin = await Admin.findByPk(Number(originalId))

            if (admin) {
                return {
                    props: {
                        email: admin.email,
                        id: admin.id
                    }
                }
            }

        }
    }

    return {
        notFound: true
    }
}
