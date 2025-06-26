import React,{useEffect, useState, useMemo} from 'react'
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
import { userStore } from '../../utils/store'
import { TableSkeleton } from '../skeletons/MUIGridSkeleton'
import { CustomLoadingOverlay } from '../skeletons/MUIGridOverlay'
import { customLocaleText } from '../../utils/locale'
import dayjs from 'dayjs'


interface Movement {
    userId: string
    operationId: string
    amount: number
    operationDate: string
    operationType: number
    symbol: string
    value: number
}

interface MovementDialogProps {
    open: boolean
    onClose: () => void
}

const MovementsDialog: React.FC<MovementDialogProps> = ({open, onClose}) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [movements, setMovements] = useState<Movement[] | null>(null)

        const userId = userStore((state)=>state.userId)

        useEffect(() => {
            const fetchMovements = async () => {
                setIsLoading(true)
                if (!userId) return;
                try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movements?userId=${userId}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    const data = await response.json();
                    setMovements(data);
                    setIsLoading(false)
                } catch (e) {
                    console.error(e);
                    alert('Hubo un error recuperando sus movimientos');
                    setIsLoading(false)
                }
            };
            fetchMovements();
        }, []);




    

    const columns = useMemo<GridColDef<(typeof rows)[number]>[]>(
        () => [
          {
            field: "operationId",
            headerName: "nro. de transacción",
            width: 130,
            editable: false,
          },
          {
            field: "operationDate",
            headerName: "fecha",
            width: 150,
            editable: false,
          },
          {
            field: "operationType",
            headerName: "operación",
            width: 150,
            editable: false,
          },
          {
            field: "symbol",
            headerName: "símbolo",
            width: 120,
            editable: false,
          },
          
          {
            field: "value",
            headerName: "monto",
            width: 130,
            editable: false,
          },
          
      
         
          
        ],
        [],
      )
    
     


      const rows =
          (movements ?? []).map((movement: Movement, index: number) => ({
            id: index,
            userId: movement.userId,
            operationId: movement.operationId,
            amount: movement.amount,
            operationDate: dayjs(movement.operationDate).format('DD/MM/YYYY'),
            operationType: movement.operationType === 0 ? `compra` : `venta`,
            symbol: movement.symbol,
            value: `${movement.operationType === 0 ? '+' : '-'} AR$${Number(movement.value / 100).toFixed(2)}`,
          }))
        
      



  return (
    <Dialog
    open={open}
    onClose={onClose}
    fullScreen
    aria-label="Diálogo de movimientos"
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

export default MovementsDialog