import React from "react";
import { useAuthSession } from "@/components/auth-provider";
import { useStatBox } from "@/hooks/admin/reviews.query";

const StatisticsBoxes = ({ type }: { type: string }) => {
  const { session } = useAuthSession();
  const { data, error, isLoading, isSuccess } = useStatBox(
    Number(session?.userId) || 1,
    type
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-5 mx-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 p-5 rounded-lg shadow w-full animate-pulse"
          >
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-5 mx-6">
        {[...Array(4)].map((_, index) => (
          <ErrorCard key={index} message="Failed to load data" />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-5 mx-6 text-black">
      {isSuccess && data ? (
        <>
          {type === "customer" && (
            <>
              <Card
                title="Number of API Calls"
                value={data?.apiCalls?.toLocaleString() || 0}
                percentage={10}
                icon="📊"
              />
              <Card
                title="Money Spent"
                value={`$${data?.moneySpent?.toLocaleString() || 0}`}
                percentage={10}
                icon="💵"
              />
              <Card
                title="APIs Subscribed"
                value={data?.subscribedApis?.toLocaleString()}
                percentage={10}
                icon="🔖"
              />
              <Card
                title="APIs Liked"
                value={data?.likedApis?.toLocaleString()}
                percentage={10}
                icon="👍"
              />
            </>
          )}

          {type === "provider" && (
            <>
              <Card
                title="API Calls for Your APIs"
                value={data?.callCount.toLocaleString()}
                percentage={10}
                icon="📞"
              />
              <Card
                title="Money Earned"
                value={`$${data?.totalEarned.toLocaleString()}`}
                percentage={10}
                icon="💰"
              />
              <Card
                title="APIs Provided"
                value={data?.providedApis.toLocaleString()}
                percentage={10}
                icon="🚀"
              />
              <Card
                title="Subscribers to Your APIs"
                value={data?.subscriberCount.toLocaleString()}
                percentage={10}
                icon="👥"
              />
            </>
          )}

          {type === "admin" && (
            <>
              <Card
                title="Total API Calls"
                value={data?.callCount.toLocaleString()}
                percentage={10}
                icon="📊"
              />
              <Card
                title="Total Money Earned"
                value={`$${data?.totalEarned.toLocaleString()}`}
                percentage={10}
                icon="💰"
              />
              <Card
                title="Total APIs Provided"
                value={data?.providedApis.toLocaleString()}
                percentage={10}
                icon="🚀"
              />
              <Card
                title="Total Users"
                value={data?.userCount.toLocaleString()}
                percentage={10}
                icon="👥"
              />
            </>
          )}
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

const Card = ({ title, value, percentage, icon }: any) => {
  const trend = percentage > 0 ? "text-green-500" : "text-red-500";
  const bgGradient =
    percentage > 0
      ? "bg-gradient-to-r from-green-400 to-green-600"
      : "bg-gradient-to-r from-red-400 to-red-600";

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full transform hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex flex-col w-full">
          <div className="flex items-center mb-2">
            <div className="flex items-center justify-center bg-gray-100 p-2 rounded-full shadow-sm text-3xl mr-3">
              {icon}
            </div>
            <p className="text-base font-medium text-gray-700">{title}</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900 mb-1">{value}</p>
        </div>
        <div className="flex items-center">
          <span
            className={`${bgGradient} text-white text-xs font-medium py-1 px-2 rounded-full`}
          >
            {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
          </span>
        </div>
      </div>
    </div>
  );
};

const ErrorCard = ({ message }: { message: string }) => {
  return (
    <div className="bg-red-100 p-5 rounded-lg shadow w-full">
      <div className="h-6 bg-red-200 rounded w-full mb-4 animate-pulse"></div>
      <div className="text-red-700 font-medium text-center">{message}</div>
    </div>
  );
};
export default StatisticsBoxes;
