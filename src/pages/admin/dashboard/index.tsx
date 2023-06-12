import LayoutAdmin from "@/components/components/admin/layout";
import { NextPageWithLayout } from "../../_app";
import React, { ReactElement, useEffect, useState } from "react";
import { withSessionSsr } from "../../../../lib/config/withSession";
import Admin from "../../../../models/admin";

import { Transaction, sequelize } from "../../../../models/transaction";
import { Line } from "react-chartjs-2";

import { Container } from "@mui/material";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type AdminProps = {
  data: {
    months: number;
    years: number;
    total_transaction: number;
  }[];
};

const DashboardPage: NextPageWithLayout<AdminProps> = (props: AdminProps) => {
  const { data } = props;
  const [labels, setLabels] = useState<string[]>([]);
  const [value, setValue] = useState<number[]>([]);

  useEffect(() => {
    const tempLabels = [];
    const tempValue = [];

    for (const eachData of data) {
      const { months, years, total_transaction } = eachData;
      tempLabels.push(`${MONTHS[months - 1]}-${years}`);
      tempValue.push(total_transaction);
    }

    setLabels(tempLabels);
    setValue(tempValue);
  }, [data]);

  const testData = {
    labels,
    datasets: [
      {
        label: "Monthly Transaction",
        data: value,
      },
    ],
  };

  return (
    <Container maxWidth="xl">
      <Line data={testData} />
    </Container>
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

        const transact = await Transaction.findAll({
          attributes: [
            [sequelize.fn("MONTH", sequelize.col("date")), "months"],
            [sequelize.fn("YEAR", sequelize.col("date")), "years"],
            [sequelize.fn("COUNT", sequelize.col("date")), "total_transaction"],
          ],
          group: [
            sequelize.fn("MONTH", sequelize.col("date")),
            "months",
            "years",
          ],
        });
        const parsedTransact = JSON.stringify(transact);

        return {
          props: {
            data: JSON.parse(parsedTransact),
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
