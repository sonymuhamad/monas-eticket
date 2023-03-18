import Link from "next/link"

const OrderPage = () => {

    return (
        <>
            <h1>Hello from Order Page</h1>
            <Link
                href={'/'}
            >
                Back to Index Page
            </Link>
        </>
    )
}

export default OrderPage