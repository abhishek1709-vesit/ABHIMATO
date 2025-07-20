import { useContext } from "react"
import { StoreContext } from "../context/StoreContext"
import { FoodItem } from "./FoodItem"

export const FoodDisplay = ({category}) => {

    const {food_list} = useContext(StoreContext)

  return (
    <div className="my-5 flex flex-col items-center">
      <p className="text-style font-semibold mb-2 text-3xl">Top Dishes Near You</p>
      <div>
        <ul className="grid grid-cols-1 gap-x-3 md:grid-cols-3 2xl:grid-cols-4">
            {
                food_list.map((curItem, index) => {
                    if(category==="All" || category===curItem.category){

                        return <FoodItem key={index} id={curItem._id} name = {curItem.name} description = {curItem.description} price={curItem.price} image = {curItem.image} />
                    }
                })
            }
        </ul>
      </div>
    </div>
  )
}

