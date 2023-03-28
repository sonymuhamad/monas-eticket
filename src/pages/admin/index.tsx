import Head from "next/head"
import LoginPage from "@/components/components/admin/login"

const AdminPage = () => {

    return (
        <>
            <Head>
                <title>
                    Monas | Admin Page
                </title>
            </Head>

            <LoginPage />

        </>
    )
}

export default AdminPage