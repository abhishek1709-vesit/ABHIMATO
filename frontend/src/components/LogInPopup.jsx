import { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios"

export const LogInPopup = () => {
  const [curState, setCurState] = useState("Sign Up");
  const { setShowLogin, url, token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name : "",
    email: "",
    password : ""
  })

  const onChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({...data, [name] : value}))
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    let newUrl = url
    if(curState === "Log In"){
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }
    
    const response = await axios.post(newUrl, data)
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setShowLogin(false)
      alert("Success")
    }else {
      alert(response.data.message)
    }
  }

  return (
    <div className="small-text-style fixed inset-0 bg-[#00000090] flex justify-center items-center z-50">
      <form className="bg-white p-5 rounded-lg flex flex-col gap-4 items-center w-80" onSubmit={handleFormSubmit}>
        <div className="flex justify-between w-full items-center">
          <p className="text-xl text-style font-semibold">{curState}</p>
          <img
            src={assets.cross_icon}
            alt="Close Button"
            loading="lazy"
            onClick={() => setShowLogin(false)}
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        {curState === "Log In" ? null : (
          <div className="flex flex-col w-full">
            <label htmlFor="username">Username</label>
            <input
              className="border-2 p-2 rounded"
              type="text"
              placeholder="Username"
              id="username"
              required
              name="name"
              onChange={onChange}
              value={data.name}
            />
          </div>
        )}

        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <input
            className="border-2 p-2 rounded"
            type="email"
            placeholder="Email"
            id="email"
            required
            name="email"
            onChange={onChange}
            value={data.email}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="password">Password</label>
          <input
            className="border-2 p-2 rounded"
            type="password"
            placeholder="Password"
            id="password"
            required
            name="password"
            onChange={onChange}
            value={data.password}
          />
        </div>

        <button
          type="submit"
          className="bg-[tomato] font-semibold small-text-style text-white px-4 py-2 rounded w-full"
        >
          {curState === "Sign Up" ? "Create Account" : "Log In"}
        </button>

        {curState === "Log In" ? (
          <p>
            New User?
            <span
              onClick={() => setCurState("Sign Up")}
              className="text-blue-500 cursor-pointer"
            >
              Create Account
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setCurState("Log In")}
              className="text-blue-500 cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};
