import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAnAPIReview } from "@/actions/api";
import { reviewCreation } from "./interfaces";

import { useAuthSession } from "@/components/auth-provider";
export const useCreateApi = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (reviewData: reviewCreation) => {
      const response = await addAnAPIReview(reviewData)

      return response
    },

    onSuccess: () => {
      //console.log("called from revamlidate")
      queryClient.refetchQueries({ queryKey: ["apiReviews"] });
      queryClient.refetchQueries({ queryKey: ["apiRating"] });
    },
  });
};
