import { Box, Typography, Divider, IconButton, Tooltip } from '@mui/material'
import { PermPhoneMsg, Email } from '@mui/icons-material'


const Footer = () => {
  return (
    <Box
    aria-label="Información legal y redes sociales"
    sx={{
        width: '100vw',
        background: '#2E7D32',
        height: '40%',
        pb: {md: 0, xs: 2},
        color: 'white',
        p: 1
    }}
    >
    <Typography
      aria-label="Texto legal sobre los Pampas token"
      sx={{
        textAlign: 'center',
        fontSize: { xs: '10px', md: '14px'},
        width: '95%',
        mb: 5
      }}
    >
    Los Pampa Tokens representan un derecho de participación en un fideicomiso no financiero. El presente documento no implica una oferta pública en los términos de la ley 26.831 puesto que los Pampa Tokens no son valores negociables: carecen de aptitud para su negociación masificada e impersonal. La inversión propuesta está sujeta a los riesgos propios de toda inversión en general y a los de la actividad agrícola en particular, sin que se garantice a los eventuales inversores una rentabilidad, ni la recuperabilidad del capital invertido.
    </Typography>
    <Divider/>
    <Box
      aria-label="Sección de redes sociales"
      sx={{
        display:'flex',
        flexDirection: 'column'
      }}
    >
      <Typography>
      contacto 
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
          <Tooltip
          title='+5491130975995'
          >
              <IconButton aria-label="Phone">
            <PermPhoneMsg 
            sx={{
              color: 'white'
            }}
            />
          </IconButton>
          </Tooltip>
          <IconButton aria-label="Email">
            <a
            href='mailto:contacto@pampatokens.com.ar'
            >
            <Email 
            sx={{
              color: 'white'
            }}
            />
            </a>
          </IconButton>
      </Box>
    </Box>
    </Box>
  )
}

export default Footer