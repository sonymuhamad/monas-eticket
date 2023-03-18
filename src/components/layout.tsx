import Footer from "./footer"
import Header from "./header"
import type { ReactNode } from "react"

interface Props {
    children: ReactNode
}

const Layout = ({ children }: Props) => {

    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )

}

export default Layout