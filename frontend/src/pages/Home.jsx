import { NavLink } from "react-router-dom"
import { assets } from "../assets/frontend_assets/assets"
import { ExploreMenu } from "../components/ExploreMenu"
import { useContext, useState } from "react"
import { FoodDisplay } from "../components/FoodDisplay"
import { LogInPopup } from "../components/LogInPopup"
import { StoreContext } from "../context/StoreContext"

export const Home = () => {
    const [category, setCategory] = useState("All")
    const {showLogin} = useContext(StoreContext)
  return (
    <>
    {
      showLogin ? <LogInPopup /> : ""
    }

    <main className="pt-20 md:pt-25 ">
      <div className="relative ">
        <img src={assets.header_img} alt="Hero Image" loading="lazy" className="w-full h-[30vh] md:h-full opacity-90"/>
        <div className="absolute bottom-12 left-4 sm:left-8 lg:left-12 max-w-xs sm:max-w-md lg:max-w-lg text-white">
          <p className="text-style text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
            Order Your Favourite food here
          </p>
          <p className="hidden sm:inline-block small-text-style text-sm md:text-base mb-2 leading-relaxed">
            Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients
          </p>
          <p className="hidden sm:inline-block small-text-style text-sm md:text-base leading-relaxed">
            Our mission is to satisfy your cravings and elevate your dining experience
          </p>
          <button className="small-text-style  bg-white text-black px-2 py-1 mt-2 rounded-xl font-bold"><a href="#menu">View Menu</a></button>
        </div>
      </div>
      <section className="my-10 ml-2" id="menu">
        <ExploreMenu category={category} setCategory={setCategory}/>
      </section>
      <section>
        <FoodDisplay category={category}/>
      </section>
    </main>
    </>
  )
}