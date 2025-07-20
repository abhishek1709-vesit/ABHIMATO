import { useState } from "react"
import { assets } from "../assets/admin_assets/assets"
import axios from "axios"

export const Add = () => {
  const url = `https://food-del-backend-jumm.onrender.com`
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name : "",
    description : "",
    price : "",
    category : "Salad",
  })

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    const response = await axios.post(`${url}/api/food/add`, formData)
    if(response.data.success){
      console.log("Success")
      setData({
        name : "",
        description : "",
        price : "",
        category : "Salad",
      })
      setImage(false)
    }else{
      console.log("Error")
    }
  } 

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData((data) => ({...data, [name] : value}))
  }

  return (
    <div className="ml-20 mt-10 text-[#6d6d6d]">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
        <div className="w-40">
          <p className="text-2xl font-semibold">Add Image</p>
          <label htmlFor="image">
            <img src={image? URL.createObjectURL(image) : assets.upload_area} alt="Upload Area" loading="lazy" className="w-full" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-xl font-semibold">Product Name</label>
          <input onChange={onChangeHandler} value={data.name} type="text" id="name" name="name" placeholder="Type Here" className="border-1 p-1 w-100" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="desc"  className="text-xl font-semibold">Product Description</label>
          <textarea onChange={onChangeHandler} value={data.description} name="description" id="desc" rows={"3"} placeholder="Write content here" className="border-1 p-1 w-100"></textarea>
        </div>
        <div className="grid grid-cols-2 items-center">
          <div className="flex flex-col gap-1">
            <label htmlFor="category">Category</label>
            <select onChange={onChangeHandler} value={data.category} name="category" id="category" className="border-2 w-40 h-10 rounded-sm">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwhich">Sandwhich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="price">Add Price</label>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="Enter Price" id="price" required className="w-40 h-9 rounded-sm border-1 px-1" />
          </div>
        </div>
        <button type="submit" className="border-1 w-30 hover:bg-black hover:text-white transition-all duration-300 rounded-sm mt-2">Add</button>
      </form>
    </div>
  )
}

