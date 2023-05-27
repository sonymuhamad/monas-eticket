import Link from "next/link";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, Receipt, Comment, ReceiptLong } from "@mui/icons-material";
import React from "react";

type Path = {
  pathname: string;
};

const MainListItems = ({ pathname }: Path) => {
  return (
    <>
      <Link href={"/admin/dashboard"}>
        <ListItemButton selected={/\/admin\/dashboard\/*$/.test(pathname)}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>

          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
      <Link href={"/admin/dashboard/tickets"}>
        <ListItemButton selected={/\/admin\/dashboard\/tickets/.test(pathname)}>
          <ListItemIcon>
            <Receipt />
          </ListItemIcon>

          <ListItemText primary="Ticket" />
        </ListItemButton>
      </Link>
      <Link href={"/admin/dashboard/transactions"}>
        <ListItemButton
          selected={/\/admin\/dashboard\/transactions/.test(pathname)}
        >
          <ListItemIcon>
            <ReceiptLong />
          </ListItemIcon>

          <ListItemText primary="Transaction" />
        </ListItemButton>
      </Link>

      <Link href={"/admin/dashboard/reviews"}>
        <ListItemButton selected={/\/admin\/dashboard\/reviews/.test(pathname)}>
          <ListItemIcon>
            <Comment />
          </ListItemIcon>

          <ListItemText primary="Review" />
        </ListItemButton>
      </Link>
    </>
  );
};

export default MainListItems;
