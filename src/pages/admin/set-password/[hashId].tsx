import { useRouter } from "next/router"


const SetNewPassword = () => {

    const router = useRouter()
    const { hashId } = router.query

    return (
        <>
            {hashId}
            <h1>Hello from set New Password Page</h1>
        </>
    )
}

export default SetNewPassword
