import { useEffect, useState } from 'react';
import { 
  Typography, 
  Button, 
  Box,  
} from '@mui/material';
import { ArrowForwardIos, ArrowDropDown } from '@mui/icons-material';
import HomeCard from '../../components/cards/HomeCard';
import { useMobile } from '../../utils/hooks';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../utils/store';



const Home = () => {
const [_, setScrollY] = useState<number>(0)
const isMobile = useMobile()
  
const navigate = useNavigate()


    
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
      const el = document.getElementById('login')
     try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth`, {
        method: 'GET',
        credentials: 'include'
      })
      const data = await res.json()

      if (res.ok && data.isAuthenticated) {
        userStore.getState().setAuthStatus(true, data.userId)
        navigate('/operations')
      } else {

       el?.scrollIntoView({ behavior: 'smooth' })
      }
    } catch (err) {
      el?.scrollIntoView({ behavior: 'smooth' })
    }
    
  }

  return (
        <Box
        id='home'
        sx={{
            width: '100vw',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
        }}
        >
            <Box>
                <Typography
                variant={isMobile ? 'h3' : 'h1'}
                color='#43A047'
                fontWeight='bolder'
                sx={{
                    textShadow: '0px 3px 5px rgba(0,0,0,0.6)',
                    textAlign: {
                      xs: 'left',
                      md: 'center',
                    },
                    mr: {
                      sm: 2,
                      xs: 0
                    },
                    pl: 1,
                    fontFamily: 'PTSerif-Bold, sans-serif', 
                }}
                >
                    El Futuro de la Inversión Agrícola
                </Typography>
                <Typography
                color='#f5f5f5'
                variant={isMobile ? 'h5' : 'h3'}
                sx={{
                    textShadow: '0px 3px 5px rgba(0,0,0,0.6)',
                    textAlign: {
                      xs: 'left',
                      md: 'center',
                    },
                    fontFamily: 'PTSerif-Regular, sans-serif',
                    pl: 1,

                }}
                >
                    Tokenización de producción ágricola de tierras
                </Typography>
                <Button
                variant='contained'
                endIcon={isMobile ? <ArrowDropDown/> : <ArrowForwardIos/>}
                sx={{
                    background: '#43A047',
                    mt: 4,
                    p: 2,
                    borderRadius: 4
                }}
                onClick={handleStartOperating}
                >
                    comenzar
                </Button>
            </Box>
            <Box
            sx={{
                width: '100vw',
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    sm: 'row',
                    md: 'row'
                },
                mt: 4,
                gap: {
                    xs: 4,
                    sm: 2,
                },
                justifyContent: {
                    md: 'space-around',
                },
              
            }}
            >
                {
                    featureItems.map((feature, index)=>(
                        <HomeCard 
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        />
                    ))
                }
            </Box>
        </Box>
  );
};

export default Home;