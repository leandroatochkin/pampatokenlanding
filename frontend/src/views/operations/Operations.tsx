import React, { useEffect, useCallback } from 'react'
import { 
    Paper,
    Typography,
    Box,
    Button,
    CircularProgress,
    IconButton       
 } from '@mui/material'
 import { motion } from 'framer-motion'
 import { LiveChart } from '../../components/charts/RTValueChart'
 import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
 import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
 import BuyTokenDialog from '../../components/dialogs/BuyTokenDialog'
 import SellTokenDialog from '../../components/dialogs/SellTokenDialog'
 import PortfolioDialog from '../../components/dialogs/PortfolioDialog'
 import MovementsDialog from '../../components/dialogs/MovementsDialog'
 import { userStore } from '../../utils/store'
 import { TokenDTO, TokenInfo } from '../../utils/interfaces'
import NotFound from '../notFound/NotFound';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

interface LoadingStates {
    buyValue: boolean
    sellValue: boolean
    fetchingToken: boolean
}

interface DialogStates {
    buyTokenDialog: boolean
    sellTokenDialog: boolean
    portfolioDialog: boolean
    movementsDialog: boolean
    settingsDialog: boolean
}





const Operations = () => {
const [sellValue, setSellValue] = React.useState<number>(0)
const [buyValue, setBuyValue] = React.useState<number>(0)
const [tokens, setTokens] = React.useState<TokenDTO[] | null>(null)
const [currentToken, setCurrentToken] = React.useState<TokenInfo | null>(null)
const [refetchTrigger, setRefetchTrigger] = React.useState<number>(0);
const [isLoading, setIsLoading] = React.useState<LoadingStates>({
    buyValue: false,
    sellValue: false,
    fetchingToken: false
})
const [dialogStates, setDialogStates] = React.useState<DialogStates>({
    buyTokenDialog: false,
    sellTokenDialog: false,
    portfolioDialog: false,
    movementsDialog: false,
    settingsDialog: false
})

const navigate = useNavigate()

const handleDialogOpen = (dialog: keyof DialogStates) => {
    setDialogStates((prev) =>
        ({ ...prev, [dialog]: true }))
}

const handleDialogClose = (dialog: keyof DialogStates) =>{
        setDialogStates((prev) =>
            ({ ...prev, [dialog]: false }))
}

    const tokenData = userStore((state)=>state.tokenData)
    const isLoggedIn = userStore((state)=>state.isLoggedIn)
    const userId = userStore((state)=>state.userId)





    useEffect(()=>{
        if(isLoggedIn && userId){
            try{
                const fetchLatestVal = async () =>{
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-value`,{
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${tokenData.token}`
                    }})
                    const data = await response.json()
                    setCurrentToken(data.valuation)
                    setSellValue(data.valuation.VALOR_VENTA)
                    setBuyValue(data.valuation.VALOR_COMPRA)
                }
                fetchLatestVal()
            } catch(e){
                console.error(e)
            }
        }
    },[])

    const fetchTokens = useCallback(async () => {
        if (!userId) return;
    
        setIsLoading(prev => ({
            ...prev,
            fetchTokens: true
        }));
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-portfolio?userId=${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenData.token}`
                }
            });
    
            const data = await response.json();
            if (!response.ok) {
                alert('Error recuperando sus tokens');
                throw new Error(data.message);
            }
    
            setTokens(data);
        } catch (err) {
            console.error('Fetch failed:', err);
        } finally {
            setIsLoading(prev => ({
                ...prev,
                fetchTokens: false
            }));
        }
    }, [userId, tokenData.token]);
    
    useEffect(() => {
        fetchTokens();
    }, [fetchTokens, refetchTrigger]);
     
    const handleLogout = () => {
        if(confirm(`¿Estás seguro de salir?`)){
            navigate('/')
            userStore.getState().logout()   
        } return
    }

const MotionButton = motion(Button);


const formattedSellValue = Number(sellValue / 100).toFixed(2).replace('.', ',')
const formattedBuyValue = Number(buyValue / 100).toFixed(2).replace('.', ',')

  return (
    <>
    {
        (tokenData && isLoggedIn && userId) ? (
            <>
    {
        dialogStates.buyTokenDialog && currentToken && 
        <BuyTokenDialog 
        open={dialogStates.buyTokenDialog} 
        onClose={() => handleDialogClose('buyTokenDialog')} 
        tokens={currentToken}
        refetch={()=>setRefetchTrigger(prev => prev + 1)}
        />
    }
    {
        dialogStates.sellTokenDialog && currentToken && 
        <SellTokenDialog open={dialogStates.sellTokenDialog} 
        onClose={() => handleDialogClose('sellTokenDialog')} 
        sellValue={sellValue} 
        ownedTokens={(tokens ? tokens.reduce((total, token) => total + token.tokenAmount, 0) : 0)} 
        tokens={currentToken}
        refetch={()=>setRefetchTrigger(prev => prev + 1)}
        />
    }
    {
        dialogStates.portfolioDialog && 
        <PortfolioDialog 
        open={dialogStates.portfolioDialog} 
        onClose={() => handleDialogClose('portfolioDialog')} 
        tokenLastPrice={buyValue} 
        tokens={tokens || []}/>
    }
    {
        dialogStates.movementsDialog &&
        <MovementsDialog 
        open={dialogStates.movementsDialog}
        onClose={() => handleDialogClose('movementsDialog')} 
        />
    }
    <Box
    sx={{
        height: '100dvh',
        width: '100vw',
        backgroundColor: '#2E7D32',
        textShadow: '0px 3px 5px rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}
    >
        <Paper
        elevation={3}
        sx={{
            height: '90%',
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: '#f5f5f5',
            borderRadius: {
                xs: 2,
                md: 8
            },
            padding: {
                xs: 0,
                md: 2
            },
            justifyContent: 'space-evenly',
            overflow: 'auto'
        }}
        >   
           <Box
           sx={{
            display: 'flex',
            flexDirection: {
                xs: 'column',
                sm: 'row',
            },
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
           }}
           >
                 <Typography
            fontFamily={'PTSerif-Bold, sans-serif'}
            color='secondary'
            sx={{
                fontSize: {
                    xs: '1.5rem',
                    md: '3.5rem'
                },
                textAlign: {
                    xs: 'center',
                    md: 'left'
                },
                width: '100%',
            }}
            >
                operaciones
            </Typography>
            <Box
            sx={{
                border: '1px solid #ccc',
                p: 1,
                display: 'flex',
                justifyContent: {
                    xs: 'space-evenly',
                    sm: 'space-between'
                },
                width: {
                    xs: '100%',
                    sm: '20%'
                },
                borderRadius: {
                    xs: 0,
                    sm: 4
                }
            }}
            >
                <Typography
                sx={{
                    fontWeight: 'bold',
                }}
                >
                    Tokens disponibles
                </Typography>
                <Typography>
                    {tokens?.reduce((total, token) => total + token.tokenAmount, 0)}
                </Typography>
            </Box>
            <IconButton
            sx={{
                ml: 2,
                border: '1px solid #ccc',
            }}
            onClick={handleLogout}
            >
                <LogoutIcon />
            </IconButton>
           </Box>
            <Box
            sx={{
                display: 'flex',
                flexDirection:{
                    xs: 'column',
                    md: 'row'
                },
                gap: 2,
                width: '100%',
                height: '30%',
                justifyContent: 'space-evenly',
            }}
            >
                <Box
                sx={{
                    width: {
                        xs: '100%',
                        md: '40%'
                    },
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    boxShadow: `20px 20px 60px #bebebe,
             -20px -20px 60px #ffffff;`,
                    borderRadius: {
                        xs: 0,
                        sm: 4,
                    },
                }}
                >
                    <Typography
                    variant='h4'
                    fontFamily={'PTSerif-Bold, sans-serif'}
                    color='#16a34a'
                    textAlign='center'
                    >
                        compra
                    </Typography>
                    <Box>
                        {
                            isLoading.buyValue
                            ?
                            (
                                <CircularProgress size={24} sx={{ color: '#2E7D32' }} />
                            )
                            :
                            (
                                <Typography
                                    variant='h3'
                                    fontFamily={'PTSerif-Bold, sans-serif'}
                                    color='#166534'
                                    textAlign='center'
                                    >
                                        ${formattedBuyValue}
                                    </Typography>
                            )

                        }
                    </Box>
                </Box>
                
                <Box
                sx={{
                    width: {
                        xs: '100%',
                        md: '40%'
                    },
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    boxShadow: `inset 20px 20px 60px #bebebe,
            inset -20px -20px 60px #ffffff;`,
            borderRadius: {
                xs: 0,
                sm: 4,
            },
                }}
                >
                    <Typography
                    variant='h4'
                    fontFamily={'PTSerif-Bold, sans-serif'}
                    color='#d97706'
                    textAlign='center'
                    >
                        venta
                    </Typography>
                    <Box>
                        {
                            isLoading.sellValue
                            ?
                            (
                                <CircularProgress size={24} sx={{ color: '#2E7D32' }} />
                            )
                            :
                            (
                                <Typography
                                    variant='h3'
                                    fontFamily={'PTSerif-Bold, sans-serif'}
                                    color='#92400e'
                                    textAlign='center'
                                    >
                                        ${formattedSellValue}
                                    </Typography>
                            )

                        }
                    </Box>
                </Box>
            </Box>

           
            <LiveChart 
            buyValue={buyValue}
            sellValue={sellValue}
            time={new Date().toLocaleTimeString()}
            />
      

                <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: {xs: 'column', md: 'row'},
                    gap: 2,
                    mt: 4,
                }}
                >
                <MotionButton
                variant='contained'
                sx={{
                    width: {xs: '100%', md: '50%'},
                    background: 'radial-gradient(circle at 10% 25%, rgba(34, 197, 94, 0.9) 0%, rgba(22, 163, 74, 0.9) 50%, rgba(21, 128, 61, 0.9) 100%)',
                    display: 'flex',
                    p: 1,
                    fontWeight: 'bold',
                    fontSize: '1.3rem',
                }}
                whileHover={{
                    boxShadow: "0 10px 25px -5px rgba(34,197,94,0.5), 0 0 10px rgba(255, 255, 255, 0.4) inset"
                  }}
                onClick={
                    () =>{
                        handleDialogOpen('buyTokenDialog')
                    }
                }
                >
                    <MonetizationOnIcon sx={{ mr: 1 }} />
                    comprar
                </MotionButton>
                <MotionButton
                  variant='contained'
                  sx={{
                    width: {xs: '100%', md: '50%'},
                    background: 'radial-gradient(circle at 90% 25%, rgba(217, 119, 6, 0.9) 0%, rgba(180, 83, 9, 0.9) 50%, rgba(146, 64, 14, 0.9) 100%)',
                    display: 'flex',
                    p: 1,
                    fontWeight: 'bold',
                    fontSize: '1.3rem',
                }}
                whileHover={{
                    boxShadow: "0 10px 25px -5px rgba(217, 119, 6, 0.5), 0 0 10px rgba(255, 255, 255, 0.4) inset"
                  }}
                  onClick={
                    () =>{
                        handleDialogOpen('sellTokenDialog')
                    }
                }
                >
                    <CurrencyExchangeIcon sx={{ mr: 1 }} />
                    vender
                </MotionButton>
                <Button
                  variant='contained'
                  sx={{
                    width: {xs: '100%', md: '50%'},
                }}
                onClick={
                    () =>{
                        handleDialogOpen('portfolioDialog')
                    }
                }
                >
                    portfolio
                </Button>
                <Button
                  variant='contained'
                  sx={{
                    width: {xs: '100%', md: '50%'},
                }}
                onClick={
                    () =>{
                        handleDialogOpen('movementsDialog')
                    }
                }
                >
                    mis operaciones
                </Button>
                {/* <Button
                  variant='contained'
                  sx={{
                    width: {xs: '100%', md: '50%'},
                }}
                >
                    Ajustes
                </Button> */}
                </Box>
        </Paper>
    </Box>
    </>
        )
        :
        (
    <NotFound />
        )
    }
    
    </>
  )
}

export default Operations