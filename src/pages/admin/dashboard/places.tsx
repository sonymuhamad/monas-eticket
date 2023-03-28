
import LayoutAdmin from "@/components/components/admin/layout"
import { NextPageWithLayout } from "../../_app"

const AdminPlaces: NextPageWithLayout = () => {

    return (
        <>
            <h1>Hello World from Admin Places</h1>
        </>
    )

}

AdminPlaces.getLayout = (placesPage) => {
    return (
        <LayoutAdmin>
            {placesPage}
        </LayoutAdmin>
    )
}

export default AdminPlaces