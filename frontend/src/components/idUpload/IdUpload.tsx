import { Box, Typography, Paper } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import { motion } from 'framer-motion'


const IdUpload = () => {

const MotionPaper = motion.create(Paper)

    const renderUploadCard = (label: string, inputId: string) => (
        <label htmlFor={inputId}>
          <input
            id={inputId}
            type="file"
            hidden
            onChange={(e) => {
              if (e.target.files?.[0]) {
                console.log(`${label} seleccionado:`, e.target.files[0])
              }
            }}
          />
          <MotionPaper
            variant="outlined"
            sx={{
              borderStyle: 'dashed',
              borderColor: 'primary',
              borderWidth: '2px',
              borderRadius: 2,
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: 'green.50',
              },
              width: '100%'
            }}
          >
            <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center"
            >
              <UploadIcon color='primary' sx={{ fontSize: 32, color: 'primary', mb: 1 }} />
              <Typography variant="body2" fontWeight="medium" color="primary">
                {label}
              </Typography>
              <Typography variant="caption" color="primary" mt={1}>
                Haga clic para cargar
              </Typography>
            </Box>
          </MotionPaper>
        </label>
      )
      

  return (
    <Box 
    display="flex" 
    flexDirection="column" 
    gap={2} 
    marginTop={2}
    width={'100%'}
    >
      <Typography variant="body1" fontWeight="bold" color='primary' textAlign='left'>
        Documento de Identidad
      </Typography>
      <Box
      sx={{
        display: 'flex',
        flexDirection: {
            xs: 'column',
            md: 'row'
        },
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%'
      }}
      >
        <Box
        sx={{
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
          {renderUploadCard('Frente DNI', 'dni-front')}
        </Box>
        <Box
       sx={{
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}
        >
          {renderUploadCard('Dorso DNI', 'dni-back')}
        </Box>
      </Box>
    </Box>
  )
}

export default IdUpload
