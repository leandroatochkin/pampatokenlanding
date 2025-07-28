import React, { useState, useEffect, useRef } from 'react'
import { Box } from '@mui/material'

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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



  useEffect(() => {
  const img = new Image();
  img.src = '/field3.avif';
  img.onload = () => {
    setImageLoaded(true);
  };
  img.onerror = () => {
    console.error('Failed to load background image');
  };
}, []);
  return (
    <Box
      ref={containerRef}
      data-dashboard-scroll
      sx={{
        height: { md: '100dvh', xs: '110vh' },
        width: '100vw',
        backgroundImage: imageLoaded
          ? `linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01)), url("/field3.avif")`
          : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: `center ${Math.round(50 + scrollY * 0.02)}%`,
        backgroundBlendMode: 'normal',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'thin',
        scrollPaddingTop: '16vh',
        backgroundAttachment: 'scroll',
        willChange: 'background-position',
        WebkitBackfaceVisibility: 'hidden',
        opacity: imageLoaded ? 1 : 0,
        transition: 'opacity 0.6s ease-in-out',
        backgroundColor: '#f5f5f5', // fallback color while loading
      }}
    >
      {children}
    </Box>
  )
}

