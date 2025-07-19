import { NavLink } from "react-router-dom"
import { assets } from "../assets/admin_assets/assets"

export const Sidebar = () => {
  return (
    <div className="w-20 sm:w-60 h-screen border-2 border-[#a9a9a9]">
      <div className="flex flex-col gap-5 pt-10 pl-10">
        <NavLink to={"/add"} className="flex gap-2 items-center border-2 border-r-0 p-1 border-[#a9a9a9]">
            <img src={assets.add_icon} alt="Add icon" loading="lazy" />
            <p className="hidden sm:inline-block">Add Items</p>
        </NavLink>
        <NavLink to={"/list"} className="flex gap-2 items-center border-2 border-r-0 p-1 border-[#a9a9a9]">
            <img src={assets.order_icon} alt="Add icon" loading="lazy" />
            <p className="hidden sm:inline-block">List Items</p>
        </NavLink>
        <NavLink to={"/orders"} className="flex gap-2 items-center border-2 border-r-0 p-1 border-[#a9a9a9]">
            <img src={assets.order_icon} alt="Add icon" loading="lazy" />
            <p className="hidden sm:inline-block">Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

