import { useApiReviews } from "@/hooks/reviews/reviews.queries";
import { useCreateApi } from "@/hooks/reviews/review.Mutation";
import { formatDistanceToNow } from "date-fns";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReactStars from "react-stars";
import ReviewSkeleton from "@/components/HubXs/ReviewSkeleton";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { reportAnComment } from "@/actions/api";

type Comment = {
  id: string;
  api_id: string;
  user_id: string;
  rating: string;
  comment: string;
  name: string;
  imagePath: string;
  date_rated: string;
};
export default function ReviewsTab() {
  // Sample comments data (replace with actual data from your backend)
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { data } = useSession();
  const [comments, setComments] = useState<any>([
    /*{
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
    },*/
  ]);
  const apiReviews = useApiReviews({
    api_id: id,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<string | null>(null);

  const handleReport = (commentId: string) => {
    setSelectedComment(commentId);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedComment(null);
  };

  const handleReportSubmit = async (reason: string, description: string) => {
    // Submit the report to your API
    const response = await reportAnComment(reason,description,selectedComment as string,data?.userId as number)
    //console.log(response)
    if(response){
    toast.success(`Reported comment ${selectedComment} for ${reason}.`);
    }
    setIsDialogOpen(false)
  };

  // create review mutation
  const createReviewMutation = useCreateApi();

  // submit an review
  const submitReview = (event: React.FormEvent) => {
    event.preventDefault();
    const newReview = {
      comment,
      userId: data?.userId as number,
      apiId: id as string,
      rating,
    };

    // trigger the mutation
    createReviewMutation.mutate(newReview, {
      onSuccess: () => {
        // Reset the form or do something else on success

        setComment("");
        setRating(0);
      },
      onError: (error) => {
        // Handle error, display error message, etc.
        console.error("Error adding review:", error);
        //alert('Failed to add review. Please try again.');
      },
    });
  };
  useEffect(() => {
    if (apiReviews.isSuccess) {
      console.log("wi chabiba");
      setComments(apiReviews.data);
    }
  }, [apiReviews.isRefetching, apiReviews.isFetched]);

  return (
    <div className="flex flex-col w-2/3 ">
      <div className="px-4 py-6 md:px-6 md:py-12">
        <div className=" mx-auto w-full  ">
          <h2 className="mb-6 text-2xl font-bold">Api Reviews</h2>
          <div className="space-y-6">
            {/* Check for comments loading */}
            {apiReviews.isLoading ? (
              <ReviewSkeleton />
            ) : apiReviews.isError ? (
              <p>Error fetching reviews</p>
            ) : (
              comments.map((comment: Comment, index: number) => (
                <ReviewComponent
                  comment={comment}
                  key={index}
                  report={handleReport}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-6 md:px-6 md:py-12 dark:bg-gray-950">
        <div className="prose prose-gray mx-auto max-w-4xl dark:prose-invert">
          <h2 className="mb-6 text-2xl font-bold">Write a Review</h2>
          <form className="space-y-4" onSubmit={submitReview}>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="review"
              >
                Review
              </label>
              <textarea
                className="mt-1 p-3 outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                id="review"
                value={comment}
                rows={3}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setComment(e.target?.value)
                }
              />
            </div>
            {/* Add ReactStars component for star rating */}
            <ReactStars
              count={5}
              size={24}
              color2={"#ffd700"}
              value={rating} // Initialize to zero or use state for dynamic value
              onChange={(newRating) => setRating(newRating)} // Handle rating change
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
      <ReportDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}

const ReviewComponent = ({
  comment,
  report,
}: {
  comment: Comment;
  report: (commentId: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-start gap-4 w-full relative mb-6"
    >
      {/* Replace this with actual image
                    
                    */}
      {comment.imagePath ? (
        <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800">
          <Image src={comment.imagePath} alt={comment.comment} />
        </div>
      ) : (
        <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800" />
      )}

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="font-bold underline">{comment.name}</h4>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(new Date(comment.date_rated), {
              addSuffix: true,
            })}
            <ReactStars
              count={5}
              size={24}
              color2={"#ffd700"}
              value={Number(comment.rating)}
              edit={false}
            />
          </span>
        </div>
        <p>{comment.comment}</p>
      </div>
      {isHovered && (
        <button
          className="cursor-pointer absolute bottom-0 right-16 text-slate-600 text-sm hover:underline"
          onClick={()=>report(comment.id)}
        >
          Report
        </button>
      )}
    </div>
  );
};

const ReportDialog = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, description: string) => void;
}) => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onSubmit(reason, description);
    setDescription("")
    setReason("")
    onClose(); 
    // Close the dialog after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#00000030] flex items-center justify-center">
      <div className="bg-white p-6 max-w-lg w-full rounded-r-md">
        <h3 className="font-bold text-slate-700 my-3">Report Comment</h3>
        <div className="mb-4">
          <label className="block">Reason</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full"
          >
            <option value="">Select a reason</option>
            <option value="spam">Spam</option>
            <option value="harassment">Harassment</option>
            <option value="hate_speech">Hate Speech</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="w-full">
          <label>Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 outline-none border border-slate-500"
            rows={6}
            placeholder="Provide additional details..."
          />
        </div>
        <div className="flex justify-between">
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-1 hover:bg-blue-400">
          submit
        </button>
        <button onClick={onClose} className="text-white bg-orange-400 hover:bg-orange-500 p-1">
          cancel
        </button>
        </div>
      </div>
    </div>
  );
};
