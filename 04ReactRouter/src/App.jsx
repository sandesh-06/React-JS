import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"



function App() {

  return (
    <>
    {/* THIS IS OUR LAYOUT NOW */}
     <Header />
     <Outlet />
     <Footer />
    </>
  )
}

export default App
