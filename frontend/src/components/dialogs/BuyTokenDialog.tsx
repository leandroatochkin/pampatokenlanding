import React,{useEffect, useState} from 'react'
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
import { TokenInfo } from '../../utils/interfaces'

interface BuyTokenDialogProps {
    open: boolean
    onClose: () => void
    tokens: TokenInfo[]
    refetch: () => void
}

interface BuyTransactionDTO{
    userId: string
    amount: number 
    symbol: number
    boughtAtValue: number 
    tokenName: string 
}

const BuyTokenDialog: React.FC<BuyTokenDialogProps> = ({open, onClose, tokens, refetch}) => {

    const isLoggedIn = userStore((state)=>state.isLoggedIn)
    const userId = userStore((state)=>state.userId)


    const [amount, setAmount] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [payload, setPayload] = useState<BuyTransactionDTO | null>(null)
    const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(tokens[0] || null)

    const total = Number((amount * (selectedToken?.VALOR_COMPRA ?? 0)) / 100).toFixed(2).replace('.', ',')

    useEffect(()=>{
        setPayload({
            userId: userId || '',
            amount: amount,
            symbol: selectedToken?.CODIGO_SIMBOLO || 0,
            boughtAtValue: selectedToken?.VALOR_COMPRA || 0,
            tokenName: selectedToken?.DES_SIMBOLO || '',
        })

    },[amount, userId, tokens]) 

    const handleBuy = async () => {
        if(!amount || !userId || !isLoggedIn) return
        
        setIsLoading(true)
        if(confirm(`Esta seguro que quiere comprar ${amount} tokens por AR$${total}`)){
            try{
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/buy`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
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
        setIsLoading(false)

    }

  return (
    <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    aria-label="Diálogo para comprar tokens"
    >
        <DialogTitle
        sx={{
            fontFamily: 'PTSerif-Bold'
        }}
        color='primary'
        >Comprar Tokens</DialogTitle>
        <DialogContent>
            <Select
            defaultValue={tokens[0].CODIGO_SIMBOLO}
            label="Token"
            onChange={(e) => {
                const selected = tokens.find(token => token.CODIGO_SIMBOLO === e.target.value);
                if (selected) {
                    setSelectedToken(selected);
                    setAmount(0); 
                }
            }}
            >
                {tokens.map((token) => (
                    <MenuItem 
                    key={token.CODIGO_SIMBOLO} 
                    value={token.CODIGO_SIMBOLO}

                    
                    >
                        {`${token.CODIGO_SIMBOLO} (${token.DES_SIMBOLO})`}
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
                    {
                        selectedToken ?
                        (
                            `Precio por token: AR$${Number(selectedToken?.VALOR_COMPRA / 100).toFixed(2)}` 
                        )
                        :
                        (
                            `Seleccioná un token para ver el precio`
                        )
                    }
                </Typography>
                <TextField
                    label="Cantidad de tokens"
                    type="number"
                    value={amount}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        const num = Number(inputValue);

                        if (!isNaN(num)) {
                        setAmount(Number(num.toFixed(10))); // Clamp to 10 decimals
                        }
                    }}
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        const parts = target.value.split('.');
                        if (parts[1] && parts[1].length > 10) {
                        parts[1] = parts[1].slice(0, 10);
                        target.value = parts.join('.');
                        }
                    }}
                    fullWidth
                    sx={{ mb: 2 }}
                    inputProps={{
                        min: 0.1,
                        step: 0.1,
                    }}
                    />

                <TextField
                    label="Monto en AR$"
                    type="number"
                    value={Number(amount * ((selectedToken?.VALOR_COMPRA ?? 0) / 100)).toFixed(2) ?? 0}
                    onChange={(e) => {
                        const inputValue = Number(e.target.value);

                        // Minimum AR$ amount enforced manually
                        if (inputValue >= 10) {
                        setAmount(inputValue / ((selectedToken?.VALOR_COMPRA ?? 0) / 100));
                        }
                    }}
                    fullWidth
                    sx={{ mb: 2 }}
                    inputProps={{
                        min: 10,     // AR$10 minimum
                        step: 1,     // Can only increment/decrement by AR$1
                    }}
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
                    gap: 2
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