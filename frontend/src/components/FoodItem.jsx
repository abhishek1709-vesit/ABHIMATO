import { useContext} from "react"
import { assets } from "../assets/frontend_assets/assets"
import { StoreContext } from "../context/StoreContext"

export const FoodItem = ({id, name, description, price, image}) => {
    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext)
    
  return (
    <li className="my-3 mx-1 flex flex-col  w-[85vw] md:w-full">
        <div className="relative"> 
            <img src={url+"/images/"+image} alt={name} loading="lazy" className="rounded-t-xl"/>
            {
                !cartItems[id] ? <img src={assets.add_icon_white} className="w-[35px] absolute bottom-[10px] right-[22px]" loading="lazy" alt="add icon" onClick={() => addToCart(id)}/> : 
                <div className="bg-white p-1 rounded-2xl absolute bottom-[10px] right-[22px] flex gap-2 items-center  font-bold">
                    <img src={assets.remove_icon_red} alt="remove_icon" loading="lazy" onClick={() => removeFromCart(id)} className="cursor-pointer" />
                    <p>{cartItems[id]}</p>
                    <img src={assets.add_icon_green} alt="add_icon" loading="lazy"  onClick={() => addToCart(id)} className="cursor-pointer"/>
                </div>
            }
        </div>
        <div className="p-2">

        <div className="flex items-center gap-10 mt-2">
            <p className="text-style text-xl md:text-2xl font-bold md:font-semibold ml-0">{name}</p>
            <img src={assets.rating_starts} alt="stars_rating" loading="lazy" className="mr-0"/>
        </div>
      <p className="small-text-style">{description}</p>
      <p className="text-[tomato] font-semibold text-xl"> ₹ {price}</p>
        </div>
    </li>
  )
}

