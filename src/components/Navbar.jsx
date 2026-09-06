import { Link } from "react-router-dom"
import cartimg from "../assets/cart.png"
import { useNavigate } from "react-router-dom"

const Navbar = ({cartcount,setcartcount}) => {
    const navigate = useNavigate()
    return (
        <nav className='flex justify-between p-3 sticky top-0 bg-white w-full z-40'>
            <ul className='flex gap-5 md:gap-10 *:cursor-pointer *:hover:text-slate-400 *:transition-all *:duration-300 *:font-light'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
                <li><Link to='/products'>Products</Link></li>
                <li><Link to='/about'>About</Link></li>
            </ul>
            <div onClick={()=>{navigate('/user/cart')}} className='relative'>
                <img className="w-8 h-8 cursor-pointer" src={cartimg} alt="" />
                <h1 className="absolute right-0 bottom-0 text-red-500 font-bold cursor-pointer translate-x-1">{cartcount}</h1>
            </div>
        </nav>
    )
}


export default Navbar