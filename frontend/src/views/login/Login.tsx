import { 
    Paper, 
    Typography, 
    TextField, 
    Box, 
    InputAdornment, 
    OutlinedInput, 
    IconButton, 
    Button, 
    Link 
} from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import { useForm } from 'react-hook-form'
import { emailRegex, passwordRegex } from '../../utils/regexPatterns';
import  { useState} from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useScrollNavigation, useMobile} from '../../utils/hooks';

interface LoginData {
    email: string
    password: string
}

 const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const {
        handleSectionClick
      } = useScrollNavigation();

const {
    handleSubmit, 
    register, 
    formState: { errors }, 
} = useForm<LoginData>()

const onSubmit = async (data: LoginData) => {
    console.log(data)
  };

const isMobile = useMobile()
  return (
    <Box
    sx={{
        width: '100vw',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: isMobile ? 10 : 0,
    }}
    >
        <Paper
            id='login'
            sx={{
                borderRadius: 4,
                width: {
                    md: '30%',
                    xs: '86vw'
                },
                p: 2,

            }}
            >
        <Typography
        variant='h4'
        fontWeight='bolder'
        color='#2E7D32'
        textAlign='start'
        >
            Iniciar sesión
        </Typography>
        <Typography
        textAlign='start'
        color='#333'
        >
        Accede a tu cuenta para gestionar tus inversiones
        </Typography>
        <form
        onSubmit={handleSubmit(onSubmit)}
        >   
            {/*LOGIN*/}
            <Box
            sx={{
                mt: 2
            }}
            >
                <Typography
                fontWeight='bold'
                textAlign='start'
                color='#333'
                >
                    Email
                </Typography>
                <Box className="relative">
                    <TextField
                    fullWidth
                    id="email"
                    type="email"
                    variant="outlined"
                    placeholder="name@example.com"
                    {...register(`email`, { required: 'Required field', pattern: { value: emailRegex, message: 'Invalid email address' } })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    slotProps={{
                        input: {
                        startAdornment: (
                            <InputAdornment position='start'>
                            <MailIcon 
                                sx={{
                                    color: '#333'
                                }}
                                />
                            </InputAdornment>
                        ),
                        },
                    }}
                    />    
                </Box>
            </Box>
            {/*PASSWORD*/}
            <Box
            sx={{
                mt: 2
            }}
            >
                <Box>
                <Typography
                fontWeight='bold'
                textAlign='start'
                color='#333'
                >
                    Contraseña
                </Typography>
                </Box>
                <Box className="relative">
                    <OutlinedInput
                    fullWidth
                    id="password"
                    color="secondary"
                    type={showPassword ? "text" : "password"}
                    {...register(`password`, { required: 'Campo requerido', pattern: { value: passwordRegex, message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo' } })}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label={
                            showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                        </InputAdornment>
                    }
                    />

                    
                </Box>
            </Box>
            <Button
            type='submit'
            variant='contained'
            sx={{
                background: '#2E7D32',
                mt: 4
            }}
            fullWidth
            >
                Iniciar sesión
            </Button>
            <Link
          onClick={
            ()=>handleSectionClick('register')
          }
          underline='none'
          fontWeight='medium'
          sx={{
            color: '#43A047', // normal color
            textDecoration: 'none',
            '&:hover': {
              color: '#2E7D32', // hover color
              cursor: 'pointer'
            },
          }}
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
        </form>
    </Paper>
    </Box>
  )
}

export default Login