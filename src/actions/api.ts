import axios from "axios";

import { reviewCreation } from "@/hooks/reviews/interfaces";

import { ApiUrl, ApiUsersUrl } from "@/utils/constants";
import useAuth from "@/hooks/useAuth";
import { useAuthSession } from "@/components/auth-provider";

export const basedApiUrl = axios.create({
  baseURL: ApiUsersUrl,
});
export const baseApiUrl = axios.create({
  baseURL: ApiUrl,
});
export const likeAnAPI = async (user_id: number, api_id: number) => {
  try {
    const res = await basedApiUrl.post(`/userApi/likeApi/${api_id}`, {
      user_id,
    });
    console.log("like", res);
    return true;
  } catch (error: any) {
    console.log(error.data.message);
    return error.data.message;
  }
};

export const disLikeAnAPI = async (user_id: number, api_id: number) => {
  try {
    const res = await basedApiUrl.post(`/userApi/dislikeApi/${api_id}`, {
      user_id,
    });
    console.log("dislike", res);
    return true;
  } catch (error: any) {
    console.log(error.data.message);
    return error.data.message;
  }
};

// get api reviews
export const getAPIReviews = async (api_id: number) => {
  try {
    const reviews = await basedApiUrl.get(`/userApi/getReviews/${api_id}`);
    return reviews.data;
  } catch (error) {
    console.log(error);
  }
};

// add a Review
export const addAnAPIReview = async (reviewData: reviewCreation) => {
  const { data: auth, isSuccess } = useAuth();
  if (isSuccess) console.log({ auth });

  const { session, isAuthenticated } = useAuthSession();

  try {
    console.log(reviewData);
    const success = await basedApiUrl.post(
      `/userApi/createReview/${reviewData.apiId}`,
      {
        comment: reviewData.comment,
        rating: reviewData.rating,
        userId: reviewData.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${isAuthenticated ? session.token : ""}`,

          "Content-Type": "application/json",
        },
      }
    );
    console.log(success);
    return success.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

// get api Rating to instatinous update
export const getAPIRating = async (api_id: number) => {
  try {
    const success = await basedApiUrl.get(`/userApi/getRating/${api_id}`);
    console.log(success);
    return success.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const getUserApis = async (userId: number) => {
  try {
    const res = await basedApiUrl.get(`/userApi/myApis/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserFollowings = async (userId: number) => {
  try {
    const res = await basedApiUrl.get(`/userApi/myFollowingApis/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const reportAnAPI = async (
  formData: any,
  api_id: number,
  user_id: number
) => {
  try {
    const response = await basedApiUrl.post(
      `/userApi/reportAPI/${api_id}`,
      JSON.stringify({ ...formData, userId: user_id }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const reportAnComment = async (
  reason: string,
  description: string,
  commentId: string,
  userId: number
) => {
  try {
    const response = await basedApiUrl.post(
      `/userApi/reportComment/${commentId}`,
      JSON.stringify({
        reason,
        description,
        userId,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (id: number) => {
  try {
    const isDeleted = await basedApiUrl.get(
      `/userApi/deleteReviewReport/${id}`
    );
    return isDeleted;
  } catch (error) {
    console.log(error);
  }
};
