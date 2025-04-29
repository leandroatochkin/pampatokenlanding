import { Paper, Typography, TextField, Box, FormLabel, InputAdornment, OutlinedInput, IconButton, Button } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import { useForm } from 'react-hook-form'
import { emailRegex, passwordRegex } from '../../utils/regexPatterns';
import React, { useState} from 'react'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface LoginData {
    email: string
    password: string
}

 const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

const {
    handleSubmit, 
    register, 
    watch,
    setError, 
    formState: { errors }, 
} = useForm<LoginData>()

const onSubmit = async (data: LoginData) => {
    console.log(data)
  };


  return (
    <Box
    sx={{
        width: '100vw',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}
    >
        <Paper
    id='login'
    sx={{
        borderRadius: 4,
        width: {
            md: '30%'
        },
        height: '40%',
        p: 2
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
            <Box>
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
            <Box>
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
                background: '#2E7D32'
            }}
            fullWidth
            >
                Iniciar sesión
            </Button>
        </form>
    </Paper>
    </Box>
  )
}

export default Login