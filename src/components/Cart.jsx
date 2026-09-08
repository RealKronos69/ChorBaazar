import { useState, useEffect } from 'react'
import animatedremove from '../assets/animated_remove.apng'
// import validateimg from '../assets/couponvalidate.apng'
import { useOutletContext } from 'react-router-dom'

const Cart = () => {
    // const [cartcount, setcartcount] = useOutletContext()
    const [cart, setcart] = useState([])
    const [couponcode,setcouponcode] = useState('')
    const [discount,setdiscount] = useState(0)
    
    const fetchcart = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND}/cart`, {
                credentials: 'include'
            })
            const data = await res.json()
            if (res.status === 200) {
                setcart(data.items)
            }
        } catch (e) {
            
        }
    }
    const validatecoupon = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND}/cart/coupon`,{
                method:'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ couponcode })
            })
            const data = await res.json()
            if(res.ok){
                setdiscount(data.valid.couponamount)
            }
        } catch (e) {
            
        }
    }
    const deleteitem = async (ID) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND}/cart`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ _id: ID })
            })
            const data = await res.json()
            if (res.ok) {
                setcart(prevcart =>
                    prevcart.filter(item => item._id !== ID)
                )
            }
            // console.log(data)
        } catch (e) {

        }
    }
    const totalamount = () => cart.reduce((total, item) => { return total + item.price }, 0)
    const deliverycharge = cart.length * 5
    const finalamount = totalamount() + deliverycharge - discount
    const handlecoupon=(e)=>{
        setcouponcode(e.target.value)
    }
    console.log(couponcode)
    // console.log(cart)
    useEffect(()=>{
        const timer = setTimeout(() => {
            console.log('validating coupon')
            validatecoupon()
        }, 900)
        return ()=>clearTimeout(timer)
    },[couponcode])

    useEffect(() => {
        fetchcart()
    }, [])
    return (
        <section className="min-h-screen grid grid-cols-1 md:grid-cols-[70%_30%]">
            <div className='bg-gray-100 p-5'>
                <div className='w-full h-full p-3 rounded-md bg-white'>
                    <div className='flex justify-between p-5 border-b-4 border-slate-200'>
                        <h5 className='text-2xl font-bold'>Shopping Karts</h5>
                        <h1 className='text-lg font-extrabold text-slate-800'>ITEMS {cart.length}</h1>
                    </div>
                    <div className='max-w-150 mt-5 p-5 mx-auto overflow-y-auto max-h-100 *:mt-5 scrollbar-thin scrollbar-track-slate-400 scrollbar-thumb-slate-300'>
                        {cart.length === 0 && <h1 className='font-light text-center text-2xl'>CART IS EMPTY</h1>}
                        {cart?.map((e) => {
                            return (
                                <div key={e.productId} className='flex justify-between items-center bg-gray-50 p-2 rounded-md'>
                                    <div className='overflow-hidden'>
                                        <div className='w-15 h-15 md:w-20 md:h-20 p-2 bg-slate-400 rounded-md mx-auto'>
                                            <img className='object-contain w-full h-full' src={e.image} alt="" />
                                        </div>
                                        <h1 className='text-sm font-light wrap-break-word max-w-30'>{e.name}</h1>
                                        <h1 className='text-xs font-bold text-slate-700 text-center'>#{e.productId}</h1>
                                    </div>
                                    <div className='text-center'>
                                        <h1 className='text-center text-sm font-light'>Amount</h1>
                                        <h1 className='text-lg font-bold'>{e.price}$</h1>
                                    </div>
                                    <img onClick={() => { deleteitem(e._id) }} className=' w-5 h-5 cursor-pointer' src={animatedremove} alt="" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className='bg-slate-800 p-5 h-full'>
                <h5 className='text-center text-2xl mt-5 mb-5 font-bold text-white'>Order Summary</h5>
                <div className='bg-slate-100 w-full h-fit p-4'>
                    <h1 className='text-slate-600 font-bold'>ITEMS {cart.lenght}</h1>
                    <div className='flex justify-between text-sm mt-3'>
                        <h1 className='font-light'>Total Amount</h1>
                        <h1 className='font-bold text-slate-700'>{totalamount()}$</h1>
                    </div>
                    <div className='flex justify-between text-sm mt-2'>
                        <h1 className='font-light'>Delivery Charges</h1>
                        <h1 className='font-bold text-slate-700'>{deliverycharge}$</h1>
                    </div>
                    <div className='flex justify-between text-sm mt-2'>
                        <h1 className='font-light'>Coupon</h1>
                        <h1 className='font-semibold text-red-400'>{discount}$</h1>
                    </div>
                    <div className='flex justify-between text-sm mt-2'>
                        <h1 className='font-light'>Final Amount</h1>
                        <h1 className='font-semibold text-red-400'>{finalamount}$</h1>
                    </div>
                </div>
                <div className=''>
                    <input onChange={handlecoupon} placeholder='coupon code?' className='bg-slate-100 h-10 w-1/2 focus:outline-0 p-3 text-xs font-mono font-bold mt-3' type="text" />
                </div>
                <div className='mt-5 flex gap-5'>
                    <div className='w-40 h-14 bg-blue-300'></div>
                    <div className='w-40 h-14 bg-red-300'></div>
                    <div className='w-40 h-14 bg-yellow-300'></div>

                </div>
                <button className='w-full p-4 bg-slate-950 text-white mt-5 font-light hover:scale-101 transition-all duration-300 cursor-pointer hover:bg-slate-500 hover:text-black'>CheckOut</button>
            </div>
        </section>
    )
}

export default Cart