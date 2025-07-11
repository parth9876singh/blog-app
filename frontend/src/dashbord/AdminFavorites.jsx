import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import FavoriteButton from '../components/FavoriteButton';

function AdminFavorites() {
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
  const containerClasses = `min-h-screen transition-colors pl-60 duration-300 ${
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
  }`;

  const tableClasses = `w-full bg-white rounded-lg shadow-md overflow-hidden ${
    theme === "dark" ? "bg-gray-800 border border-gray-700" : ""
  }`;

  if (loading) return (
    <div className={containerClasses}>
      <div className="p-6">
        <div className="text-center">Loading favorites...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className={containerClasses}>
      <div className="p-6">
        <div className="text-center text-red-500">{error}</div>
      </div>
    </div>
  );

  return (
    <div className={containerClasses}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Favorite Blogs</h1>
          <Link 
            to="/blogs" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Discover More Blogs
          </Link>
        </div>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg mb-4">No favorite blogs yet.</p>
            <Link 
              to="/blogs" 
              className="text-blue-500 hover:text-blue-600 underline"
            >
              Start exploring blogs to add to your favorites
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={tableClasses}>
              <thead className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Blog
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {favorites.map((blog) => (
                  <tr key={blog._id} className={`${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {blog.blogImage?.url && (
                          <img
                            src={blog.blogImage.url}
                            alt={blog.title}
                            className="w-12 h-12 rounded object-cover mr-4"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium">{blog.title}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {blog.about}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={blog.adminPhoto || "/avatar-placeholder.png"}
                          alt="author"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="text-sm">{blog.adminName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/blog/${blog._id}`}
                          className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                        >
                          View
                        </Link>
                        <FavoriteButton 
                          blogId={blog._id}
                          initialIsFavorited={true}
                          onFavoriteToggled={() => handleFavoriteRemoved(blog._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminFavorites; 