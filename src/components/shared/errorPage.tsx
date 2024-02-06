// pages/404.js
//import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex w-full items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">
          Oops! The page you're looking for does not exist.
        </p>

        <a className="text-lg bg-white text-purple-500 py-2 px-4 rounded-full hover:bg-purple-500 hover:text-white transition duration-300 ease-in-out">
          Go back home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
