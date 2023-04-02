import React, { useState } from "react"
import { TextField, Grid, InputAdornment, Box, Typography } from "@mui/material";
import { MarkEmailRead, DriveFileRenameOutline, SaveAlt, History } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useEmailInput } from "@/components/hooks";
import Admin from "../../../../models/admin";



interface AdminProps {
    emailAdmin: string
    username: string
    id: number
    last_update?: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
    setOpenNotif: React.Dispatch<React.SetStateAction<boolean>>,
    setVariant: React.Dispatch<React.SetStateAction<'error' | 'info'>>
}

const AdminProfile = ({ emailAdmin,
    username,
    id,
    setMessage,
    setOpenNotif,
    last_update,
    setVariant
}: AdminProps) => {

    const {
        email,
        emailErrorStatus,
        emailErrorText,
        handleChangeEmail,
        changeEmail
    } = useEmailInput({ initialValue: emailAdmin })

    const [updatedDate, setUpdatedDate] = useState(last_update)
    const [usernameAdmin, setUsernameAdmin] = useState(username)
    const [usernameErrorStatus, setUsernameErrorStatus] = useState(false)
    const [usernameErrorText, setUsernameErrorText] = useState('')
    const [loadingStatus, setLoadingStatus] = useState(false)


    const handleChangeUsername: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const currentUsername = e.target.value
        if (currentUsername.length < 6 && currentUsername !== '') {
            setUsernameErrorText('Username minimal 6 karakter')
            setUsernameErrorStatus(true)
        } else {
            setUsernameErrorText('')
            setUsernameErrorStatus(false)
        }
        setUsernameAdmin(currentUsername)
    }

    const handleSubmitEditProfile = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const data = {
            username: usernameAdmin,
            email: emailAdmin
        }
        setLoadingStatus(prev => !prev)
        fetch(`/api/admins/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(data)
        })
            .then(res => {
                setLoadingStatus(prev => !prev)
                if (res.status === 200) {
                    res.json().then(data => {
                        const { email, username, updated_at }: Admin = data

                        setUpdatedDate(new Date(updated_at).toString())
                        changeEmail(email)
                        setUsernameAdmin(username)
                        setVariant('info')
                        setMessage('Berhasil mengubah data')
                    })
                } else {
                    res.json().then(response => {
                        const { message } = response
                        throw new Error(message)
                    }).catch(err => {
                        setVariant('error')
                        setMessage(err.message)
                    })
                }
            }).finally(() => {
                setOpenNotif(true)
            })

    }


    return (
        <>


            <Box component='form' onSubmit={handleSubmitEditProfile}>

                <Typography
                    variant="h5"
                    gutterBottom
                >
                    Admin profile
                </Typography>

                <Grid
                    p={2}
                    container
                    direction={'column'}
                    spacing={2}
                >
                    <Grid item xs={4}>
                        <TextField
                            required
                            value={email}
                            onChange={handleChangeEmail}
                            helperText={emailErrorText}
                            error={emailErrorStatus}
                            variant="outlined"
                            id="email-admin"
                            fullWidth
                            label="Email address"
                            aria-label="admin-email-addresses"
                            name="email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <MarkEmailRead />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            required
                            value={usernameAdmin}
                            onChange={handleChangeUsername}
                            helperText={usernameErrorText}
                            error={usernameErrorStatus}
                            variant="outlined"
                            id="username-admin"
                            fullWidth
                            label="Username"
                            aria-label="admin-username"
                            name="username"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <DriveFileRenameOutline />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField
                            required
                            value={updatedDate}
                            variant="outlined"
                            id="last-update"
                            fullWidth
                            label="Last update"
                            name="Last update"
                            InputProps={{
                                readOnly: true,
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <History />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs>
                        <LoadingButton
                            loading={loadingStatus}
                            loadingPosition="start"
                            startIcon={<SaveAlt />}
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={username === usernameAdmin && email === emailAdmin}
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Save
                        </LoadingButton>
                    </Grid>


                </Grid>
            </Box>

        </>
    )
}


export default AdminProfile