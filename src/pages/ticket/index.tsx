import Link from "next/link"

const TicketPage = () => {

    return (
        <>
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