import LayoutAdmin from "@/components/components/admin/layout";
import { NextPageWithLayout } from "../../_app";
import { withSessionSsr } from "../../../../lib/config/withSession";

import React, { useState, useMemo } from "react";
import {
  IconButton,
  Modal,
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  InputAdornment,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Delete, Edit, More, Search } from "@mui/icons-material";
import { TextareaAutosize } from "@mui/material";

import { Ticket, TicketProps } from "../../../../models/ticket";
import Image from "next/image";

interface Props {
  data: TicketProps[];
}

const AdminTickets: NextPageWithLayout<Props> = ({ data }: Props) => {
  const [query, setQuery] = useState("");
  const [ticketList, setTicketList] = useState(data);

  const filteredTicket = useMemo(() => {
    const lowerCaseQuery = query.toLowerCase();
    return ticketList.filter(({ name, price, actual_price, discount }) => {
      const lowerCaseName = name.toLowerCase();
      const lowerCasePrice = String(price).toLowerCase();
      const lowerCaseDiscount = String(discount).toLowerCase();
      const lowerCaseActualPrice = String(actual_price).toLowerCase();

      return (
        lowerCaseName.includes(lowerCaseQuery) ||
        lowerCasePrice.includes(lowerCaseQuery) ||
        lowerCaseActualPrice.includes(lowerCaseQuery) ||
        lowerCaseDiscount.includes(lowerCaseQuery)
      );
    });
  }, [query, ticketList]);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const [nameEditTicket, setNameEditTicket] = useState("");
  const [discountEditTicket, setDiscountEditTicket] = useState<string | number>(
    ""
  );
  const [priceEditTicket, setPriceEditTicket] = useState<string | number>("");
  const [termsEditTicket, setTermsEditTicket] = useState("");
  const [howToUseEditTicket, setHowToUseEditTicket] = useState("");
  const [idEditTicket, setIdEditTicket] = useState<null | number>(null);
  const [imageEditTicket, setImageEditTicket] = useState<File | null>(null);
  const [imageEditUrl, setImageEditUrl] = useState<string | undefined>(
    undefined
  );
  const [createImageEditUrl, setCreateImageEditUrl] = useState<
    string | undefined
  >(undefined);

  const [descriptionEditTicket, setDescriptionEditTicket] = useState<
    string | undefined
  >("");

  const [wilBeDeletedTicket, setWilBeDeletedTicket] = useState<number | null>(
    null
  );

  const [nameDetailTicket, setNameDetailTicket] = useState("");
  const [discountDetailTicket, setDiscountDetailTicket] = useState<
    string | number
  >("");
  const [priceDetailTicket, setPriceDetailTicket] = useState<string | number>(
    ""
  );
  const [termsDetailTicket, setTermsDetailTicket] = useState("");
  const [howToUseDetailTicket, setHowToUseDetailTicket] = useState("");
  const [actualPriceDetailTicket, setActualPriceDetailTicket] = useState<
    number | string
  >("");
  const [descriptionDetailTicket, setDescriptionDetailTicket] = useState<
    string | undefined
  >("");
  const [imageDetailUrl, setImageDetailUrl] = useState<string | undefined>("");

  const [nameAddTicket, setNameAddTicket] = useState("");
  const [discountAddTicket, setDiscountAddTicket] = useState<string | number>(
    ""
  );
  const [priceAddTicket, setPriceAddTicket] = useState<string | number>("");
  const [termsAddTicket, setTermsAddTicket] = useState("");
  const [howToUseAddTicket, setHowToUseAddTicket] = useState("");
  const [imageAddTicket, setImageAddTicket] = useState<File | null>(null);
  const [createImageAddUrl, setCreateImageAddUrl] = useState<
    string | undefined
  >(undefined);
  const [descriptionAddTicket, setDescriptionAddTicket] = useState("");

  const setTicketAfterInput = (newTicket: TicketProps) => {
    setTicketList((prev) => [...prev, newTicket]);
  };

  const setTicketAfterDelete = (idDeletedTicket: number) => {
    setTicketList((prev) =>
      prev.filter(({ id_ticket }) => id_ticket !== idDeletedTicket)
    );
  };

  const setTicketAfterUpdate = (updatedTicket: TicketProps) => {
    setTicketList((prev) =>
      prev.map((ticket) => {
        if (ticket.id_ticket === updatedTicket.id_ticket) {
          return updatedTicket;
        }
        return ticket;
      })
    );
  };

  const handleClickDetailTicket = (selectedTicket: TicketProps) => {
    setOpenDetailModal(true);
    const {
      name,
      discount,
      price,
      how_to_use,
      terms,
      actual_price,
      description,
      image,
    } = selectedTicket;
    setActualPriceDetailTicket(actual_price);
    setNameDetailTicket(name);
    setDiscountDetailTicket(discount);
    setPriceDetailTicket(price);
    setHowToUseDetailTicket(how_to_use);
    setTermsDetailTicket(terms);
    setDescriptionDetailTicket(description);
    setImageDetailUrl(image);
  };

  const closeDetailTicket = () => {
    setOpenDetailModal(false);
    setActualPriceDetailTicket("");
    setNameDetailTicket("");
    setDiscountDetailTicket("");
    setPriceDetailTicket("");
    setHowToUseDetailTicket("");
    setTermsDetailTicket("");
    setDescriptionDetailTicket("");
    setImageDetailUrl("");
  };

  const handleClickEditTicket = (selectedTicket: TicketProps) => {
    setOpenEditModal(true);
    const {
      name,
      how_to_use,
      terms,
      price,
      discount,
      id_ticket,
      description,
      image,
    } = selectedTicket;
    setIdEditTicket(id_ticket);
    setNameEditTicket(name);
    setHowToUseEditTicket(how_to_use);
    setPriceEditTicket(price);
    setTermsEditTicket(terms);
    setDiscountEditTicket(discount);
    setDescriptionEditTicket(description);
    setImageEditUrl(image);
  };

  const closeEditTicket = () => {
    setOpenEditModal(false);
    setIdEditTicket(null);
    setTermsEditTicket("");
    setNameEditTicket("");
    setHowToUseEditTicket("");
    setPriceEditTicket("");
    setDiscountEditTicket("");
    setDescriptionEditTicket("");
    setImageEditUrl("");
    setCreateImageEditUrl(undefined);
  };

  const handleClickDeleteTicket = (idTicket: number) => {
    setOpenDeleteModal(true);
    setWilBeDeletedTicket(idTicket);
  };

  const closeDeleteTicket = () => {
    setOpenDeleteModal(false);
    setWilBeDeletedTicket(null);
  };

  const closeAddModal = () => {
    setOpenAddModal(false);
    setNameAddTicket("");
    setTermsAddTicket("");
    setPriceAddTicket(0);
    setHowToUseAddTicket("");
    setDiscountAddTicket(0);
    setDescriptionAddTicket("");
    setImageAddTicket(null);
    setCreateImageAddUrl(undefined);
  };

  const handleSubmitAddTicket = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (imageAddTicket) {
      formData.append("image", imageAddTicket);
    }
    formData.append("name", nameAddTicket);
    formData.append("terms", termsAddTicket);
    formData.append("how_to_use", howToUseAddTicket);
    formData.append("price", String(priceAddTicket));
    formData.append("discount", String(discountAddTicket));
    formData.append("description", descriptionAddTicket);

    const res = await fetch(`/api/admins/tickets`, {
      method: "POST",
      body: formData,
    });

    const {
      ok,
      createdTicket,
      errors,
    }: { ok: boolean; createdTicket: TicketProps; errors: [] } =
      await res.json();
    console.log(createdTicket, "Created ticket");
    if (ok) {
      setTicketAfterInput(createdTicket);
      closeAddModal();
    }
  };

  const handleSubmitEditTicket = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageEditTicket) {
      formData.append("image", imageEditTicket);
    }
    formData.append("name", nameEditTicket);
    formData.append("terms", termsEditTicket);
    formData.append("how_to_use", howToUseEditTicket);
    if (priceEditTicket) {
      formData.append("price", String(priceEditTicket));
    }
    if (discountEditTicket) {
      formData.append("discount", String(discountEditTicket));
    }
    if (descriptionEditTicket) {
      formData.append("description", descriptionEditTicket);
    }

    const res = await fetch(`/api/admins/tickets/${idEditTicket}`, {
      method: "PUT",
      body: formData,
    });

    const {
      ok,
      updatedTicket,
      errors,
    }: { ok: boolean; updatedTicket: TicketProps; errors: [] } =
      await res.json();
    if (ok) {
      setTicketAfterUpdate(updatedTicket);
      closeEditTicket();
    }
  };

  const handleDeleteTicket = async () => {
    if (wilBeDeletedTicket) {
      await fetch(`/api/admins/tickets/${wilBeDeletedTicket}`, {
        method: "DELETE",
      });
      setTicketAfterDelete(wilBeDeletedTicket);
      closeDeleteTicket();
    }
  };

  return (
    <>
      <Container
        maxWidth={"xl"}
        sx={{
          minHeight: 500,
        }}
      >
        <Grid container mb={2} maxWidth={"xl"} spacing={2}>
          <Grid item xs>
            <TextField
              onChange={(e) => setQuery(e.target.value)}
              label="Search"
              variant="filled"
              id="search-input"
              fullWidth
              size="small"
              aria-label="search-input-reviews"
              helperText={"Search review by name or comment"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs>
            <Button variant="contained" onClick={() => setOpenAddModal(true)}>
              Add Ticket
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Price&nbsp;(Rp)</TableCell>
                <TableCell align="right">Discount</TableCell>
                <TableCell align="right">Actual Price&nbsp;(Rp)</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTicket.map((row) => {
                const { name, price, discount, actual_price, id_ticket } = row;

                return (
                  <TableRow
                    key={row.id_ticket}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="right">
                      {!Number.isNaN(parseFloat(String(price)))
                        ? `Rp ${String(row.price)}`.replace(
                            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                            ","
                          )
                        : "Rp "}
                    </TableCell>
                    <TableCell align="right">{`${discount} %`}</TableCell>
                    <TableCell align="right">
                      {!Number.isNaN(parseFloat(String(actual_price)))
                        ? `Rp ${String(actual_price)}`.replace(
                            /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                            ","
                          )
                        : "Rp "}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <>
                        <IconButton
                          aria-label="edit"
                          color="info"
                          onClick={() => handleClickEditTicket(row)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleClickDeleteTicket(id_ticket)}
                        >
                          <Delete />
                        </IconButton>
                        <IconButton
                          aria-label="details"
                          color="success"
                          onClick={() => handleClickDetailTicket(row)}
                        >
                          <More />
                        </IconButton>
                      </>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal Edit Ticket */}
        <Modal
          sx={{
            overflow: "auto",
            height: "100%",
            position: "absolute",
          }}
          open={openEditModal}
          onClose={closeEditTicket}
          aria-labelledby="modal-edit-tiket"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "100%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              border: "1px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="modal-title">Edit tiket</h2>
            <Box
              component={"form"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                my: 2,
              }}
              onSubmit={handleSubmitEditTicket}
            >
              <TextField
                fullWidth
                required
                id="name"
                label="Name"
                value={nameEditTicket}
                sx={{
                  mb: 2,
                }}
                onChange={(e) => {
                  setNameEditTicket(e.target.value);
                }}
              />

              <TextField
                sx={{
                  mb: 2,
                }}
                fullWidth
                required
                id="price"
                label="Price"
                type="number"
                value={priceEditTicket}
                onChange={(e) => setPriceEditTicket(Number(e.target.value))}
              />

              <TextField
                sx={{
                  mb: 2,
                }}
                fullWidth
                required
                id="discount"
                label="Discount"
                type="number"
                value={discountEditTicket}
                onChange={(e) => setDiscountEditTicket(Number(e.target.value))}
              />

              <FormControl
                sx={{
                  mb: 2,
                }}
              >
                <FormLabel>Description</FormLabel>

                <TextareaAutosize
                  style={{
                    width: 550,
                    padding: 5,
                  }}
                  id="description"
                  minRows={4}
                  maxRows={15}
                  value={descriptionEditTicket}
                  onChange={(e) => setDescriptionEditTicket(e.target.value)}
                />
              </FormControl>

              <FormControl
                sx={{
                  mb: 2,
                }}
              >
                <FormLabel>Syarat dan ketentuan</FormLabel>

                <TextareaAutosize
                  style={{
                    width: 550,
                    padding: 5,
                  }}
                  id="terms"
                  maxRows={15}
                  minRows={4}
                  value={termsEditTicket}
                  onChange={(e) => setTermsEditTicket(e.target.value)}
                />
              </FormControl>

              <FormControl
                sx={{
                  mb: 2,
                }}
              >
                <FormLabel>Cara penggunaan</FormLabel>
                <TextareaAutosize
                  id="howToUse"
                  maxRows={15}
                  minRows={4}
                  style={{
                    width: 550,
                    padding: 5,
                  }}
                  value={howToUseEditTicket}
                  onChange={(e) => setHowToUseEditTicket(e.target.value)}
                />
              </FormControl>

              <Image
                width={300}
                height={200}
                src={
                  createImageEditUrl
                    ? createImageEditUrl
                    : `/ticket-images/${imageEditUrl}`
                }
                alt="Image-detail-ticket"
              />

              <Button
                variant="text"
                aria-label="edit avatar"
                component="label"
                sx={{
                  my: 5,
                }}
              >
                Upload
                <input
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const image = e.target.files[0];
                      setImageEditTicket(image);
                      setCreateImageEditUrl(URL.createObjectURL(image));
                    }
                  }}
                  hidden
                  accept="image/*"
                  type="file"
                />
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  my: 2,
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
        {/* Modal Edit Ticket */}

        {/* Modal Delete ticket */}
        <Modal
          open={openDeleteModal}
          onClose={closeDeleteTicket}
          aria-labelledby="modal-delete-tiket"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              border: "1px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Grid>
              <Typography align="center" variant="h4" mb={2}>
                Hapus tiket
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  onClick={closeDeleteTicket}
                  variant="contained"
                  color="error"
                >
                  Tidak, jangan hapus
                </Button>

                <Button onClick={handleDeleteTicket} variant="contained">
                  Ya, hapus
                </Button>
              </Box>
            </Grid>
          </Box>
        </Modal>
        {/* Modal Delete ticket */}

        {/* Modal Detail ticket */}
        <Modal
          sx={{
            overflow: "scroll",
            height: "100%",
            position: "absolute",
          }}
          open={openDetailModal}
          onClose={closeDetailTicket}
          aria-labelledby="modal-detail-tiket"
        >
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              border: "1px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="modal-title">Detail tiket</h2>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                my: 2,
              }}
            >
              <TextField
                fullWidth
                required
                id="name"
                label="Name"
                value={nameDetailTicket}
                sx={{
                  mb: 2,
                }}
                inputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                sx={{
                  mb: 2,
                }}
                fullWidth
                required
                id="price"
                label="Price"
                inputProps={{
                  readOnly: true,
                }}
                type="number"
                value={priceDetailTicket}
              />

              <TextField
                sx={{
                  mb: 2,
                }}
                inputProps={{
                  readOnly: true,
                }}
                fullWidth
                required
                id="discount"
                label="Discount"
                type="number"
                value={discountDetailTicket}
              />

              <TextField
                sx={{
                  mb: 2,
                }}
                inputProps={{
                  readOnly: true,
                }}
                fullWidth
                required
                id="actualprice"
                label="Actual Price"
                type="number"
                value={actualPriceDetailTicket}
              />

              <FormControl
                sx={{
                  mb: 2,
                }}
              >
                <FormLabel>Description</FormLabel>
                <TextareaAutosize
                  readOnly={true}
                  id="description"
                  minRows={4}
                  maxRows={15}
                  style={{
                    width: 550,
                    padding: 5,
                  }}
                  value={descriptionDetailTicket}
                />
              </FormControl>

              <FormControl
                sx={{
                  mb: 2,
                }}
              >
                <FormLabel>Syarat dan ketentuan</FormLabel>

                <TextareaAutosize
                  id="terms"
                  style={{
                    width: 550,
                    padding: 5,
                  }}
                  minRows={4}
                  maxRows={15}
                  value={termsDetailTicket}
                  readOnly={true}
                />
              </FormControl>

              <FormControl
                sx={{
                  mb: 2,
                }}
              >
                <FormLabel>Cara penggunaan</FormLabel>
                <TextareaAutosize
                  readOnly={true}
                  id="howToUse"
                  minRows={4}
                  maxRows={15}
                  style={{
                    width: 550,
                    padding: 5,
                  }}
                  value={howToUseDetailTicket}
                />
              </FormControl>

              <Image
                width={300}
                height={200}
                src={`/ticket-images/${imageDetailUrl}`}
                alt="Image-detail-ticket"
              />
            </Box>
          </Box>
        </Modal>
        {/* Modal Detail ticket */}

        {/* Modal Add ticket */}
        <Modal
          open={openAddModal}
          onClose={closeAddModal}
          sx={{
            overflow: "auto",
            height: "100%",
            position: "absolute",
          }}
          aria-labelledby="modal-tambah-tiket"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "100%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              border: "1px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="modal-title">Tambah tiket</h2>
            <Box
              component={"form"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                my: 2,
              }}
              onSubmit={handleSubmitAddTicket}
            >
              <TextField
                fullWidth
                required
                id="name"
                label="Name"
                value={nameAddTicket}
                sx={{
                  mb: 2,
                }}
                onChange={(e) => {
                  setNameAddTicket(e.target.value);
                }}
              />

              <TextField
                fullWidth
                sx={{
                  mb: 2,
                }}
                required
                id="price"
                label="Price"
                type="number"
                value={priceAddTicket}
                onChange={(e) => setPriceAddTicket(Number(e.target.value))}
              />

              <TextField
                sx={{
                  mb: 2,
                }}
                fullWidth
                required
                id="discount"
                label="Discount"
                type="number"
                value={discountAddTicket}
                onChange={(e) => setDiscountAddTicket(Number(e.target.value))}
              />

              <FormControl
                sx={{
                  mb: 2,
                }}
              >
                <FormLabel>Description</FormLabel>

                <TextareaAutosize
                  style={{
                    width: 550,
                    padding: 5,
                  }}
                  id="description"
                  minRows={4}
                  maxRows={15}
                  value={descriptionAddTicket}
                  onChange={(e) => setDescriptionAddTicket(e.target.value)}
                />
              </FormControl>

              <FormControl
                sx={{
                  mb: 2,
                }}
              >
                <FormLabel>Syarat dan ketentuan</FormLabel>

                <TextareaAutosize
                  style={{
                    width: 550,
                    padding: 5,
                  }}
                  id="terms"
                  minRows={4}
                  maxRows={15}
                  value={termsAddTicket}
                  onChange={(e) => setTermsAddTicket(e.target.value)}
                />
              </FormControl>

              <FormControl
                sx={{
                  mb: 2,
                }}
              >
                <FormLabel>Cara penggunaan</FormLabel>
                <TextareaAutosize
                  id="howToUse"
                  maxRows={15}
                  minRows={4}
                  style={{
                    width: 550,
                    padding: 5,
                  }}
                  value={howToUseAddTicket}
                  onChange={(e) => setHowToUseAddTicket(e.target.value)}
                />
              </FormControl>

              {createImageAddUrl && (
                <Image
                  width={300}
                  height={200}
                  src={createImageAddUrl}
                  alt="Ticket-image"
                />
              )}

              <Button
                variant="text"
                aria-label="add-images"
                component="label"
                sx={{
                  my: 5,
                }}
              >
                Upload Image
                <input
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const image = e.target.files[0];
                      setImageAddTicket(image);
                      setCreateImageAddUrl(URL.createObjectURL(image));
                    }
                  }}
                  hidden
                  accept="image/*"
                  type="file"
                />
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  my: 2,
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
        {/* Modal Add ticket */}
      </Container>
    </>
  );
};

AdminTickets.getLayout = (ticketPage) => {
  return <LayoutAdmin>{ticketPage}</LayoutAdmin>;
};

export default AdminTickets;

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    if (req.session.adminId) {
      const ticketList = await Ticket.findAll();
      const jsonTicket = JSON.stringify(ticketList, null, 2);

      return {
        props: {
          data: JSON.parse(jsonTicket),
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  }
);
