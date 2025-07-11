import React, { useState } from 'react';

const FavoriteButton = ({ blogId, initialIsFavorited = false, onFavoriteToggled }) => {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [loading, setLoading] = useState(false);

  const handleFavorite = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://blog-app-tc0o.onrender.com/api'}/users/favorites/${blogId}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to favorite/unfavorite');
      const data = await res.json();
      setIsFavorited(data.isFavorited);
      if (onFavoriteToggled) onFavoriteToggled();
    } catch (err) {
      console.error('Error toggling favorite:', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setIsFavorited(initialIsFavorited);
  }, [initialIsFavorited]);

  return (
    <button
      onClick={handleFavorite}
      disabled={loading}
      className={`p-2 rounded-full transition-colors ${
        isFavorited 
          ? 'text-yellow-500 hover:text-yellow-600' 
          : 'text-gray-400 hover:text-yellow-500'
      }`}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg 
        className={`w-5 h-5 ${isFavorited ? 'fill-current' : 'stroke-current fill-none'}`}
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
      {loading && <span className="text-xs">...</span>}
    </button>
  );
};

export default FavoriteButton; 