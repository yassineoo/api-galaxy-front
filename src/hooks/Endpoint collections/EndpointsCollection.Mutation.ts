// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { ApiUrl } from "@/utils/constants";
import { Collection, CollectionCreation } from "./interfaces";
import { useSession } from "next-auth/react";

import { useAuthSession } from "@/components/auth-provider";

export const useCreateCollection = () => {
  const queryClient = useQueryClient();
  // const { data: session } = useSession()
  const { session } = useAuthSession();

  return useMutation({
    mutationFn: async (data: CollectionCreation) => {
      const response = await axios.post(
        `${ApiUrl}/api-collections`,
        data,
        { headers: { "Authorization": `Bearer ${session?.token}` } });
      // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CollectionList"] });
    },
  });
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();

  // const { data: session } = useSession()
  const { session } = useAuthSession();


  return useMutation({
    mutationFn: async (apiData: Collection) => {
      const response = await axios.patch(
        `${ApiUrl}/api-collections/${apiData.ID}`,
        apiData,
        { headers: { "Authorization": `Bearer ${session?.token}` } }
      ); // Adjust the endpoint
      console.log(response.data);
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CollectionList"] });
    },
  });
};

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  // const { data: session } = useSession()
  const { session } = useAuthSession();


  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(
        `${ApiUrl}/api-collections/${id}`,
        { headers: { "Authorization": `Bearer ${session?.token}` } }
      ); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CollectionList"] });
    },
  });
};
