import LayoutAdmin from "@/components/components/admin/layout"
import { NextPageWithLayout } from "../../_app"




const AdminTickets: NextPageWithLayout = () => {

    return (
        <>
            <h1>Hello World From Admin Ticket</h1>
        </>
    )
}

AdminTickets.getLayout = (ticketPage) => {

    return (
        <LayoutAdmin>
            {ticketPage}
        </LayoutAdmin>
    )
}

export default AdminTickets
