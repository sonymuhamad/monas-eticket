import HeaderAdmin from "./headerAdmin"
import Footer from "../footer"

interface LayoutAdminProps {
    children: React.ReactElement
}

const LayoutAdmin = (props: LayoutAdminProps) => {

    return (
        <>
            <HeaderAdmin />

            {props.children}


            <Footer />

        </>
    )

}

export default LayoutAdmin