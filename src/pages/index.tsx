import Loading from "../components/loading"
import { ReactElement, Suspense } from "react"
import { Welcome, History, Art, Review } from "../components"
import { Layout } from "../components"
import { NextPageWithLayout } from "./_app"

const HomePage: NextPageWithLayout = () => {

  return (
    <>

      <Suspense fallback={<Loading />} >

        <Welcome />
        <History />
        <Art />
        <Review />

      </Suspense>
    </>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {

  return (
    <Layout>
      {page}
    </Layout>
  )

}

export default HomePage