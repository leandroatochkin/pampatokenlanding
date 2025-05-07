import React, { useState } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload'
import { motion } from 'framer-motion'


interface idUploadProps {
  setFrontIdImage: (image: string | null) => void
  setBackIdImage: (image: string | null) => void
  frontIdImage: string | null
  backIdImage: string | null
  setBackIdFile: (file: File | null) => void
  setFrontIdFile: (file: File | null) => void
  label: string
}

const IdUpload: React.FC <idUploadProps> = ({
  setBackIdImage, 
  setFrontIdImage, 
  frontIdImage, 
  backIdImage, 
  setFrontIdFile, 
  setBackIdFile, 
  label
}) => {


const MotionPaper = motion.create(Paper)

  interface UploadCardProps {
    label: string
    inputId: string
    image: string | null
    setImage: (image: string | null) => void
    setFile: (file: File | null) => void
  }

    const RenderPhotoInput: React.FC<UploadCardProps> = ({ label, inputId, setImage, setFile }) => (
        <label htmlFor={inputId}>
          <input
            id={inputId}
            type="file"
            hidden
            onChange={(e) => {
              if (e.target.files?.[0]) {
                console.log(`${label} seleccionado:`, e.target.files[0])
                setFile(e.target.files[0])
                setImage(URL.createObjectURL(e.target.files[0]))
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
      <Typography variant="body1" fontFamily={'PTSerif-Bold, sans-serif'} color='primary' textAlign='left'>
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
          <RenderPhotoInput
            label="Anverso DNI"
            inputId="dni-front"
            image={frontIdImage}
            setImage={setFrontIdImage}
            setFile={setFrontIdFile}
          />
        </Box>
        <Box
       sx={{
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}
        >
          <RenderPhotoInput
            label="Reverso DNI"
            inputId="dni-back"
            image={backIdImage}
            setImage={setBackIdImage}
            setFile={setBackIdFile}
          />
        </Box>
        <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          ml: 2,
          gap: 2,
        }}
        >
              {frontIdImage && (
               <Box
               sx={{
                display: 'flex',
                flexDirection: 'column',
               }}
               >
              <img
                src={frontIdImage}
                alt="Uploaded"
                style={{
                  width: '150px',
                  height: 'auto',
                  borderRadius: '8px',
                  marginTop: '8px',
                }}
              />
              <Typography variant="caption" color="primary" mt={1}>
                {`${label}-frente`}
              </Typography>
              </Box>
            )}
            {backIdImage && (
             <Box
             sx={{
              display: 'flex',
              flexDirection: 'column',
             }}
             >
              <img
                src={backIdImage}
                alt="Uploaded"
                style={{
                  width: '150px',
                  height: 'auto',
                  borderRadius: '8px',
                  marginTop: '8px',
                }}
              />
              <Typography variant="caption" color="primary" mt={1}>
                {`${label}-reverso`}
              </Typography>
             </Box>
            )}
        </Box>
      </Box>
    </Box>
  )
}

export default IdUpload
