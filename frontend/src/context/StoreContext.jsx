import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({})

    const url = `https://food-del-backend-jumm.onrender.com`

    const [token, setToken] = useState("")

    const[food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        console.log(itemId)
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId] : 1}))
        } else{
            setCartItems((prev) => ({...prev, [itemId] : prev[itemId]+1}))
        }
        if(token) {
            await axios.post(url+"/api/cart/add", {itemId}, {headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId] : prev[itemId] -1}))
        if(token) {
            await axios.post(url+"/api/cart/remove", {itemId}, {headers:{token}})
        }
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get", {}, {headers:{token}})
        setCartItems(response.data.cartData)
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let item_info = food_list.find((product) => product._id === item)
                totalAmount += item_info.price * cartItems[item]
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }

    
    useEffect(() => { 
        async function loadData() {
            await fetchFoodList()
            if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    }, [])
    
    const [showLogin, setShowLogin] = useState(false)
    const contextValue = {
        food_list, cartItems, setCartItems, addToCart, removeFromCart, showLogin, setShowLogin, getTotalCartAmount, url, token, setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
