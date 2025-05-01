import React,{useState, useEffect, useRef} from 'react'
import { Box } from '@mui/material'
import { useMobile } from '../../utils/hooks'


export default function Dashboard({ children }: { children: React.ReactNode }){
    const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
 


  useEffect(() => {
    const container = containerRef.current

    const handleScroll = () => {
      if (container) {
        setScrollY(container.scrollTop)
      }
    }

    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (

        <Box
      ref={containerRef}
      sx={{
        height:{md: '100dvh', xs: '110vh'},
        width: '100vw',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)), url("/field3.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: !isMobile ? `center ${50 + scrollY * 0.02}%` : 'center',
        backgroundBlendMode: 'multiply',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        scrollPaddingTop: '16vh',
        backgroundAttachment: 'scroll', // ensure not "fixed"
        willChange: 'transform', // smooths GPU rendering
        transform: 'translateZ(0)' // force GPU layer (optional)
      }}
    >
      {children}
    </Box>
  
  )
}

