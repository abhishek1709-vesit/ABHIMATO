import { useEffect, useState } from "react"
import axios from "axios"

export const List = () => {
  const [list, setList] = useState([])
  const url = "http://localhost:4000"
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success){
      setList(response.data.data)
    } else{
      console.log("error")
    }
  }

  const handleRemove = async (foodId) => {
    console.log(foodId);
    const response = axios.post(`${url}/api/food/remove`, {id:foodId})
    await fetchList()
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="w-full p-5 text-center">  
      <div className="grid grid-cols-5 ">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>
    
      <ul className="">
        {
          list.map((curFood) => {
            const {name, image, category, description, price, _id} = curFood
            return (
              <li key={_id} className="grid grid-cols-5 mt-5 items-center border-b-1 pb-1 px-2">
                <img src={`${url}/images/` + image} alt="Food Image" loading="lazy" className="w-30 h-20" />
                <p>{name}</p>
                <p>{category}</p>
                <p>{price}</p>
                <p onClick={() => handleRemove(_id)} className="cursor-pointer">X</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

