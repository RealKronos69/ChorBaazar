const Post = ()=>{
    const post = {
        name : 'yellow shirt',
        price:110,
        about: 'blue shirt with long slieves',
        category:'clothes',
        subcategory:'shirt',
        attributes:{'gender' : 'women'}
    }

const handlepost = async ()=>{
    const res = await fetch(`${import.meta.env.VITE_BACKEND}/products`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(post)
    })
    const data = await res.json()
    console.log(data)
}
    
    return(
        <section>
            <button onClick={()=>{handlepost()}} className="mx-auto p-4 pr-6 pl-6 border hover:bg-slate-800 hover:text-white transition-all duration-300 cursor-pointer">POST</button>
        </section>
    )
}

export default Post