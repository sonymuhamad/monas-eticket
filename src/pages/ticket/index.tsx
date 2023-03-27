import Link from "next/link"
import Head from "next/head"
import { Layout } from "@/components/components"
import { NextPageWithLayout } from "../_app"
import { ReactElement } from "react"

const TicketPage: NextPageWithLayout = () => {

    return (
        <>

            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <title>
                    Monas | E-Ticket

                </title>
            </Head>

            <h1>Hello From Index Ticket</h1>
            <Link
                href={'/ticket/order'}
            >
                To order Page
            </Link>
        </>
    )
}

TicketPage.getLayout = function getLayout(ticketPage: ReactElement) {

    return (
        <Layout>
            {ticketPage}
        </Layout>
    )
}


export default TicketPage