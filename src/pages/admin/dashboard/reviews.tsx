import { useState, useMemo } from "react"
import { NextPageWithLayout } from "../../_app"
import LayoutAdmin from "@/components/components/admin/layout"
import { withSessionSsr } from "../../../../lib/config/withSession"

import Review, { ReviewProps } from "../../../../models/review"

import { Box, Paper, Typography, Grid, Badge, Avatar, TextField, InputAdornment, Button, IconButton, Divider, Modal, FormControlLabel, Checkbox, Alert, Snackbar } from "@mui/material"
import { FormatQuote, Search, AddComment, Edit, DeleteForever, SaveAlt, Photo } from "@mui/icons-material"

import { TextareaAutosize } from "@mui/material"
import { LoadingButton } from "@mui/lab"


interface Props {
    data: ReviewProps[]
}

const AdminReviews: NextPageWithLayout<Props> = ({ data }: Props) => {

    const [query, setQuery] = useState('')
    const [reviews, setReviews] = useState(data)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openAddModal, setOpenAddModal] = useState(false)

    const [editableReview, setEditableReview] = useState<ReviewProps | undefined>(undefined)
    // when admin click edit
    // editable review will be filled by review object, and then used in modal.

    const [idEditableReview, setIdEditableReview] = useState<number | undefined>(undefined)
    const [nameEditableReview, setNameEditableReview] = useState<string>('')
    const [textEditableReview, setTextEditableReview] = useState<string>('')
    const [avatarEditableReview, setAvatarEditableReview] = useState<File | null>(null)
    const [shownEditableReview, setShownEditableReview] = useState(false)
    const [createObjectURL, setCreateObjectURL] = useState<string | undefined>(undefined);
    const [loadingEditStatus, setLoadingEditStatus] = useState(false)
    const [avatarEditableUrl, setAvatarEditableUrl] = useState<string | undefined>(undefined)

    const [willBeDeletedReview, setWillBeDeletedReview] = useState<number | undefined>(undefined)

    const [nameAddedReview, setNameAddedReview] = useState<string>('')
    const [textAddedReview, setTextAddedReview] = useState<string>('')
    const [avatarAddedReview, setAvatarAddedReview] = useState<undefined | File>(undefined)
    const [shownAddedReview, setShownAddedReview] = useState(false)
    const [avatarAddedObjectUrl, setAvatarAddedObjectUrl] = useState<string | undefined>(undefined)
    const [loadingCreateStatus, setLoadingCreateStatus] = useState(false)

    const [openNotif, setOpenNotif] = useState(false)
    const [notifMessage, setNotifMessage] = useState("")
    const [severity, setSeverity] = useState<'success' | 'error' | 'info'>('success')

    const filteredReviews = useMemo(() => {
        const lowerCaseQuery = query.toLowerCase()
        return reviews.filter(({ name, text }) => {
            const lowerCaseText = text.toLowerCase()
            const lowerCaseName = name.toLowerCase()
            return lowerCaseText.includes(lowerCaseQuery) || lowerCaseName.includes(lowerCaseQuery)
        })

    }, [query, reviews])


    const handleCloseNotif = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNotif(false);
    };

    const setReviewsAfterEdit = (updatedReview: ReviewProps) => {
        const { id_review } = updatedReview

        setReviews(prev => prev.map(review => {
            if (review.id_review === id_review) {
                return updatedReview
            }
            return review
        }))
    }

    const setReviewsAfterDelete = (idDeletedReview: number) => {
        setReviews(prev => prev.filter(({ id_review }) => id_review !== idDeletedReview))
    }

    const setReviewsAfterCreate = (newReview: ReviewProps) => {
        setReviews(prev => [...prev, newReview])
    }

    const handleClickEditButton = (selectedReview: ReviewProps) => {
        setOpenEditModal(true)
        const { avatar, name, text, shown, id_review } = selectedReview

        setEditableReview(selectedReview)
        setNameEditableReview(name)
        setTextEditableReview(text)
        setShownEditableReview(shown)
        setIdEditableReview(id_review)
        setAvatarEditableUrl(avatar)

    }

    const handleCloseEditModal = () => {
        setOpenEditModal(false)
        setEditableReview(undefined)
        setAvatarEditableReview(null)
        setNameEditableReview('')
        setTextEditableReview('')
        setShownEditableReview(false)
        setIdEditableReview(undefined)
        setCreateObjectURL(undefined)

    }

    const handleSubmitEditReview = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoadingEditStatus(prev => !prev)
        try {
            const data = new FormData()
            if (avatarEditableReview) {
                data.append("avatar", avatarEditableReview)
            }
            if (nameEditableReview) {
                data.append("name", nameEditableReview)
            }
            if (textEditableReview) {
                data.append("text", textEditableReview)
            }
            data.append("shown", JSON.stringify(shownEditableReview))

            const res = await fetch(`/api/admins/reviews/${idEditableReview}`, {
                method: "PUT",
                body: data
            })
            const { ok, updatedData }: { ok: boolean, updatedData: ReviewProps } = await res.json()

            if (ok) {
                setReviewsAfterEdit(updatedData)
                handleCloseEditModal()
            }
            setOpenNotif(true)
            setNotifMessage("Edit review berhasil")
            setSeverity("success")

        } catch (e) {
            console.log(e)
            setOpenNotif(true)
            setNotifMessage("Edit review gagal")
            setSeverity("error")
        } finally {
            setLoadingEditStatus(prev => !prev)
        }

    }

    const handleClickDeleteButton = (idReview: number) => {
        setOpenDeleteModal(true)
        setWillBeDeletedReview(idReview)

    }

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false)
        setWillBeDeletedReview(undefined)

    }

    const handleDeleteReview = async () => {

        try {
            if (willBeDeletedReview) {
                const res = await fetch(`/api/admins/reviews/${willBeDeletedReview}`, {
                    method: "DELETE"
                })
                await res.json()
                setReviewsAfterDelete(willBeDeletedReview)
                handleCloseDeleteModal()
                setOpenNotif(true)
                setSeverity('success')
                setNotifMessage("Hapus review berhasil")
            }

        } catch (e) {
            console.log(e)
            setOpenNotif(true)
            setSeverity('error')
            setNotifMessage("Hapus review gagal")
        }
    }

    const handleClickAddButton = () => {
        setOpenAddModal(true)
    }

    const handleCloseAddModal = () => {
        setOpenAddModal(false)
    }

    const handleSubmitCreateReview = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setLoadingCreateStatus(true)

        const data = new FormData()
        if (avatarAddedReview) {
            data.append("avatar", avatarAddedReview)
        }
        if (nameAddedReview) {
            data.append("name", nameAddedReview)
        }
        if (textAddedReview) {
            data.append("text", textAddedReview)
        }
        data.append("shown", JSON.stringify(shownAddedReview))

        try {
            const res = await fetch(`/api/admins/reviews`, {
                method: "POST",
                body: data
            })

            const { ok, createdReview }: { ok: boolean, createdReview: ReviewProps } = await res.json()
            if (ok) {
                setReviewsAfterCreate(createdReview)
                setNameAddedReview('')
                setTextAddedReview('')
                setShownAddedReview(false)
                handleCloseAddModal()
            }
            setOpenNotif(true)
            setNotifMessage("Tambah review berhasil")
            setSeverity("success")

        } catch (e) {
            console.log(e)
            setOpenNotif(true)
            setNotifMessage("Tambah review gagal")
            setSeverity("error")
        } finally {
            setLoadingCreateStatus(false)
        }

    }


    return (
        <>

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
                        startIcon={<AddComment />}
                        onClick={handleClickAddButton}
                    >
                        Add review
                    </Button>
                </Grid>

            </Grid>

            <Grid
                container
                maxWidth={'xl'}
                spacing={2}
            >
                {filteredReviews.map((review) => {

                    const { id_review, name, text, avatar } = review

                    return (

                        <Grid
                            item
                            md={4}
                            sm={6}
                            xs={12}
                            key={id_review}
                        >

                            <Box
                                component={Paper}
                                elevation={1}

                                sx={{
                                    maxWidth: '650px',
                                    p: 1,
                                }}
                            >
                                <Grid
                                    wrap="nowrap"
                                    display='flex'
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                >
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        badgeContent={<FormatQuote color="info" />}
                                    >
                                        <Avatar
                                            alt='selfie'
                                            src={`/review-images/${avatar}`}
                                            sx={{ width: 56, height: 56 }}
                                        />

                                    </Badge>

                                </Grid>

                                <Typography
                                    align="center"
                                    variant='body2'
                                    sx={{
                                        fontFamily: 'Segoe UI Symbol',
                                        mt: 3
                                    }}
                                >
                                    {text}
                                </Typography>

                                <Typography
                                    align="center"
                                    variant='body2'
                                    fontWeight={750}
                                    sx={{
                                        fontFamily: 'Segoe UI Symbol',
                                        my: 2,
                                        color: '#696969',
                                    }}
                                >
                                    - {name}
                                </Typography>


                                <Divider variant="middle" sx={{ my: 2 }} />

                                <IconButton
                                    aria-label="edit review button"
                                    color="primary"
                                    size='large'
                                    onClick={() => handleClickEditButton(review)}
                                >
                                    <Edit />
                                </IconButton>

                                <IconButton
                                    aria-label="delete review button"
                                    color="error"
                                    size='large'
                                    onClick={() => handleClickDeleteButton(review.id_review)}
                                >
                                    <DeleteForever />
                                </IconButton>
                            </Box>

                        </Grid>

                    )
                }
                )}

                {/* modal Edit Data Review  */}

                <Modal
                    open={openEditModal}
                    onClose={handleCloseEditModal}
                    aria-labelledby="modal-edit-review"
                >
                    <Box sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        {editableReview &&

                            (
                                <Box
                                    component='form'
                                    onSubmit={handleSubmitEditReview}
                                    sx={{
                                        alignItems: 'flex-start'
                                    }}
                                >

                                    <Grid
                                        display='flex'
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                    >
                                        <Badge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            badgeContent={<FormatQuote color="info" />}
                                        >
                                            <Avatar
                                                alt='selfie'
                                                src={createObjectURL ? createObjectURL : `/review-images/${avatarEditableUrl}`}
                                                sx={{ width: 56, height: 56 }}
                                            />

                                        </Badge>


                                        <IconButton
                                            aria-label="edit avatar"
                                            color="primary"
                                            size='large'
                                            component="label"
                                        >
                                            <input
                                                onChange={e => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        const image = e.target.files[0]
                                                        setAvatarEditableReview(image)
                                                        setCreateObjectURL(URL.createObjectURL(image))
                                                    }
                                                }}
                                                hidden accept="image/*" type="file" />
                                            <Edit />
                                        </IconButton>

                                    </Grid>

                                    <Grid
                                        alignItems={'center'}
                                        alignContent={'center'}
                                        container
                                        direction={'column'}
                                    >
                                        <Grid
                                            item
                                            xs
                                        >
                                            <TextField
                                                required
                                                fullWidth
                                                label="Name"
                                                variant="outlined"
                                                value={nameEditableReview}
                                                onChange={e => setNameEditableReview(e.target.value)}
                                            />

                                        </Grid>

                                        <Grid
                                            item
                                            xs
                                        >

                                            <TextareaAutosize
                                                required
                                                aria-label="Review-text"
                                                maxRows={5}
                                                minRows={2}
                                                value={textEditableReview}
                                                onChange={e => setTextEditableReview(e.target.value)}
                                                style={{
                                                    width: 300
                                                }}
                                            />
                                        </Grid>

                                        <Grid
                                            item
                                            xs>
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={shownEditableReview}
                                                    onChange={e => setShownEditableReview(e.target.checked)}
                                                />}
                                                label="Shown" />

                                        </Grid>

                                    </Grid>

                                    <LoadingButton
                                        loading={loadingEditStatus}
                                        loadingPosition="start"
                                        startIcon={<SaveAlt />}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}

                                    >
                                        Save changes
                                    </LoadingButton>

                                </Box>

                            )}

                    </Box>
                </Modal>
                {/* modal Edit Data Review  */}


                {/* modal Delete Data Review */}

                <Modal
                    open={openDeleteModal}
                    onClose={handleCloseDeleteModal}
                    aria-labelledby="modal-delete-review"
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
                                variant="body1"
                                mb={2}
                            >
                                Hapus data review,<br />
                                apakah anda yakin?
                            </Typography>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-around'
                                }}
                            >

                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleCloseDeleteModal}
                                >
                                    Tidak, jangan hapus
                                </Button>

                                <Button
                                    variant="contained"
                                    onClick={handleDeleteReview}
                                >
                                    Ya, hapus
                                </Button>

                            </Box>

                        </Grid>

                    </Box>

                </Modal>

                {/* modal Delete Data Review */}


                {/* modal Add Data Review */}
                <Modal
                    open={openAddModal}
                    onClose={handleCloseAddModal}
                >

                    <Box
                        sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 500,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Box
                            component='form'
                            onSubmit={handleSubmitCreateReview}
                        >

                            <Grid
                                display='flex'
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={<FormatQuote color="info" />}
                                >
                                    <Avatar
                                        alt='selfie'
                                        src={avatarAddedObjectUrl}
                                        sx={{ width: 56, height: 56 }}
                                    />

                                </Badge>


                                <IconButton
                                    aria-label="add avatar"
                                    color="primary"
                                    size='large'
                                    component="label"
                                >
                                    <input
                                        onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                                const image = e.target.files[0]
                                                setAvatarAddedReview(image)
                                                setAvatarAddedObjectUrl(URL.createObjectURL(image))
                                            }
                                        }}
                                        hidden accept="image/*" type="file" />
                                    <Photo />
                                </IconButton>

                            </Grid>

                            <Grid
                                alignItems={'center'}
                                display={'flex'}
                                container
                                direction={'column'}
                                rowSpacing={2}
                            >
                                <Grid
                                    item
                                    xs
                                >

                                    <TextField
                                        required
                                        fullWidth
                                        label="Name"
                                        variant="outlined"
                                        value={nameAddedReview}
                                        onChange={e => setNameAddedReview(e.target.value)}
                                    />

                                </Grid>

                                <Grid
                                    item
                                    xs
                                >

                                    <TextareaAutosize
                                        required
                                        aria-label="Review-text"
                                        maxRows={5}
                                        minRows={2}
                                        value={textAddedReview}
                                        onChange={e => setTextAddedReview(e.target.value)}
                                        style={{
                                            width: 300
                                        }}
                                    />

                                </Grid>

                                <Grid
                                    item
                                    xs
                                >

                                    <FormControlLabel
                                        control={<Checkbox
                                            checked={shownAddedReview}
                                            onChange={e => setShownAddedReview(e.target.checked)}
                                        />}
                                        label="Shown" />

                                </Grid>
                            </Grid>

                            <LoadingButton
                                loading={loadingCreateStatus}
                                loadingPosition="start"
                                startIcon={<SaveAlt />}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}

                            >
                                Save
                            </LoadingButton>
                        </Box>
                    </Box>
                </Modal>
                {/* modal Add Data Review */}

            </Grid>

            <Snackbar open={openNotif} autoHideDuration={4000} onClose={handleCloseNotif}>
                <Alert onClose={handleCloseNotif} severity={severity} sx={{ width: '100%' }}>
                    {notifMessage}
                </Alert>
            </Snackbar>

        </>
    )
}

AdminReviews.getLayout = (reviewPage) => (<LayoutAdmin>{reviewPage}</LayoutAdmin>)



export default AdminReviews


export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }) {
        const adminId = req.session.adminId

        if (!adminId) {
            return {
                notFound: true,
            }
        }

        const reviewList = await Review.findAll()
        const review = JSON.stringify(reviewList, null, 2)

        return {
            props: {
                data: JSON.parse(review)
            }
        }

    }
)
