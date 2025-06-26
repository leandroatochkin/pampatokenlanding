import React, { useState } from "react";
import { useForm } from "react-hook-form";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MailIcon from '@mui/icons-material/Mail';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// Material UI imports
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Container,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  Paper,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Stack,
  Switch,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { 
  Person as PersonIcon, 
  LocationOn as LocationIcon 
} from "@mui/icons-material";
import { 
    emailRegex, 
    nameRegex, 
    passwordRegex,
    phoneRegex, 
    onlyNumbersRegex,
    addressRegex
} from '../../utils/regexPatterns';
import { 
    countryListAlpha2,
    provinces,
    maritalStatusMapper,
    accountTypeMapper,
    workingCodeMapper
} from "../../utils/dataList";
import IdUpload from "../../components/idUpload/IdUpload";
import PhotoCapture from "../../components/idUpload/PhotoCapture";
import TermsAndConditionsDialog from "../../components/dialogs/TermsAndConditionsDialog";
import { resizeImage } from "../../utils/functions";
import { useScrollNavigation } from "../../utils/hooks";




// TabPanel component for tab content
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface UserDTO{
    firstName: string
    lastName: string
    middleName?: string
    CUIT: number
    maritalStatus: string
    email: string
    password: string
    phoneNumber: number
    address: string
    city: string
    province: string
    country: string
    postalCode: string
    bank: string
    CBU: number
    accountType: string
    workingCode: string
    politicallyExposed: boolean
    UIFrequired: boolean
    fiscalResidentOutsideArgentina: boolean
    termsAndConditionsRead: boolean
    accountNumber: string
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Register = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(30);
  const [repeatEmail, setRepeatEmail] = useState<string>("")
  const [repeatPassword, setRepeatPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [frontImage, setFrontImage] = useState<string | null>(null)
  const [backIdFile, setBackIdFile] = useState<File | null>(null)
  const [frontIdFile, setFrontIdFile] = useState<File | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [backImage, setBackImage] = useState<string | null>(null)
  const [selfieImage, setSelfieImage] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [successElement, setSuccessElement] = useState<boolean>(false)

  const {
    handleSectionClick
  } = useScrollNavigation();





      const {  
          handleSubmit, 
          register, 
          watch,
          setValue,
          formState: { errors }, 
            } = useForm<UserDTO>({
                defaultValues: {
                    middleName: '',
                    politicallyExposed: false,
                    UIFrequired: false,
                    fiscalResidentOutsideArgentina: false,
                    termsAndConditionsRead: false
                }
                
            })
  
    const watchEmail = watch("email");
    const watchPassword = watch("password")       
    const watchPoliticallyExposed = watch('politicallyExposed')
    const watchFiscalResidentOutsideArgentina = watch('fiscalResidentOutsideArgentina')
    const watchUIFrequired = watch('UIFrequired')
    const watchTermsAndConditions = watch('termsAndConditionsRead')

  

  // Handle step changes
  const handleStepChange = (_: React.SyntheticEvent, newStep: number) => {
    setActiveStep(newStep);
    if (newStep === 0) setProgress(33);
    if (newStep === 1) setProgress(66);
    if (newStep === 2) setProgress(90);
  }

  const onSubmit = async (data: UserDTO) => {
    setLoading(true)
   if (frontIdFile && 
    backIdFile && 
    selfieFile
  ) {
    const resizedFrontImage = await resizeImage(frontIdFile, 800, 800)
    const resizedBackImage = await resizeImage(backIdFile, 800, 800)
    const resizedSelfieImage = await resizeImage(selfieFile, 800, 800)
    if(!resizedFrontImage ||
       !resizedBackImage ||
       !resizedSelfieImage 
       || !data) {
      console.error('Error resizing images')
    }
    const formData = new FormData()
    formData.append('frontIdImage', resizedFrontImage)
    formData.append('backIdImage', resizedBackImage)
    formData.append('selfieImage', resizedSelfieImage)
    formData.append('user', JSON.stringify(data))
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: 'POST',
        body: formData,
      })
      if (response.ok) {
        setSuccessElement(true)
        setTimeout(() =>{
          handleSectionClick('login')
        },3000)
      } else {
        console.error('Error:', response)
      }
   }
    catch (error) {
      console.error('Error:', error)
    }
}}

  const handleCheckboxChange = () => {
    setValue('termsAndConditionsRead', !watchTermsAndConditions ? true : false)
  }

  return (
    <>
    {
        openDialog && <TermsAndConditionsDialog open={openDialog} close={()=>setOpenDialog(false)}/>
    }
    <Container 
    sx={{ 
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: '10vh' 
     }}
     id='register'
     >
    
      <Paper
      sx={{
        height: 'auto',
        minHeight: '150px',
        width: {
            xs: '94vw',
            md: '80%'
        },
        background: 'white',
        borderRadius: '16px',
      }}
      >
       {
        !successElement ?
        (
          <>
          {
            !loading ? (
              <>
          <CardHeader 
            title={
              <Typography
                      variant='h4'
                      color='#2E7D32'
                      textAlign='start'
                      sx={{
                        fontFamily: 'PTSerif-Bold'
                      }}
                      >
                          Registrate
              </Typography>
            }
            subheader={
              <Typography variant="body2" color="text.secondary" align="left" sx={{ mb: 2 }}>
                Complete los siguientes campos para continuar su registro.
              </Typography>
            }
          />
          
          <LinearProgress variant="determinate" value={progress} sx={{ mb: 2}} color="primary"/>
          
          <CardContent>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={activeStep} 
                  onChange={handleStepChange} 
                  variant="fullWidth"
                  aria-label="profile steps"
                >
  
                  {/*PERSONAL INFO*/}
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ mr: 1 }} fontSize="small" />
                        Personal
                      </Box>
                    } 
                    {...a11yProps(0)} 
                    disabled={activeStep !== 0}
                  />
  
  
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ mr: 1 }} fontSize="small" />
                        Ubicación
                      </Box>
                    } 
                    {...a11yProps(1)} 
                    disabled={activeStep !== 0 && activeStep !== 1}
                  />
  
                  <Tab 
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccountBalanceIcon sx={{ mr: 1 }} fontSize="small" />
                        Info bancaria
                      </Box>
                    } 
                    {...a11yProps(1)} 
                    disabled={activeStep !== 0 && activeStep !== 1 && activeStep !== 2}
                  />
                  
                </Tabs>
              </Box>
  
              {/* Personal Tab */}
              <form onSubmit={handleSubmit(onSubmit)}>
              <TabPanel value={activeStep} index={0}>
           
                  <Box>
                      <Box
                       sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent:'space-between',
                          gap: 2,
                          flexDirection: {
                            xs: 'column',
                            md: 'row'
                        },
                          }}
                          >
                      {/*EMAIL*/}
                              <Box
                                 sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  width: '100%',
                                  
                                 }}
                                  >
                              <FormLabel htmlFor="email">Email</FormLabel>
                              <TextField
                              fullWidth
                              id="email"
                              type="email"
                              variant="outlined"
                              placeholder="mail@ejemplo.com"
                              {...register(`email`, { required: 'Required field', pattern: { value: emailRegex, message: 'Invalid email address' } })}
                              error={!!errors.email}
                              helperText={errors.email?.message}
                              slotProps={{
                                  input: {
                                  startAdornment: (
                                      <InputAdornment position='start'>
                                      <MailIcon 
                                          sx={{
                                              color: '#333'
                                          }}
                                          />
                                      </InputAdornment>
                                  ),
                                  },
                              }}
                              />    
                              </Box>
                      {/*REPEAT EMAIL*/}       
                              <Box
                                 sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  width: '100%'
                                  }}
                                  >
                              <FormLabel htmlFor="repeatEmail">Repetir Email</FormLabel>
                              <TextField
                              fullWidth
                              id="repeatEmail"
                              type="email"
                              variant="outlined"
                              placeholder="repetir@mail.com"
                              onChange={(e) => setRepeatEmail(e.target.value)}
                              error={repeatEmail !== watchEmail}
                              helperText={
                                  repeatEmail && repeatEmail !== watchEmail ? "Emails do not match" : ""
                              }
                              slotProps={{
                                  input: {
                                  startAdornment: (
                                      <InputAdornment position="start">
                                      <MailIcon sx={{ color: "#333" }} />
                                      </InputAdornment>
                                  ),
                                  },
                              }}
                              />  
                              </Box>
                      </Box>
  
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent:'space-between',
                      gap: 2,
                      flexDirection: {
                        xs: 'column',
                        md: 'row'
                    },
                    }}
                    >
                      {/*PASSWORD*/}
                              <Box
                                 sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  width: '100%'
                              }}
                              >
               
                      <FormLabel htmlFor="password">Contraseña</FormLabel>
                  
                  <Box className="relative">
                      <OutlinedInput
                          fullWidth
                      id="password"
                      color="secondary"
                      type={showPassword ? "text" : "password"}
                      {...register(`password`, { required: 'Campo requerido', pattern: { value: passwordRegex, message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo' } })}
                      endAdornment={
                          <InputAdornment position="end">
                          <IconButton
                              aria-label={
                              showPassword ? 'hide the password' : 'display the password'
                              }
                              onClick={() => setShowPassword(!showPassword)}
                          >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                          </InputAdornment>
                      }
                      />
  
                      
                  </Box>
                              </Box>
                      {/*REPEAT PASSWORD*/}
                              <Box
                                 sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  width: '100%'
                                  }}
                                  >
                              <FormLabel htmlFor="repeatPassword">Repetir contraseña</FormLabel>
               
                      <TextField
                      fullWidth
                      id="repeatPassword"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      error={repeatPassword !== watchPassword}
                      helperText={
                          repeatPassword && repeatPassword !== watchPassword ? "las contraseñas no coinciden" : ""
                      }
                      />
                 
                              </Box>                           
                  </Box>        
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent:'space-between',
                      gap: 2,
                      flexDirection: {
                        xs: 'column',
                        md: 'row'
                    },
                    }}
                    >
                           {/*FIRST NAME*/}
                          <Box
                          sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: '100%',
                              
                          }}
                          >
                          <FormLabel htmlFor="firstName">Nombre</FormLabel>
                              <TextField
                              fullWidth
                              id="firstName"
                              variant="outlined"
                              placeholder="Nombre"
                              {...register(`firstName`, 
                                  { required: 'Campo obligatorio', 
                                      pattern: { 
                                          value: nameRegex, 
                                          message: 'Solo letras, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                                      } })}
                              error={!!errors.firstName}
                              helperText={errors.firstName?.message}
                              sx={{
                                  width: '100%'
                              }}
                              />  
                          </Box>  
                          {/*LAST NAME*/}
                          <Box
                                      sx={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          width: '100%'
                                      }}
                                      >
                                      <FormLabel htmlFor="lastName">Apellido</FormLabel>
                                      <Box className="relative">
                                          <TextField
                                          fullWidth
                                          id="lastName"
                                          variant="outlined"
                                          placeholder="Apellido"
                                          {...register(`lastName`, 
                                              { required: 'Campo obligatorio', 
                                                  pattern: { 
                                                      value: nameRegex, 
                                                      message: 'Solo letras, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                                                  } })}
                                          error={!!errors.lastName}
                                          helperText={errors.lastName?.message}
                                          />    
                                      </Box>
                          </Box>
                    </Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent:'space-between',
                      flexDirection: {
                          xs: 'column',
                          md: 'row'
                      },
  
                      gap: 2
                    }}
                    >
  
  
  
  
  
                       {/*MIDDLE NAME*/}
                      <Box
                          sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: '100%'
                          }}
                          >
                          <FormLabel htmlFor="middleName">Segundo nombre</FormLabel>
                          <Box>
                              <TextField
                              fullWidth
                              id="middleName"
                              variant="outlined"
                              placeholder="Segundo nombre"
                              {...register(`middleName`, 
                                  { 
                                      pattern: { 
                                          value: nameRegex, 
                                          message: 'Solo letras, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                                      } })}
                              error={!!errors.middleName}
                              helperText={errors.middleName?.message}
                              />    
                          </Box>
                      </Box>
  
  
                            <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                    >
                        <FormLabel htmlFor="maritalStatus">Est. Civil</FormLabel>
                      
                        <Select
                        {...register("maritalStatus", {
                            required: 'Este campo es obligatorio',
                        })}
                        defaultValue={'S'}
                        fullWidth
                        >
                        {Object.entries(maritalStatusMapper).map(([code, name]) => (
                            <MenuItem key={code} value={code}>
                            {`${name}`}
                            </MenuItem>
                        ))}
                        </Select>
                      
                    </Box>
         
                  </Box>
                      <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent:'space-between',
                      flexDirection: {
                          xs: 'column',
                          md: 'row'
                      },
  
                      gap: 2
                    }}
                    >
  
  
  
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                    >
                        <FormLabel htmlFor="accountType">Tipo de cuenta</FormLabel>
                      
                        <Select
                        {...register("accountType", {
                            required: 'Este campo es obligatorio',
                        })}
                        defaultValue={'0'}
                        fullWidth
                        >
                        {Object.entries(accountTypeMapper).map(([code, name]) => (
                            <MenuItem key={code} value={code}>
                            {`${name}`}
                            </MenuItem>
                        ))}
                        </Select>
                      
                    </Box>
         
              {/*PHONE NUMBER*/}
                  <Box
                      sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%'
                      }}
                      >
                      <FormLabel htmlFor="phoneNumber">Telefóno</FormLabel>
                  
                      <TextField
                      fullWidth
                          id="phoneNumber"
                          variant="outlined"
                          placeholder="541122333666"
                          {...register("phoneNumber", {
                              required: 'Este campo es obligatorio',
                              pattern: {
                              value: phoneRegex,
                              message: 'Debe ingresar un número válido en formato 541122333666, sin 15 ni espacios ni caracteres especiales',
                              },
                          })}
                          error={!!errors.phoneNumber}
                          helperText={errors.phoneNumber?.message}
                          />
  
                  </Box>
                  </Box>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      size="large"
                      onClick={
                          () => {
                              setActiveStep(1);
                              setProgress(60);
                            }
                        }
                    >
                      continuar
                    </Button>
                  </Box>
                
              </TabPanel>
  
           
              <TabPanel value={activeStep} index={1}>
               
                  {/* Add your professional form fields here */}
                  <Box
                  // sx={{
                  //     pointerEvents: isLoading ? 'none' : 'all'
                  // }}
                  >
             <Box
             sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2
             }}
             >
                                                 {/*COUNTRY*/}
              <Box
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%'
              }}
              >
                  <FormLabel htmlFor="country">País</FormLabel>
                 
                  <Select
                  {...register("country", {
                      required: 'Este campo es obligatorio',
                  })}
                  defaultValue={'54'}
                  >
                  {Object.entries(countryListAlpha2).map(([code, name]) => (
                      <MenuItem key={code} value={code}>
                      {`${code} - ${name}`}
                      </MenuItem>
                  ))}
                  </Select>
                
              </Box>
              {/*STATE*/}
              <Box
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%'
              }}
              >
                  <FormLabel htmlFor="state">Provincia</FormLabel>
           
                  <Select
                  {...register("province", {
                      required: 'Este campo es obligatorio',
                  })}
                  defaultValue={'Buenos Aires'}
                  >
                  {provinces.map((province, index) => (
                      <MenuItem key={index} value={province}>
                      {`${province}`}
                      </MenuItem>
                  ))}
                  </Select>
               
              </Box>
             </Box>
             <Box
             sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2
             }}
             >
              {/*CITY*/}
              <Box
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%'
              }}
              >
                  <FormLabel htmlFor="city">Ciudad</FormLabel>
                  <Box className="relative">
                      <TextField
                      fullWidth
                      id="city"
                      variant="outlined"
                      placeholder="Ciudad"
                      {...register(`city`, 
                          { required: 'Campo obligatorio', 
                              pattern: { 
                                  value: nameRegex, 
                                  message: 'Solo letras, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                              } })}
                      error={!!errors.city}
                      helperText={errors.city?.message}
                      />    
                  </Box>
              </Box>
               {/*POSTAL CODE*/}
               <Box
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%'
              }}
              >
                  <FormLabel htmlFor="postalCode">Código postal</FormLabel>
                  <Box className="relative">
                      <TextField
                      fullWidth
                      id="postalCode"
                      variant="outlined"
                      placeholder="Código postal"
                      {...register(`postalCode`, 
                          { required: 'Campo obligatorio', 
                              pattern: { 
                                  value: onlyNumbersRegex, 
                                  message: 'Solo números. Mínimo 2 números.' 
                              } })}
                      error={!!errors.postalCode}
                      helperText={errors.postalCode?.message}
                      />    
                  </Box>
              </Box>
              </Box>
              <Box
              sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2
                 }}
                 >
                              {/*ADDRESS*/}
              <Box
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%'
              }}
              >
                  <FormLabel htmlFor="addressLine1">Dirección</FormLabel>
                  <Box className="relative">
                      <TextField
                      fullWidth
                      id="addressLine1"
                      variant="outlined"
                      placeholder="Dirección"
                      {...register(`address`, 
                          { required: 'Campo obligatorio', 
                              pattern: { 
                                  value: addressRegex, 
                                  message: 'Solo letras, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                              } })}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                      />    
                  </Box>
              </Box>
              </Box>
             
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, flexDirection: 'column' }}>
                 
                    <Button 
                    variant="contained"
                    onClick={() => {
                      setActiveStep(2);
                      setProgress(90);
                    }}
                    >
                      {/* {
                          isLoading
                          ?
                          <CircularProgress size={20}/>
                          :
                          `enviar datos`
                      } */}
                          continuar
                    </Button>
                    <Button 
                      onClick={() => {
                        setActiveStep(0);
                        setProgress(33);
                      }}
                     // disabled={isLoading}
                    >
                      volver
                    </Button>
                  </Box>
          
              </TabPanel>
  
              <TabPanel value={activeStep} index={2}>
               
      
                  <Box
                  // sx={{
                  //     pointerEvents: isLoading ? 'none' : 'all'
                  // }}
                  >
             <Box
             sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2
             }}
             >
              {/*CITY*/}
              <Box
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%'
              }}
              >
                  <FormLabel htmlFor="city">CUIT</FormLabel>
                  <Box className="relative">
                      <TextField
                      type="number"
                      fullWidth
                      id="CUIT"
                      variant="outlined"
                      placeholder="CUIT"
                      {...register(`CUIT`, 
                          { required: 'Campo obligatorio', 
                              pattern: { 
                                  value: onlyNumbersRegex, 
                                  message: 'Solo números, sin guiones. Máximo 11 caracteres.' 
                              } })}
                      error={!!errors.CUIT}
                      helperText={errors.CUIT?.message}
                      />    
                  </Box>
              </Box>
               {/*POSTAL CODE*/}
               <Box
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%'
              }}
              >
                  <FormLabel htmlFor="bank">Entidad bancaria</FormLabel>
                  <Box className="relative">
                      <TextField
                      fullWidth
                      id="bank"
                      variant="outlined"
                      placeholder="Banco"
                      {...register(`bank`, 
                          { required: 'Campo obligatorio', 
                              pattern: { 
                                  value: nameRegex, 
                                  message: 'Solo letras, espacios, tildes, guiones y apóstrofes. Mínimo 2 caracteres' 
                              } })}
                      error={!!errors.bank}
                      helperText={errors.bank?.message}
                      />    
                  </Box>
              </Box>

                         <Box
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%'
              }}
              >
                  <FormLabel htmlFor="accountNumber">Número de cuenta</FormLabel>
                  <Box className="relative">
                      <TextField
                      fullWidth
                      id="accountNumber"
                      variant="outlined"
                      placeholder="Número de cuenta"
                      {...register(`accountNumber`, 
                          { required: 'Campo obligatorio', 
                              pattern: { 
                                  value: onlyNumbersRegex, 
                                  message: 'Solo 20 dígitos.' 
                              } })}
                      error={!!errors.accountNumber}
                      helperText={errors.accountNumber?.message}
                      />    
                  </Box>
              </Box>

              </Box>
              <Box
              sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2
                 }}
                 >
                              {/*ADDRESS*/}
              <Box
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%'
              }}
              >
                  <FormLabel htmlFor="CBU">CBU/CVU</FormLabel>
                  <Box className="relative">
                      <TextField
                      fullWidth
                      id="CBU"
                      variant="outlined"
                      placeholder="CBU/CVU"
                      {...register(`CBU`, 
                          { required: 'Campo obligatorio', 
                              pattern: { 
                                  value: onlyNumbersRegex, 
                                  message: 'Solo 22 dígitos.' 
                              } })}
                      error={!!errors.CBU}
                      helperText={errors.CBU?.message}
                      />    
                  </Box>
              </Box>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%'
                    }}
                    >
                        <FormLabel htmlFor="workingCode">Estado laboral</FormLabel>
                      
                        <Select
                        {...register("workingCode", {
                            required: 'Este campo es obligatorio',
                        })}
                        defaultValue={'0'}
                        fullWidth
                        >
                        {Object.entries(workingCodeMapper).map(([code, name]) => (
                            <MenuItem key={code} value={code}>
                            {`${name}`}
                            </MenuItem>
                        ))}
                        </Select>
                      
                    </Box>
              </Box>
              <Box
              sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: {
                      xs: 'column',
                      md: 'row'
                  },
                  justifyContent: 'space-between',
                  gap: 2,
                  mt: 2
                 }}
                 >
                   <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Typography>
                          Sujeto expuesto públicamente
                      </Typography>
                          <Typography>No</Typography>
                          <Switch 
                          checked={watchPoliticallyExposed}
                          onChange={()=>setValue('politicallyExposed', !watchPoliticallyExposed)}
                          />
                          <Typography>Si</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Typography>
                          Sujeto obligado a informar a la UIF
                      </Typography>
                          <Typography>No</Typography>
                          <Switch 
                          checked={watchUIFrequired}
                          onChange={()=>setValue('UIFrequired', !watchUIFrequired)}
                          />
                          <Typography>Si</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Typography>
                          Sujeto fiscal residente fuera de Argentina
                      </Typography>
                          <Typography>No</Typography>
                          <Switch 
                          checked={watchFiscalResidentOutsideArgentina}
                          onChange={()=>setValue('fiscalResidentOutsideArgentina', !watchFiscalResidentOutsideArgentina)}
                          />
                          <Typography>Si</Typography>
                  </Stack>
          
              </Box>  
              <IdUpload 
              setBackIdImage={setBackImage}
              setFrontIdImage={setFrontImage}
              frontIdImage={frontImage}
              backIdImage={backImage}
              setBackIdFile={setBackIdFile}
              setFrontIdFile={setFrontIdFile}
              label={String(watch(`CUIT`))}
              />
              <PhotoCapture
              selfieImage={selfieImage}
              setSelfieImage={setSelfieImage}
              setSelfieFile={setSelfieFile}
              label={String(watch(`CUIT`))}
              />         
              </Box>
  
              <Box
              sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
              }}
              >
              <Typography>
                  He leído y acepto los <Typography 
                  component="span" 
                  sx={{
                      fontWeight: 'bolder',
                      color: '#2E7D32',
                      cursor: 'pointer'
                  }}
                  onClick={
                      ()=>setOpenDialog(true)
                  }
                  >términos y condiciones.</Typography>
              </Typography>
              <FormControlLabel
                  control={
                    <Checkbox
                      checked={watchTermsAndConditions}
                      onChange={handleCheckboxChange}
                      value={watchTermsAndConditions}
              
                    />
                  }
                  label='acepto'
                  />
              </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, flexDirection: 'column' }}>
                 
                    <Button 
                    variant="contained"
                    type="submit"
                    >
                      {/* {
                          isLoading
                          ?
                          <CircularProgress size={20}/>
                          :
                          `enviar datos`
                      } */}
                          registro
                    </Button>
                    <Button 
                      onClick={() => {
                        setActiveStep(1);
                        setProgress(66);
                      }}
                     // disabled={isLoading}
                    >
                      volver
                    </Button>
                  </Box>
          
              </TabPanel>
              </form>
            </Box>
          </CardContent>
              </>
            )
            :
            (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 10,
                  flexDirection: {
                    xs: 'column',
                    sm: 'row',
                  }
                }}
                >
              <CircularProgress size={50} color="primary" />
              </Box>
            )
          }
          </>
        )
        :
        (
          <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 10,
            flexDirection: {
              xs: 'column',
              sm: 'row',
            }
          }}
          >
            <img src='/checked.gif' alt="logo" />
            <Typography
            variant="h2"
            color="primary"
            sx={{
              fontFamily: 'PTSerif-Bold'
            }}
            >
                registro exitoso! Por favor, logueate!
            </Typography>
          </Box>
        )
       }
        
      </Paper>
    </Container>
    </>
  )
}

export default Register