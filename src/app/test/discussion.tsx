"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
const CommentBox = ({ onSubmit }: any) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(comment);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4  p-4">
      <Textarea
        className="w-full "
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></Textarea>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Post Comment
      </button>
    </form>
  );
};

const CommentsList = ({ comments }: any) => {
  return (
    <div className="space-y-4">
      {comments.map((comment: any, index: any) => (
        <Comment key={index} data={comment} />
      ))}
    </div>
  );
};

const Comment = ({ data, setShowReplyBox }: any) => {
  return (
    <div className="flex justify-between items-start gap-4 mb-2 p-4 ">
      <Stepper />
      <div className="flex flex-col items-start w-full">
        <div className="flex justify-between items-center w-full">
          <div className="font-semibold flex items-sta gap-2  w-full ">
            <img
              src="/images/login_bg_gateway.jpg"
              className="rounded-full object-cover w-6 h-6 "
              alt="@shadcn"
            />

            {data.author}
            <span className="text-gray-500 text-xs">
              {formatDistanceToNow(new Date(), { addSuffix: true })}
            </span>
          </div>
          <button
            onClick={setShowReplyBox}
            className="flex gap-2 items-center px-4 py-2 text-sm text-blue-500 hover:text-blue-600"
          >
            <svg
              width="15"
              height="12"
              viewBox="0 0 15 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.26976 4.56259L5.11534 0.705371C5.53948 0.367709 6.20797 0.641831 6.20797 1.16635V3.19801C10.6302 3.24469 14.1369 4.06173 14.1369 7.92505C14.1369 9.48436 13.0472 11.0291 11.8427 11.8368C11.4668 12.0888 10.9311 11.7725 11.0697 11.3639C12.318 7.6837 10.4776 6.70666 6.20797 6.65V8.88121C6.20797 9.40655 5.53897 9.67945 5.11534 9.34218L0.26976 5.48457C-0.0350211 5.24189 -0.035444 4.80561 0.26976 4.56259Z"
                fill="#007FFF"
              />
            </svg>
            Reply
          </button>
        </div>

        <p className="pl-8 text-gray-600">{data.text}</p>
      </div>
    </div>
  );
};

const ReplyBox = ({ onSubmit }: any) => {
  const [reply, setReply] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(reply);
    setReply("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 flex items-center justify-between ml-12  "
    >
      <img
        src="/images/login_bg_gateway.jpg"
        className="rounded-full object-cover w-6 h-6 "
        alt="@shadcn"
      />

      <Textarea
        className=" ml-4 mr-8 w-full "
        placeholder="Write a reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      ></Textarea>
      <Button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Reply
      </Button>
    </form>
  );
};

const ReplyList = ({ replies }: any) => {
  return (
    <div className="pl-8 border-l-2 border-gray-300">
      {replies.map((reply: any, index: any) => (
        <div key={index} className="mt-2">
          <Comment data={reply} />
        </div>
      ))}
    </div>
  );
};

const CommentsContainer = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      text: "This is an interesting article. Thanks for sharing!",
      replies: [
        {
          id: 101,
          author: "Jane Smith",
          text: "I agree, it was very informative.",
        },
        {
          id: 102,
          author: "Alice Johnson",
          text: "Glad you found it useful, John!",
        },
      ],
    },
    {
      id: 2,
      author: "Emily Davis",
      text: "Does anyone have more resources on this topic?",
      replies: [
        {
          id: 201,
          author: "Michael Brown",
          text: "Check out this link for more information.",
        },
      ],
    },
  ]);

  const handleNewComment = (newCommentText: any) => {
    const newComment = {
      id: Date.now(), // Simple unique ID, replace with real ID in production
      text: newCommentText,
      author: "Username", // Replace with actual user data
      replies: [],
    };
    setComments([...comments, newComment]);
  };

  const handleNewReply = (commentId: any, replyText: any) => {
    setComments(
      comments.map((comment: any) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                { id: Date.now(), text: replyText, author: "Username" },
              ],
            }
          : comment
      )
    );
  };

  const [showReplyBox, setShowReplyBox] = useState(false);
  return (
    <div className="container mx-auto p-4 w-3/4 text-xs">
      {/* <CommentBox onSubmit={handleNewComment} />*/}
      {comments.map((comment) => {
        // Local state for showing/hiding reply box

        const toggleReplyBox = () =>
          setShowReplyBox((showReplyBox) => !showReplyBox);

        return (
          <div key={comment.id} className="mt-4">
            <Comment data={comment} setShowReplyBox={setShowReplyBox} />

            {showReplyBox && (
              <ReplyBox
                onSubmit={(replyText: any) => {
                  handleNewReply(comment.id, replyText);
                  toggleReplyBox(); // Optionally close the reply box after submitting
                }}
              />
            )}
            {comment.replies && comment.replies.length > 0 && (
              <ReplyList replies={comment.replies} />
            )}
          </div>
        );
      })}
    </div>
  );
};

const Stepper = () => {
  const [count, setCount] = useState(12);

  return (
    <div className="h-16 w-8 flex flex-col items-center justify-center px-2  bg-gray-300 rounded-lg shadow ">
      <button
        className="text-blue-600 hover:scale-150  rounded text-lg"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
      <span className="text-blue-600 text-md ">{count}</span>
      <button
        className="text-blue-600 hover:scale-150  rounded text-lg"
        onClick={() => setCount(count - 1)}
      >
        -
      </button>
    </div>
  );
};

export default CommentsContainer;
