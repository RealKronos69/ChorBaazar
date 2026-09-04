import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import App from "./App";
import About from "./components/About"
import Products from "./components/Products";
import Overview from "./components/Overview";

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
                path:'products',
                element:<Products/>
            },
            {
                path:'overview',
                element:<Overview/>
            }
        ]
    },
])

export default router