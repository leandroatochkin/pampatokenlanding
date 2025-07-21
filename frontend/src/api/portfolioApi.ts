import { useQuery, useMutation } from "@tanstack/react-query";
import { TokenDTO } from "../utils/interfaces";

export interface BuyTransactionDTO{
    userId: string
    amount: number 
    symbol: number
    boughtAtValue: number 
    tokenName: string 
}

export interface SellTransactionDTO{
    userId: string
    amount: number 
    symbol: number
    soldAtValue: number
    tokenName: string 
}


export const useGetPortfolio = (userId: string) => {
  const { isPending, error, data, isFetching, refetch } = useQuery<TokenDTO[]>({
    queryKey: ['portfolioData', userId],
    queryFn: async ({ queryKey }) => {
      const [, uid] = queryKey;
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-portfolio?userId=${uid}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    },
    enabled: !!userId, 
  });

  return { isPending, error, data, isFetching, refetch };
};

export const useBuyToken = () => {
    const mutation = useMutation({
        mutationFn: async (payload: BuyTransactionDTO) => {
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
                    throw new Error('Failed to buy tokens')
                } else {
                    alert(`Orden de compra generada exitosamente`)
                }
    },
  });

  return mutation
}

export const useSellToken = () => {
    const mutation = useMutation({
        mutationFn: async (payload: SellTransactionDTO) => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sell`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
                if(!response.ok){            
                    alert('Error al vender tokens')
                    throw new Error('Failed to buy tokens')
                } else {
                    alert(`Orden de venta generada exitosamente`)
                }
    },
  });

  return mutation
}
