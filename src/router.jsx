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
import Navbar from './components/Navbar'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'overview',
                element: <Overview />
            },
            {
                path: 'user/cart',
                element: <Cart />
            },
            {
                path: 'post',
                element: <Post />
            },
        ],
    },
    {
        path: '/products',
        element: <> <Navbar/> <Products /> </>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
])

export default router