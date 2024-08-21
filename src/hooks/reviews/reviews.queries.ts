import { useQuery } from "@tanstack/react-query";
import { basedApiUrl, getAPIReviews } from "@/actions/api";
export const useApiReviews = ({ api_id }: any) => {
    //const userData = await getCurrentUser()
    //console.log("helll",userData)
    return useQuery({
      queryKey: ["apiReviews"],
      queryFn: async () => {
        try {
          console.log("called agian")
        const reviews = await getAPIReviews(api_id)
        return reviews
        } catch (error:any) {
          console.log(error.message)
        }
       
      },
    });
  };