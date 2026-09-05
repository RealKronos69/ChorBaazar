import { useState, useEffect, useRef } from "react";
import Homeproducts from './Homeproducts'
import Footer from './Footer'

const Home = () => {
    return (
        <section className="">
            <section className="h-[90vh] grid grid-cols-1 lg:grid-cols-2 place-content-center p-3 gap-10">
                <div>
                    <h1 className="text-7xl md:text-9xl text-black font-extrabold md:font-bold">CHOR BAAZAR</h1>
                    <h5 className="font-light text-2xl pl-4">Deals So Good, They Feel Illegal!</h5>

                </div>
                <div className="flex justify-center items-center flex-col gap-5">

                    <div className="flex gap-5">
                        <button className="p-3 border border-black cursor-pointer pl-10 pr-10 text-lg hover:bg-slate-900 hover:text-white transition-all duration-300 font-light">LOGIN</button>
                        <button className="p-3 bg-purple-800 cursor-pointer pl-10 pr-10 text-lg text-white hover:bg-purple-950 transition-all duration-300 font-light">EXPLORE</button>
                    </div>

                </div>
            </section>
            <Homeproducts />
            <div></div>
        </section>
    )
}

export default Home