// Import images
// Product images
import bluetoothHeadphone from '../assets/bluetooth-headphone.webp';
import smartFitnessTracker from '../assets/smart-fitness-tracker.webp';
import organicCottonTshirt from '../assets/organic-cotton-thsirt.jpeg';
import stainlessSteelWaterBottle from '../assets/stainless-steal-water-bottle.webp';
import professionalChefKnife from '../assets/professional-chefs-knife.webp';
import antiAgingFaceSerum from '../assets/anti-aging-face-serum.webp';
import wirelessPhoneCharger from '../assets/wireless-phone-charger.webp';
import comfortableRunningShoes from '../assets/comfortable-running-shoes.jpeg';

// Product categories
const CATEGORIES = {
  ELECTRONICS: 'Electronics',
  WEARABLES: 'Wearables', 
  CLOTHING: 'Clothing',
  HOME: 'Home',
  KITCHEN: 'Kitchen',
  BEAUTY: 'Beauty',
  FOOTWEAR: 'Footwear'
};

// Product data
export const products = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 2499,
    category: CATEGORIES.ELECTRONICS,
    image: bluetoothHeadphone,
    description: "High-quality wireless headphones with noise cancellation and 20-hour battery life."
  },
  {
    id: 2,
    title: "Smart Fitness Tracker", 
    price: 1799,
    category: CATEGORIES.WEARABLES,
    image: smartFitnessTracker,
    description: "Track your steps, heart rate, sleep, and more with this sleek fitness band."
  },
  {
    id: 3,
    title: "Organic Cotton T-Shirt",
    price: 899,
    category: CATEGORIES.CLOTHING,
    image: organicCottonTshirt,
    description: "Comfortable, breathable, and eco-friendly organic cotton t-shirt."
  },
  {
    id: 4,
    title: "Stainless Steel Water Bottle",
    price: 449,
    category: CATEGORIES.HOME,
    image: stainlessSteelWaterBottle,
    description: "Keep your drinks cold for 24 hours or hot for 12 hours with this vacuum-insulated bottle."
  },
  {
    id: 5,
    title: "Professional Chef Knife",
    price: 249,
    category: CATEGORIES.KITCHEN,
    image: professionalChefKnife,
    description: "High-carbon stainless steel chef knife for precise cutting and slicing."
  },
  {
    id: 6,
    title: "Anti-Aging Face Serum",
    price: 1199,
    category: CATEGORIES.BEAUTY,
    image: antiAgingFaceSerum,
    description: "Revitalize your skin with this hydrating serum packed with antioxidants."
  },
  {
    id: 7,
    title: "Wireless Phone Charger",
    price: 1759,
    category: CATEGORIES.ELECTRONICS,
    image: wirelessPhoneCharger,
    description: "Fast wireless charging pad compatible with all Qi-enabled devices."
  },
  {
    id: 8,
    title: "Comfortable Running Shoes",
    price: 3499,
    category: CATEGORIES.FOOTWEAR,
    image: comfortableRunningShoes,
    description: "Lightweight and responsive running shoes with excellent cushioning."
  }
];