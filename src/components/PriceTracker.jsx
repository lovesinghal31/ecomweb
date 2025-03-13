import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { FaChartLine, FaArrowDown, FaArrowUp, FaHistory, FaCalendarAlt, FaBell } from 'react-icons/fa';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock price history data generator
const generatePriceHistory = (productId, days = 90, currentPrice) => {
  // Seed the random generator with product ID for consistent results
  const seed = productId * 1000;
  const random = (min, max) => {
    const x = Math.sin(seed + days) * 10000;
    return min + (Math.abs(x) % (max - min));
  };

  // Base price varies by product
  const basePrice = 1000 + (productId * 500);
  const volatility = 0.05 + (productId % 5) * 0.02; // Different volatility per product
  
  const today = new Date();
  const priceHistory = [];
  
  // Generate price points for the past 'days'
  for (let i = days; i >= 1; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Create some realistic price movements
    const trendFactor = Math.sin(i / 15) * volatility; // Cyclical trend
    const randomFactor = (random(0, 100) / 100 - 0.5) * volatility; // Random noise
    const seasonalFactor = Math.sin((date.getMonth() + 1) / 12 * Math.PI * 2) * 0.08; // Seasonal effect
    
    // Calculate price with all factors
    let price = basePrice * (1 + trendFactor + randomFactor + seasonalFactor);
    
    // Add occasional sales (price drops)
    if (i % 30 < 5 && random(0, 100) > 70) {
      price *= 0.85; // 15% discount
    }
    
    priceHistory.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(price)
    });
  }
  
  // Add today's price (current price)
  priceHistory.push({
    date: today.toISOString().split('T')[0],
    price: currentPrice
  });
  
  return priceHistory;
};

// Price prediction algorithm
const predictFuturePrices = (priceHistory, daysToPredict = 30) => {
  // Simple prediction based on recent trends
  const recentPrices = priceHistory.slice(-30); // Last 30 days
  
  // Calculate average price change
  let totalChange = 0;
  for (let i = 1; i < recentPrices.length; i++) {
    totalChange += (recentPrices[i].price - recentPrices[i-1].price) / recentPrices[i-1].price;
  }
  const avgDailyChange = totalChange / (recentPrices.length - 1);
  
  // Generate predictions
  const predictions = [];
  const lastDate = new Date(priceHistory[priceHistory.length - 1].date);
  const lastPrice = priceHistory[priceHistory.length - 1].price;
  
  for (let i = 1; i <= daysToPredict; i++) {
    const date = new Date(lastDate);
    date.setDate(date.getDate() + i);
    
    // Add some randomness to the prediction
    const randomFactor = (Math.random() - 0.5) * 0.01;
    const predictedPrice = lastPrice * Math.pow(1 + avgDailyChange + randomFactor, i);
    
    predictions.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(predictedPrice)
    });
  }
  
  return predictions;
};

// Price insights generator
const generatePriceInsights = (priceHistory, predictions) => {
  // Current price
  const currentPrice = priceHistory[priceHistory.length - 1].price;
  
  // Highest and lowest prices in history
  const highestPrice = Math.max(...priceHistory.map(item => item.price));
  const lowestPrice = Math.min(...priceHistory.map(item => item.price));
  
  // 30-day trend
  const thirtyDaysAgo = priceHistory[priceHistory.length - 31]?.price || priceHistory[0].price;
  const thirtyDayChange = ((currentPrice - thirtyDaysAgo) / thirtyDaysAgo) * 100;
  
  // 7-day trend
  const sevenDaysAgo = priceHistory[priceHistory.length - 8]?.price || priceHistory[0].price;
  const sevenDayChange = ((currentPrice - sevenDaysAgo) / sevenDaysAgo) * 100;
  
  // Predicted price in 30 days
  const predictedPrice = predictions[predictions.length - 1].price;
  const predictedChange = ((predictedPrice - currentPrice) / currentPrice) * 100;
  
  // Best time to buy
  const isPriceDropping = sevenDayChange < -2; // If price dropped more than 2% in last week
  const isPriceRising = predictedChange > 5; // If price is predicted to rise more than 5%
  const buyAdvice = isPriceDropping ? "Buy now! Prices are dropping." : 
                    isPriceRising ? "Consider buying soon. Prices are expected to rise." :
                    "Price is stable. Good time to buy if you need the product.";
  
  return {
    currentPrice,
    highestPrice,
    lowestPrice,
    thirtyDayChange,
    sevenDayChange,
    predictedChange,
    buyAdvice
  };
};

export default function PriceTracker({ productId, productName, currentPrice }) {
  const [timeRange, setTimeRange] = useState('3m'); // Default to 3 months
  const [priceHistory, setPriceHistory] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [priceAlertEmail, setPriceAlertEmail] = useState('');
  const [alertPrice, setAlertPrice] = useState('');
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  useEffect(() => {
    // Simulate API call delay
    setIsLoading(true);
    
    setTimeout(() => {
      // Generate mock data based on product ID
      const history = generatePriceHistory(productId, 90, currentPrice);
      const futurePrices = predictFuturePrices(history);
      const priceInsights = generatePriceInsights(history, futurePrices);
      
      setPriceHistory(history);
      setPredictions(futurePrices);
      setInsights(priceInsights);
      setIsLoading(false);
      
      // Set default alert price to 10% below current
      setAlertPrice(Math.round(currentPrice * 0.9));
    }, 1000);
  }, [productId, currentPrice]);

  // Filter price history based on selected time range
  const getFilteredHistory = () => {
    if (!priceHistory.length) return [];
    
    const today = new Date();
    let daysToShow = 90; // Default 3 months
    
    switch (timeRange) {
      case '1m':
        daysToShow = 30;
        break;
      case '6m':
        daysToShow = 180;
        break;
      case '1y':
        daysToShow = 365;
        break;
      default:
        daysToShow = 90;
    }
    
    return priceHistory.slice(-daysToShow);
  };

  const handleSetPriceAlert = (e) => {
    e.preventDefault();
    // In a real app, this would send the alert data to a backend
    console.log(`Price alert set for ${productName} at ₹${alertPrice} for ${priceAlertEmail}`);
    setShowAlertSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowAlertSuccess(false);
    }, 3000);
  };

  // Prepare chart data
  const filteredHistory = getFilteredHistory();
  const chartData = {
    labels: [...filteredHistory.map(item => item.date), ...predictions.map(item => item.date)],
    datasets: [
      {
        label: 'Historical Price',
        data: [...filteredHistory.map(item => item.price), ...Array(predictions.length).fill(null)],
        borderColor: 'rgba(52, 152, 219, 1)',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.3,
        fill: true
      },
      {
        label: 'Predicted Price',
        data: [...Array(filteredHistory.length).fill(null), ...predictions.map(item => item.price)],
        borderColor: 'rgba(155, 89, 182, 1)',
        borderDashed: [5, 5],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        tension: 0.3,
        borderDash: [5, 5]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `₹${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price (₹)'
        },
        ticks: {
          callback: function(value) {
            return '₹' + value;
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        },
        ticks: {
          maxTicksLimit: 10
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4 md:mb-0">
          <FaChartLine className="text-primary mr-2" />
          Price History & Prediction
        </h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('1m')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              timeRange === '1m' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            1M
          </button>
          <button 
            onClick={() => setTimeRange('3m')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              timeRange === '3m' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            3M
          </button>
          <button 
            onClick={() => setTimeRange('6m')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              timeRange === '6m' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            6M
          </button>
          <button 
            onClick={() => setTimeRange('1y')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              timeRange === '1y' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            1Y
          </button>
        </div>
      </div>
      
      {/* Price Chart */}
      <div className="h-64 md:h-80 mb-8">
        <Line data={chartData} options={chartOptions} />
      </div>
      
      {/* Price Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <FaHistory className="text-primary mr-2" />
            Price History
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Price:</span>
              <span className="font-semibold">₹{insights.currentPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Highest Price:</span>
              <span className="font-semibold">₹{insights.highestPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lowest Price:</span>
              <span className="font-semibold">₹{insights.lowestPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <FaChartLine className="text-primary mr-2" />
            Price Trends
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">30-Day Change:</span>
              <span className={`font-semibold flex items-center ${insights.thirtyDayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {insights.thirtyDayChange >= 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                {Math.abs(insights.thirtyDayChange).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">7-Day Change:</span>
              <span className={`font-semibold flex items-center ${insights.sevenDayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {insights.sevenDayChange >= 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                {Math.abs(insights.sevenDayChange).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price Volatility:</span>
              <span className="font-semibold">
                {Math.abs(insights.sevenDayChange) > 5 ? 'High' : Math.abs(insights.sevenDayChange) > 2 ? 'Medium' : 'Low'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <FaCalendarAlt className="text-primary mr-2" />
            Price Prediction
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">30-Day Forecast:</span>
              <span className={`font-semibold flex items-center ${insights.predictedChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {insights.predictedChange >= 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                {Math.abs(insights.predictedChange).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Predicted Price:</span>
              <span className="font-semibold">₹{predictions[predictions.length - 1].price.toLocaleString()}</span>
            </div>
            <div className="mt-2">
              <div className="text-gray-600 font-medium">Buy Advice:</div>
              <div className="text-primary font-medium mt-1">{insights.buyAdvice}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Price Alert Form */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FaBell className="text-primary mr-2" />
          Set Price Alert
        </h3>
        
        {showAlertSuccess ? (
          <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
            Price alert successfully set! We'll notify you when the price drops to your target.
          </div>
        ) : (
          <form onSubmit={handleSetPriceAlert} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={priceAlertEmail}
                  onChange={(e) => setPriceAlertEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="alertPrice" className="block text-sm font-medium text-gray-700 mb-1">Alert me when price drops to</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="number"
                    id="alertPrice"
                    value={alertPrice}
                    onChange={(e) => setAlertPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Set Alert
            </button>
            <p className="text-sm text-gray-500 mt-2">
              We'll send you an email notification when this product reaches your target price.
            </p>
          </form>
        )}
      </div>
    </div>
  );
} 