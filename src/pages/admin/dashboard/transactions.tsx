
import { NextPageWithLayout } from "../../_app"
import LayoutAdmin from "@/components/components/admin/layout"

const AdminTransactions: NextPageWithLayout = () => {

    return (
        <>

            <h1>Hello World from Admin Transactions</h1>

        </>
    )
}

AdminTransactions.getLayout = (transacPage) => {

    return (
        <LayoutAdmin>
            {transacPage}
        </LayoutAdmin>
    )
}

export default AdminTransactions