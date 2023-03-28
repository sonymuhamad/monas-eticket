import { Box, Toolbar, List, Typography, Divider, Container, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useState } from "react"

import { IconButton } from "@mui/material"
import { Menu, Dashboard, ChevronLeft, Logout, Receipt, Paid, Festival, Comment } from "@mui/icons-material"
import Link from "next/link"

import Footer from "../footer"
import CustomAppBar from "./custom_bar"
import CustomDrawer from "./custom_drawer"

interface LayoutAdminProps {
    children: React.ReactElement
}



const mainListItems = (
    <>
        <ListItemButton
            LinkComponent={Link}
            href={'/admin/dashboard'}
        >
            <ListItemIcon>
                <Dashboard />
            </ListItemIcon>

            <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
            LinkComponent={Link}
            href={'/admin/dashboard/transactions'}
        >
            <ListItemIcon>
                <Paid />
            </ListItemIcon>

            <ListItemText primary="Transactions" />
        </ListItemButton>

        <ListItemButton
            LinkComponent={Link}
            href={'/admin/dashboard/places'}
        >
            <ListItemIcon>
                <Festival />
            </ListItemIcon>

            <ListItemText primary="Wisata" />

        </ListItemButton>

        <ListItemButton
            LinkComponent={Link}
            href={'/admin/dashboard/tickets'}
        >
            <ListItemIcon>
                <Receipt />
            </ListItemIcon>

            <ListItemText primary="Tiket" />
        </ListItemButton>

        <ListItemButton
            LinkComponent={Link}
            href={'/admin/dashboard/reviews'}
        >
            <ListItemIcon>
                <Comment />
            </ListItemIcon>

            <ListItemText primary="Review" />

        </ListItemButton>

    </>
);

const LayoutAdmin = (props: LayoutAdminProps) => {

    const [open, setOpen] = useState(true)
    const toogleDrawer = () => {
        setOpen(prev => !prev)
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
                            <Menu />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
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
                        {mainListItems}
                        <Divider sx={{ my: 1 }} />

                        <ListItemButton>
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

                        <Footer />

                    </Container>

                </Box>
            </Box>

        </>
    )

}

export default LayoutAdmin