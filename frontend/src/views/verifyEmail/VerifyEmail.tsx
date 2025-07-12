import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import {
  CheckCircle,
  ArrowForward,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';




const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(8px)',
  boxShadow: theme.shadows[24],
  border: 'none',
}));



const SuccessIconContainer = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.light,
  marginBottom: theme.spacing(2),
}));


const VerifyEmail: React.FC = () => {
const [loading, setLoading] = useState<boolean>(true)
const [errorFlag, setErrorFlag] = useState<boolean>(false)
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const token = queryParams.get('token');
const navigate = useNavigate()

useEffect(() => {
  if (!token) return;

  const fetchVerify = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/verify-email?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Error verifying email.');
        alert('Hubo un error al verificar su email. Por favor contáctese con soporte@pampatokens.com.ar');
        setErrorFlag(true)
      } 

    } catch (e) {
      alert('Hubo un error al verificar su email. Por favor contáctese con soporte@pampatokens.com.ar');
      console.error(e);
      setErrorFlag(true)
    } finally {
      setLoading(false);
    }
  };

  fetchVerify();
}, [token]);

const handleContinue = () => {
    navigate(`/`)
}


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
        {/* Logo */}
       

        {/* Success Card */}
        <StyledCard>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            {/* Success Icon */}
            <Box mb={3}>
              <SuccessIconContainer>
                
                {
                loading ? <CircularProgress size={30} color='secondary'/> : <CheckCircle sx={{ fontSize: 48, color: '#f5f5f5' }} />
                }
              </SuccessIconContainer>             
            </Box>

            {/* Success Message */}
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center'
            }}
            >
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              color="success.dark"
              gutterBottom
            >
              {
                loading ? `Verificando Email` : `¡Email Verificado!`
              }
            </Typography>
            
            </Box>
            {
                loading ? null : (
                    !errorFlag ? (
                      <Typography
                      variant="body1"
                      color="success.dark"
                      sx={{ mb: 3, lineHeight: 1.6 }}
                    >
                      Tu dirección de correo electrónico ha sido verificada exitosamente. 
                      Ya podés acceder a todas las funcionalidades de PampaTokens.
                    </Typography>
                    ) : (
                      <Typography
                      variant="body1"
                      color="error"
                      sx={{ mb: 3, lineHeight: 1.6 }}
                    >
                      Hubo un error al verificar tu dirección de correo electrónico. 
                    </Typography>
                    )
                )
            }

   

            {/* Countdown and Button */}
            <Box>
              

              <Button
                onClick={handleContinue}
                disabled={loading || errorFlag}
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
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                Continuar a PampaTokens
              </Button>
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
  );
};

export default VerifyEmail;