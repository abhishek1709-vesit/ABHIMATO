import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Sidebar } from "./components/Sidebar"
import { Add } from "./pages/Add"
import { List } from "./pages/List"
import { Orders } from "./pages/Orders"
import { Home } from "./pages/Home"

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="flex">
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/add" element = {<Add/>}></Route>
          <Route path="/list" element = {<List/>}></Route>
          <Route path="/orders" element = {<Orders/>}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App