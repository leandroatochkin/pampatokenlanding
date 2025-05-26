import { Box, Typography, Divider, IconButton } from '@mui/material'
import { Instagram, Facebook } from '@mui/icons-material'

const Footer = () => {
  return (
    <Box
    sx={{
        width: '100vw',
        background: '#2E7D32',
        height: {md: '20%', xs: '40%'},
        pb: {md: 0, xs: 2},
        color: 'white',
        p: 1
    }}
    >
   <Typography
   sx={{
    textAlign: 'center',
    fontSize: { xs: '10px', md: '14px'},
    width: '95%'
   }}
   >
   Los Pampas token representan un derecho de participación en un fideicomiso no financiero. El presente documento no implica una oferta pública en los términos de la ley 26.831 puesto que los Pampa Tokens no son valores negociables: carecen de aptitud para su negociación masificada e impersonal. La inversión propuesta está sujeta a los riesgos propios de toda inversión en general y a los de la actividad agrícola en particular, sin que se garantice a los eventuales inversores una rentabilidad, ni la recuperabilidad del capital invertido.
   </Typography>
   <Divider/>
   <Box
   sx={{
    display:'flex',
    flexDirection: 'column'
   }}
   >
    <Typography>
    nuestras redes 
    </Typography>

    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center'
    }}
    >
        <IconButton>
           <Instagram 
           sx={{
            color: 'white'
           }}
           />
        </IconButton>
        <IconButton>
           <Facebook 
           sx={{
            color: 'white'
           }}
           />
        </IconButton>
    </Box>
   </Box>
    </Box>
  )
}

export default Footer