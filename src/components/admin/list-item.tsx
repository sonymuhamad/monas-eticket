import Link from "next/link"
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Dashboard, Paid, Festival, Receipt, Comment } from "@mui/icons-material"
import React from "react"

type Path = {
    pathname: string
}

const MainListItems = ({ pathname }: Path) => {

    return (
        <>
            <Link
                href={'/admin/dashboard'}
            >
                <ListItemButton
                    selected={/\/admin\/dashboard\/*$/.test(pathname)}
                >
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>

                    <ListItemText primary="Dashboard" />
                </ListItemButton>
            </Link>

            <Link
                href={'/admin/dashboard/transactions'}
            >
                <ListItemButton
                    selected={/\/admin\/dashboard\/transactions/.test(pathname)}
                >
                    <ListItemIcon>
                        <Paid />
                    </ListItemIcon>

                    <ListItemText primary="Transactions" />
                </ListItemButton>
            </Link>

            <Link
                href={'/admin/dashboard/places'}>
                <ListItemButton
                    selected={/\/admin\/dashboard\/places/.test(pathname)}
                >

                    <ListItemIcon>
                        <Festival />
                    </ListItemIcon>

                    <ListItemText primary="Wisata" />

                </ListItemButton>
            </Link>

            <Link
                href={'/admin/dashboard/tickets'}
            >
                <ListItemButton
                    selected={/\/admin\/dashboard\/tickets/.test(pathname)}
                >
                    <ListItemIcon>
                        <Receipt />
                    </ListItemIcon>

                    <ListItemText primary="Tiket" />
                </ListItemButton>
            </Link>

            <Link
                href={'/admin/dashboard/reviews'}
            >
                <ListItemButton
                    selected={/\/admin\/dashboard\/reviews/.test(pathname)}
                >
                    <ListItemIcon>
                        <Comment />
                    </ListItemIcon>

                    <ListItemText primary="Review" />

                </ListItemButton>
            </Link>
        </>
    )

}

export default MainListItems