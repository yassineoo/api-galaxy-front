// apiQueries.ts

import { Api } from "@/app/dashboard/apis/[id]/Analyse/api.interface";
import { ApiUrl } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
import { getUserApis, getUserFollowings } from "@/actions/api";
import { basedApiUrl, getAPIRating } from "@/actions/api";
import { getInactiveAPI } from "@/actions/admin";
import { useSession } from "next-auth/react";
export const useApiList = ({ page, limit, filter, search, userId }: any) => {
  //const userData = await getCurrentUser()
  //console.log("helll",userData)
  return useQuery({
    queryKey: ["apiList", page, limit, filter, search ?? undefined],
    queryFn: async () => {
      try {
        const response = await basedApiUrl.get(
          `/userApi/${userId}?limit=${limit}&page=${page}&search=${search}`
        );
        //console.log("response from api query : ", response.data);
        return response.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },
  });
};

export const useApiListForAdmin = ({
  page,
  limit,
  filter,
  search,
  adminId,
}: any) => {
  //const userData = await getCurrentUser()
  //console.log("helll",userData)
  return useQuery({
    queryKey: ["apiListAdmin", page, limit, filter, search ?? undefined],
    queryFn: async () => {
      try {
        const response = await basedApiUrl.get(
          `/userApi/admin/${adminId}?limit=${limit}&page=${page}&search=${search}`
        );
        //console.log("response from api query : ", response.data);
        return response.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },
  });
};
export const useSearchApiList = ({ search, authToken }: { search: string, authToken: string }) => {
  return useQuery<Api[]>({
    queryKey: ["apiListSearch", search ?? undefined],
    queryFn: async () => {
      console.log("logged from api quety : ", search);

      try {
        const response = await axios.get(
          `${ApiUrl}/apis/search`,
          {
            params: { search },
            headers: { Authorization: `Bearer ${authToken}` }
          },
        );
        console.log(response.data);
        return (response.data as { data: Api[] }).data;
      } catch (e) {
        console.log({ e })
        return []
      }
    },
  });
};

export const useApiById = (apiId: number) => {
  return useQuery<Api>({
    queryKey: ["api", apiId],
    queryFn: async () => {
      const response = await axios.get(`${ApiUrl}/apis/${apiId}`); // Adjust the endpoint

      return response.data;
    },
  });
};

export const useApiByUserId = (userId: number) => {
  return useQuery<Api[]>({
    queryKey: ["myApis", userId],
    queryFn: async () => {
      //const response = await axios.get(`${ApiUrl}/apis/user-apis/${userId}`); // Adjust the endpoint
      const data = await getUserApis(userId);
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
      const response = await getInactiveAPI()
      return response
    }
  })
}
// export function useApi
