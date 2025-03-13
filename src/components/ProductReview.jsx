import { FaStar, FaExternalLinkAlt } from 'react-icons/fa';

/**
 * ProductReview component displays AI-summarized reviews for a product
 * 
 * @param {Object} props
 * @param {Object} props.review - The review object containing all review data
 * @param {boolean} props.isCompact - Whether to show a compact version of the review
 * @param {Function} props.onViewFullReviews - Callback when "View full reviews" is clicked
 */
const ProductReview = ({ review, isCompact = false, onViewFullReviews }) => {
  if (!review) return null;

  const handleViewFullReviews = (e) => {
    e.preventDefault();
    if (onViewFullReviews) {
      onViewFullReviews(review.id);
    }
  };

  // Compact version shows less information
  if (isCompact) {
    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-base font-medium text-gray-900">{review.productName}</h4>
            <div className="flex items-center bg-primary/10 px-2 py-0.5 rounded-full">
              <FaStar className="text-yellow-500 mr-1" size={12} />
              <span className="font-medium text-sm">{review.averageRating}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 line-clamp-3 mb-2">{review.aiSummary}</p>
          
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">From {review.sources.join(', ')}</span>
            <a 
              href="#" 
              onClick={handleViewFullReviews}
              className="text-primary hover:text-primary-dark flex items-center"
            >
              More <FaExternalLinkAlt className="ml-1" size={10} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Full version with all details
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/4 bg-gray-100">
          <img 
            src={review.productImage} 
            alt={review.productName}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://source.unsplash.com/300x300/?${encodeURIComponent(review.productName)}`;
            }}
          />
        </div>
        
        {/* Review Content */}
        <div className="md:w-3/4 p-6">
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-lg font-medium text-gray-900">{review.productName}</h4>
            <div className="flex items-center bg-primary/10 px-3 py-1 rounded-full">
              <FaStar className="text-yellow-500 mr-1" />
              <span className="font-medium">{review.averageRating}</span>
              <span className="text-sm text-gray-500 ml-1">({review.totalReviews})</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {review.sources.map((source, index) => (
              <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {source}
              </span>
            ))}
          </div>
          
          <div className="mb-4">
            <h5 className="font-medium text-gray-900 mb-2">AI Summary</h5>
            <p className="text-gray-700">{review.aiSummary}</p>
          </div>
          
          <div className="mb-4">
            <h5 className="font-medium text-gray-900 mb-2">Key Points</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {review.keyPoints.map((point, index) => (
                <div 
                  key={index} 
                  className={`flex items-start p-2 rounded ${
                    point.type === 'positive' ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <span 
                    className={`inline-block w-2 h-2 rounded-full mt-1.5 mr-2 ${
                      point.type === 'positive' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></span>
                  <span className={point.type === 'positive' ? 'text-green-800' : 'text-red-800'}>
                    {point.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Last updated: {review.lastUpdated}</span>
            <a 
              href="#" 
              onClick={handleViewFullReviews}
              className="text-primary hover:text-primary-dark flex items-center"
            >
              View full reviews <FaExternalLinkAlt className="ml-1" size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview; 