import Navbar from './components/navbar/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import Home from './views/home/Home'
import Login from './views/login/Login'
import Register from './views/register/Register'
import Footer from './views/footer/Footer'
import Intro from './views/intro/Intro'
import { theme } from './utils/theme'
import { ThemeProvider } from '@emotion/react'
import './App.css'



function App() {

  return (
  
      <>
      <ThemeProvider theme={theme}>
        <Dashboard>
          <Navbar />
          <Home />
          <Intro />
          <Login />
          <Register />
          <Footer />
        </Dashboard>
      </ThemeProvider>
      </>
  
  )
}

export default App
