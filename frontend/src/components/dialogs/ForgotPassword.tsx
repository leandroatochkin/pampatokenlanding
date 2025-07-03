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


interface ForgotPasswordDialogProps {
    open: boolean
    onClose: () => void
}




const ForgotPasswordDialog: React.FC<ForgotPasswordDialogProps> = ({open, onClose}) => {
    const [placeholderEmail, setPlaceholderEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)




    
    const handleResetPassword = async () => {
        if(!placeholderEmail && placeholderEmail.trim() === '') return
        
        const email = placeholderEmail.trim()

        setLoading(true)
            try{
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/forgot-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email}),
                })
                const responseData = await response.json() 
                if(response.ok){            
                    alert('Email de cambio de clave enviado.')
                    onClose()
                    setLoading(false)
                }

                if(responseData.error && responseData.error.includes(`Invalid email`)){
                    alert(`Email inválido o inexistente.`)
                    setLoading(false)
                }
                
    
    
            } catch (error) {
                alert('Error al cambiar clave.')
                setLoading(false)
                console.error(error)
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
                disabled={loading}
                onChange={(e) => setPlaceholderEmail(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                />
                
                <Button
                onClick={handleResetPassword}
                disabled={loading}
                >
                    {
                        loading ? (<CircularProgress size={20}/>) : (`enviar`)
                    }
                </Button>


            </Box>
           
        </DialogContent>

    </Dialog>
  )
}

export default ForgotPasswordDialog