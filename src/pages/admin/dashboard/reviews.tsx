
import { NextPageWithLayout } from "../../_app"
import LayoutAdmin from "@/components/components/admin/layout"


const AdminReviews: NextPageWithLayout = () => {

    return (
        <>
            <h1>Hellow from Admin Review</h1>
        </>
    )
}

AdminReviews.getLayout = (reviewPage) => (<LayoutAdmin>{reviewPage}</LayoutAdmin>)



export default AdminReviews
