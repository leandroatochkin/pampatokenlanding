import React,{useState} from 'react'
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

interface SellTokenDialogProps {
    open: boolean
    onClose: () => void
    sellValue: number
    ownedTokens: number
}

const SellTokenDialog: React.FC<SellTokenDialogProps> = ({open, onClose, sellValue, ownedTokens}) => {
    const tokenData = userStore((state)=>state.tokenData)
    const isLoggedIn = userStore((state)=>state.isLoggedIn)
    const userId = userStore((state)=>state.userId)


    const [amount, setAmount] = useState<number>(ownedTokens)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const total = Number((amount * sellValue) / 100).toFixed(2).replace('.', ',')

    const handleSell = async () => {
        if(!tokenData || !amount || !userId || !isLoggedIn) return
        setIsLoading(true)
        if(confirm(`Esta seguro que quiere comprar ${amount} tokens por AR$${total}`)){
            try{
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sell`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenData}`
                    },
                    body: JSON.stringify({
                        userId: userId,
                        amount: amount,
                        operationType: 1, // 0 for buy, 1 for sell
                    }),
                })
                if(!response.ok){            
                    alert('Error al vender tokens')
                    setIsLoading(false)
                    onClose()
                    throw new Error('Failed to buy tokens')
                } else {
                    alert(`Orden de venta generada exitosamente`)
                    setIsLoading(false)
                    onClose()
                }
    
    
            } catch (error) {
                alert('Error al comprar tokens')
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
        >Vender Tokens</DialogTitle>
        <DialogContent>
            <Typography>
                Tokens disponibles: {ownedTokens} tokens
            </Typography>
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
                    Precio por token: AR${Number(sellValue / 100).toFixed(2)}
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
                    value={Number(amount * (sellValue / 100)).toFixed(2)} // shows AR$
                    onChange={(e) => {
                        const inputValue = Number(e.target.value);
                        setAmount(inputValue / (sellValue / 100)); // AR$ → tokens
                    }}
                    fullWidth
                    sx={{ mb: 2 }}
                    inputProps={{ min: 0 }}
                    />

                <Typography variant='h6'>
                    Recibís: AR${total}
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
                    onClick={handleSell}
                    variant='contained'
                    disabled={!amount || isLoading || amount > ownedTokens}
                    >Vender</Button>
                </Box>
            )}
        </DialogContent>

    </Dialog>
  )
}

export default SellTokenDialog