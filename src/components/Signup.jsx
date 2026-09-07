import { useState,useEffect } from "react"

const Signup = ()=>{
    const [formdata,setformdata] = useState({
        name:'',
        username:'',
        password:'',
        confirmpassword:''
    })
    const handleinput = (e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value})
    }
    console.log(formdata)
    const handlesignup = async(e)=>{
        e.preventDefault()
        const res = await fetch(`${import.meta.env.VITE_BACKEND}/user/signup`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formdata)
        })

        const data = await res.json()
        console.log(data)
    }
    return(
        <section className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="w-90 h-fit bg-white rounded-3xl p-8 flex flex-col gap-10 shadow-gray-800 shadow-md">
                <h1 className="font-bold text-xl self-center">Sign Up</h1>
                <form className="flex flex-col gap-5" onSubmit={handlesignup}>
                    <div className="flex flex-col gap-4">
                        <input name="name" onChange={handleinput} className="border-b-2 border-black p-3 focus:outline-0 w-full" type="text" placeholder="name" />
                        <input name="username" onChange={handleinput} className="border-b-2 border-black p-3 focus:outline-0 w-full" type="text" placeholder="username" />
                        <input name="password" onChange={handleinput} className="border-b-2 border-black p-3 focus:outline-0 w-full" type="text" placeholder="password" min="0" />
                        <input name="confirmpassword" onChange={handleinput} className="border-b-2 border-black p-3 focus:outline-0 w-full" type="text" placeholder="confirm password" min="0" />
                        <span className="flex justify-between">
                            <p className="text-xs">already have a account?</p>
                            <a className="text-xs text-blue-500" href="/login">login</a>
                        </span>
                    </div>
                    <button type="submit" className="bg-gray-900 text-white rounded-3xl font-semibold p-3 hover:scale-101 cursor-pointer">Sign Up</button>
                </form>
            </div>
        </section>
    )
}

export default Signup