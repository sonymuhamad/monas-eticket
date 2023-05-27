import {
  Transaction,
  TransactionProps,
  DetailTransaction,
  DetailTransactionProps,
} from "../../../../models/transaction";

import { CheckCircle, AccessTime, Close, Search } from "@mui/icons-material";

import { withSessionSsr } from "../../../../lib/config/withSession";
import { NextPageWithLayout } from "../../_app";
import LayoutAdmin from "@/components/components/admin/layout";
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  IconButton,
  Chip,
  Pagination,
  Grid,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useState, useMemo } from "react";

import { Ticket, TicketProps } from "../../../../models/ticket";
import { Model, Association, ModelType } from "sequelize";

type AdminTransactionsProps = {
  transaction: (TransactionProps & {
    DetailTransactions: (DetailTransactionProps & { Ticket: TicketProps })[];
  })[];
};

const AdminTransactions: NextPageWithLayout<AdminTransactionsProps> = ({
  transaction,
}: AdminTransactionsProps) => {
  const [query, setQuery] = useState("");

  const filteredTransaction = useMemo(() => {
    const lowerCaseQuery = query.toLowerCase();

    return transaction.filter(({ createdAt, email_customer }) => {
      return (
        new Date(createdAt).toDateString().includes(lowerCaseQuery) ||
        email_customer.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }, [transaction, query]);

  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = filteredTransaction.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(filteredTransaction.length / recordsPerPage);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  console.log(transaction);
  return (
    <>
      <Grid container mb={4} maxWidth={"sm"} spacing={2}>
        <Grid item xs>
          <TextField
            onChange={(e) => setQuery(e.target.value)}
            label="Search"
            variant="filled"
            id="search-input"
            fullWidth
            size="small"
            aria-label="search-input-reviews"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Email Customer</TableCell>
              <TableCell>Email Status</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((transact, index) => {
              const {
                id_transaction,
                DetailTransactions,
                date,
                createdAt,
                email_customer,
                email_verified,
                payment_valid,
              } = transact;
              const totalPrice = DetailTransactions.reduce((prev, current) => {
                if (current.actual_price) {
                  return prev + current.actual_price;
                }
                return prev;
              }, 0);
              return (
                <TableRow
                  key={id_transaction}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="td">{index + 1}</TableCell>
                  <TableCell component="td">
                    {new Date(createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell component="td" scope="row">
                    {email_customer}
                  </TableCell>
                  <TableCell component="td" scope="row">
                    {new Date().getTime() - new Date(createdAt).getTime() >
                      60 * 60 * 1000 && !email_verified ? (
                      <Chip
                        variant="outlined"
                        label="Invalid"
                        color="error"
                        icon={<Close />}
                      />
                    ) : email_verified ? (
                      <Chip
                        variant="outlined"
                        label="Valid"
                        color="success"
                        icon={<CheckCircle />}
                      />
                    ) : (
                      <Chip
                        variant="outlined"
                        label="Pending"
                        color="warning"
                        icon={<AccessTime />}
                      />
                    )}
                  </TableCell>

                  <TableCell component="td" scope="row">
                    {new Date().getTime() - new Date(createdAt).getTime() >
                      60 * 60 * 1000 && !payment_valid ? (
                      <Chip
                        label="Failed"
                        variant="outlined"
                        color="error"
                        icon={<Close />}
                      />
                    ) : payment_valid ? (
                      <Chip
                        variant="outlined"
                        label="Success"
                        color="success"
                        icon={<CheckCircle />}
                      />
                    ) : (
                      <Chip
                        variant="outlined"
                        label="Pending"
                        color="warning"
                        icon={<AccessTime />}
                      />
                    )}
                  </TableCell>
                  <TableCell component="td" scope="row">
                    {!Number.isNaN(parseFloat(String(totalPrice)))
                      ? `Rp ${String(totalPrice)}`.replace(
                          /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                          ","
                        )
                      : "Rp "}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={nPages}
        page={currentPage}
        onChange={handleChangePage}
      />
    </>
  );
};

AdminTransactions.getLayout = (transacPage) => {
  return <LayoutAdmin>{transacPage}</LayoutAdmin>;
};

export default AdminTransactions;

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const adminId = req.session.adminId;

    if (!adminId) {
      return {
        notFound: true,
      };
    }

    const objTransaction = await Transaction.findAll({
      include: {
        model: DetailTransaction,
        nested: true,
      },
      order: [["createdAt", "DESC"]],
    });

    const transaction = JSON.stringify(objTransaction);

    return {
      props: {
        transaction: JSON.parse(transaction),
      },
    };
  }
);
