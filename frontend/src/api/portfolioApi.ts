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

export interface Movement {
    userId: string
    operationId: string
    amount: number
    operationDate: string
    operationType: number
    symbol: string
    value: number
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
}

export const useGetMovements = (userId: string) => {
    const { isPending, error, data, isFetching, refetch } = useQuery<Movement[] | []>({
    queryKey: ['movementsData', userId],
    queryFn: async ({ queryKey }) => {
      const [, uid] = queryKey;
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/movements?userId=${uid}`, {
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
}

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
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({})); // fallback if JSON fails
    const error = new Error(errorBody.message || 'Failed to buy tokens');
    // @ts-ignore - attach extra info manually
    error.status = response.status;
    // @ts-ignore
    error.details = errorBody;
    throw error;
  }

  return await response.json(); // ✅ returned as mutation.data
}
  });

  return { mutation }; // ✅ Don't need `data` here — use `mutation.data` wherever you call the hook
};


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
                     const errorBody = await response.json().catch(() => ({})); // fallback if JSON fails
                    const error = new Error(errorBody.message || 'Failed to sell tokens');
                    // @ts-ignore - attach extra info manually
                    error.status = response.status;
                    // @ts-ignore
                    error.details = errorBody;
                    throw error;
                } 
                
                return await response.json();
    },
  });

  return { mutation }
}
