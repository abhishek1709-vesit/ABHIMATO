import { menu_list } from "../assets/frontend_assets/assets"
export const  ExploreMenu = ({category, setCategory}) => {
  return (
    <div className="flex flex-col gap-3">
       <p className="text-style text-3xl font-bold">Explore Our Menu</p>
       <p className="small-text-style">Choose from a divrse menu featuring delectable array of dishes</p>
       <div>
            <ul className="flex justify-between items-center gap-5 overflow-x-scroll hide-scrollbar mt-4 h-56">
            {
                menu_list.map((curMenu, index) => {
                    return (
                        <li onClick={() => setCategory(prev => prev===curMenu.menu_name ? "All" : curMenu.menu_name)} key={index} className="flex flex-col flex-shrink-0 items-center w-40 h-48">
                            <img className={`${category === curMenu.menu_name ? "border-2 border-[tomato] p-1 rounded-full transition-all duration-75" : ""} w-full h-full`} src={curMenu.menu_image} alt={curMenu.menu_name} loading="lazy" />
                            <p className="small-text-style mt-2 text-base font-semibold text-[#747474]">{curMenu.menu_name}</p>
                        </li>
                    )
                })
            }
            </ul>
       </div>
    </div>
  )
}

