import LayoutAdmin from "@/components/components/admin/layout"
import { NextPageWithLayout } from "../../_app"
import { withSessionSsr } from "../../../../lib/config/withSession"

import DataTable, { TableColumn } from "react-data-table-component"
import React, { useState, useMemo, Suspense } from "react"
import { IconButton, Skeleton, Table, TableHead, TableRow, TableCell, TableBody, Modal, Box, Typography, Button, Grid, TextField, FormControl, FormLabel, InputAdornment, Container } from "@mui/material"
import { Delete, Edit, More, Search } from "@mui/icons-material"
import { TextareaAutosize } from "@mui/material"

import { Ticket, TicketProps } from "../../../../models/ticket"

import { makeStyles } from "@mui/material"


interface Props {
    data: TicketProps[]
}

function TableSkeleton() {
    return (
        <>
            <Skeleton variant="rectangular" height={40} />
            <Skeleton variant="text" height={20} />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Skeleton variant="text" />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" />
                        </TableCell>
                        <TableCell>
                            <Skeleton variant="text" />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[...Array(4)].map((_, index) => (
                        <TableRow key={index}>
                            {[...Array(7)].map((_, index) => (
                                <TableCell key={index}>
                                    <Skeleton variant="text" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}


const AdminTickets: NextPageWithLayout<Props> = ({ data }: Props) => {

    const [query, setQuery] = useState('')
    const [ticketList, setTicketList] = useState(data)

    const filteredTicket = useMemo(() => {
        const lowerCaseQuery = query.toLowerCase()
        return ticketList.filter(({ name, price, actual_price, discount }) => {
            const lowerCaseName = name.toLowerCase()
            const lowerCasePrice = String(price).toLowerCase()
            const lowerCaseDiscount = String(discount).toLowerCase()
            const lowerCaseActualPrice = String(actual_price).toLowerCase()

            return lowerCaseName.includes(lowerCaseQuery) || lowerCasePrice.includes(lowerCaseQuery) || lowerCaseActualPrice.includes(lowerCaseQuery) || lowerCaseDiscount.includes(lowerCaseQuery)
        })
    }, [query, ticketList])

    const [openAddModal, setOpenAddModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openDetailModal, setOpenDetailModal] = useState(false)

    const [nameEditTicket, setNameEditTicket] = useState('')
    const [discountEditTicket, setDiscountEditTicket] = useState<string | number>('')
    const [priceEditTicket, setPriceEditTicket] = useState<string | number>('')
    const [termsEditTicket, setTermsEditTicket] = useState('')
    const [howToUseEditTicket, setHowToUseEditTicket] = useState('')
    const [idEditTicket, setIdEditTicket] = useState<null | number>(null)

    const [wilBeDeletedTicket, setWilBeDeletedTicket] = useState<number | null>(null)

    const [nameDetailTicket, setNameDetailTicket] = useState('')
    const [discountDetailTicket, setDiscountDetailTicket] = useState<string | number>('')
    const [priceDetailTicket, setPriceDetailTicket] = useState<string | number>('')
    const [termsDetailTicket, setTermsDetailTicket] = useState('')
    const [howToUseDetailTicket, setHowToUseDetailTicket] = useState('')
    const [actualPriceDetailTicket, setActualPriceDetailTicket] = useState<number | string>('')

    const [nameAddTicket, setNameAddTicket] = useState('')
    const [discountAddTicket, setDiscountAddTicket] = useState<string | number>('')
    const [priceAddTicket, setPriceAddTicket] = useState<string | number>('')
    const [termsAddTicket, setTermsAddTicket] = useState('')
    const [howToUseAddTicket, setHowToUseAddTicket] = useState('')

    const setTicketAfterInput = (newTicket: TicketProps) => {
        setTicketList(prev => [...prev, newTicket])
    }

    const setTicketAfterDelete = (idDeletedTicket: number) => {
        setTicketList(prev => prev.filter(({ id_ticket }) => id_ticket !== idDeletedTicket))
    }

    const setTicketAfterUpdate = (updatedTicket: TicketProps) => {
        setTicketList(prev => prev.map((ticket) => {
            if (ticket.id_ticket === updatedTicket.id_ticket) {
                return updatedTicket
            }
            return ticket
        }))
    }

    const handleClickDetailTicket = (selectedTicket: TicketProps) => {
        setOpenDetailModal(true)
        const { name, discount, price, how_to_use, terms, actual_price } = selectedTicket
        setActualPriceDetailTicket(actual_price)
        setNameDetailTicket(name)
        setDiscountDetailTicket(discount)
        setPriceDetailTicket(price)
        setHowToUseDetailTicket(how_to_use)
        setTermsDetailTicket(terms)
    }

    const closeDetailTicket = () => {
        setOpenDetailModal(false)
        setActualPriceDetailTicket('')
        setNameDetailTicket('')
        setDiscountDetailTicket('')
        setPriceDetailTicket('')
        setHowToUseDetailTicket('')
        setTermsDetailTicket('')
    }

    const handleClickEditTicket = (selectedTicket: TicketProps) => {
        setOpenEditModal(true)
        const { name, how_to_use, terms, price, discount, id_ticket } = selectedTicket
        setIdEditTicket(id_ticket)
        setNameEditTicket(name)
        setHowToUseEditTicket(how_to_use)
        setPriceEditTicket(price)
        setTermsEditTicket(terms)
        setDiscountEditTicket(discount)
    }

    const closeEditTicket = () => {
        setOpenEditModal(false)
        setIdEditTicket(null)
        setTermsEditTicket('')
        setNameEditTicket('')
        setHowToUseEditTicket('')
        setPriceEditTicket('')
        setDiscountEditTicket('')
    }

    const handleClickDeleteTicket = (idTicket: number) => {
        setOpenDeleteModal(true)
        setWilBeDeletedTicket(idTicket)
    }

    const closeDeleteTicket = () => {
        setOpenDeleteModal(false)
        setWilBeDeletedTicket(null)
    }

    const closeAddModal = () => {
        setOpenAddModal(false)
        setNameAddTicket('')
        setTermsAddTicket('')
        setPriceAddTicket(0)
        setHowToUseAddTicket('')
        setDiscountAddTicket(0)
    }

    const handleSubmitAddTicket = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const data = {
            terms: termsAddTicket,
            name: nameAddTicket,
            how_to_use: howToUseAddTicket,
            price: priceAddTicket,
            discount: discountAddTicket
        }

        const res = await fetch(`/api/admins/tickets`, {
            method: 'POST',
            body: JSON.stringify(data),
        })

        const createdTicket: TicketProps = await res.json()
        if (createdTicket) {
            setTicketAfterInput(createdTicket)
            closeAddModal()
        }
    }

    const handleSubmitEditTicket = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const data = {
            name: nameEditTicket,
            terms: termsEditTicket,
            how_to_use: howToUseEditTicket,
            price: priceEditTicket,
            discount: discountEditTicket
        }
        const res = await fetch(`/api/admins/tickets/${idEditTicket}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })

        const updatedTicket: TicketProps = await res.json()
        if (updatedTicket) {
            setTicketAfterUpdate(updatedTicket)
            closeEditTicket()
        }
    }

    const handleDeleteTicket = async () => {
        if (wilBeDeletedTicket) {
            await fetch(`/api/admins/tickets/${wilBeDeletedTicket}`, {
                method: 'DELETE',
            })
            setTicketAfterDelete(wilBeDeletedTicket)
            closeDeleteTicket()
        }

    }

    const column: TableColumn<TicketProps>[] = useMemo(() => [
        {
            name: "name",
            sortable: true,
            selector: (row) => row.name
        },
        {
            name: "price",
            selector: (row) => row.price,
            format: (row) =>
                !Number.isNaN(parseFloat(String(row.price)))
                    ? `Rp ${String(row.price)}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                    : 'Rp '
        },
        {
            name: "discount",
            selector: (row) => row.discount,
            format: (row) => `${row.discount} %`
        },
        {
            name: "actual price",
            selector: (row) => row.actual_price,
            format: (row) =>
                !Number.isNaN(parseFloat(String(row.actual_price)))
                    ? `Rp ${String(row.actual_price)}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                    : 'Rp '
        },
        {
            name: "",
            cell: (row: TicketProps) => (
                <><IconButton
                    aria-label="edit"
                    color="info"
                    onClick={() => handleClickEditTicket(row)}
                >
                    <Edit />
                </IconButton>
                    <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleClickDeleteTicket(row.id_ticket)}
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
            )
        }
    ], [])

    return (
        <>

            <Container
                sx={{
                    minHeight: 500
                }}
            >

                <Grid
                    container
                    mb={2}
                    maxWidth={'xl'}
                    spacing={2}
                >
                    <Grid item xs>
                        <TextField
                            onChange={(e) => setQuery(e.target.value)}
                            label="Search"
                            variant="filled"
                            id="search-input"
                            fullWidth
                            size="small"
                            aria-label="search-input-reviews"
                            helperText={'Search review by name or comment'}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start" >
                                        <Search />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid
                        item
                        xs
                    >
                        <Button
                            variant='contained'
                            onClick={() => setOpenAddModal(true)}
                        >
                            Add Ticket
                        </Button>

                    </Grid>

                </Grid>

                <DataTable
                    columns={column}
                    data={filteredTicket}
                />


                {/* Modal Edit Ticket */}
                <Modal
                    sx={{
                        overflow: 'scroll',
                        height: '100%',
                        position: 'absolute',
                        top: '10%',
                    }}
                    open={openEditModal}
                    onClose={closeEditTicket}
                    aria-labelledby="modal-edit-tiket"
                >

                    <Box
                        sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 600,
                            bgcolor: 'background.paper',
                            border: '1px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >

                        <h2 id="modal-title">Edit tiket</h2>
                        <Box
                            component={'form'}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                my: 2
                            }}
                            onSubmit={handleSubmitEditTicket}>

                            <TextField
                                fullWidth
                                required
                                id="name"
                                label="Name"
                                value={nameEditTicket}
                                sx={{
                                    mb: 2
                                }}
                                onChange={e => {
                                    setNameEditTicket(e.target.value)
                                }} />

                            <TextField
                                sx={{
                                    mb: 2
                                }}
                                fullWidth
                                required
                                id="price"
                                label="Price"
                                type="number"
                                value={priceEditTicket}
                                onChange={e => setPriceEditTicket(Number(e.target.value))}
                            />

                            <TextField
                                sx={{
                                    mb: 2
                                }}
                                fullWidth
                                required
                                id="discount"
                                label="Discount"
                                type="number"
                                value={discountEditTicket}
                                onChange={e => setDiscountEditTicket(Number(e.target.value))}
                            />


                            <FormControl
                                sx={{
                                    mb: 2
                                }}
                            >
                                <FormLabel>Syarat dan ketentuan</FormLabel>

                                <TextareaAutosize
                                    style={{
                                        width: 500
                                    }}
                                    id="terms"
                                    minRows={4}
                                    value={termsEditTicket}
                                    onChange={e => setTermsEditTicket(e.target.value)}
                                />
                            </FormControl>

                            <FormControl
                                sx={{
                                    mb: 2
                                }}
                            >
                                <FormLabel>Cara penggunaan</FormLabel>
                                <TextareaAutosize
                                    id="howToUse"
                                    minRows={4}
                                    style={{
                                        width: 500
                                    }}
                                    value={howToUseEditTicket}
                                    onChange={e => setHowToUseEditTicket(e.target.value)}
                                />
                            </FormControl>



                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{
                                    my: 2
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
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 500,
                            bgcolor: 'background.paper',
                            border: '1px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >

                        <Grid>
                            <Typography
                                align="center"
                                variant="h4"
                                mb={2}
                            >
                                Hapus tiket
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-around'
                                }}
                            >

                                <Button
                                    onClick={closeDeleteTicket}
                                    variant="contained"
                                    color="error"
                                >
                                    Tidak, jangan hapus
                                </Button>

                                <Button
                                    onClick={handleDeleteTicket}
                                    variant="contained"
                                >
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
                        overflow: 'scroll',
                        height: '100%',
                        position: 'absolute',
                        top: '10%',
                    }}
                    open={openDetailModal}
                    onClose={closeDetailTicket}
                    aria-labelledby="modal-detail-tiket"
                >

                    <Box
                        sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 600,
                            bgcolor: 'background.paper',
                            border: '1px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >

                        <h2 id="modal-title">Detail tiket</h2>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                my: 2
                            }}>

                            <TextField
                                fullWidth
                                required
                                id="name"
                                label="Name"
                                value={nameDetailTicket}
                                sx={{
                                    mb: 2
                                }}
                                inputProps={{
                                    readOnly: true
                                }}
                            />

                            <TextField
                                sx={{
                                    mb: 2
                                }}
                                fullWidth
                                required
                                id="price"
                                label="Price"
                                inputProps={{
                                    readOnly: true
                                }}
                                type="number"
                                value={priceDetailTicket}

                            />

                            <TextField
                                sx={{
                                    mb: 2,
                                }}
                                inputProps={{
                                    readOnly: true
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
                                    readOnly: true
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
                                <FormLabel>Syarat dan ketentuan</FormLabel>

                                <TextareaAutosize
                                    id="terms"
                                    style={{
                                        width: 500
                                    }}
                                    minRows={4}
                                    value={termsDetailTicket}
                                    readOnly={true}
                                />
                            </FormControl>

                            <FormControl
                                sx={{
                                    mb: 2
                                }}
                            >
                                <FormLabel>Cara penggunaan</FormLabel>
                                <TextareaAutosize
                                    readOnly={true}
                                    id="howToUse"
                                    minRows={4}
                                    style={{
                                        width: 500
                                    }}
                                    value={howToUseDetailTicket}
                                />
                            </FormControl>

                        </Box>

                    </Box>
                </Modal>
                {/* Modal Detail ticket */}


                {/* Modal Add ticket */}
                <Modal
                    open={openAddModal}
                    onClose={closeAddModal}
                    sx={{
                        overflow: 'scroll',
                        height: '100%',
                        position: 'absolute',
                        top: '10%',
                    }}
                    aria-labelledby="modal-tambah-tiket"
                >

                    <Box
                        sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 600,
                            bgcolor: 'background.paper',
                            border: '1px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >

                        <h2 id="modal-title">Tambah tiket</h2>
                        <Box
                            component={'form'}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                my: 2
                            }}
                            onSubmit={handleSubmitAddTicket}>

                            <TextField
                                fullWidth
                                required
                                id="name"
                                label="Name"
                                value={nameAddTicket}
                                sx={{
                                    mb: 2
                                }}
                                onChange={e => {
                                    setNameAddTicket(e.target.value)
                                }} />

                            <TextField
                                fullWidth
                                sx={{
                                    mb: 2
                                }}
                                required
                                id="price"
                                label="Price"
                                type="number"
                                value={priceAddTicket}
                                onChange={e => setPriceAddTicket(Number(e.target.value))}
                            />

                            <TextField
                                sx={{
                                    mb: 2
                                }}
                                fullWidth
                                required
                                id="discount"
                                label="Discount"
                                type="number"
                                value={discountAddTicket}
                                onChange={e => setDiscountAddTicket(Number(e.target.value))}
                            />


                            <FormControl
                                sx={{
                                    mb: 2
                                }}
                            >
                                <FormLabel>Syarat dan ketentuan</FormLabel>

                                <TextareaAutosize
                                    style={{
                                        width: 500
                                    }}
                                    id="terms"
                                    minRows={4}
                                    value={termsAddTicket}
                                    onChange={e => setTermsAddTicket(e.target.value)}
                                />
                            </FormControl>

                            <FormControl
                                sx={{
                                    mb: 2
                                }}
                            >
                                <FormLabel>Cara penggunaan</FormLabel>
                                <TextareaAutosize
                                    id="howToUse"
                                    minRows={4}
                                    style={{
                                        width: 500
                                    }}
                                    value={howToUseAddTicket}
                                    onChange={e => setHowToUseAddTicket(e.target.value)}
                                />
                            </FormControl>



                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{
                                    my: 2
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
    )
}




AdminTickets.getLayout = (ticketPage) => {

    return (
        <LayoutAdmin>

            <Suspense fallback={<TableSkeleton />} >

                {ticketPage}

            </Suspense>

        </LayoutAdmin>
    )
}

export default AdminTickets

export const getServerSideProps = withSessionSsr(

    async function getServerSideProps({ req }) {

        if (req.session.adminId) {

            const ticketList = await Ticket.findAll()
            const jsonTicket = JSON.stringify(ticketList, null, 2)

            return {
                props: {
                    data: JSON.parse(jsonTicket)
                }
            }


        } else {
            return {
                notFound: true
            }
        }


    }
)
