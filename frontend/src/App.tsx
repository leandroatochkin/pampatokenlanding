import Navbar from './components/navbar/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import Home from './views/home/Home'
import Login from './views/login/Login'
import Register from './views/register/Register'
import Footer from './views/footer/Footer'
import Intro from './views/intro/Intro'
import Operations  from './views/operations/Operations'
import { theme } from './utils/theme'
import { ThemeProvider } from '@emotion/react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './views/notFound/NotFound'
import { ProtectedRoute } from './views/login/PostLogin'
import { userStore } from './utils/store'

const isLoggedIn = userStore((state)=>state.isLoggedIn)

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Dashboard>
      <Navbar />
      <Home />
      <Intro />
      <Login />
      <Register />
      <Footer />
      </Dashboard>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/operations",
    element: (
      <ProtectedRoute isAuthenticated={isLoggedIn}>
          <Operations />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  
  

])


function App() {

  return (
  
      <>
      <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      </ThemeProvider>
      </>
  
  )
}

export default App
