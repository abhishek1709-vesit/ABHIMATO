import { assets } from "../assets/admin_assets/assets"

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-[8px] px-[4%]">
      <img src={assets.logo} alt="Logo" loading="lazy" className="max-w-[80px]]" />
      <img src={assets.profile_image} alt="Profile image" className="w-[40px]" />
    </nav>
  )
}