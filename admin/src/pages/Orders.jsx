import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"

export const Orders = () => {
  const [orders, setOrders] = useState([])
  const url = `https://food-del-backend-jumm.onrender.com`

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list")
    if(response.data.success){
      setOrders(response.data.data)
    } else{
      alert("Error fetching orders")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url+"/api/order/status", {orderId, status:event.target.value})
    if(response.data.success){
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])
  return (
    <div className="w-screen">
      {
        orders.map((curOrder, index) => {
          return (
            <div key={index} className="grid grid-rows-3 md:grid-rows-1 md:grid-cols-6 mt-5 border-1 mx-5 items-center p-2">
              <p>{curOrder.address.name}</p>
              <p className="w-40">{curOrder.items.map((item, index) => {
                if(index === curOrder.items.length - 1){
                  return item.name + " X " + item.quantity
                }else{
                  return item.name + " X " + item.quantity + ", "
                }
              })}</p>
              <p className="w-fit">₹ {curOrder.amount}</p>
              <p className=" w-40">Address :- <span>{curOrder.address.building_name}, {curOrder.address.street}, {curOrder.address.area}, {curOrder.address.city}, {curOrder.address.state}, {curOrder.address.pincode}</span></p>
              <p>{curOrder.address.phone_number}</p>
              <select className="border-2 w-40" onChange={(event) => statusHandler(event, curOrder._id)} value={curOrder.status}> 
                <option value="Food Proccessing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )
        })
      }
    </div>
  )
}
