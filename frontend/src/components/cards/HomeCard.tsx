import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { motion } from 'framer-motion'

interface HomeCardProps {
    title: string
    description: string
    icon: string
    key: number
}

const HomeCard: React.FC<HomeCardProps> = ({title, description, icon, key}) => {

    const MotionCard = motion(Card);


  return (
    <MotionCard
    key={key}
    sx={{
        borderRadius: '16px'
    }}
    whileHover={{
        y: -5
    }}
    elevation={3}
    >
        <CardContent>
        <Typography
        fontSize='48px'
        textAlign='start'
        >
        {icon}
        </Typography>
        <Typography
        variant='h5'
        fontWeight='bolder'
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