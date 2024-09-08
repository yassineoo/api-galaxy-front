// apiQueries.ts

import { Api } from "@/app/dashboard/apis/[id]/Analyse/api.interface";
import { ApiAuth, ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

import axios, { AxiosError } from "axios";
import { baseApiUrl, getUserApis, getUserFollowings } from "@/actions/api";
import { basedApiUrl, getAPIRating } from "@/actions/api";
import { getInactiveAPI } from "@/actions/admin";
import { useAuthSession } from "@/components/auth-provider";

export const useApiList = (
  { page, limit, filter, search }: any,
  userId: number,

  authToken: string,
  admin = 1
) => {
  //const userData = await getCurrentUser()
  //console.log("helll",userData)
  return useQuery({
    queryKey: ["apiList", page, limit, filter, search ?? ""],
    queryFn: async () => {
      try {
        let response;

        if (!authToken) {
          response = await axios.get(
            `http://localhost:5000/apis-service/apis/?limit=12&page=1&search=&filter=0`
          );
          console.log("logged token data : ", response.data.data.apis);

          const mappedApis = response.data.data.apis.map((api: any) => ({
            id: api.ID,
            name: api.Name,
            image_path: api.ImagePath,
            description: api.Description,
            status: api.Status,
          }));
          console.log("mapped apis : ", mappedApis);

          return mappedApis;
        } else
          console.log(
            "logged token data filter  : ",
            filter,
            userId,
            authToken
          );

        response = await basedApiUrl.get(
          `/userApi/${userId}?limit=${limit}&page=${page}&search=${search}&filter=${filter}&status=${admin}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        // return [];
        console.log("mapped apis 2 : ", response.data);

        //console.log("response from api query : ", response.data);
        return response.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },
  });
};

export const useApiListForAdmin = (
  { page, limit, filter, search, adminId }: any,
  authToken: string
) => {
  //const userData = await getCurrentUser()
  //console.log("helll",userData)
  return useQuery({
    queryKey: ["apiListAdmin", page, limit, filter, search ?? undefined],
    queryFn: async () => {
      try {
        const response = await basedApiUrl.get(
          `/userApi/admin/${adminId}?limit=${limit}&page=${page}&search=${search}`,
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        //console.log("response from api query : ", response.data);
        return response.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },
  });
};

export const useSearchApiList = ({ search }: { search: string }) => {
  return useQuery<Api[]>({
    queryKey: ["apiListSearch", search ?? undefined],
    queryFn: async () => {
      console.log("logged from api quety : ", search);

      try {
        const response = await axios.get(`${ApiUrl}/apis/search`, {
          params: { search },
        });
        console.log(response.data);
        return (response.data as { data: Api[] }).data;
      } catch (e) {
        console.log({ e });
        return [];
      }
    },
  });
};

export const useApiById = (apiId: number) => {
  return useQuery<Api>({
    queryKey: ["api", apiId],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:9000/apis/${apiId}`); // Adjust the endpoint

        return response.data;
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log({ e, response: e.response, data: e.response?.data })
        }
        throw e
      }
    },
  });
};

export const useApiByUserId = (userId: number) => {
  return useQuery<any[]>({
    queryKey: ["myApis", userId],
    queryFn: async () => {
      //const response = await axios.get(`${ApiUrl}/apis/user-apis/${userId}`); // Adjust the endpoint
      const data = await getUserApis(userId);
      console.log("data from api users : ", data);

      return data;
    },
  });
};

export const useFollowingApis = (userId: number) => {
  return useQuery({
    queryKey: ["myFollowings", userId],
    queryFn: async () => {
      //const response = await axios.get(`${ApiUrl}/apis/user-apis/${userId}`); // Adjust the endpoint
      const data = await getUserFollowings(userId);
      return data;
    },
  });
};

export const useAPIRating = (api_id: number) => {
  return useQuery({
    queryKey: ["apiRating", api_id],
    queryFn: async () => {
      const response = await getAPIRating(api_id);
      return response;
    },
  });
};

export const useInactiveAPI = () => {
  return useQuery({
    queryKey: ["inactiveAPI"],
    queryFn: async () => {
      const response = await getInactiveAPI();
      return response;
    },
  });
};

// export function useApi

export const useProviderInfo = (providerId: string) => {
  return useQuery({
    queryKey: ["providerInfo", providerId],
    queryFn: async () => {
      console.log("Fetching provider info for:", providerId);

      try {
        const response = await basedApiUrl.get(
          `/userApi/provider/${providerId}`
        );
        console.log(response.data);
        return JSON.parse(response.data); // Assuming the response data is the provider info
      } catch (error) {
        console.error("Error fetching provider info:", error);
        throw new Error("Could not fetch provider info");
      }
    },
    enabled: !!providerId, // Only run the query if providerId is not null or undefined
  });
};

export function useSubscribedApisQuery() {
  const { session } = useAuthSession()
  return useQuery<any[]>({
    queryKey: ["subscribedApis"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:7002/apis/subscribed-apis", {
          headers: {
            Authorization: `Bearer ${session?.token}`
          }
        });
        console.log({ data: response.data })
        return response.data
      } catch (e) {
        if (e instanceof AxiosError) {
          console.log({ e, response: e.response, data: e.response?.data })
        }
        else console.log({ e })
        throw e
      }
    }
  })
}