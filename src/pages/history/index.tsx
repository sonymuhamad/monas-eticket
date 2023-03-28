import Head from "next/head"
import { Layout } from "@/components/components"
import { NextPageWithLayout } from "../_app"
import { ReactElement } from "react"

const HistoryPage: NextPageWithLayout = () => {

    return (
        <>
            <Head>
                <title>
                    Monas | History
                </title>
            </Head>

            <h1>
                Hello world From sejarah page
            </h1>

        </>
    )
}

HistoryPage.getLayout = (historyPage: ReactElement) => {

    return (
        <Layout>
            {historyPage}
        </Layout>
    )
}


export default HistoryPage