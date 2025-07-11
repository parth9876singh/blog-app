import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import FavoriteButton from '../components/FavoriteButton';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('https://blog-app-tc0o.onrender.com/api/users/favorites', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch favorites');
      const data = await response.json();
      setFavorites(data.favorites);
    } catch (err) {
      setError('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteRemoved = (blogId) => {
    setFavorites(favorites.filter(blog => blog._id !== blogId));
  };

  // Theme-based classes
  const containerClasses = `min-h-screen pt-12 transition-colors duration-300 ${
    theme === "dark" ? "bg-gray-900" : "bg-gray-50"
  }`;

  const contentClasses = `container mx-auto p-4 md:p-6 lg:p-8 ${
    theme === "dark" ? "text-gray-100" : "text-gray-800"
  }`;

  const cardClasses = `bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
    theme === "dark" ? "bg-gray-800 border border-gray-700" : ""
  }`;

  if (loading) return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        <div className="text-center">Loading favorites...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        <div className="text-center text-red-500">{error}</div>
      </div>
    </div>
  );

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        <h1 className="text-3xl font-bold mb-8">My Favorite Blogs</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg mb-4">No favorite blogs yet.</p>
            <Link 
              to="/blogs" 
              className="text-blue-500 hover:text-blue-600 underline"
            >
              Discover blogs to favorite
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((blog) => (
              <div key={blog._id} className={cardClasses}>
                {blog.blogImage?.url && (
                  <img
                    src={blog.blogImage.url}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-600 uppercase">
                      {blog.category}
                    </span>
                    <FavoriteButton 
                      blogId={blog._id}
                      initialIsFavorited={true}
                      onFavoriteToggled={() => handleFavoriteRemoved(blog._id)}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {blog.about}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={blog.adminPhoto || "/avatar-placeholder.png"}
                        alt="author"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="text-sm text-gray-500">
                        {blog.adminName}
                      </span>
                    </div>
                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites; 