
import Loading from "../components/loading"
import { Suspense } from "react"

import { Welcome, History, Art, Review } from "../components"

const HomePage = () => {

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

export default HomePage