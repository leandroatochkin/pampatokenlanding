import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Container,
  Link,
  Divider,
  CircularProgress,
  FormLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel
} from '@mui/material';
import {
  ArrowForward,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useForm } from "react-hook-form";
import { passwordRegex } from '../../utils/regexPatterns';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(8px)',
  boxShadow: theme.shadows[24],
  border: 'none',
}));

interface ResetPassword {
    token: string | null
    password: string
}
const ForgotPassword = () => {
 const [showPassword, setShowPassword] = useState<boolean>(false)
 const [repeatPassword, setRepeatPassword] = useState<string>('')
 const [loading, setLoading] = useState<boolean>(false)
 const [changeConfirmed, setChangeConfirmed] = useState<boolean>(false)
 const location = useLocation();
 const queryParams = new URLSearchParams(location.search);
 const token = queryParams.get('token');
 const navigate = useNavigate()

 const handleContinue = () => {
    navigate(`/`)
 }


 const {  
           handleSubmit, 
           register, 
           watch,
           formState: { errors }, 
             } = useForm<ResetPassword>({
                defaultValues: {
                    token: token
                }
             })

const watchPassword = watch("password")

const onSubmit = async () => {
  setLoading(true);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/reset-password?token=${token}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      alert(`Hubo un error cambiando su contraseña. Intente más tarde.`);
      return; 
    }

    setChangeConfirmed(true);
    alert(`Contraseña modificada.`);
  } catch (e) {
    alert(`Hubo un error cambiando su contraseña. Intente más tarde.`);
    console.error(e);
  } finally {
    setLoading(false);
  }
};


  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >

     
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 10 }}>
        <StyledCard>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Typography
                          variant="h4"
                          component="h2"
                          fontWeight="bold"
                          color="success.dark"
                          gutterBottom
                        >
                         Nueva contraseña
                        </Typography>
           <form onSubmit={handleSubmit(onSubmit)}>
              {/*PASSWORD*/}
                        <Box
                                 sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  width: '100%'
                              }}
                              >
               
                      <FormLabel htmlFor="password">Contraseña</FormLabel>
                  
                  <Box className="relative">
                      <FormControl fullWidth error={!!errors.password} variant="outlined" color="secondary">
  <InputLabel htmlFor="password">Password</InputLabel>
  <OutlinedInput
    id="password"
    type={showPassword ? "text" : "password"}
    label="Password"
    {...register("password", {
      required: 'Campo requerido',
      pattern: {
        value: passwordRegex,
        message:
          'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo',
      },
    })}
    endAdornment={
      <InputAdornment position="end">
        <IconButton
          aria-label={showPassword ? 'hide the password' : 'display the password'}
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
        >
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </InputAdornment>
    }
  />
  <FormHelperText>{errors.password?.message}</FormHelperText>
</FormControl>
  
                      
                
                              </Box>
                      {/*REPEAT PASSWORD*/}
                              <Box
                                 sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  width: '100%'
                                  }}
                                  >
                              <FormLabel htmlFor="repeatPassword">Repetir contraseña</FormLabel>
               
                      <TextField
                      fullWidth
                      id="repeatPassword"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      error={repeatPassword !== watchPassword}
                      helperText={
                          repeatPassword && repeatPassword !== watchPassword ? "las contraseñas no coinciden" : ""
                      }
                      />
                 
                              </Box>                           
                        </Box>        
                <Button
                type='submit'
                disabled={!watchPassword || loading || changeConfirmed}
                variant="contained"
                color="success"
                size="large"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  mt: 2,
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                {
                    !loading ? `Cambiar contraseña` : <CircularProgress size={30}/>
                }
                </Button>
            </form>
            {/* Countdown and Button */}
            <Box>
              

             {
                changeConfirmed &&  <Button
                onClick={handleContinue}
                disabled={loading || !changeConfirmed}
                variant="contained"
                color="success"
                size="large"
                fullWidth
                endIcon={<ArrowForward />}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  mt: 2,
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                Continuar a PampaTokens
              </Button>
             }
            </Box>

            {/* Additional Info */}
            <Box mt={3} pt={3}>
              <Divider sx={{ borderColor: 'success.light' }} />
              <Typography variant="caption" color="success.main" sx={{ mt: 2 }}>
                Si tenés algún problema, contacta nuestro soporte en{' '}
                <Link
                  href="mailto:soporte@pampatoken.com"
                  color="success.dark"
                  sx={{
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  soporte@pampatokens.com
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </StyledCard>

        {/* Security Note */}
        
      </Container>
    </Box>
  )
}

export default ForgotPassword