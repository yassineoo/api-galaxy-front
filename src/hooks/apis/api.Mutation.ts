// apiMutations.ts

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { ApiInput } from "./interfaces";

export const useCreateApi = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (apiData: ApiInput) => {
      const response = await axios.post("/api/apis", apiData); // Adjust the endpoint
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("apiList");
      },
    }
  );
};

export const useUpdateApi = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (apiData: ApiInput) => {
      const response = await axios.put(`/api/apis/${apiData.id}`, apiData); // Adjust the endpoint
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("apiList");
      },
    }
  );
};

export const useDeleteApi = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (apiId: string) => {
      await axios.delete(`/api/apis/${apiId}`); // Adjust the endpoint
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("apiList");
      },
    }
  );
};
