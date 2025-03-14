import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hey you look tired searching for products that fits your need without cutting your pocket. Have a seat and tell me what do you want and leave the rest on me.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: 'I understand you\'re looking for ' + inputMessage + '. Let me help you find the best options within your budget.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'hidden' : 'block'
        }`}
        aria-label="Open AI Chatbot"
      >
        <FaRobot size={24} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-96 transition-all duration-300 transform ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        {/* Chat Header */}
        <div className="bg-primary text-white rounded-t-lg p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center space-x-3">
            <FaRobot size={20} />
            <span className="font-medium text-lg">AI Shopping Assistant</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:text-white/80 transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl h-[400px] overflow-y-auto">
          <div className="p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                    message.type === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-700 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'bot' && (
                      <FaRobot className="text-primary mt-1 flex-shrink-0" size={16} />
                    )}
                    <div className="break-words">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <span className={`text-xs mt-1 block ${message.type === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div className="bg-white/80 backdrop-blur-sm rounded-b-lg shadow-2xl p-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white/90"
            />
            <button
              type="submit"
              className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg"
            >
              <FaPaperPlane size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot; 