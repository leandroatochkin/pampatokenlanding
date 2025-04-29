import React from 'react'
import { Box } from '@mui/material'

export default function Dashboard({ children }: { children: React.ReactNode }){
  return (
    <Box
  sx={{
    height: '100dvh',
    width: '100vw',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)), url("/field3.jpg")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'multiply',
    overflowY: 'auto',
    scrollbarWidth: 'none',
  }}
>

        {children}
    </Box>
  )
}

