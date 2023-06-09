import Head from "next/head";
import LoginPage from "@/components/components/admin/login";
import { withSessionSsr } from "../../../lib/config/withSession";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Snackbar, Alert, AlertTitle } from "@mui/material";

const AdminPage = () => {
  const router = useRouter();
  const [openLogoutAlert, setOpenLogoutAlert] = useState(false);

  useEffect(() => {
    if (router.query.message) {
      setOpenLogoutAlert(true);
    }
  }, [router]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenLogoutAlert(false);
  };

  return (
    <>
      <Head>
        <title>Monas | Admin Page</title>
      </Head>

      <LoginPage />

      <Snackbar
        autoHideDuration={5000}
        open={openLogoutAlert}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          variant="outlined"
          sx={{ width: "100%" }}
        >
          <AlertTitle>{router.query.type}</AlertTitle>
          {router.query.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminPage;

const getServerSideProps = withSessionSsr(async function getServerSideProps({
  req,
}) {
  const adminId = req.session.adminId;

  if (adminId) {
    return {
      redirect: {
        permanent: true,
        destination: "/admin/dashboard",
      },
    };
  }

  return {
    props: {},
  };
});

export { getServerSideProps };
