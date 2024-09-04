import { basedApiUrl } from "./api";

export const getSettings = async () => {
  try {
    const data = await basedApiUrl.get("/admin/settings");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInactiveAPI = async () => {
  try {
    const response = await basedApiUrl.get("/admin/getInactiveAPIS");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateEarning_pourcentage = async (
  pourcentage: number,
  adminId: number,
  authToken: string
) => {
  try {
    await basedApiUrl.put(
      "/admin/updateEarningPercentage",
      JSON.stringify({ earning_percentage: pourcentage, adminId }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return true;
  } catch (error) {}
};

export const updateTermsAndConditions = async (
  tc: string,
  adminId: number,
  authToken: string
) => {
  try {
    const res = await basedApiUrl.put(
      "/admin/updateTerms&Conditions",
      JSON.stringify({ termsAndConditions: tc, adminId }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const updatePrivacyAndPolicy = async (
  pap: string,
  adminId: number,
  authToken: string
) => {
  try {
    const res = await basedApiUrl.put(
      "/admin/updatePrivacyAndPolicy",
      JSON.stringify({ privacyAndPolicy: pap, adminId }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const publishAnAPI = async (api_id: number) => {
  try {
    const res = await basedApiUrl.post(
      "/admin/publish-api",
      JSON.stringify({
        api_id,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
  }
};
