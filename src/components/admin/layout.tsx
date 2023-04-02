import { Box, Toolbar, List, Typography, Divider, Container, ListItemButton, ListItemIcon, ListItemText, } from "@mui/material"
import React, { useState } from "react"

import { IconButton } from "@mui/material"
import { ChevronLeft, Logout, ChevronRight, ManageAccounts } from "@mui/icons-material"
import { useRouter } from "next/router"
import Link from "next/link"
import Footer from "../footer"
import CustomAppBar from "./custom_bar"
import CustomDrawer from "./custom_drawer"
import MainListItems from "./list-item"


interface LayoutAdminProps {
    children: React.ReactElement
}

const LayoutAdmin = (props: LayoutAdminProps) => {

    const router = useRouter()
    const { pathname } = router
    const [open, setOpen] = useState(true)
    const toogleDrawer = () => {
        setOpen(prev => !prev)
    }

    const handleClickLogoutButton = async () => {
        await fetch('/api/admins/logout')
        router.replace({
            pathname: '/admin',
            query: {
                message: 'Logout Success',
                type: 'success'
            }
        })
    }



    return (
        <>
            <Box
                sx={{
                    display: 'flex'
                }}
            >

                <CustomAppBar
                    position="absolute"
                    open={open}
                >

                    <Toolbar
                        sx={{
                            pr: '24px'
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open-drawer"
                            onClick={toogleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' })
                            }}
                        >
                            <ChevronRight />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Admin Dashboard
                        </Typography>
                    </Toolbar>

                </CustomAppBar>

                <CustomDrawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toogleDrawer}>
                            <ChevronLeft />
                        </IconButton>
                    </Toolbar>
                    <Divider />

                    <List component="nav">
                        <MainListItems
                            pathname={pathname}
                        />

                        <Divider sx={{ my: 1 }} />
                        <Link
                            href={'/admin/dashboard/profile'}
                        >
                            <ListItemButton
                                selected={/\/admin\/dashboard\/profile/.test(pathname)}
                            >
                                <ListItemIcon>
                                    <ManageAccounts />
                                </ListItemIcon>

                                <ListItemText primary="Profile" />
                            </ListItemButton>
                        </Link>


                        <ListItemButton
                            onClick={handleClickLogoutButton}
                            sx={{
                                color: '#ff6961'
                            }}
                        >
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>

                    </List>

                </CustomDrawer>

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container
                        maxWidth='lg'
                        sx={{ mt: 4, mb: 4 }}
                    >

                        {props.children}


                    </Container>
                    <Footer />

                </Box>
            </Box>

        </>
    )

}

export default LayoutAdmin