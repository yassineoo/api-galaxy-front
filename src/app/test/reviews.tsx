import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import ReactStars from "react-stars";

export default function ReviewsTab() {
  // Sample comments data (replace with actual data from your backend)
  const [comments, setComments] = useState([
    {
      apiId: 1,
      rating: 5,
      review: "Absolutely fantastic API! It made my job so much easier.",
      name: "Sarah Johnson",
      imagePath: "/path/to/image3.jpg",
      reviewedAt: "2022-04-20",
    },
    {
      apiId: 2,
      rating: 5,
      review:
        "This API exceeded my expectations. Seamless integration and great performance.",
      name: "Michael Anderson",
      imagePath: "/path/to/image4.jpg",
      reviewedAt: "2024-04-21",
    },
    {
      apiId: 3,
      rating: 4,
      review: "Very reliable API. Has been a crucial part of our project.",
      name: "Emily Wilson",
      imagePath: "/path/to/image5.jpg",
      reviewedAt: "2023-04-22",
    },
    {
      apiId: 4,
      rating: 5,
      review: "Excellent documentation and support. Kudos to the team!",
      name: "David Thompson",
      imagePath: "/path/to/image6.jpg",
      reviewedAt: "2020-04-23",
    },
    {
      apiId: 5,
      rating: 4,
      review: "Highly recommended API. It simplified complex tasks for us.",
      name: "Olivia Parker",
      imagePath: "/path/to/image7.jpg",
      reviewedAt: "2022-04-24",
    },
  ]);

  return (
    <div className="flex flex-col w-2/3 ">
      <div className="px-4 py-6 md:px-6 md:py-12">
        <div className=" mx-auto w-full  ">
          <h2 className="mb-6 text-2xl font-bold">Api Reviews</h2>
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start gap-4 w-full">
                {/* Replace this with actual image */}
                <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{comment.name}</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(new Date(comment.reviewedAt), {
                        addSuffix: true,
                      })}
                      <ReactStars
                        count={5}
                        size={24}
                        color2={"#ffd700"}
                        value={comment.rating}
                        edit={false}
                      />
                    </span>
                  </div>
                  <p>{comment.review}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-6 md:px-6 md:py-12 dark:bg-gray-950">
        <div className="prose prose-gray mx-auto max-w-4xl dark:prose-invert">
          <h2 className="mb-6 text-2xl font-bold">Write a Review</h2>
          <form className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="review"
              >
                Review
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                id="review"
                rows={3}
              />
            </div>
            {/* Add ReactStars component for star rating */}
            <ReactStars
              count={5}
              size={24}
              color2={"#ffd700"}
              value={0} // Initialize to zero or use state for dynamic value
              onChange={(newRating) => console.log(newRating)} // Handle rating change
              edit={true}
            />
            <button
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
