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
          `/userApi/reviewReports?limit=${limit}&page=${page}&search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${authorize}`,
            },
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
