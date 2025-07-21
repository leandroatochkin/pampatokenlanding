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
import { useBuyToken, BuyTransactionDTO } from '../../api/portfolioApi'

interface BuyTokenDialogProps {
    open: boolean
    onClose: () => void
    tokens: TokenInfo[]
    refetch: () => void
}

const BuyTokenDialog: React.FC<BuyTokenDialogProps> = ({open, onClose, tokens, refetch}) => {

    const isLoggedIn = userStore((state)=>state.isLoggedIn)
    const userId = userStore((state)=>state.userId)


    const [amount, setAmount] = useState<number>(0)
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

    const {mutate, isPending} = useBuyToken()

    const handleBuy = () => {
            if(!amount || !userId || !isLoggedIn) return
            if(confirm(`¿Está seguro que quiere comprar ${amount} tokens por AR$${total}?`)){
               if(payload){
                 mutate(payload, {
                    onSuccess: () => {
                        refetch()
                        onClose()
                    },
                    onError: (err) => {
                        alert("Error al comprar tokens.")
                        console.error(err)
                    }
                    })
               }
               
            }
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
            {isPending ? (
                <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}
                >
                    <CircularProgress size={24} sx={{mt: 2}}/>
                </Box>
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
                    onClick={handleBuy}
                    variant='contained'
                    disabled={!amount || isPending}
                    >Comprar</Button>
                    <Button 
                    onClick={onClose}
                    variant='outlined'
                    >Cancelar
                    </Button>
                   
                </Box>
            )}
        </DialogContent>

    </Dialog>
  )
}

export default BuyTokenDialog