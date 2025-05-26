import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useMobile } from '../../utils/hooks'

interface HomeCardProps {
    title: string
    description: string
    icon: string
    key: number
}

const HomeCard: React.FC<HomeCardProps> = ({title, description, icon, key}) => {

    const MotionCard = motion.create(Card);
    const isMobile = useMobile()

  return (
    <MotionCard
    key={key}
    sx={{
        borderRadius: '16px',
        ml: isMobile ? 2 : 0,
        mr: isMobile ? 2 : 0,
           
    }}
    whileHover={{
        y: -5
    }}
    elevation={3}
    >
        <CardContent
        sx={{
            pointerEvents: 'none',
             display: 'flex',
            flexDirection: 'column',
            
        }}
        >
        <Typography
        fontSize='48px'
        textAlign='start'
        >
        {icon}
        </Typography>
        <Typography
        variant='h5'
        fontFamily={'PTSerif-Bold, sans-serif'}
        textAlign='start'
        color=' #2E7D32'
        >
        {title}
        </Typography>
        <Typography
        color=' #2E7D32'
        >
        {description}
        </Typography>
        </CardContent>
    </MotionCard>
  )
}

export default HomeCard