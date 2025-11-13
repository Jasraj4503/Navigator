
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import Navbar from "./Layout/Navbar.jsx"
import Routing from "./pages/Routing.jsx"
import Footer from "./Layout/Footer.jsx"



const App = () => {
  return (
    <>
        <Router>
          <Navbar/>
          <Routes>
            {
              Routing.map((ele)=>(
                <Route path={ele.path} element={<ele.element/>}/>
              ))
            }
          </Routes>
          <Footer/>
        </Router>
    </>
  )
}

export default App
