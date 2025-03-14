import { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'How can I track my order?',
      answer: 'You can track your order by logging into your account and visiting the "My Orders" section. Alternatively, you can use the tracking number provided in your shipping confirmation email.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be in their original condition with all tags and packaging intact. Please visit our Returns page for more details.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-5 business days within India. Express shipping options are available at checkout for faster delivery.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. International shipping times vary by location, typically taking 7-14 business days. Additional customs fees may apply depending on your country.'
    },
    {
      question: 'How do I change or cancel my order?',
      answer: 'You can change or cancel your order within 1 hour of placing it by contacting our customer service team. After this window, orders are processed for shipping and cannot be modified.'
    },
    {
      question: 'Are there any discounts for bulk orders?',
      answer: 'Yes, we offer special discounts for bulk orders. Please contact our sales team at sales@shopeasy.com for a custom quote based on your requirements.'
    }
  ];

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div 
            key={index} 
            className="bg-gray-200 rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl"
          >
            <button
              className="w-full p-6 text-left flex items-center justify-between text-gray-900"
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
            >
              <span className="text-lg font-medium">{item.question}</span>
              <span className={`text-primary transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : ''}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-6 bg-gray-100 text-gray-800 border-t border-gray-300">
                <p className="leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ; 