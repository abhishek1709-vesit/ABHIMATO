import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../context/StoreContext"
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"

export const PlaceOrder = () => {
    const {cartItems, food_list, removeFromCart, getTotalCartAmount, url, token} = useContext(StoreContext)

    const [data, setData] = useState({
      name:"",
      email: "",
      building_name:"",
      street:"",
      area:"",
      city: "",
      state:"",
      pincode:"",
      phone_number: ""
    })
  
    const onChangeHandler = (event) => {
      const name = event.target.name
      const value = event.target.value

      setData((prev) => ({...prev, [name] : value}))
    }

    const placeOrder = async (event) => {
      event.preventDefault()
      let orderItems = []
      food_list.map((curItem) => {
        if(cartItems[curItem._id] > 0){
          let itemInfo = curItem
          itemInfo["quantity"] = cartItems[curItem._id]
          orderItems.push(itemInfo)
        }
      })
      let orderData = {
        address : data,
        items: orderItems,
        amount:getTotalCartAmount() + 20
      }
      let response = await axios.post(url+"/api/order/place", orderData, {headers: {token}})
      console.log(response)
      if(response.data.success){
        const {session_url} = response.data
        window.location.replace(session_url)
      } else{
        alert("Error placing order")
      }
    }

    const navigate = useNavigate()
    useEffect(() => {
      if(!token){
        navigate("/cart")
      }else  if(getTotalCartAmount() === 0){
        navigate("/cart")
      }
    }, [token])

  return (
    <div className="flex flex-col items-center md:flex-row md:gap-20 md:justify-around pt-20">
    
    <form onSubmit={placeOrder} className="small-text-style flex gap-5 flex-col items-center my-12 p-3">
        <p className="text-3xl text-style">Delivery Information</p>
        <div className="w-full flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input required name="name" value={data.name} onChange={onChangeHandler} type="text" placeholder="Enter Your Name" className="border-[1px] border-gray-500 pl-2" id="name"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input required name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email" id="email" className="border-[1px] border-gray-500 pl-2" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 md:gap-y-10 gap-x-5">
          <div className="flex flex-col">
            <label htmlFor="building">Building Name</label>
            <input required name="building_name" value={data.building_name} onChange={onChangeHandler} type="text" className="border-[1px] border-gray-500 w-50 pl-2" placeholder="Building name" id="building"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="street">Street</label>
            <input required name="street" value={data.street} onChange={onChangeHandler} type="text" className="border-[1px] border-gray-500 w-50 pl-2" id="street" placeholder="Street name" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="area">Area</label>
            <input required name="area" value={data.area} onChange={onChangeHandler} type="text" className="border-[1px] border-gray-500 w-50 pl-2" id="area" placeholder="Locality/Area"/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="city">City</label>
            <input required name="city" value={data.city} onChange={onChangeHandler} type="text" className="border-[1px] border-gray-500 w-50 pl-2" id="city" placeholder="City" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="state">State</label>
            <input required name="state" value={data.state} onChange={onChangeHandler} type="text" className="border-[1px] border-gray-500 w-50 pl-2" id="state" placeholder="State" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pincode">Pin Code</label>
            <input required name="pincode" value={data.pincode} onChange={onChangeHandler} type="text" className="border-[1px] border-gray-500 w-50 pl-2" id="pincode" placeholder="Pin Code" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone Number</label>
            <input required name="phone_number" value={data.phone_number} onChange={onChangeHandler} type="number" className="border-[1px] border-gray-500 w-50 pl-2" id="phone" placeholder="Phone Number" />
          </div>
      </div>
      <button className="bg-[tomato] text-white font-semibold rounded-sm min-w-[15vw] px-2 py-1.5 cursor-pointer" type="submit" >Proceed to payment</button>
    </form>
    <div className="flex flex-col">
          <div className="w-[60vw] md:w-[30vw] small-text-style">
            <p className="text-style font-bold text-2xl">Cart Totals</p>
            <div className="mt-1.5 flex flex-col gap-4 border-[1px] rounded-xl px-5 py-2">
              <div className="flex justify-between border-b-[1px] ">
                <p>Sub total</p>
                <p className="font-bold">₹ {getTotalCartAmount()}</p>
              </div>
              <div className="flex justify-between border-b-[1px] ">
                <p>Delivery Fee</p>
                <p className="font-bold">₹ {20}</p>
              </div>
              <div className="flex justify-between border-b-[1px] ">
                <p>Total</p>
                <p className="font-bold">₹ {getTotalCartAmount() + 20}</p>
              </div>
                
            </div>
          </div>
        </div>
    </div>
  )
}

