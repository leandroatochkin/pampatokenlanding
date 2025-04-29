import { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import Home from './views/home/Home'
import Login from './views/login/Login'
import './App.css'


function App() {

  return (
    <>
      <Dashboard>
      <Navbar/>
      <Home/>
      <Login />
      </Dashboard>
    </>
  )
}

export default App
