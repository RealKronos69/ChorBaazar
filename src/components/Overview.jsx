import animatedcart from '../assets/animated_cart.apng'

const Overview = () => {
    return (
        <section className="h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="flex justify-center items-center">
                <div className="w-1/2 h-3/4 bg-red-400">
                    <img src="" alt="" />
                </div>
            </div>
            <div className="p-5">
                <p className="text-lg font-semilight">
                    Oslen Stainless Steel 2 Layer Wall Mounted Bathroom Rack and Shelf Bathroom Storage Racks and Shelves Washroom Basin Double Soap Dish and Tumbler Holder Soap Holder Bathroom Accessories
                </p>
                <a className="text-sm text-blue-600 font-light cursor-pointer hover:text-blue-900" href="">Visit Seller Profile</a>
                <h1 className="text-3xl font-bold mt-5">200$</h1>
                <h5 className="">category : laptop</h5>
                <button className="p-3 pl-7 pr-7 w-fit border font-light mt-10 flex items-center gap-3 hover:scale-101 hover:bg-slate-900 hover:text-white group cursor-pointer transition-all duration-300">Add To Cart<img className='w-5 h-5 group-hover:invert' src={animatedcart}/></button>
            </div>
        </section>
    )
}

export default Overview