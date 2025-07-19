import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Cart } from './pages/Cart'
import { PlaceOrder } from './pages/PlaceOrder'
import { AppLayout } from './components/AppLayout'
import { Verify } from './pages/Verify'
import { MyOrders } from './pages/MyOrders'
import { Menu } from './pages/Menu'

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    // errorElement : <ErrorPage/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path:"/order",
        element: <PlaceOrder/>
      },
      {
        path: "/verify",
        element:<Verify/>
      },
      {
        path:"/myorders",
        element:<MyOrders/>
      },
      {
        path:"/menu",
        element:<Menu/>
      }
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
