import React,{useState, useMemo} from 'react'
import { 
    Box, 
    Dialog,
    DialogTitle,
    DialogContent,
    Button
} from '@mui/material'
import {
    DataGrid,
    GridColDef,
  } from "@mui/x-data-grid"
import { TableSkeleton } from '../skeletons/MUIGridSkeleton'
import { CustomLoadingOverlay } from '../skeletons/MUIGridOverlay'
import { customLocaleText } from '../../utils/locale'
import { TokenDTO, TokenInfo } from '../../utils/interfaces'


interface PortfolioDialogProps {
    open: boolean
    onClose: () => void
    portfolio: TokenDTO[]
    tokens: TokenInfo[]
}

const PortfolioDialog: React.FC<PortfolioDialogProps> = ({ open, onClose, portfolio, tokens}) => {

    const [isLoading, ] = useState<boolean>(false)

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
            field: "tokenActualPrice",
            headerName: "precio de compra",
            width: 130,
            editable: false,
          },
        ],
        [],
      )
    
     


      const rows =
          (portfolio ?? []).map((token: TokenDTO, index: number) => ({
            id: index,
            tokenId: token.tokenId,
            tokenName: token.tokenName,
            tokenSymbol: token.tokenSymbol,
            tokenAmount: token.tokenAmount,
            tokenPaidPrice: `$${Number(token.tokenPaidPrice/100).toFixed(2)}`,
            tokenActualPrice: `$${(Number(tokens.find((token)=>token.CODIGO_SIMBOLO === Number(portfolio[index].tokenSymbol))?.VALOR_COMPRA) / 100).toFixed(2)}`
          }))
        
      



  return (
    <Dialog
    open={open}
    onClose={onClose}
    fullScreen
    aria-label="Diálogo de portfolio"
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