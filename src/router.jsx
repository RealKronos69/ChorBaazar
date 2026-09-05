import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import App from "./App";
import About from "./components/About"
import Products from "./components/Products";
import Overview from "./components/Overview";
import Cart from "./components/Cart";
import Contact from "./components/Contact";

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
            }
        ]
    },
])

export default router