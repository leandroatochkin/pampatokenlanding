import React, {useState, useEffect} from 'react'
import { 
  Box,
  Link,
  Typography,
  Button
} from '@mui/material'
import Logo from '../logo/Logo'
import { motion } from 'framer-motion'
import useScrollNavigation from '../../utils/hooks'

const Navbar = () => {
  const {
    activeSection,
    scrollY,
    isMenuOpen,
    setIsMenuOpen,
    handleSectionClick
  } = useScrollNavigation();

  
  const MotionLink = motion(Link);

  return (
    <Box
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
      borderBottom: '1px solid rgba(255, 255, 255, 0.125)'
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
            fontWeight: 'bolder'
          }}
          >
            PAMPA TOKEN
          </Typography>
        </Box>
        <Box
        id='navigation'
        sx={{
          width: '35%',
          display:'flex',
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
              color: '#2E7D32', // hover color
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
              color: '#2E7D32', // hover color
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
    </Box>
  )
}

export default Navbar