import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center h-screen">
      <div className="w-24 h-24 rounded-full animate-bounce ">
        <img alt="logo" src="/logos/logo.svg" className="text-dark-grey"></img>
      </div>
      <p className="text-[24px] mt-6 font-bold text-darkgrey">Api Galaxy</p>
    </div>
  );
};

export default LoadingPage;
