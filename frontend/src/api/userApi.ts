import {
  useMutation,
} from '@tanstack/react-query'
import { userStore } from '../utils/store'
import { useNavigate } from 'react-router-dom'


interface UserData  {
    email: string
    password: string
}


export const useLogIn = () => {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: async (userData: UserData) => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Login failed');

      const authRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth`, {
        credentials: 'include',
      });

      const authData = await authRes.json();

      if (authRes.ok) {
        userStore.getState().setAuthStatus(
          true,
          authData.userId,
          authData.userFirstName,
          authData.userLastName,
          authData.userEmail,
          authData.isVerified,
          authData.emailVerified
        );

        if (authData.emailVerified === 1) {
          navigate('/operations')
        } else {
          alert(`Correo no verificado. Por favor revise su bandeja de entrada o spam para encontrar su correo de activación.`);
        }
      } else {
        throw new Error('Auth failed')
      }
    },
  });

  return mutation
};
