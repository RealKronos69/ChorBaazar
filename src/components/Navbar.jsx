import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <nav className='flex justify-between p-4 fixed bg-white w-full'>
            <ul className='flex gap-10 *:cursor-pointer'>
                <li><Link to='/'>Home</Link></li>
                <li>Contact</li>
                <li>Products</li>
                <li>About</li>
            </ul>
            <div className='font-bold text-3xl'></div>
        </nav>
    )
}


export default Navbar