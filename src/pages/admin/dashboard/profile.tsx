import { NextPageWithLayout } from "../../_app";
import LayoutAdmin from "@/components/components/admin/layout";
import React, { ReactElement, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { TextField, Container, Grid, InputAdornment, Box, Divider, Typography, Snackbar, Alert } from "@mui/material";

import Admin from "../../../../models/admin";
import { withSessionSsr } from "../../../../lib/config/withSession";

import { MarkEmailRead, DriveFileRenameOutline, SaveAlt } from "@mui/icons-material";

import { useEmailInput } from "@/components/hooks";

import { AdminPassword, AdminProfile } from "@/components/components/admin/profile";

interface AdminProps {
    emailAdmin?: string
    username?: string
    id?: number
    last_update?: string
}


const ProfilePage: NextPageWithLayout = ({ emailAdmin, username, id, last_update }: AdminProps) => {

    const [variant, setVariant] = useState<'error' | 'info'>('error')
    const [message, setMessage] = useState('')
    const [openNotif, setOpenNotif] = useState(false);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNotif(false);
    };

    return (
        <>

            <Container maxWidth="lg">

                {
                    username && emailAdmin && id ?

                        <AdminProfile
                            setOpenNotif={setOpenNotif}
                            setMessage={setMessage}
                            username={username}
                            emailAdmin={emailAdmin}
                            id={id}
                            last_update={last_update}
                            setVariant={setVariant}
                        />

                        : null
                }
                <Divider
                    variant="middle"
                    sx={{ mt: 3 }}
                />

                {id &&
                    <AdminPassword id={id} />
                }

                <Snackbar open={openNotif} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} variant="filled" severity={variant} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>

            </Container>

        </>
    )
}

ProfilePage.getLayout = (profilePage: ReactElement) => {

    return (
        <LayoutAdmin>
            {profilePage}
        </LayoutAdmin>
    )
}

export default ProfilePage



export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req, res }) {
        const adminId = req.session.adminId
        const admin = await Admin.findByPk(adminId)

        if (!adminId || !admin) {
            return {
                notFound: true,
            }
        }

        const { username, email, id, updated_at } = admin
        return {
            props: {
                username: username,
                emailAdmin: email,
                id: id,
                last_update: updated_at.toString()
            }
        }


    }

)
