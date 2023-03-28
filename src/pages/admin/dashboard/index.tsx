import LayoutAdmin from "@/components/components/admin/layout"
import { NextPageWithLayout } from "../../_app"
import React, { ReactElement } from "react"

const DashboardPage: NextPageWithLayout = () => {

    return (
        <>
            <h1>Hello From Dashboard Admin</h1>
        </>
    )
}

DashboardPage.getLayout = (dashboardPage: ReactElement) => (
    <LayoutAdmin>
        {dashboardPage}
    </LayoutAdmin>
)

export default DashboardPage