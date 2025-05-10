import {Button, Box, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'


export default function NotFound() {

  const navigate = useNavigate()

  return (
    <Box sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        color: "#333",

    }}>
      <Box className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <Box 
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
        >
          <Box sx={{
            height: {xs: "15rem", sm: "4rem"},
            width: {xs: "15rem", sm: "4rem"},
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </Box>
        </Box>
        <Typography 
        variant="h1"
        sx={{
            textAlign: "center",
        }}
        >404</Typography>
        <Typography variant="h2">Page Not Found</Typography>
        <Typography variant="body1">
          La página que estás buscando no existe o ha sido eliminada. Puedes volver a la página de inicio o buscar algo nuevo.
        </Typography>
        <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2
        }}
        >
        <Button
        variant="outlined"
        onClick={() => navigate('/')}
        >
           volver
        </Button>
        </Box>
      </Box>
    </Box>
  )
}
