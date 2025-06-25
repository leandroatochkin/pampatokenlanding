import React, { useEffect, useCallback } from 'react'
import { 
    Paper,
    Typography,
    Box,
    Button,
    IconButton,
    Tooltip,       
 } from '@mui/material'
 import { motion } from 'framer-motion'
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
import {
    DataGrid,
    GridCellParams,
  } from "@mui/x-data-grid"
import { TableSkeleton } from '../../components/skeletons/MUIGridSkeleton';
import { CustomLoadingOverlay } from '../../components/skeletons/MUIGridOverlay';
import { customLocaleText } from '../../utils/locale'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Refresh } from '@mui/icons-material';
import dayjs from 'dayjs';

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
const [tokens, setTokens] = React.useState<TokenInfo[] | null>(null)
const [portfolio, setPortfolio] = React.useState<TokenDTO[] | null>(null)
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

    const isLoggedIn = userStore((state)=>state.isLoggedIn)
    const userId = userStore((state)=>state.userId)
    const userFirstName = userStore((state)=>state.userFirstName)
    const userLastName = userStore((state)=>state.userLastName)
    const userIsVerified = userStore((state)=>state.userIsVerified)
    console.log(userId, userFirstName, userLastName, userIsVerified)


    const fetchData = useCallback(async () => {
         if(isLoggedIn && userId){
            try{
                setIsLoading(prev => ({
                    ...prev,
                    fetchingToken: true
                    }))
                const fetchLatestVal = async () =>{
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-value`,{
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                    }})
                    const data = await response.json()
                    setTokens(data.valuation)
                }
                fetchLatestVal()
            } catch(e){
                console.error(e)
                alert('Error recuperando los tokens')
            } finally{
                setIsLoading(prev => ({
                    ...prev,
                    fetchingToken: false
                    })) 
            }
        }
    }, [userId]);

    useEffect(()=>{
       fetchData();
    },[refetchTrigger, fetchData]);

    const fetchTokens = useCallback(async () => {
        if (!userId) return;
    
        setIsLoading(prev => ({
            ...prev,
            fetchTokens: true
        }));
    
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-portfolio?userId=${userId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            const data = await response.json();
            if (!response.ok) {
                alert('Error recuperando sus tokens');
                throw new Error(data.message);
            }
            setPortfolio(data);
        } catch (err) {
            console.error('Fetch failed:', err);
        } finally {
            setIsLoading(prev => ({
                ...prev,
                fetchTokens: false
            }));
        }
    }, [userId]);
    
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


        const trendingMapper = (currentValue: number, previousValue: number) => {
            if (currentValue === previousValue) {
                return <TrendingFlatIcon color='info' />
            } else if (currentValue > previousValue) {
                return <TrendingUpIcon color='primary'/>
            } else if (currentValue < previousValue) {
                return <TrendingDownIcon color='error'/>
            }
        }

    

    const columns =  [
          {
            field: "symbol",
            headerName: "símbolo",
            width: 130,
            editable: false,
          },
          {
            field: "tokenName",
            headerName: "nombre",
            width: 120,
            editable: false,
          },
          {
            field: "tokenBuy",
            headerName: "último precio",
            width: 150,
            editable: false,
          },
          {
            field: "tokenSell",
            headerName: "precio anterior",
            width: 130,
            editable: false,
          },
          {
            field: "tokenStock",
            headerName: "stock",
            width: 100,
            editable: false,
          },
          {
            field: "expiringDate",
            headerName: "fecha de vencimiento",
            width: 150,
            editable: false,
          },
          {
            field: "tokenAppreciation",
            headerName: "variación",
            width: 130,
            editable: false,
            renderCell: (params: GridCellParams) => {
                const appreciation = Number(Math.abs(params.row.tokenBuy.replace('$', ''))) - Number(Math.abs(params.row.tokenSell.replace('$', '')));
                return (
                  <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 1.5
                  }}
                  >
                    {trendingMapper(Number(Math.abs(params.row.tokenBuy.replace('$', ''))), Number(Math.abs(params.row.tokenSell.replace('$', ''))))}
                    <Typography>
                        {`$${Number(appreciation).toFixed(2)}`}
                    </Typography>
                  </Box>
                  
                )
              },
          },
          
        ]
    
     


const rows =
  (tokens?.filter(variation => variation.rn === 1) ?? []).map((token: TokenInfo, index: number) => {
    const previousVariation = tokens?.find(
      v => v.SIMBOLO === token.SIMBOLO && v.rn === 2
    );

    return {
      id: index,
      symbol: token.SIMBOLO,
      tokenName: token.NOMBRE,
      tokenBuy: `$${Number(token.VALOR_COMPRA / 100).toFixed(2)}`,
      tokenSell: previousVariation
        ? `$${Number(previousVariation.VALOR_COMPRA / 100).toFixed(2)}`
        : 'N/A',
      tokenStock: token.STOCK,
      expiringDate: dayjs(token.VENCIMIENTO).format('DD/MM/YYYY'),
      rn: token.rn,
    };
  });


  return (
    <>
    {
        (isLoggedIn && userId) ? (
            <>
        {
        dialogStates.buyTokenDialog && portfolio && 
        <BuyTokenDialog 
        open={dialogStates.buyTokenDialog} 
        onClose={() => handleDialogClose('buyTokenDialog')} 
        tokens={tokens?.filter(variation => variation.rn === 1) ?? []}
        refetch={()=>setRefetchTrigger(prev => prev + 1)}
        />
        }
        {
        dialogStates.sellTokenDialog && portfolio && 
        <SellTokenDialog open={dialogStates.sellTokenDialog} 
        onClose={() => handleDialogClose('sellTokenDialog')} 
        tokens={tokens ?? []}
        owned={portfolio}
        refetch={()=>setRefetchTrigger(prev => prev + 1)}
        />
        }
        {
        dialogStates.portfolioDialog && 
        <PortfolioDialog 
        open={dialogStates.portfolioDialog} 
        onClose={() => handleDialogClose('portfolioDialog')} 
        tokens={portfolio || []}/>
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
        background: `linear-gradient(40deg,rgba(46, 155, 42, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)`,
        textShadow: '0px 3px 5px rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}
    >
        <Paper
        elevation={3}
        sx={{
            height: {sm: '90%', xs: '100dvh'},
            width: {sm: '90%', xs: '100vw'},
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#f5f5f5',
            borderRadius: {
                xs: 0,
                md: 2
            },
            padding: 2,
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
                display: 'flex',
                width: {xs: '100%', sm: '50%'},
                justifyContent: {
                    xs: 'space-between',
                    sm: 'flex-end'
                }
            }}
            >
      
            <Tooltip title="Refrescar datos" arrow>
                <IconButton
            sx={{
                ml: 2,
                border: '1px solid #ccc',
            }}
            onClick={()=>setRefetchTrigger(prev => prev + 1)}
            >
                <Refresh />
            </IconButton>
            </Tooltip>
            <Tooltip title="Cerrar sesión" arrow>
                <IconButton
            sx={{
                ml: 2,
                border: '1px solid #ccc',
            }}
            onClick={handleLogout}
            >
                <LogoutIcon />
            </IconButton>
            </Tooltip>
            </Box>
           </Box>
            <Box
            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-evenly',
                background: 'BLUE'
            }}
            >
                {
                        !isLoading.fetchingToken
                        ?
                        (
                          <DataGrid
                          localeText={customLocaleText}  
                          rows={rows}
                          columns={columns}
                          pagination
                          pageSizeOptions={[10, 25, 50, 100]}
                          paginationMode="client"
                          rowCount={rows.length}
                          disableColumnFilter
                          disableColumnSelector
                          disableRowSelectionOnClick
                          sx={{
                            //opacity: isUnpaidNotesLoading || refreshLoading ? 0.7 : 1,
                            opacity: 1,
                            transition: "opacity 0.3s ease",
                            minHeight: "400px",
                            height: "calc(100vh - 300px)",
                            maxHeight: "600px",
                          }}
                          slots={{
                            loadingOverlay: CustomLoadingOverlay,
                          }}
                        />
                        )
                        :
                        (
                          <TableSkeleton />
                        )
                       }



            </Box>


      

                <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: {xs: 'column', md: 'row'},
                    gap: 2,
                    mb: {
                        xs: 2,
                        sm: 0
                    }
                }}
                >
                <MotionButton
                variant='contained'
                sx={{
                    width: {xs: '95%', md: '50%'},
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
                    width: {xs: '95%', md: '50%'},
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
                    width: {xs: '95%', md: '50%'},
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
                    width: {xs: '95%', md: '50%'},
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