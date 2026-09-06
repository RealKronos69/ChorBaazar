import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import { Outlet } from 'react-router-dom'


function App() {
  const [cartcount,setcartcount] = useState(0)
  return (
    <section className=''>
      <Navbar cartcount={cartcount} setcartcount={setcartcount}/>
      <Outlet context={[cartcount,setcartcount]} />
      <Footer/>
    </section>
  )
}

export default App
