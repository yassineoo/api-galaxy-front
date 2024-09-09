import { useApiReviews } from "@/hooks/reviews/reviews.queries";
import { useReviewCreation } from "@/hooks/reviews/review.Mutation";
import { formatDistanceToNow } from "date-fns";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReactStars from "react-stars";
import ReviewSkeleton from "@/components/HubXs/ReviewSkeleton";
import { toast } from "react-toastify";
import { reportAnComment } from "@/actions/api";
import { useAuthSession } from "@/components/auth-provider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { session: data } = useAuthSession();
  const [comments, setComments] = useState<any>([]);
  const apiReviews = useApiReviews({ api_id: id });
  const { session } = useAuthSession();
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
    const response = await reportAnComment(
      reason,
      description,
      selectedComment as string,
      data?.userId as number,
      session?.token as string
    );
    if (response) {
      toast.success(`Reported comment ${selectedComment} for ${reason}.`);
    }
    setIsDialogOpen(false);
  };

  const { mutate: createReviewMutation, isPending } = useReviewCreation(
    session?.token || ""
  );

  const submitReview = (event: React.FormEvent) => {
    event.preventDefault();
    const newReview = {
      comment,
      userId: data?.userId as number,
      apiId: id as string,
      rating,
    };
    console.log("newReview -----", newReview);

    createReviewMutation(newReview, {
      onSuccess: () => {
        setComment("");
        setRating(0);
      },
      onError: (error) => {
        console.error("Error adding review:", error);
      },
    });
  };

  useEffect(() => {
    if (apiReviews.isSuccess) {
      setComments(apiReviews.data);
    }
  }, [apiReviews.isRefetching, apiReviews.isFetched]);

  return (
    <div className="flex flex-col w-full md:w-2/3 mx-auto">
      <div className="px-4 py-6 md:px-6 md:py-12 bg-white shadow-lg rounded-lg">
        <div className="mx-auto w-full">
          <h2 className="mb-6 text-3xl font-extrabold text-gray-800 dark:text-gray-200">
            API Reviews
          </h2>
          <div className="space-y-6">
            {apiReviews.isLoading ? (
              <ReviewSkeleton />
            ) : apiReviews.isError ? (
              <p className="text-red-500">Error fetching reviews</p>
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
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader className=" dark:bg-gray-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Write a Review
          </h2>
        </CardHeader>
        <CardContent className="px-6 py-4">
          <form className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="review"
              >
                Review
              </label>
              <Textarea
                id="review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                className="mt-1 p-3 block w-full rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 dark:text-gray-300">Rating:</span>
              <ReactStars
                count={5}
                size={24}
                color2={"#ffd700"}
                value={rating}
                onChange={setRating}
                edit={true}
              />
              <span className="text-black text-bold ml-4 text-lg  dark:text-gray-300">
                {" "}
                {rating}
              </span>
            </div>
          </form>
        </CardContent>
        <CardFooter className="bg-gray-100 dark:bg-gray-700 px-6 py-4 flex justify-end">
          <Button
            onClick={submitReview}
            type="submit"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </CardFooter>
      </Card>
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
  console.log("comment ---", comment);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-start gap-4 w-full relative mb-6 p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out bg-white dark:bg-gray-900"
    >
      {/* User Image */}
      <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
        {comment.imagePath ? (
          <Image
            src={comment.imagePath}
            alt={comment.comment}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-200 dark:bg-gray-800"></div>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
            {comment.name}
          </h4>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>
              {formatDistanceToNow(new Date(comment.date_rated), {
                addSuffix: true,
              })}
            </span>
            <ReactStars
              count={5}
              size={20}
              color2={"#ffd700"}
              value={Number(comment.rating)}
              edit={false}
            />
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300">{comment.comment}</p>
      </div>

      {isHovered && (
        <button
          className="cursor-pointer absolute bottom-2 right-4 text-indigo-600 text-sm hover:underline"
          onClick={() => report(comment.id)}
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
    setDescription("");
    setReason("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 max-w-lg w-full rounded-lg shadow-xl">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-6">
          Report Comment
        </h3>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Reason
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
          >
            <option value="">Select a reason</option>
            <option value="spam">Spam</option>
            <option value="harassment">Harassment</option>
            <option value="hate_speech">Hate Speech</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
            rows={5}
            placeholder="Provide additional details..."
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-all ease-in-out duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ease-in-out duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
