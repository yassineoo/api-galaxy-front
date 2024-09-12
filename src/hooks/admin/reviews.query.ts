import { useQuery } from "@tanstack/react-query";
import { basedApiUrl } from "@/actions/api";
export const useApiReports = (
  { page, limit, search }: any,
  authorize: string
) => {
  return useQuery({
    queryKey: ["apiReportsList", page, limit, search ?? undefined],
    queryFn: async () => {
      try {
        const response = await basedApiUrl.get(
          `/userApi/adminReports?limit=${limit}&page=${page}&search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${authorize}`,
            },
          }
        );
        console.log("response from api query admin : ", response.data);
        return response.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },
  });
};

export const useReviewsReports = (
  { page, limit, search }: any,
  authorize: string
) => {
  return useQuery({
    queryKey: ["reviewReportsList", page, limit, search ?? undefined],
    queryFn: async () => {
      try {
        const response = await basedApiUrl.get(
          `/userApi/adminReviwesReports?limit=${limit}&page=${page}&search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${authorize}`,
            },
          }
        );
        console.log("reviews data 11 : ", response.data);
        return response.data;
      } catch (error: any) {
        console.log(error.message);
      }
    },
  });
};

export const useUsersList = (
  { page, limit, search }: any,
  authorize: string
) => {
  return useQuery({
    queryKey: ["reviewReportsList", page, limit, search ?? undefined],
    queryFn: async () => {
      try {
        const res = await basedApiUrl.get(
          `/admin/userList?limit=${limit}&page=${page}&search=${search}`,
          {
            headers: { Authorization: `Bearer ${authorize}` },
          }
        );
        console.log("response from api query : ", res.data);

        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const useNotifList = (userId: number, authorize: string) => {
  return useQuery({
    queryKey: ["NotifList", userId],
    queryFn: async () => {
      try {
        const res = await basedApiUrl.get(`/userApi/notifications/${userId}`, {
          headers: { Authorization: `Bearer ${authorize}` },
        });
        console.log("response from api query : ", res.data);

        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};

export const useStatBox = (userId: number, type: string) => {
  return useQuery({
    queryKey: ["StatBox", userId, type],
    queryFn: async () => {
      try {
        console.log("response from api stats res ", userId, type);

        const res = await basedApiUrl.get(
          `/userApi/stat-box/${userId}/${type}`,
          {}
        );
        console.log("response from api stats res : ", res.data);

        return res.data;
      } catch (error) {
        console.log("response from api stats res", error);
      }
    },
  });
};
