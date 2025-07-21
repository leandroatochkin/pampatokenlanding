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
import { useSellToken, SellTransactionDTO } from '../../api/portfolioApi'

interface SellTokenDialogProps {
    open: boolean
    onClose: () => void
    owned: TokenDTO[]
    tokens: TokenInfo[]
    refetch: () => void
}

const SellTokenDialog: React.FC<SellTokenDialogProps> = ({open, onClose, owned, tokens, refetch}) => {
    const [payload, setPayload] = useState<SellTransactionDTO | null>(null)
    const [selectedToken, setSelectedToken] = useState<TokenDTO | null>(owned[0])
    const isLoggedIn = userStore((state)=>state.isLoggedIn)
    const userId = userStore((state)=>state.userId)


    const [amount, setAmount] = useState<number>(owned?.find(token => token.tokenSymbol === selectedToken?.tokenSymbol)?.tokenAmount || 0)


    const sellValues = React.useMemo(() => {
            return (
                tokens.find(
                (token) => selectedToken && token.CODIGO_SIMBOLO === Number(selectedToken.tokenSymbol) && token.rn === 1
                )?.VALOR_VENTA || 0
            );
            }, [selectedToken, tokens]);
 

            const total = React.useMemo(() => {
            return Number((amount * sellValues) / 100).toFixed(2).replace('.', ',');
            }, [amount, sellValues]);

     useEffect(()=>{
            setPayload({
                userId: userId || '',
                amount: amount,
                symbol: selectedToken?.tokenSymbol || 0,
                soldAtValue: sellValues,
                tokenName: selectedToken?.tokenName || ''
            })
    
        },[amount, userId, tokens])
        
         const {mutate, isPending} = useSellToken()

        useEffect(() => {
        if (selectedToken) {
            setAmount(selectedToken.tokenAmount);
        }
        }, [selectedToken]);

     const handleSell = () => {
            if(!amount || !userId || !isLoggedIn) return
            if(confirm(`¿Está seguro que quiere vender ${amount} tokens por AR$${total}?`)){
               if(payload){
                 mutate(payload, {
                    onSuccess: () => {
                        refetch()
                        onClose()
                    },
                    onError: (err) => {
                        alert("Error al vender tokens.")
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
    aria-label="Diálogo para vender tokens"
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
                    setSelectedToken(selected || owned[0]);
                    setAmount(0); 
                }
            }}
            >
                {owned.filter((token)=>token.tokenAmount > 0).map((token) => (
                    <MenuItem 
                    key={token.tokenSymbol} 
                    value={token.tokenSymbol}
                    >
                        {token.tokenSymbol} ({token.tokenName})
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
                label="Cantidad de tokens"
                type="number"
                value={amount}
                onChange={(e) => {
                    const input = Number(e.target.value);
                    const max = selectedToken?.tokenAmount || 0;
                    setAmount(input > max ? max : input);
                }}
                fullWidth
                sx={{ mb: 2 }}
                inputProps={{ min: 0, max: selectedToken?.tokenAmount || 0 }}
                />
                <TextField
                label="Monto en AR$"
                type="number"
                value={((amount * sellValues) / 100).toFixed(2)}
                onChange={(e) => {
                    const inputValue = Number(e.target.value);
                    setAmount(inputValue / (sellValues / 100));
                }}
                fullWidth
                sx={{ mb: 2 }}
                inputProps={{ min: 0 }}
                />

                <Typography variant='h6'>
                    Recibís: AR${total}
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
                    onClick={handleSell}
                    variant='contained'
                    disabled={!amount || isPending }
                    >Vender</Button>
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

export default SellTokenDialog