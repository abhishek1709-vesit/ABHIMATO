import { useContext } from "react"
import { assets } from "../assets/frontend_assets/assets"
import { StoreContext } from "../context/StoreContext"

export const FoodItem = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

  return (
    <li className="my-3 mx-1 flex flex-col w-[85vw] md:w-full">
      <div className="relative overflow-hidden"> 
        <img
          src={url + "/images/" + image}
          alt={name}
          loading="lazy"
          className="rounded-t-xl w-full"
        />
        {
          !cartItems[id] ? (
            <img
              src={assets.add_icon_white}
              className="w-[28px] md:w-[35px] absolute bottom-[8px] md:bottom-[10px] right-[4px] md:right-[10px] cursor-pointer"
              loading="lazy"
              alt="add icon"
              onClick={() => addToCart(id)}
            />
          ) : (
            <div className="bg-white p-1 rounded-2xl absolute bottom-[8px] md:bottom-[10px] right-[4px] md:right-[10px] flex gap-2 items-center font-bold">
              <img
                src={assets.remove_icon_red}
                alt="remove_icon"
                loading="lazy"
                onClick={() => removeFromCart(id)}
                className="w-[20px] md:w-[25px] cursor-pointer"
              />
              <p>{cartItems[id]}</p>
              <img
                src={assets.add_icon_green}
                alt="add_icon"
                loading="lazy"
                onClick={() => addToCart(id)}
                className="w-[20px] md:w-[25px] cursor-pointer"
              />
            </div>
          )
        }
      </div>

      <div className="p-2">
        <div className="flex items-center justify-between mt-2">
          <p className="text-style text-xl md:text-2xl font-bold md:font-semibold">{name}</p>
          <img
            src={assets.rating_starts}
            alt="stars_rating"
            loading="lazy"
            className="h-4 md:h-5"
          />
        </div>
        <p className="small-text-style">{description}</p>
        <p className="text-[tomato] font-semibold text-xl">₹ {price}</p>
      </div>
    </li>
  )
}
