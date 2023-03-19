import Link from "next/link"
import Head from "next/head"

const TicketPage = () => {

    return (
        <>

            <Head>
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

export default TicketPage