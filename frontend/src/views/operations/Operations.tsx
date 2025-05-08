import React, { useEffect } from 'react'
import { 
    Container,
    Paper,
    Typography,
    Box,
    Divider,
    Button,
    CircularProgress       
 } from '@mui/material'
 import { motion } from 'framer-motion'
 import { useMobile } from '../../utils/hooks'
 import { LiveChart } from '../../components/charts/RTValueChart'
 import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
 import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
 import BuyTokenDialog from '../../components/dialogs/BuyTokenDialog'
 import SellTokenDialog from '../../components/dialogs/SellTokenDialog'
 import PortfolioDialog from '../../components/dialogs/PortfolioDialog'
 import { userStore } from '../../utils/store'

interface LoadingStates {
    buyValue: boolean
    sellValue: boolean
}

interface DialogStates {
    buyTokenDialog: boolean
    sellTokenDialog: boolean
    portfolioDialog: boolean
    operationsDialog: boolean
    settingsDialog: boolean
}



const Operations = () => {
const [sellValue, setSellValue] = React.useState<number>(0)
const [buyValue, setBuyValue] = React.useState<number>(0)
const [ownedTokens, setOwnedTokens] = React.useState<number>(3)
const [isLoading, setIsLoading] = React.useState<LoadingStates>({
    buyValue: false,
    sellValue: false
})
const [dialogStates, setDialogStates] = React.useState<DialogStates>({
    buyTokenDialog: false,
    sellTokenDialog: false,
    portfolioDialog: false,
    operationsDialog: false,
    settingsDialog: false
})
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
                    setSellValue(data.valuation.VALOR_VENTA)
                    setBuyValue(data.valuation.VALOR_COMPRA)
                }
                fetchLatestVal()
            } catch(e){
                console.error(e)
            }
        }
    },[])


const isMobile = useMobile()

const MotionButton = motion(Button);


const formattedSellValue = Number(sellValue / 100).toFixed(2).replace('.', ',')
const formattedBuyValue = Number(buyValue / 100).toFixed(2).replace('.', ',')

  return (
    <>
    {
        dialogStates.buyTokenDialog && <BuyTokenDialog open={dialogStates.buyTokenDialog} onClose={() => handleDialogClose('buyTokenDialog')} buyValue={buyValue}/>
    }
    {
        dialogStates.sellTokenDialog && <SellTokenDialog open={dialogStates.sellTokenDialog} onClose={() => handleDialogClose('sellTokenDialog')} sellValue={sellValue} ownedTokens={ownedTokens}/>
    }
    {
        dialogStates.portfolioDialog && <PortfolioDialog open={dialogStates.portfolioDialog} onClose={() => handleDialogClose('portfolioDialog')}/>
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
            borderRadius: 8,
            padding: 4,
            justifyContent: 'space-evenly',
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
                    xs: '2rem',
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
                justifyContent: 'space-between',
                width: '20%',
                borderRadius: 4
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
                    {ownedTokens}
                </Typography>
            </Box>
           </Box>
            <Box
            sx={{
                display: 'flex',
                flexDirection:{
                    xs: 'column',
                    md: 'row'
                },
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
                    borderRadius: 4,
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
                    borderRadius: 4,
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
            value={buyValue}
            time='1d'
            />

                <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: {xs: 'column', md: 'row'},
                    gap: 2,
                    mt: 4
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
                >
                    mis operaciones
                </Button>
                <Button
                  variant='contained'
                  sx={{
                    width: {xs: '100%', md: '50%'},
                }}
                >
                    Ajustes
                </Button>
                </Box>
        </Paper>
    </Box>
    </>
  )
}

export default Operations