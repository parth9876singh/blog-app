import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import LikeButton from '../components/LikeButton';
import FavoriteButton from '../components/FavoriteButton';
import useCurrentUser from '../hooks/useCurrentUser';

function Detail() {
  const { id } = useParams();
  const [blogs, setBlogs] = useState({});
  const { theme } = useTheme();
  const [refreshComments, setRefreshComments] = useState(0);
  const { user: currentUser } = useCurrentUser();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4001/api/blogs/single-blog/${id}`,
        { withCredentials: true }
      );
      setBlogs(data.blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [id]);

  // Theme-based classes
  const containerClasses = `min-h-screen pt-12 transition-colors duration-300 ${
    theme === "dark" ? "bg-gray-900" : "bg-gray-50"
  }`;

  const contentClasses = `container mx-auto p-4 md:p-6 lg:p-8 ${
    theme === "dark" ? "text-gray-100" : "text-gray-800"
  }`;

  const categoryClasses = `uppercase text-xs font-bold mb-4 ${
    theme === "dark" ? "text-blue-400" : "text-blue-600"
  }`;

  const imageClasses = `rounded-lg shadow-lg cursor-pointer border ${
    theme === "dark" ? "border-gray-700" : "border-gray-200"
  }`;

  return (
    <div className={containerClasses}>
      {blogs && (
        <section className={contentClasses}>
          <div className={categoryClasses}>{blogs?.category}</div>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              {blogs?.title}
            </h1>
            <div className="flex items-center gap-2">
              <LikeButton 
                blogId={id} 
                initialLikes={blogs?.likes?.length || 0}
                initialIsLiked={!!(currentUser && blogs?.likes?.some(uid => uid === currentUser._id))}
                onLikeToggled={fetchBlogs}
              />
              <FavoriteButton 
                blogId={id}
                initialIsFavorited={false} // You'll need to check if current user favorited this blog
              />
            </div>
          </div>

          <div className="flex items-center mb-6">
            <img
              src={blogs?.adminPhoto || "/avatar-placeholder.png"}
              alt="author_avatar"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-3 md:mr-4"
            />
            <p className="text-base md:text-lg font-semibold">
              {blogs?.adminName || "Unknown Author"}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {blogs?.blogImage?.url && (
              <img
                src={blogs.blogImage.url}
                alt="mainblogsImg"
                className={`w-full lg:w-1/2 h-auto max-h-[500px] object-cover mb-4 ${imageClasses}`}
              />
            )}
            <div className="w-full lg:w-1/2">
              <div className="max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {blogs?.about}
                </p>
              </div>
            </div>
          </div>
          {/* Comments Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            <CommentForm blogId={id} onCommentAdded={() => setRefreshComments(c => c + 1)} />
            <CommentList blogId={id} refresh={refreshComments} />
          </div>
        </section>
      )}
    </div>
  );
}

export default Detail;
