import React, { useState } from "react"

import { Box, Typography, Modal, Fade, Backdrop, Button, List, ListItemIcon, ListItemText, ListItem, Collapse } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { Send, Circle } from "@mui/icons-material"


type AdminId = {
    id: number
}

const AdminPassword = ({ id }: AdminId) => {

    const [loadingStatus, setLoadingStatus] = useState(false)
    const [open, setOpen] = useState(false)
    const [openCollapse, setOpenCollapse] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleClick = async () => {
        setLoadingStatus(prev => !prev)
        const res = await fetch(`/api/admins/${id}/request-change-password`)
        const { ok } = await res.json()
        if (ok) {
            setOpenCollapse(true)
            setLoadingStatus(prev => !prev)
        }
    }

    return (
        <>
            <Box>
                <Typography
                    variant="h5"
                    gutterBottom
                >
                    Change admin password
                </Typography>

                <Button variant="outlined" onClick={handleOpen}>Request change password</Button>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 1000,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}>

                            <LoadingButton
                                loading={loadingStatus}
                                variant="contained"
                                fullWidth
                                loadingPosition="end"
                                onClick={handleClick}
                                disabled={openCollapse}
                                endIcon={<Send />}>
                                Send
                            </LoadingButton>

                            <Collapse
                                in={openCollapse}
                            >

                                <List
                                    sx={{ mt: 2 }}
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
                                            primary="Klik link reset password"
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
                                            primary="Masukkan password baru anda"
                                            primaryTypographyProps={{
                                                variant: 'body2'
                                            }}
                                        />
                                    </ListItem>

                                </List>
                            </Collapse>

                        </Box>
                    </Fade>
                </Modal>

            </Box>

        </>
    )
}

export default AdminPassword