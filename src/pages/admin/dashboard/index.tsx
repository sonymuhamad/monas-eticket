import LayoutAdmin from "@/components/components/admin/layout";
import { NextPageWithLayout } from "../../_app";
import React, { ReactElement, useState } from "react";
import { withSessionSsr } from "../../../../lib/config/withSession";
import Admin from "../../../../models/admin";

type AdminProps = {
  username?: string;
  email?: string;
};

const DashboardPage: NextPageWithLayout = (props: AdminProps) => {
  return (
    <>
      <h1>Hello From Dashboard Admin</h1>
    </>
  );
};

DashboardPage.getLayout = (dashboardPage: ReactElement) => (
  <LayoutAdmin>{dashboardPage}</LayoutAdmin>
);

export default DashboardPage;

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const loggedAdmin = req.session.adminId;
    if (loggedAdmin) {
      const admin = await Admin.findByPk(loggedAdmin);
      if (admin) {
        const { username, email } = admin;
        return {
          props: {
            username: username,
            email: email,
          },
        };
      } else {
        req.session.destroy();
        return {
          redirect: {
            permanent: true,
            destination: "/admin",
          },
        };
      }
    }

    return {
      notFound: true,
    };
  }
);
