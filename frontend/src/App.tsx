import Navbar from './components/navbar/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import Home from './views/home/Home'
import Login from './views/login/Login'
import Register from './views/register/Register'
import Footer from './views/footer/Footer'
import Intro from './views/intro/Intro'
import VerifyEmail from './views/verifyEmail/VerifyEmail'
import ForgotPassword from './views/forgotPassword/ForgotPassword'
import { OperationsWrapper } from './views/operations/OperationsWrapper'
import { theme } from './utils/theme'
import { ThemeProvider } from '@emotion/react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './views/notFound/NotFound'
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


const queryClient = new QueryClient()

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
    path: '/verify-email',
    element: <VerifyEmail />,
    errorElement: <NotFound />,
  },
  {
    path: '/reset-password',
    element: <ForgotPassword />,
    errorElement: <NotFound />,
  },
  {
    path: "/operations",
    element: (
          <OperationsWrapper />
    ),
    errorElement: <NotFound />,
  },
  
  

])


function App() {

 

  return (
      <QueryClientProvider client={queryClient}>
      <HelmetProvider>
      <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      </ThemeProvider>
      </HelmetProvider>
      </QueryClientProvider>
  )
}

export default App
