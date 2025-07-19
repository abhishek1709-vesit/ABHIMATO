import { useState } from "react"
import { ExploreMenu } from "../components/ExploreMenu"
import { FoodDisplay } from "../components/FoodDisplay"

export const Menu = () => {
        const [category, setCategory] = useState("All")
    
    return (
        <section className="pt-20">
            <section>
                <ExploreMenu category={category} setCategory={setCategory}/> 
            </section>
            <section>
                <FoodDisplay category={category}/>
            </section>
        </section>
    )
}