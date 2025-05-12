import  {useState, useEffect} from 'react'
import { 
  Box,
  Link,
  Typography,
  Button, 
  Drawer,
  IconButton
} from '@mui/material'
import Logo from '../logo/Logo'
import { motion } from 'framer-motion'
import {useScrollNavigation, useMobile} from '../../utils/hooks'
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [showNavbar, setShowNavbar] = useState(true);

useEffect(() => {
  const container = document.querySelector('[data-dashboard-scroll]') as HTMLElement | null;
  const introEl = document.getElementById('intro');

  const handleScroll = () => {
    if (!introEl || !container) return

    const introRect = introEl.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    const relativeBottom = introRect.bottom - containerRect.top

    setShowNavbar(relativeBottom > 0)
  };

  container?.addEventListener('scroll', handleScroll);
  return () => container?.removeEventListener('scroll', handleScroll);
}, []);



  const {
    handleSectionClick
  } = useScrollNavigation();

  const isMobile = useMobile()
  
  const MotionLink = motion.create(Link);
  
  const MotionBox = motion.create(Box);

  const MenuLinks = () => {
    return (
      <Box
      sx={{
        width: !isMobile ? '40%' : '90',
        height: {
          md: 'auto',
          xs: '20%'
        },
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row'
        },
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }}
      >
       <MotionLink
          onClick={
            ()=>handleSectionClick('home')
          }
          underline='none'
          fontWeight='medium'
          sx={{
            color: '#43A047', // normal color
            textDecoration: 'none',
            '&:hover': {
              color: '#2E7D32', // hover color
              cursor: 'pointer'
            },
          }}
          >
            Inicio
          </MotionLink>
          <MotionLink
          onClick={
            ()=>handleSectionClick('login')
          }
          underline='none'
          fontWeight='medium'
          sx={{
            color: '#43A047', // normal color
            textDecoration: 'none',
            '&:hover': {
              color: '#2E7D32',
              cursor: 'pointer' // hover color
            },
          }}
          >
            Login
          </MotionLink>
          <MotionLink
          onClick={
            ()=>handleSectionClick('register')
          }
          underline='none'
          fontWeight='medium'
          sx={{
            color: '#43A047', // normal color
            textDecoration: 'none',
            '&:hover': {
              color: '#2E7D32',
              cursor: 'pointer' // hover color
            },
          }}
          >
            Registro
          </MotionLink>
          <Button
          variant='contained'
          sx={{
            background: '#43A047',

          }}
          >
             conectar wallet
          </Button>
      </Box>
    )
  }

  const CustomDrawer = () => {
    return (
        <Drawer
              anchor={'right'}
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
            >
         <MenuLinks />
        </Drawer>
    )
  }

  return (
    <>
    {openDrawer && <CustomDrawer/>}
    <MotionBox
  initial={{ y: 0, opacity: 1 }}
  animate={{ y: showNavbar ? 0 : -100, opacity: showNavbar ? 1 : 0 }}
  transition={{ duration: 0.3 }}
  sx={{
    width: '100vw',
    height: {
      md: '8vh'
    },
    position: 'sticky',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backdropFilter: 'blur(25px) saturate(100%)',
    background: 'rgba(255, 255, 255, 0.75)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.125)',
    zIndex: 999
  }}
>
        <Box
        id='logo-container'
        sx={{
          display: 'flex',
          alignItems: 'center',
          pl: 4
        }}
        >
          <Logo 
          width={40}
          height={40}
          />
          <Typography
          sx={{
            color: '#2E7D32',
            fontFamily: 'PTSerif-Bold, sans-serif',
          }}
          >
            PAMPA TOKENS
          </Typography>
        </Box>
        {
          !isMobile
          ?
        <MenuLinks />
        :
        <>
        <IconButton
        onClick={
          ()=>setOpenDrawer(!openDrawer)
        }
        >
        <MenuOpenIcon color='primary'/>
        </IconButton>
        </>
        }
    </MotionBox>
    </>
  )
}

export default Navbar