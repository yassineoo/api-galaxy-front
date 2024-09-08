// apiMutations.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { Api, ApiCreation } from "./interfaces";
import { ApiUsersUrl } from "@/utils/constants";
const ApiUrl = "http://localhost:9000";
const ApiUrlReplace = "http://localhost:9000";
export const useCreateApi = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: ApiCreation) => {
      console.log(` ----------------------------------      ${ApiUrl}/apis`);

      const response = await axios.post(`${ApiUrl}/apis`, apiData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      console.log(response.data.ID);
      const responseProduct = await axios.post(`${ApiUrl}/stripeCRUD/products`, {
        name: apiData.Name,
        description: apiData.Description,
        apiId: response.data.ID
      }, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      console.log(responseProduct.data);
      return response.data;

    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiList"] });
    },
  });
};

export const useUpdateApi = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiData: Api) => {
      const response = await axios.put(
        `${ApiUrl}/apis/${apiData.ID}`,
        apiData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      ); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiList"] });
    },
  });
};

export const useUpdateStatusApi = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiId: number) => {
      const response = await axios.get(
        `${ApiUsersUrl}/userApi/update-status/${apiId}`,
        //  {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      ); // Adjust the endpoint
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiListo"] });
    },
  });
};

export const useDeleteApi = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apiId: string) => {
      await axios.delete(`${ApiUrl}/apis/${apiId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      }); // Adjust the endpoint
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiList"] });
    },
  });
};

export const useUpdateDocs = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      docsId: number;
      Content: string;
      apiID: number;
    }) => {
      await axios.patch(`${ApiUrl}/apis-docs/${data.docsId}`, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      }); // Adjust the endpoint
    },

    onSuccess: (_, variables) => {
      // Invalidate the specific API query by its ID
      queryClient.invalidateQueries({
        queryKey: ["api", variables?.apiID?.toString()],
      });
    },
  });
};

interface Data {
  ApiID: number;
  Method: string;
  URL: string;
  Headers: Record<string, string>;
  Params: Record<string, any>;
  Data: Record<string, any>;
  EndpointID: number;
}

export const useSendRequest = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (RequestData: Data) => {
      const { ApiID, URL, Headers, Params, Data, Method } = RequestData;

      console.log("loog RequestData", RequestData);

      // Add X-Endpoint-Key to the headers
      const updatedHeaders = {
        ...Headers,
        Authorization: `Bearer ${authToken}`,
        "X-Endpoint-Key": RequestData.EndpointID.toString(),
      };

      const config: AxiosRequestConfig = {
        headers: updatedHeaders,
        params: Params,
        withCredentials: true,
      };

      try {
        switch (Method.toLowerCase()) {
          case "get": {
            console.log("loog RequestData", "get");

            const res = await axios.get(
              `${ApiUrl}/services/${ApiID}/${URL}`,
              config
            );
            console.log("loog res", res);
            return res;
          }

          case "post":
            return await axios.post(
              `${ApiUrl}/services/${ApiID}/${URL}`,
              Data,
              config
            );

          case "put":
            return await axios.put(
              `${ApiUrl}/services/${ApiID}/${URL}`,
              Data,
              config
            );

          case "delete":
            return await axios.delete(
              `${ApiUrl}/services/${ApiID}/${URL}`,

              config
            );

          default:
            return await axios.get(
              `${ApiUrl}/services/${ApiID}/${URL}`,
              config
            );
        }
      } catch (error) {
        console.log("loog error", error);
        return error;
      }
    },
  });
};

interface HelthRequestData {
  ApiID: number;
  EndpointID: number;
  Email?: string;
}
export const useHelthSendRequest = (authToken: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (HelthRequestData: HelthRequestData) => {
      const { ApiID, EndpointID } = HelthRequestData;

      console.log("loog HelthRequestData", HelthRequestData);

      const config: AxiosRequestConfig = {
        //headers: updatedHeaders,
        // params: Params,
        headers: { Authorization: `Bearer ${authToken}` },
        withCredentials: true,
      };

      try {
        const res = await axios.post(
          `${ApiUrl}/services-test/`,
          HelthRequestData,
          config
        );
        console.log("loog HelthRequestData", res);

        return res;
      } catch (error) {
        console.log("loog error", error);
        return error;
      }
    },
  });
};
