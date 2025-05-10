import React,{useState, useMemo} from 'react'
import { 
    Box, 
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Button
} from '@mui/material'
import {
    DataGrid,
    GridColDef,
    GridCellParams,
  } from "@mui/x-data-grid"
import { TableSkeleton } from '../skeletons/MUIGridSkeleton'
import { CustomLoadingOverlay } from '../skeletons/MUIGridOverlay'
import { customLocaleText } from '../../utils/locale'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import dayjs from 'dayjs'


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
    tokenLastPrice: number
    tokens: Token[]
}

const PortfolioDialog: React.FC<PortfolioDialogProps> = ({ open, onClose, tokenLastPrice, tokens}) => {
    
    const [isLoading, _] = useState<boolean>(false)

     


        const trendingMapper = (currentValue: number, previousValue: number) => {
            if (currentValue === previousValue) {
                return <TrendingFlatIcon color='info' />
            } else if (currentValue > previousValue) {
                return <TrendingUpIcon color='primary'/>
            } else if (currentValue < previousValue) {
                return <TrendingDownIcon color='error'/>
            }
        }

    

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
            headerName: "cantidad",
            width: 150,
            editable: false,
          },
          {
            field: "tokenPaidPrice",
            headerName: "precio de compra",
            width: 130,
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
            width: 130,
            editable: false,
            renderCell: (params: GridCellParams) => {
                const appreciation = params.row.tokenAppreciation
                console.log(appreciation)
                const tokenPaid = params.row.tokenPaidPrice * params.row.tokenAmount
                console.log(tokenPaid)
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
            width: 150,
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
            tokenPaidPrice: Number(token.tokenPaidPrice/100).toFixed(2),
            tokenLastPrice:  Number(tokenLastPrice/100).toFixed(2),
            tokenAppreciation: Number((tokenLastPrice * token.tokenAmount)/100),
            expiringDate: dayjs(token.tokenExpiringDate).format('DD/MM/YYYY')
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
       {
        !isLoading
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
            <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2,
              width: '100%',
              mt: 6
            }}
            >
              <Button
            variant='contained'
            onClick={onClose}
            >
                cerrar
            </Button>
            </Box>
        </DialogContent>
    </Dialog>
  )
}

export default PortfolioDialog