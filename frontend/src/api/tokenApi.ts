import { useQuery } from "@tanstack/react-query";
import { TokenInfo } from "../utils/interfaces";

interface Valuations {
    valuation: TokenInfo[] | []
}

export const useGetTokens = () => {

         const { isPending, error, data, isFetching, refetch } = useQuery<Valuations>({
                queryKey: ['tokensData'],
                queryFn: async () => {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/get-value`,{
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                    }})
                return await response.json()
                },
            })
            
            return {isPending, error, data, isFetching, refetch}
}