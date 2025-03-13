import { createContext, useContext, useState, useEffect } from 'react';
import { fetchProductReviews } from '../services/ReviewService';

// Create the context
const ReviewContext = createContext();

// Custom hook to use the review context
export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};

// Provider component
export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  // Function to fetch reviews
  const loadReviews = async (forceRefresh = false) => {
    // If we already have reviews and it hasn't been more than 30 minutes since last fetch
    // and we're not forcing a refresh, return the cached reviews
    const thirtyMinutesInMs = 30 * 60 * 1000;
    if (
      !forceRefresh &&
      reviews.length > 0 &&
      lastFetched &&
      Date.now() - lastFetched < thirtyMinutesInMs
    ) {
      return reviews;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedReviews = await fetchProductReviews();
      setReviews(fetchedReviews);
      setLastFetched(Date.now());
      return fetchedReviews;
    } catch (err) {
      setError('Failed to load product reviews. Please try again later.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get a specific review by ID
  const getReviewById = (id) => {
    return reviews.find(review => review.id === id);
  };

  // Value object to be provided to consumers
  const value = {
    reviews,
    isLoading,
    error,
    loadReviews,
    getReviewById,
  };

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewContext; 