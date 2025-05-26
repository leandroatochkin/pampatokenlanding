import { useRef, useState } from 'react';
import { 
    Box,
    Button,
    Typography,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { dataURLtoFile } from '../../utils/functions';

interface PhotoCaptureProps {
    setSelfieImage: (image: string | null) => void;
    selfieImage: string | null;
    setSelfieFile: (file: File | null) => void;
    label: string;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({setSelfieImage, selfieImage, setSelfieFile, label}) => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraRolling, setIsCameraRolling] = useState<boolean>(false);

  // Open camera and start stream
  const startCamera = async () => {
    setIsCameraRolling(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera access denied:', err);
    }
  };

  // Capture image from video stream
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
    }
    const dataUrl = canvas.toDataURL('image/png');
    setSelfieFile(dataURLtoFile(dataUrl, `${label}-selfie.png`));
    setSelfieImage(dataUrl);
    setIsCameraRolling(false);
  };

  const deleteImage = () => {
    setSelfieImage(null);
    if (videoRef.current) {
        videoRef.current.srcObject = null;
        }
    }

  return (
    <Box>
    <Typography
    color='primary'
    sx={{
        fontFamily: 'PTSerif-Bold, sans-serif',
        textAlign: 'left',
    }}
    >
        Capturá tu selfie
    </Typography>
      <Box
      sx={{
        display: 'flex',
        justifyContent: {md:'space-between' , xs: 'center'},
        flexDirection: {
            md: 'row',
            sm: 'column',
            xs: 'column',
        },
        alignItems: 'center',

      }}
      >
        <Box
      sx={{
        display: 'flex',
        flexDirection: {
            md: 'row',
             sm: 'column',
            xs: 'column',
        },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
      >

        {
            isCameraRolling
            ?
            (
                <Box>
                <video ref={videoRef} style={{ width: '300px' }} />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                </Box>
            )
            :
            (
                <Box
                sx={{
                    position: 'relative',
                    pointerEvents: 'none',
                }}
                >
                    <img src='/selfieExample.png' alt='selfie example' style={{ width: '300px', marginTop: '10px', borderRadius: 8 }} />
                    <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        padding: 1,
                        borderRadius: 2,
                    }}
                    >
                    <Typography>
                        imagen de ejemplo
                    </Typography>
                    </Box>
                </Box>
            )
        }

        
           

            <Box
            sx={{
                display: 'flex',
                flexDirection: {
                    md: 'column',
                    xs: 'row',
                },
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
            }}
            >
                <Button
            variant='contained' 
            onClick={startCamera}>
                camara
            </Button>
            <Button 
            variant='contained' 
            onClick={capturePhoto}
            sx={{
                height: '100%',
            }}
            >
                <CameraAltIcon 
                sx={{
                    mr: 1,
                }}
                />
                 foto
            </Button>
            </Box>
      </Box>
      
      {selfieImage && 
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        mt: 2,
      }}
      >
        <img src={selfieImage} alt="Captured or selected" style={{ width: '300px', marginTop: '10px' }} />
        <Button
        variant='contained'
        onClick={deleteImage}
    
        >
            <DeleteForeverIcon 
            sx={{
                mr: 1,
            }}
            />
            borrar
        </Button>
      </Box>
      }
      </Box>
      
    
      {/* <Box>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      </Box> */}

  
    </Box>
  );
}

export default PhotoCapture;
