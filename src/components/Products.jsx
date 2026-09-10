import { useState, useEffect } from "react"

const Products = () => {
    const [products, setproducts] = useState([])
    const [category, setcategory] = useState('')
    const [attribute, setattribute] = useState({})
    const limit = 3
    const [viewmore, setviewmore] = useState(0)
    const [hasmore,sethasmore] = useState(true)
    const [subcategory, setsubcategory] = useState("")

    const fetchproducts = async () => {
        let url
        if(Object.keys(attribute).length>0){
            url = `${import.meta.env.VITE_BACKEND}/products/filter?category=${category}&subcategory=${subcategory}&limit=${limit}&skip=${viewmore}`
            Object.entries(attribute).forEach(([key,value])=>{
                url+=`&${key}=${value}`
            })
        }else if (subcategory) {
            url = `${import.meta.env.VITE_BACKEND}/products/filter?category=${category}&subcategory=${subcategory}&limit=${limit}&skip=${viewmore}`
        } else {
            url = category === "" ? `${import.meta.env.VITE_BACKEND}/products?limit=${limit}&skip=${viewmore}` : `${import.meta.env.VITE_BACKEND}/products?category=${category}&limit=${limit}&skip=${viewmore}`
        }
        const res = await fetch(url)
        const data = await res.json()
        sethasmore(data.hasmore)
        console.log(data)
        if (viewmore === 0) {
            setproducts(data.products)
        } else {
            setproducts(prev => [...prev, ...data.products])
        }
    }

    useEffect(() => {
        fetchproducts()
    }, [category, subcategory, attribute, viewmore])

    const handlechange = (e) => {
        setcategory(e.target.value)
        setsubcategory('')
        setproducts([])
        setviewmore(0)
    }
    const handleattribute = (e) => {
        const { id, name, checked } = e.target
        if (checked) {
            setattribute(prev => ({ ...prev, [name]: id }))
        }
        setproducts([])
        setviewmore(0)
    }
    const handlesubcategory = (e) => {
        setsubcategory(e.target.id)
        setviewmore(0)
        setproducts([])
    }
    const handleclear = () => {
        setsubcategory('')
        setattribute([])
        setproducts([])
        setviewmore(0)
    }

    return (
        <section className="h-[90vh] grid md:grid-cols-[20%_80%]">
            <section className="bg-slate-950 p-3 sticky h-full top-0">
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
                {category === "clothes" && (<div className="transition-all duration-500 mt-3 p-4 border w-full border-white rounded-md">
                    <div className="bg-blue-500">
                        <h5 className="text-white mb-2">subcategory</h5>
                        <div className="flex gap-2">
                            <input checked={subcategory === "shirt"} name="subcategory" onChange={handlesubcategory} id="shirt" className="focus:outline-0" type="radio" />
                            <label className="text-white font-light" htmlFor="shirt">Shirt</label>
                        </div>
                        <div className="flex gap-2">
                            <input checked={subcategory === "pant"} name='subcategory' onChange={handlesubcategory} id="pant" className="focus:outline-0" type="radio" />
                            <label className="text-white font-light" htmlFor="pant">Pant</label>
                        </div>
                        <div className="flex gap-2">
                            <input checked={subcategory === "shoes"} name='subcategory' onChange={handlesubcategory} id="shoes" className="focus:outline-0" type="radio" />
                            <label className="text-white font-light" htmlFor="shoes">Shoes</label>
                        </div>
                    </div>
                    <div className="bg-red-700 mt-5">
                        <h5 className="text-white mb-2">attributes</h5>
                        <div className="flex gap-2">
                            <input checked={attribute.gender === "men"} name='gender' onChange={handleattribute} id="men" className="focus:outline-0" type="radio" />
                            <label className="text-white font-light" htmlFor="men">Men</label>
                        </div>
                        <div className="flex gap-2">
                            <input checked={attribute.gender === "women"} name='gender' onChange={handleattribute} id="women" className="focus:outline-0" type="radio" />
                            <label className="text-white font-light" htmlFor="women">Women</label>
                        </div>
                        <div className="flex gap-2">
                            <input checked={attribute.gender === "kid"} name='gender' onChange={handleattribute} id="kid" className="focus:outline-0" type="radio" />
                            <label className="text-white font-light" htmlFor="kid">Kid</label>
                        </div>
                    </div>
                    <button onClick={handleclear} className="w-full bg-white p-3 mt-10">clear</button>
                </div>)}
            </section>
            <section className="overflow-y-auto">
                <h5 className="text-center text-3xl p-3">{category}</h5>
                <div className="flex gap-10 flex-wrap p-5 justify-center">
                    {products.map((e) => {
                        return (
                            <div key={e.productId} className="w-50 h-65 bg-white relative group overflow-hidden">
                                <img className="w-full h-full object-cover group-hover:blur-xs bg-black group-hover:scale-110 transition-all duration-500" src={e.image} alt="" />
                                <div className="absolute left-2 top-2">
                                    <h1 className="text-md font-extrabold text-white shadow-md p-2 rounded-md">{e.subcategory}{e.attributes.gender}$</h1>
                                </div>
                                <a href={`/overview?productId=${e._id}`} className="bg-gray-900/10 font-semibold backdrop-blur-2xl cursor-pointer opacity-0 text-white p-3 text-sm left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2 pl-5 pr-5 group-hover:opacity-100 transition-all duration-700">VIEW</a>
                            </div>
                        )
                    })}


                </div>
                {hasmore && <div className="flex justify-center mb-5">
                    <button onClick={() => { setviewmore(viewmore + limit) }} className="p-3 pl-5 pr-5 border hover:scale-101 cursor-pointer hover:bg-slate-900 transition-all duration-300 hover:text-white">View More</button>
                </div>}
            </section>
        </section>
    )
}

export default Products