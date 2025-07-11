import React, { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';

const Blogs = () => {
  const { theme } = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  // Fetch blogs with filters
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (categoryFilter) params.append('category', categoryFilter);
      if (authorFilter) params.append('author', authorFilter);

      const response = await fetch(`https://blog-app-tc0o.onrender.com/api/blogs/all-blog?${params}`);
      const data = await response.json();
      setBlogs(data.allBlogs || []);

      // Extract unique categories and authors for filter options
      if (data.allBlogs) {
        const uniqueCategories = [...new Set(data.allBlogs.map(blog => blog.category))];
        const uniqueAuthors = [...new Set(data.allBlogs.map(blog => blog.adminName))];
        setCategories(uniqueCategories);
        setAuthors(uniqueAuthors);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch blogs when filters change
  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, categoryFilter, authorFilter]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setAuthorFilter('');
  };

  const containerClasses = `${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`;
  const cardClasses = `
    group block overflow-hidden rounded-xl shadow-md hover:shadow-xl 
    transition-all duration-300 transform hover:-translate-y-1 hover:scale-105
    ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
  `;

  return (
    <div className={containerClasses}>
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Blogs
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="md:col-span-2">
              <SearchBar onSearch={handleSearch} placeholder="Search blogs by title or content..." />
            </div>
            <div>
              <FilterDropdown
                options={categories}
                value={categoryFilter}
                onChange={setCategoryFilter}
                placeholder="All Categories"
              />
            </div>
            <div>
              <FilterDropdown
                options={authors}
                value={authorFilter}
                onChange={setAuthorFilter}
                placeholder="All Authors"
              />
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || categoryFilter || authorFilter) && (
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Active filters:
              </span>
              {searchTerm && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Search: {searchTerm}
                </span>
              )}
              {categoryFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Category: {categoryFilter}
                </span>
              )}
              {authorFilter && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  Author: {authorFilter}
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className={`mb-6 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {loading ? 'Loading...' : `${blogs.length} blog${blogs.length !== 1 ? 's' : ''} found`}
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Loading blogs...
            </p>
          </div>
        ) : blogs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogs.map((blog, index) => (
              <Link
                to={`/blog/${blog._id}`}
                key={index}
                className={cardClasses}
              >
                <div className="relative h-40 md:h-44 overflow-hidden">
                  <img
                    src={blog?.blogImage?.url || "/placeholder.jpg"}
                    alt={blog?.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                    <h3 className="text-xs md:text-sm font-semibold text-white line-clamp-2">
                      {blog?.title}
                    </h3>
                    <p className="text-[10px] md:text-xs text-gray-300">
                      {blog?.category}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
              {searchTerm || categoryFilter || authorFilter 
                ? 'No blogs found matching your filters. Try adjusting your search criteria.'
                : 'No blog posts available yet. Check back soon!'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
