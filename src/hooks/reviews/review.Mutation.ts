import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAnAPIReview } from "@/actions/api";
import { reviewCreation } from "./interfaces";

export const useReviewCreation = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewData: reviewCreation) => {
      console.log("reviewData", reviewData, authToken);

      const response = await addAnAPIReview(reviewData, authToken);

      return response;
    },

    onSuccess: () => {
      //console.log("called from revamlidate")
      queryClient.refetchQueries({ queryKey: ["apiReviews"] });
      queryClient.refetchQueries({ queryKey: ["apiRating"] });
    },
  });
};
