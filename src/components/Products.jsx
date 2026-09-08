import { useState, useEffect } from "react"

const Products = () => {
    const [products, setproducts] = useState([])
    const [category, setcategory] = useState('')
    const [subcategory, setsubcategory] = useState()

    const fetchproducts = async () => {
        const url = category === "" ? `${import.meta.env.VITE_BACKEND}/products` : `${import.meta.env.VITE_BACKEND}/products?category=${category}`
        const res = await fetch(url)
        const data = await res.json()
        setproducts(data)
    }

    useEffect(() => {
        fetchproducts()
    }, [category])

    const handlechange = (e) => {
        setcategory(e.target.value)
        const fetchcategory = async () => {

        }
    }
    console.log(category)

    return (
        <section className="h-fit">
            <section className="bg-slate-950 p-3">
                <div className="flex gap-5">
                    <select value={category} onChange={handlechange} className="bg-white p-3 pr-5 pl-5 focus:outline-0 border font-light cursor-pointer *:font-light rounded-md">
                        <option value="">All Categories</option>
                        <option value="clothes">Clothes</option>
                        <option value="shoes">Shoes</option>
                        <option value="electronics">Electronics</option>
                        <option value="accessories">Accessories</option>
                        <option value="laptops">Laptops</option>
                        <option value="mobiles">Mobiles</option>
                    </select>
                </div>
                {category === "clothes" && (<div className="transition-all duration-500 mt-3 p-4 border border-white w-fit rounded-md">
                    <h5 className="text-white mb-2">clothes filter</h5>
                    <div className="flex gap-2">
                        <input className="focus:outline-0" type="checkbox" id="men" />
                        <label className="text-white font-light" htmlFor="men">Men</label>
                    </div>
                    <div className="flex gap-2">
                        <input className="focus:outline-0" type="checkbox" id="women" />
                        <label className="text-white font-light" htmlFor="women">Women</label>
                    </div>
                    <div className="flex gap-2">
                        <input className="focus:outline-0" type="checkbox" id="kid" />
                        <label className="text-white font-light" htmlFor="kid">Kid</label>
                    </div>
                </div>)}
            </section>
            <section className="h-fit">
                <h5 className="text-center text-3xl p-5">{category}</h5>
                <div className="flex gap-10 flex-wrap p-5 justify-center">
                    {products.map((e) => {
                        return (
                            <div key={e.productId} className="w-65 h-80 bg-white relative group overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:blur-xs bg-black group-hover:scale-110 transition-all duration-500" src={e.image} alt="" />
                                <div className="absolute right-2 bottom-2">
                                    <h1 className="text-lg font-extrabold text-blue-950">{e.price}$</h1>
                                </div>
                                <a href={`/overview?productId=${e._id}`} className="bg-gray-900/10 font-semibold backdrop-blur-2xl cursor-pointer opacity-0 text-white p-3 text-sm left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2 pl-5 pr-5 group-hover:opacity-100 transition-all duration-700">VIEW</a>
                            </div>
                        )
                    })}


                </div>
                <div className="flex justify-center mb-5">
                    <button className="p-3 pl-5 pr-5 border hover:scale-101 cursor-pointer hover:bg-slate-900 transition-all duration-300 hover:text-white">View More</button>
                </div>
            </section>
        </section>
    )
}

export default Products