import React,{useEffect, useState} from 'react'
import { 
    Box, 
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    CircularProgress,
    TextField,
    Button
} from '@mui/material'
import { userStore } from '../../utils/store'
import { TokenInfo } from '../../utils/interfaces'

interface BuyTokenDialogProps {
    open: boolean
    onClose: () => void
    tokens: TokenInfo
    refetch: () => void
}

interface BuyTransactionDTO{
    userId: string
    amount: Number 
    symbol: string
    boughtAtValue: number 
    tokenName: string 
    tokenExpiringDate: string
}

const BuyTokenDialog: React.FC<BuyTokenDialogProps> = ({open, onClose, tokens, refetch}) => {
    const tokenData = userStore((state)=>state.tokenData)
    const isLoggedIn = userStore((state)=>state.isLoggedIn)
    const userId = userStore((state)=>state.userId)


    const [amount, setAmount] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [payload, setPayload] = useState<BuyTransactionDTO | null>(null)

    const total = Number((amount * tokens.VALOR_COMPRA) / 100).toFixed(2).replace('.', ',')

    useEffect(()=>{
        setPayload({
            userId: userId || '',
            amount: amount,
            symbol: tokens.SIMBOLO,
            boughtAtValue: tokens.VALOR_COMPRA,
            tokenName: tokens.NOMBRE,
            tokenExpiringDate: tokens.VENCIMIENTO
        })

    },[amount, userId, tokens])

    const handleBuy = async () => {
        if(!tokenData || !amount || !userId || !isLoggedIn) return
        
        console.log(payload)
        setIsLoading(true)
        if(confirm(`Esta seguro que quiere comprar ${amount} tokens por AR$${total}`)){
            try{
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/buy`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenData.token}`
                    },
                    body: JSON.stringify(payload),
                })
                if(!response.ok){            
                    alert('Error al comprar tokens')
                    setIsLoading(false)                  
                    onClose()
                    throw new Error('Failed to buy tokens')
                } else {
                    alert(`Orden de compra generada exitosamente`)
                    setIsLoading(false)
                    refetch()
                    onClose()
                }
    
    
            } catch (error) {
                alert('Error al comprar tokens')
                setIsLoading(false)
                console.error(error)
                }
        }

    }

  return (
    <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    >
        <DialogTitle
        sx={{
            fontFamily: 'PTSerif-Bold'
        }}
        color='primary'
        >Comprar Tokens</DialogTitle>
        <DialogContent>
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
            >
                <Typography variant='h6' sx={{mb: 2}}>
                    Precio por token: AR${tokens.VALOR_COMPRA / 100}
                </Typography>
                <TextField
                label='Cantidad de tokens'
                type='number'
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                fullWidth
                sx={{mb: 2}}
                inputProps={{ min: 0 }}
                />
                <TextField
                label='Monto en AR$'
                type='number'
                value={Number(amount * (tokens.VALOR_COMPRA / 100)).toFixed(2)} // shows AR$
                onChange={(e) => {
                    const inputValue = Number(e.target.value);
                    setAmount(inputValue / (tokens.VALOR_COMPRA / 100)); // AR$ → tokens
                }}
                fullWidth
                sx={{ mb: 2 }}
                inputProps={{ min: 0 }}
                />
                <Typography variant='h6'>
                    Total: AR${total}
                </Typography>
            </Box>
            {isLoading ? (
                <CircularProgress size={24} sx={{mt: 2}}/>
            ) : (
                <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: {
                        xs: 'column',
                        md: 'row',
                    },
                    width: '100%',
                    mt: 2,
                }}
                >
                    <Button 
                    onClick={onClose}
                    variant='outlined'
                    >Cancelar
                    </Button>
                    <Button 
                    onClick={handleBuy}
                    variant='contained'
                    disabled={!amount || isLoading}
                    >Comprar</Button>
                </Box>
            )}
        </DialogContent>

    </Dialog>
  )
}

export default BuyTokenDialog