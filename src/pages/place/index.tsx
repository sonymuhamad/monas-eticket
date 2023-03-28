import Head from "next/head"
import { Layout } from "@/components/components"
import { NextPageWithLayout } from "../_app"
import { ReactElement } from "react"

const PlacePage: NextPageWithLayout = () => {

    return (
        <>

            <Head>
                <title>
                    Monas | Wisata
                </title>
            </Head>

            <h1>
                Hello World from Wisata Page
            </h1>

        </>
    )
}

PlacePage.getLayout = (placePage: ReactElement) => {

    return (
        <Layout>
            {placePage}
        </Layout>
    )
}

export default PlacePage