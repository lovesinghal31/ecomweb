import { useCart } from '../context/CartContext';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

export default function CartItem({ item }) {
  const { addItem, removeItem, deleteItem, updateQuantity } = useCart();
  const { id, title, price, image, quantity } = item;

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="flex items-start gap-4 py-4 border-b">
      <img 
        src={image} 
        alt={title}
        className="w-20 h-20 object-cover rounded"
      />
      
      <div className="flex-grow">
        <h3 className="text-gray-800 font-medium">{title}</h3>
        <p className="text-gray-600 font-bold mt-1">₹{price.toFixed(2)}</p>
        
        <div className="flex items-center mt-2">
          <button 
            onClick={() => removeItem(item)}
            className="p-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            <FaMinus size={12} />
          </button>
          
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-12 text-center mx-2 border rounded py-1"
          />
          
          <button 
            onClick={() => addItem(item)}
            className="p-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            <FaPlus size={12} />
          </button>
          
          <button 
            onClick={() => deleteItem(item)}
            className="ml-4 text-red-500 hover:text-red-700"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>
      
      <div className="text-right">
        <span className="text-gray-600 font-medium">
        ₹{(price * quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}