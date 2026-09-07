import { useEffect, useState, useLayoutEffect } from 'react'
import animatedcart from '../assets/animated_cart.apng'
import { useOutletContext, useSearchParams } from 'react-router-dom'

const Overview = () => {
    const [params] = useSearchParams()
    const [cartcount, setcartcount] = useOutletContext()
    const productId = params.get('productId')
    const [product, setproduct] = useState({})
    const fetchoverview = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/products/overview?productId=${productId}`)
        const data = await res.json()
        setproduct(data)
    }
    useEffect(() => {
        fetchoverview()
    }, [])

    const handleaddtocart = async () => {
        if (cartcount === 5) {
            return
        }
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                productId
            })
        })
        const data = await res.json()
        setcartcount(cartcount + 1)
    }
    return (
        <section className="h-[90vh] grid grid-cols-1 lg:grid-cols-2">
            <div className="flex justify-center items-center">
                <div className="w-1/2 h-3/4 bg-slate-100">
                    <img className='w-full h-full object-contain' src={product[0]?.image} alt="" />
                </div>
            </div>
            <div className="p-5">
                <p className="text-lg font-semilight">
                    {/* Oslen Stainless Steel 2 Layer Wall Mounted Bathroom Rack and Shelf Bathroom Storage Racks and Shelves Washroom Basin Double Soap Dish and Tumbler Holder Soap Holder Bathroom Accessories */}
                    {product[0]?.about}
                </p>
                <a href={`/profile?user=${product[0]?.seller}`} className="text-sm text-blue-600 font-light cursor-pointer hover:text-blue-900">Visit Seller Profile</a>
                <h1 className="text-3xl font-bold mt-5">{product[0]?.price}$</h1>
                <h5 className="">category : {product[0]?.category} </h5>
                <button onClick={() => { handleaddtocart() }} className="p-3 pl-7 pr-7 w-fit border font-light mt-10 flex items-center gap-3 hover:scale-101 hover:bg-slate-900 hover:text-white group cursor-pointer transition-all duration-300">Add To Cart<img className='w-5 h-5 group-hover:invert' src={animatedcart} /></button>
            </div>
        </section>
    )
}

export default Overview