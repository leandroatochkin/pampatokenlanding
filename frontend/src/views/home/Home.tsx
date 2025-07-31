import { useEffect, useState } from 'react';
import { 
  Typography, 
  Button, 
  Box,
  CircularProgress  
} from '@mui/material';
import { ArrowForwardIos, ArrowDropDown } from '@mui/icons-material';
import HomeCard from '../../components/cards/HomeCard';
import { useMobile } from '../../utils/hooks';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../utils/store';
import { Helmet } from 'react-helmet-async';
//import { theme } from '../../utils/theme';




const Home = () => {
const [, setScrollY] = useState<number>(0)
const [closeCookieAdvisor, setCloseCookieAdvisor] = useState<boolean>(false)
const [loading, setLoading] = useState<boolean>(false)
const isMobile = useMobile()
  
const navigate = useNavigate()

const clientBrowser = navigator.userAgent

    
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const CookieAdvisor = () => {
    return(
      <Box
      sx={{
        width: '70vw',
        display: 'flex',
        alignItems: 'center',
        background: 'teal',
        fontColor: '#f5f5f5',
        borderRadius: 2,
        alignSelf: 'center',
        p: 1,
        justifyContent: 'space-between',
        mt: 5
      }}
      >
        <Typography>
          {"Esta página usa la mínima cantidad de cookies para mantenerte logueado. Por favor desactivá 'Prevenir tracking entre sitios' en Safari > ajustes > privacidad > website tracking. Ante cualquier duda, ¡consultanos!"}
        </Typography>
        <Button
        onClick={
          ()=>setCloseCookieAdvisor(true)
        }
        sx={{
          color: '#f5f5f5',
          fontWeight: 'bold'
        }}
        >
          x
        </Button>
      </Box>
    )
  }

  useEffect(() => {
  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();
  const isAndroidUA = ua.includes("android");
  const isWindowsPlatform = platform.includes("win");

  if (isAndroidUA && isWindowsPlatform) {
    alert("Tu navegador está configurado con un agente de usuario poco común. Esto podría causar problemas de visualización.");
  }
}, []);


  const featureItems = [
    {
      title: "Tokenización de Tierras",
      description: "Inversión fraccionada en tierras agrícolas de alta calidad",
      icon: "🌱",
    },
    {
      title: "Producción Sustentable",
      description: "Apoye proyectos agrícolas con prácticas ambientalmente responsables",
      icon: "🌿",
    },
    {
      title: "Mercado Transparente",
      description: "Comercio seguro y verificable a través de tecnología blockchain",
      icon: "🔄",
    },
  ];

 const handleStartOperating = async () => {
  const el = document.getElementById('login');
  setLoading(true);

  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth`, {
      method: 'GET',
      credentials: 'include',
    });

    const authData = await res.json();

    if (res.ok && authData.isAuthenticated) {
      // Set auth state
      userStore.getState().setAuthStatus(
        true,
        authData.userId,
        authData.userFirstName,
        authData.userLastName,
        authData.userEmail,
        authData.isVerified,
        authData.emailVerified
      );

      setTimeout(() => {
        try {
          // Clean up any lingering tooltips, modals, etc.
          document.querySelectorAll('[role="tooltip"], .MuiPopover-root, .MuiDialog-root').forEach(el => el.remove());

          // Safe navigation
          navigate('/operations');
        } catch (e) {
          console.error('Navigation failed, fallback to hard redirect', e);
          window.location.href = '/operations';
        }
      }, 50); // Slight delay helps flush the DOM
    } else {
      setLoading(false);
      requestAnimationFrame(() => {
        el?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  } catch (err) {
    console.error('Auth check failed:', err);
    setLoading(false);
    requestAnimationFrame(() => {
      el?.scrollIntoView({ behavior: 'smooth' });
    });
  }
};



  return (
    <>
    <Helmet>
      <title>Inicio | PampaTokens</title>
      <meta
        name="description"
        content="Plataforma segura para comprar y vender tokens respaldados en agricultura."
      />
    </Helmet>
    <Box
      id="home"
      aria-label="Sección de inicio"
      sx={{
        width: '100vw',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}
    >
      {clientBrowser.includes('Safari') &&
        !clientBrowser.includes('Chrome') &&
        !clientBrowser.includes('Edge') &&
        !closeCookieAdvisor && <CookieAdvisor />}

      <Box aria-label="Texto principal de bienvenida">
        <Typography
          variant={isMobile ? 'h3' : 'h1'}
          component={'h1'}
          color='secondary'
          fontWeight="bolder"
          sx={{
            textShadow: '0px 3px 5px rgba(0,0,0,0.6)',
            textAlign: {
              xs: 'left',
              sm: 'center',
            },
            mr: {
              sm: 2,
              xs: 0,
            },
            pl: 1,
            fontFamily: 'PTSerif-Bold, sans-serif',
          }}
        >
          El Futuro de la Inversión Agrícola
        </Typography>
        <Typography
          color="#f5f5f5"
          variant={isMobile ? 'h5' : 'h3'}
          component={'h2'}
          sx={{
            textShadow: '0px 3px 5px rgba(0,0,0,0.6)',
            textAlign: {
              xs: 'left',
              sm: 'center',
            },
            fontFamily: 'PTSerif-Regular, sans-serif',
            pl: 1,
          }}
        >
          Tokenización de producción ágricola de tierras
        </Typography>
        <Button
        variant="contained"
        endIcon={isMobile ? <ArrowDropDown /> : <ArrowForwardIos />}
        sx={{
          background: '#2E7D32',
          mt: 4,
          p: 2,
          borderRadius: 4,
        }}
        onClick={handleStartOperating}
        aria-label="Comenzar a operar"
        disabled={loading}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100px', // prevent layout shift
            height: '24px',
          }}
        >
          {loading ? <CircularProgress size={20} /> : 'comenzar'}
        </Box>
      </Button>

      </Box>
      <Box
        aria-label="Características destacadas"
        sx={{
          width: '100vw',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
            md: 'row',
          },
          mt: 4,
          gap: {
            xs: 4,
            sm: 2,
          },
          justifyContent: {
            md: 'space-around',
          }
        }}
      >
        {featureItems.map((feature, index) => (
          <HomeCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </Box>
    </Box>
    </>
  );
};

export default Home;