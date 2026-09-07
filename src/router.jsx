import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import App from "./App";
import About from "./components/About"
import Products from "./components/Products";
import Overview from "./components/Overview";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import Login from './components/Login'
import Signup from './components/Signup'
import Post from './components/Post'

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            {
                path:'about',
                element:<About/>
            },
            {
                path:'contact',
                element:<Contact/>
            },
            {
                path:'products',
                element:<Products/>
            },
            {
                path:'overview',
                element:<Overview/>
            },
            {
                path:'user/cart',
                element:<Cart/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'signup',
                element:<Signup/>
            },
            {
                path:'post',
                element:<Post/>
            },
        ]
    },
])

export default router