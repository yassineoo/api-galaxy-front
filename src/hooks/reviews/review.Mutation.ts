import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAnAPIReview } from "@/actions/api";
import { reviewCreation } from "./interfaces";
import { useSession } from "next-auth/react";
export const useCreateApi = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession()

  return useMutation({
    mutationFn: async (reviewData: reviewCreation) => {
      const response = await addAnAPIReview(reviewData, session?.token as string)
      return response
    },

    onSuccess: () => {
      //console.log("called from revamlidate")
      queryClient.refetchQueries({ queryKey: ["apiReviews"] });
      queryClient.refetchQueries({ queryKey: ["apiRating"] });
    },
  });
};
