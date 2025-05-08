import React,{useEffect, useState, useMemo} from 'react'
import { 
    Box, 
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    CircularProgress,
    TextField,
    Button,
    Skeleton,
    IconButton
} from '@mui/material'
import {
    DataGrid,
    GridColDef,
    GridCellParams,
    GridOverlay,
  } from "@mui/x-data-grid"
import { userStore } from '../../utils/store'
import ReplayIcon from '@mui/icons-material/Replay'
import { TableSkeleton } from '../skeletons/MUIGridSkeleton'
import { CustomLoadingOverlay } from '../skeletons/MUIGridOverlay'
import { AltRoute } from '@mui/icons-material'
import { customLocaleText } from '../../utils/locale'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface Token {
    tokenId: string
    tokenName: string
    tokenSymbol: string
    tokenAmount: number
    tokenPaidPrice: number
    tokenLastPrice: number
    tokenExpiringDate: string
}

interface PortfolioDialogProps {
    open: boolean
    onClose: () => void
}

const PortfolioDialog: React.FC<PortfolioDialogProps> = ({ open, onClose}) => {
    const [tokens, setTokens] = useState<Token[] | null>(null)
    const [currentTokenValues, setCurrentTokenValues] = useState<Token[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

        const tokenData = userStore((state)=>state.tokenData)
        const isLoggedIn = userStore((state)=>state.isLoggedIn)
        const userId = userStore((state)=>state.userId)

        console.log(userId)
        console.log(tokenData)

        const trendingMapper = (currentValue: number, previousValue: number) => {
            if (currentValue === previousValue) {
                return <TrendingFlatIcon color='info' />
            } else if (currentValue > previousValue) {
                return <TrendingUpIcon color='primary'/>
            } else if (currentValue < previousValue) {
                return <TrendingDownIcon color='error'/>
            }
        }

    useEffect(()=>{
        if (userId) {
            
            const fetchTokens = async () => {
                setIsLoading(true)
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-portfolio?userId=${userId}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenData.token}`
                        }
                })
                const data = await response.json()
                setTokens(data)
                setIsLoading(false)
                if(!response.ok){
                    alert('Error recuperando sus tokens')
                    throw new Error(data.message)
                }
            }
            fetchTokens()
        }
    },[])

    useEffect(()=>{
        if (tokens) {
           try{
             const fetchCurrentTokenValues = async () => {
                setIsLoading(true)
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tokens-values`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenData}`
                        }
                        })
                const data = await response.json()
                setCurrentTokenValues(data)
                setIsLoading(true)
                if(!response.ok){
                    alert('Error recuperando los valores de mercado')
                    throw new Error(data.message)
                }
             }
             fetchCurrentTokenValues()
           } catch(e){
            console.error(e)
           }
        }

    },[tokens])


    const columns = useMemo<GridColDef<(typeof rows)[number]>[]>(
        () => [
          {
            field: "tokenName",
            headerName: "nombre",
            width: 130,
            editable: false,
          },
          {
            field: "tokenSymbol",
            headerName: "símbolo",
            width: 120,
            editable: false,
          },
          {
            field: "tokenAmount",
            headerName: "amount",
            width: 150,
            editable: false,
          },
          {
            field: "tokenPaidPrice",
            headerName: "precio de compra",
            width: 100,
            editable: false,
          },
          {
            field: "tokenLastPrice",
            headerName: "último precio",
            width: 100,
            editable: false,
          },
          {
            field: "tokenAppreciation",
            headerName: "variación",
            width: 100,
            editable: false,
            renderCell: (params: GridCellParams) => {
                const appreciation = params.row.tokenAppreciation
                const tokenPaid = params.row.tokenPaidPrice * params.row.tokenAmount
                return (
                  <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 1.5
                  }}
                  >
                    {trendingMapper(appreciation, tokenPaid)}
                    <Typography>
                        {`$${Number(appreciation).toFixed(2)}`}
                    </Typography>
                  </Box>
                  
                )
              },
          },
          {
            field: "expiringDate",
            headerName: "fecha de caducidad",
            width: 100,
            editable: false,
          },
          
        ],
        [],
      )
    
     


      const rows =
          (tokens ?? []).map((token: Token, index: number) => ({
            id: index,
            tokenId: token.tokenId,
            tokenName: token.tokenName,
            tokenSymbol: token.tokenSymbol,
            tokenAmount: token.tokenAmount,
            tokenPaidPrice: token.tokenPaidPrice,
            tokenLastPrice: token.tokenLastPrice,
            tokenAppreciation: (currentTokenValues?.find((t) => t.tokenSymbol === token.tokenSymbol)?.tokenLastPrice ?? 0) * token.tokenAmount,
            expiringDate: token.tokenExpiringDate
          }))
        
      



  return (
    <Dialog
    open={open}
    onClose={onClose}
    fullScreen
    >
        <DialogTitle
        color='primary'
        sx={{
            fontFamily: 'PTSerif-Bold'
        }}
        >
            Mi portfolio
        </DialogTitle>
        <DialogContent>
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
            <Button
            onClick={onClose}
            >
                cerrar
            </Button>
        </DialogContent>
    </Dialog>
  )
}

export default PortfolioDialog