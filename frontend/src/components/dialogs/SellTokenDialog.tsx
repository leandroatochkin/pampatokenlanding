import React,{useState, useEffect} from 'react'
import { 
    Box, 
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    CircularProgress,
    TextField,
    Button,
    Select,
    MenuItem
} from '@mui/material'
import { userStore } from '../../utils/store'
import { TokenDTO, TokenInfo } from '../../utils/interfaces'

interface SellTokenDialogProps {
    open: boolean
    onClose: () => void
    owned: TokenDTO[]
    tokens: TokenInfo[]
    refetch: () => void
}

interface SellTransactionDTO{
    userId: string
    amount: Number 
    symbol: string
    soldAtValue: number 
}


const SellTokenDialog: React.FC<SellTokenDialogProps> = ({open, onClose, owned, tokens, refetch}) => {
    const [payload, setPayload] = useState<SellTransactionDTO | null>(null)
    const [selectedToken, setSelectedToken] = useState<TokenDTO | null>(null)
    const tokenData = userStore((state)=>state.tokenData)
    const isLoggedIn = userStore((state)=>state.isLoggedIn)
    const userId = userStore((state)=>state.userId)

    const [amount, setAmount] = useState<number>(selectedToken ? selectedToken.tokenAmount : 0)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const sellValues = tokens?.find(
      v => selectedToken && v.SIMBOLO === selectedToken.tokenSymbol && v.rn === 2
    )?.VALOR_COMPRA || 0;
 

   const total = Number((amount * sellValues) / 100).toFixed(2).replace('.', ',')

     useEffect(()=>{
            setPayload({
                userId: userId || '',
                amount: amount,
                symbol: '',
                soldAtValue: 0,
            })
    
        },[amount, userId, tokens])

    const handleSell = async () => {
        if(!tokenData || !amount || !userId || !isLoggedIn) return
        setIsLoading(true)
        if(confirm(`Esta seguro que quiere vender ${amount} tokens por AR$}`)){
            try{
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sell`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${tokenData.token}`
                    },
                    body: JSON.stringify(payload),
                })
                if(!response.ok){            
                    alert('Error al vender tokens')
                    setIsLoading(false)
                    onClose()
                    throw new Error('Failed to buy tokens')
                } else {
                    alert(`Orden de venta generada exitosamente`)
                    setIsLoading(false)
                    refetch()
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
            <Select
            defaultValue={owned[0].tokenSymbol}
            label="Token"
            onChange={(e) => {
                const selected = owned.find(token => token.tokenSymbol === e.target.value);
                if (selected) {
                    setSelectedToken(selected);
                    setAmount(0); 
                }
            }}
            >
                {owned.map((token) => (
                    <MenuItem 
                    key={token.tokenSymbol} 
                    value={token.tokenSymbol}

                    
                    >
                        {token.tokenName} ({token.tokenSymbol})
                    </MenuItem>
                ))}
            </Select>
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
                    Precio por token: AR${Number(sellValues / 100).toFixed(2)}
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
                    //value={Number(amount * (tokens.VALOR_VENTA / 100)).toFixed(2)} // shows AR$
                    onChange={(e) => {
                        const inputValue = Number(e.target.value);
                        //setAmount(inputValue / (tokens.VALOR_VENTA / 100)); // AR$ → tokens
                    }}
                    fullWidth
                    sx={{ mb: 2 }}
                    inputProps={{ min: 0 }}
                    />

                {/* <Typography variant='h6'>
                    Recibís: AR${total}
                </Typography> */}
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
                    //disabled={!amount || isLoading || amount > ownedTokens}
                    >Vender</Button>
                </Box>
            )}
        </DialogContent>

    </Dialog>
  )
}

export default SellTokenDialog