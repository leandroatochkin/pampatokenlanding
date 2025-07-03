import React, { useEffect, useCallback } from 'react'
import { 
    Paper,
    Typography,
    Box,
    Button,
    IconButton,
    Tooltip,
    Menu,
    MenuItem       
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
//import LogoutIcon from '@mui/icons-material/Logout';
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
import { Settings } from '@mui/icons-material';
import { Refresh } from '@mui/icons-material';
import dayjs from 'dayjs';

interface LoadingStates {
    buyValue: boolean
    sellValue: boolean
    fetchingToken: boolean
    isDeletingAccount: boolean
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
    fetchingToken: false,
    isDeletingAccount: false
})
const [dialogStates, setDialogStates] = React.useState<DialogStates>({
    buyTokenDialog: false,
    sellTokenDialog: false,
    portfolioDialog: false,
    movementsDialog: false,
    settingsDialog: false
})
const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
const open = Boolean(anchorEl);

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
     
    const handleLogout = async () => {
        if(confirm(`¿Estás seguro de salir?`)){
            navigate('/')
            try {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (e) {
    console.error('Logout request failed', e);
  }

  userStore.getState().logout(); // clear state
  navigate('/'); // or wherever you want to redirect   
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

  const handleDeleteAccount = async () => {
    if(confirm(`¿Está seguro que quiere borrar su cuenta? Esta acción no tiene retorno.`)){
        if(confirm(`Por favor confirme nuevamente que quiere borrar su cuenta.`)){
             setIsLoading(prev => ({
            ...prev,
            isDeletingAccount: true
             }));
            try{
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/delete-account/${userId}`,{
                    credentials: 'include',
                    method: 'DELETE'
                })
                if(!response.ok){
                    alert(`Error al borrar su cuenta.`)
                    setIsLoading(prev => ({
                    ...prev,
                    isDeletingAccount: false
                    }));
                    return
                }
                alert(`Cuenta eliminada exitosamente.`)
                 setIsLoading(prev => ({
                    ...prev,
                    isDeletingAccount: false
                    }));
                navigate('/')
                userStore.getState().logout()
            } catch(e){
                console.error(e)
                 setIsLoading(prev => ({
                    ...prev,
                    isDeletingAccount: false
                    }));
                alert(`Error al borrar su cuenta.`)
            }
        } return
    } return
  }

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const SettingsMenu = () => {
    return(
        <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        <MenuItem onClick={handleDeleteAccount}>Eliminar cuenta</MenuItem>
      </Menu>
    )
  }

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
    aria-label="Operaciones - Página principal"
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
        aria-label="Contenedor principal"
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
           aria-label="Encabezado de usuario"
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
            aria-label="Acciones de usuario"
            sx={{
                display: 'flex',
                width: {xs: '100%', sm: '50%'},
                justifyContent: {
                    xs: 'space-between',
                    sm: 'flex-end'
                },
                mb: {xs: 1, sm: 0}
            }}
            >
            <Paper
            elevation={4}
            aria-label="Datos del usuario"
            sx={{
                 width: {xs: '100%', sm: 'auto'},
                 display: 'flex',
                 border: '1px solid #ccc',
                 gap: '5px',
                 borderRadius: 2,
                 justifyContent: 'flex-end',
                 p: 1,
                 alignItems: 'center'
            }}
            >
                <Typography>
                    {userFirstName}
                </Typography>
                <Typography>
                    {userLastName}
                </Typography>
                <Tooltip title="Opciones" arrow>
                <IconButton
                aria-label="Opciones"
                sx={{
                    ml: 2,
                    border: '1px solid #ccc',
                }}
                onClick={handleSettingsClick}
                >
                    <Settings />
                </IconButton>
                
            </Tooltip>
            <SettingsMenu />
            <Tooltip title="Refrescar datos" arrow>
                <IconButton
                aria-label="Refrescar datos"
                sx={{
                    ml: 2,
                    border: '1px solid #ccc',
                }}
                onClick={()=>setRefetchTrigger(prev => prev + 1)}
                >
                    <Refresh />
                </IconButton>
            </Tooltip>
            {/* <Tooltip title="Cerrar sesión" arrow>
                <IconButton
                aria-label="Cerrar sesión"
                sx={{
                    ml: 2,
                    border: '1px solid #ccc',
                }}
                onClick={handleLogout}
                >
                    <LogoutIcon />
                </IconButton>
            </Tooltip> */}
            </Paper>
            
            </Box>
           </Box>
           {
            userIsVerified !== 'A' && (
                <Paper 
                aria-label="Estado de verificación"
                elevation={6}
                sx={{
                    background: userIsVerified === 'X' ? 'red' : 'green',
                    borderRadius: 2,
                    width: '100%',
                    mb: {xs: 1, sm: 0}
                }}
                >
                    <Typography
                    sx={{
                        color: '#f5f5f5'
                    }}
                    >
                        {
                            userIsVerified === 'X'
                            ?
                            'Tu cuenta se encuentra bloqueada. Por favor comunicate con PampaTokens para solucionar este inconveniente.'
                            :
                            'Tu cuenta está siendo verificada. Cuando esté lista te avisaremos.'
                        }
                    </Typography>
                </Paper>
            )
           }
            <Box
            aria-label="Tabla de operaciones"
            sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-evenly',
                background: 'BLUE',
                mb: {xs: 1, sm: 0}
            }}
            >
                {
                        !isLoading.fetchingToken
                        ?
                        (
                          <DataGrid
                          aria-label="Listado de operaciones"
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
                aria-label="Acciones principales"
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
                aria-label="Comprar tokens"
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
                disabled={userIsVerified !== 'A'}
                >
                    <MonetizationOnIcon sx={{ mr: 1 }} />
                    comprar
                </MotionButton>
                <MotionButton
                  aria-label="Vender tokens"
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
                  disabled={userIsVerified !== 'A'}
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
                  aria-label="Ver portfolio"
                  variant='contained'
                  sx={{
                    width: {xs: '95%', md: '50%'},
                }}
                onClick={
                    () =>{
                        handleDialogOpen('portfolioDialog')
                    }
                }
                disabled={userIsVerified === 'P'}
                >
                    portfolio
                </Button>
                <Button
                  aria-label="Ver mis operaciones"
                  variant='contained'
                  sx={{
                    width: {xs: '95%', md: '50%'},
                }}
                onClick={
                    () =>{
                        handleDialogOpen('movementsDialog')
                    }
                }
                disabled={userIsVerified === 'P'}
                >
                    mis operaciones
                </Button>
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