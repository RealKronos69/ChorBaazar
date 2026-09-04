import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <section>
      <Navbar/>
      <Outlet />
      <Footer/>
    </section>
  )
}

export default App
