import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

export const AppLayout = () => {
    return(
        <>
        <Navbar/>
        <div className="w-screen  md:max-w-6xl md:mx-auto">
        <Outlet></Outlet>

        </div>
        <Footer/>
        </>
    )
}