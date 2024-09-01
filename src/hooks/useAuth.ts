import getAuthToken from "@/lib/get-auth-token";
import { useQuery } from "@tanstack/react-query";

export default function useAuth() {
    return useQuery({
        queryKey: [],
        refetchInterval: 0,
        queryFn: async () => {
            const auth = await getAuthToken()
            return auth
        }
    })
}