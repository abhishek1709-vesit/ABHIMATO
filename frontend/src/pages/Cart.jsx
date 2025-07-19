import { useContext } from "react"
import { StoreContext } from "../context/StoreContext"
import { NavLink } from "react-router-dom"

export const Cart = () => {
  const {cartItems, food_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext)

  return (
      <div className="p-2 pt-30 small-text-style">
        <div className="grid grid-cols-6 gap-5 text-center">
          <p>Item</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <div>
          {
            food_list.map((curFood, index) => {
              if(cartItems[curFood._id] > 0){
                return (
                    <div key={index} className="mt-10 grid grid-cols-6 text-center items-center border-[1px] border-slate-800 rounded-xl p-1">
                      <img src={url+"/images/"+curFood.image} alt="Food Image" loading="lazy" className="w-15 h-15 md:w-40 md:h-30 rounded-l-xl" />
                      <p>{curFood.name}</p>
                      <p>₹ {curFood.price}</p>
                      <p>{cartItems[curFood._id]}</p>
                      <p className="ml-2">₹ {curFood.price*cartItems[curFood._id]}</p>
                      <p onClick={() => removeFromCart(curFood._id)} className="cursor-pointer">X</p>
                    </div>
                )
              }
            })
          }
        </div>

        <div className="flex flex-col md:flex-row gap-5 justify-around mt-5">
          <div className="md:w-[30vw] small-text-style">
            <p className="text-style font-bold text-2xl">Cart Totals</p>
            <div className="mt-1.5 flex flex-col gap-4 border-[1px] rounded-xl px-5 py-2">
              <div className="flex justify-between border-b-[1px] ">
                <p>Sub total</p>
                <p className="font-bold">₹ {getTotalCartAmount()}</p>
              </div>
              <div className="flex justify-between border-b-[1px] ">
                <p>Delivery Fee</p>
                <p className="font-bold">₹ {getTotalCartAmount() === 0 ? "0" : "20"}</p>
              </div>
              <div className="flex justify-between border-b-[1px] ">
                <p>Total</p>
                <p className="font-bold">₹ {getTotalCartAmount() !== 0 ? getTotalCartAmount()+20 : "0"}</p>
              </div>
              <NavLink to={"/order"} className={"flex justify-center"}>
                <button className="bg-[tomato] text-white font-semibold rounded-sm w-[60vw] md:w-[15vw] py-1.5 cursor-pointer">Proceed to checkout</button>
              </NavLink>
            </div>
          </div>
          <div>
            <p className="text-[#555]">Have a promo code? Apply here</p>
            <div  className="flex flex-col">
              <input type="text" placeholder="Promo Code" className="border-2 rounded-sm mt-2 pl-2"/>
              <button type="submit" className="bg-[tomato] text-white px-2 py-1 rounded-xl mt-3 cursor-pointer">Submit</button>
            </div>
          </div>
        </div>
      </div>
  )
}

