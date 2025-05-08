// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { CircularProgress, Box } from "@mui/material"


// const PostLogin = () => {
//   const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0()
//   const [id, setId]=useState<string | null>(null)
//   const { data, isLoading: isLoadingUser } = useGetUserDataQuery(id ?? '', {
//       skip: !id, 
//     })
  
//   const navigate = useNavigate()




//   useEffect(() => {
//     const uploadUser = async () => {
//       try {
//         const token = await getAccessTokenSilently()
//         setToken(token)
//         setId(user?.sub ?? '')

//         const res = await fetch(`${import.meta.env.VITE_SERVER_HOST}/signup`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             id: user?.sub,
//             email: user?.email
//           }),
//         })
//         dispatch(setUserId(user?.sub))
//         const data = await res.json()

//         if (data.isNewUser) {
//           navigate("/onboarding") 
//         } else {
//           navigate("/home")
//         }
//       } catch (err) {
//         console.error("Error during signup:", err)
//       }
//     }

//     if (isAuthenticated && user && !isLoading) {
//       uploadUser()
//     }
//   }, [user, isAuthenticated, isLoading])

//   useEffect(()=>{
//     if(data){
//         dispatch(setUserData(data.userInfo))
//     }
//   },[data, isLoadingUser])

//   return (
//     <Box
//     sx={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "100dvh",
//       width: '100vw',
//     }}
//     >
//       <CircularProgress color="primary" size={50}/>
//     </Box>
//   )
// }

// export default PostLogin
