import { useContext } from "react"
import { useState } from "react"
import { StoreContext } from "../context/StoreContext"
import axios from "axios"
import { useEffect } from "react"
import { assets } from "../assets/frontend_assets/assets"

export const MyOrders = () => {

    const[data, setData] = useState([])
    const {url, token} = useContext(StoreContext)

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/user-orders",{}, {headers:{token}})
        setData(response.data.data)
    }

    useEffect(() => {
        if(token){
            fetchOrders()
        }
    }, [token])

    return (
        <div className="pt-20">
            <h2 className="text-2xl font-bold mt-5">Your Order</h2>
            <div>
                <ul className="border-1 rounded-xl p-5 mt-10">
                    {
                        data.map((curOrder, index) => {
                            const {items, amount, address, date, status} = curOrder
                            return(
                                <li key={index} className="grid grid-cols-3 md:grid-cols-6 items-center gap-x-3 gap-y-5 pb-2 border-b-1 p-1">
                                    <img src={assets.parcel_icon} alt="" />
                                    <p>
                                        {
                                            items.map((curItem, index) => {
                                                if(index === items.length-1){
                                                    return curItem.name + "X" +curItem.quantity
                                                } else{
                                                    return curItem.name + "X" +curItem.quantity+ ", "
                                                }
                                            })
                                        }
                                    </p>
                                    <p>₹ {amount}</p>
                                    <p>Items: {items.length}</p>
                                    <p><span>&#x25cf;</span><b>{status}</b></p>
                                    <button className="border-1 rounded-xl px-2 py-1 font-semibold cursor-pointer transition-all duration-200 hover:bg-[tomato] hover:text-white" onClick={fetchOrders}>Track Order</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}