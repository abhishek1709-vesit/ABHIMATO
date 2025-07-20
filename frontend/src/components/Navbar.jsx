import { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { IoClose, IoMenuSharp } from "react-icons/io5";
import { StoreContext } from "../context/StoreContext";
import { NavLink, useNavigate } from "react-router-dom"
export const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const [toggleMenu, setToggleMenu] = useState(false)
  const [profile, setProfile] = useState(false)
  const {setShowLogin, token, setToken, getTotalCartAmount} = useContext(StoreContext)
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem("token")
    setToken('')
    navigate("/")
  }
  return (
    <div>
    <nav className="fixed z-50 opacity-90 bg-white w-full small-text-style flex justify-around items-center p-5 shadow-xl">
      <div>
        <NavLink>
        <img src={assets.logo} alt="logo" className="w-28 md:w-full" />
        </NavLink>
      </div>
      <div className="inline-block md:hidden">
        <IoMenuSharp onClick={() => setToggleMenu(!toggleMenu)} className={toggleMenu ? "hidden" : "inline-block text-3xl"}/>
          <IoClose onClick={() => setToggleMenu(!toggleMenu)} className={toggleMenu ? "inline-block text-3xl" : "hidden"}/>
      </div>
      <div className="hidden md:inline-block">
        <ul className="flex gap-4">
          <li onClick={() => setMenu("Home")}
            className={`${
              menu === "Home" ? "text-[#FF4C24] pb-2 border-b-2" : ""
            } cursor-pointer`}
          >
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li
            onClick={() => setMenu("Menu")}
            className={`${
              menu === "Menu" ? "text-[#FF4C24] pb-2 border-b-2" : ""
            } cursor-pointer`}
          > <NavLink to={"/menu"}>Menu</NavLink>
          </li>
          <li
            onClick={() => setMenu("Contact")}
            className={`${
              menu === "Contact" ? "text-[#FF4C24] pb-2 border-b-2" : ""
            } cursor-pointer`}
          >
            Contact Us
          </li>
        </ul>
      </div>
      
      <div className="flex items-center gap-5 mr-4">
        <div>
          <NavLink to={"/cart"}>
            <img
            src={assets.basket_icon}
            alt="Basket Icon"
            loading="lazy"
            className={`w-6 h-5 cursor-pointer ${getTotalCartAmount() === 0 ? "hidden" : "inline-block"}`}
          />
         
          </NavLink>
        </div>
        {
          !token ? 
        <button className="border-[1px]  px-4 py-1  rounded-xl cursor-pointer font-bold hover:bg-[#FF4C24] hover:text-white " onClick={() => setShowLogin(true)}>
          Sign In
        </button> : 
        <div className="relative">
          <img src={assets.profile_icon} alt="Profile Icon" loading="lazy" onClick={() => setProfile(!profile)}/>
          {
            profile && 
          <ul className="absolute right-1 md:right-0 top-10 z-10 w-30 bg-white p-1">
           
            <li className="flex items-center pb-2"> <NavLink to={"/myorders"} className={"flex items-center "}><img src={assets.bag_icon} alt="Bag Icon" /><p className="bg-white">Orders</p></NavLink></li>

            <hr />
            <li onClick={logOut} className="flex items-center pt-2"><img src={assets.logout_icon} alt="Log Out icon" loading="lazy" /><p className="bg-white">Log Out</p></li>
          </ul>
          }
        </div>
        }
      </div>
    </nav>
    <div className={`${toggleMenu ? "inline-block" : "hidden"} mt-2 w-full`}>
        {toggleMenu && <div className="">
          <ul className="flex flex-col pt-20 gap-5 items-center text-center">
            <li className="w-[80vw] "><NavLink to={"/"}>Home</NavLink></li>
            <li className="w-[80vw] "><NavLink to={"/menu"}>Menu</NavLink></li>
            <li className="w-[80vw] ">Download App</li>
            <li className="w-[80vw] ">Contact Us</li>
          </ul>
        </div> }
      </div>
    </div>
  );
};