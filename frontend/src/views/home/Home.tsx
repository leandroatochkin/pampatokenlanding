import { useEffect, useState } from 'react';
import { 
  Typography, 
  Button, 
  Box,  
} from '@mui/material';
import { ArrowForwardIos, ArrowDropDown } from '@mui/icons-material';
import HomeCard from '../../components/cards/HomeCard';
import { useMobile } from '../../utils/hooks';



const Home = () => {
const [_, setScrollY] = useState<number>(0)
const isMobile = useMobile()
  

    
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
                variant='h1'
                color='#43A047'
                fontWeight='bolder'
                sx={{
                    textShadow: '0px 3px 5px rgba(0,0,0,0.6)',
                    fontSize: '5.5rem',
                    textAlign: {
                      xs: 'left',
                      md: 'center',
                    },
                    mr: 1,
                    fontFamily: 'PTSerif-Bold, sans-serif', 
                }}
                >
                    El Futuro de la Inversión Agrícola
                </Typography>
                <Typography
                variant='h3'
                color='#43A047'
                sx={{
                    textShadow: '0px 3px 5px rgba(0,0,0,0.6)',
                    textAlign: {
                      xs: 'left',
                      md: 'center',
                    },
                    fontFamily: 'PTSerif-Regular, sans-serif',
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
                onClick={() => {
                    const el = document.getElementById('login')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
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
                    md: 'row'
                },
                mt: 4,
                gap: {
                    xs: 4
                },
                justifyContent: {
                    md: 'space-evenly'
                }
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