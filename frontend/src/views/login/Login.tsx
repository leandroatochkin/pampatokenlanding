import { 
    Paper, 
    Typography, 
    TextField, 
    Box, 
    InputAdornment, 
    OutlinedInput, 
    IconButton, 
    Button, 
    Link,
    CircularProgress, 
} from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import { useForm } from 'react-hook-form'
import { emailRegex, passwordRegex } from '../../utils/regexPatterns';
import  { useState} from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useScrollNavigation, useMobile} from '../../utils/hooks';
import ForgotPasswordDialog from '../../components/dialogs/ForgotPassword';
import { useLogIn, UserData } from '../../api/userApi';




 const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [openForgotPasswordDialog, setOpenForgotPasswordDialog] = useState<boolean>(false)
    const {
        handleSectionClick
      } = useScrollNavigation();
const {
    handleSubmit, 
    register, 
    formState: { errors }, 
} = useForm<UserData>()


const {mutate, isPending} = useLogIn()

const onSubmit = async (data: UserData) => {
    mutate(data)
  };

const isMobile = useMobile()
  return (
    <>
    {
        openForgotPasswordDialog && <ForgotPasswordDialog open={openForgotPasswordDialog} onClose={()=>setOpenForgotPasswordDialog(false)}/>
    }
    <Box
    aria-label="Sección de inicio de sesión"
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
            aria-label="Formulario de inicio de sesión"
            sx={{
                borderRadius: 4,
                width: {
                    md: '30%',
                    xs: '86vw'
                },
                p: 2,
            }}
            >
        {
            !isPending ? (
                <>
        <Typography
        variant='h4'
        fontFamily={'PTSerif-Bold, sans-serif'}
        color='#276329'
        textAlign='start'
        >
            Iniciar sesión
        </Typography>
        <Typography
        textAlign='start'
        color='#333'
        >
        Accedé a tu cuenta para gestionar tus inversiones
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
                    id="login-email"
                    type="email"
                    variant="outlined"
                    placeholder="mail@ejemplo.com"
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
                    id="login-password"
                    color="secondary"
                    type={showPassword ? "text" : "password"}
                    {...register(`password`, { required: 'Campo requerido', pattern: { value: passwordRegex, message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo' } })}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label={
                            showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
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
                background: '#276329',
                mt: 4
            }}
            fullWidth
            disabled={isPending}
            >
                Iniciar sesión
            </Button>
        <Link
          onClick={
            ()=>handleSectionClick('register')
          }
          underline='none'
          fontFamily={'PTSerif-Bold, sans-serif'}
          sx={{
            color: '#276329',
            textDecoration: 'none',
            '&:hover': {
              color: '#2E7D32',
              cursor: 'pointer'
            },
          }}
          >
            ¿No tenés una cuenta? Registrate
          </Link>
          <Typography
          fontFamily={'PTSerif-Bold, sans-serif'}
          sx={{
            color: '#276329'
          }}
          variant={'body1'}
          aria-label='link para recuperar clave'
          >
            ¿Olvidaste tu contraseña? Hace click <Typography
  component="span"
  onClick={() => setOpenForgotPasswordDialog(true)}
  sx={{
    fontWeight: 'bolder',
    cursor: 'pointer',
    '&:hover': {
      color: '#2E7D32',
      textDecoration: 'underline',
    },
  }}
>
  acá
</Typography>

          </Typography>
        </form>
        </>
            )
            :
            (
                <CircularProgress size={50} color='primary' />
            )
        }
        </Paper>
    </Box>
    </>
  )
}

export default Login