import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <section>
      <Navbar/>
      <Outlet />
    </section>
  )
}

export default App
