import { useContext, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { StoreContext } from "../context/StoreContext"
import axios from "axios"

export const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext)
    const navigate = useNavigate()

    const  verifyPayment = async () => {
        const response = await axios.post(url+ "/api/order/verify", {success, orderId})
        if(response.data.success){
            navigate("/myorders")
        }
        else{
            navigate("/")
            alert("Failed")
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [])

    if(success == false) return <div>Loading...</div>
    return (
    <div className="pt-20">

    </div>

)
}