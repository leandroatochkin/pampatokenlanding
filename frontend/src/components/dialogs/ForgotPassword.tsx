import React,{useState} from 'react'
import { 
    Box, 
    Dialog,
    DialogTitle,
    DialogContent,
    CircularProgress,
    TextField,
    Button,
} from '@mui/material'
import { useResetPassword } from '../../api/userApi'


interface ForgotPasswordDialogProps {
    open: boolean
    onClose: () => void
}




const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({open, onClose}) => {
    const [placeholderEmail, setPlaceholderEmail] = useState<string>('')

    const {mutate, isPending} = useResetPassword()



    const handleResetPassword = () => {
        if(!placeholderEmail && placeholderEmail.trim() === '') return

        const email = placeholderEmail.trim()

           
               if(email){
                 mutate(email, {
                    onSuccess: () => {
                        onClose()
                    },
                    })
               
               
            }
    }

  return (
    <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    aria-label="Diálogo para recuperar clave"
    >
        <DialogTitle
        sx={{
            fontFamily: 'PTSerif-Bold'
        }}
        color='primary'
        >Recuperar clave</DialogTitle>
        <DialogContent>

            <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
            >
                <TextField
                label="Email de recuperación"
                placeholder='Ingrese su email...'
                type="text"
                value={placeholderEmail}
                disabled={isPending}
                onChange={(e) => setPlaceholderEmail(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                />
                
                <Button
                onClick={handleResetPassword}
                disabled={isPending}
                >
                    {
                        isPending ? (<CircularProgress size={20}/>) : (`enviar`)
                    }
                </Button>


            </Box>
           
        </DialogContent>

    </Dialog>
  )
}

export default ForgotPasswordDialog