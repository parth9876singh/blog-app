import React, { useEffect, useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { useTheme } from "../context/ThemeContext";

const CommentList = ({ blogId, refresh }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const { user: currentUser, loading: userLoading } = useCurrentUser();
  const { theme } = useTheme();

  useEffect(() => {
    if (!blogId) return;
    setLoading(true);
    fetch(
      `${
        import.meta.env.VITE_API_URL || "http://localhost:4001/api"
      }/comments/${blogId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load comments");
        setLoading(false);
      });
  }, [blogId, refresh]);

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    setDeleting(commentId);
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:4001/api"
        }/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to delete");
      setComments((comments) => comments.filter((c) => c._id !== commentId));
    } catch (err) {
      alert("Could not delete comment.");
    } finally {
      setDeleting(null);
    }
  };

  // Theme-based classes
  const commentContainerClasses = `rounded-xl mt-4 transition-colors duration-300 ${
    theme === "dark" ? "bg-gray-800" : "bg-white"
  }`;

  const commentItemClasses = `p-4 transition-colors duration-300 ${
    theme === "dark"
      ? "border-gray-700 hover:bg-gray-700/50"
      : "border-gray-200 hover:bg-gray-50"
  } border-b last:border-b-0`;

  const loadingClasses = `flex justify-center items-center p-8 ${
    theme === "dark" ? "text-gray-400" : "text-gray-500"
  }`;

  const emptyClasses = `text-center p-8 ${
    theme === "dark" ? "text-gray-400" : "text-gray-500"
  }`;

  const errorClasses = `text-center p-4 rounded-lg ${
    theme === "dark" ? "bg-red-900/50 text-red-300" : "bg-red-100 text-red-700"
  }`;

  const deleteButtonClasses = `text-xs px-3 py-1 rounded-full transition-all duration-200 ${
    theme === "dark"
      ? "text-red-400 hover:bg-red-900/50 hover:text-red-300"
      : "text-red-500 hover:bg-red-100 hover:text-red-700"
  } ${deleting ? "opacity-50 cursor-not-allowed" : ""}`;

  if (loading || userLoading)
    return (
      <div className={commentContainerClasses}>
        <div className={loadingClasses}>
          <svg
            className="animate-spin h-5 w-5 mr-3"
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
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading comments...
        </div>
      </div>
    );

  if (error)
    return (
      <div className={commentContainerClasses}>
        <div className={errorClasses}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          {error}
        </div>
      </div>
    );

  if (!comments.length)
    return (
      <div className={commentContainerClasses}>
        <div className={emptyClasses}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto mb-2 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          No comments yet. Be the first to share your thoughts!
        </div>
      </div>
    );

  return (
    <div className={commentContainerClasses}>
      <h3
        className={`p-4 text-lg font-semibold ${
          theme === "dark" ? "text-gray-200" : "text-gray-700"
        }`}
      >
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h3>

      <div className="divide-y">
        {comments.map((comment) => {
          const isOwner =
            currentUser &&
            comment.user &&
            comment.user._id?.toString() === currentUser._id?.toString();
          const isAuthor =
            currentUser &&
            comment.user &&
            comment.user._id?.toString() === currentUser._id?.toString();

          return (
            <div key={comment._id} className={commentItemClasses}>
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-300"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {comment.user?.email?.charAt(0).toUpperCase() || "U"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-medium truncate ${
                        theme === "dark" ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      {comment.user?.email || "Anonymous"}
                    </span>
                    {isAuthor && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          theme === "dark"
                            ? "bg-blue-900/50 text-blue-300"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        Author
                      </span>
                    )}
                    <span
                      className={`text-xs ${
                        theme === "dark" ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p
                    className={`mt-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {comment.content}
                  </p>

                  {isOwner && (
                    <div className="mt-2">
                      <button
                        className={deleteButtonClasses}
                        onClick={() => handleDelete(comment._id)}
                        disabled={deleting === comment._id}
                      >
                        {deleting === comment._id ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin h-3 w-3 mr-1"
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
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Deleting...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Delete
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentList;
