// components/HomeIntro.tsx
import { Box, Typography, Paper } from '@mui/material'
import { motion } from 'framer-motion'


export default function Intro() {

const MotionPaper = motion.create(Paper)

  return (
    <Box
      component="section"
      id='intro'
      sx={{

        mt: {
            xs: 100,
            md: 0
        },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        px: 4,
        py: 8,
        gap: 6,
        maxWidth: '1200px',
        mx: 'auto',
      }}
    >
      {/* Illustration */}
      <motion.img
        src="/intro.avif" // replace with your own image path
        alt="Agricultural Tokens"
        style={{ maxWidth: '500px', width: '100%', borderRadius: '16px' }}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        
      />

      {/* Text Block */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Typography 
        variant="h4" 
        gutterBottom
        color = '#f5f5f5'
        fontWeight= 'bolder'
        sx={{
            textShadow: '0px 3px 5px rgba(0,0,0,0.6)',
            pointerEvents: 'none',
            fontFamily: 'PTSerif-Bold, sans-serif',
        }}
        >
          ¿Qué es <span translate="no">Pampa Tokens</span>?
        </Typography>
        <MotionPaper
        elevation={3}
        sx={{
            borderRadius: '16px',
            color: '#333',
            p: 1
        }}
        whileHover={{
            y: -5
        }}
        >
        <Typography variant="body1" sx={{pointerEvents: 'none'}}>
          En <strong>Pampa Tokens</strong> nos dedicamos a la creación y venta de tokens respaldados por la producción de granos.
        </Typography>
        <Typography variant="body1" sx={{pointerEvents: 'none'}}>
          Cada token representa una fracción del valor futuro de la cosecha, permitiendo a los inversores participar en el mercado agrícola de manera innovadora y eficiente.
        </Typography>
        <Typography variant="body1" sx={{pointerEvents: 'none'}}>
          A través de la tokenización, brindamos acceso a un mercado tangible, transparente y seguro, donde los inversores pueden beneficiarse del crecimiento y rentabilidad del sector agrícola.
        </Typography>
        </MotionPaper>
      </motion.div>
    </Box>
  )
}
