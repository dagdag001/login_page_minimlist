import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, MapPin, Calendar, DollarSign, Plane, X } from "lucide-react";

const sampleQuestions = [
  "Best time to visit Japan?",
  "Budget-friendly Europe trip",
  "Family destinations in Asia",
  "Adventure activities in Iceland"
];

const aiResponses = {
  default: "I'm your AI travel assistant! Ask me anything about destinations, budgets, activities, or travel tips. I'm here to help plan your perfect trip!",
  japan: "Best time to visit Japan:\n\nSpring (March-May): Cherry blossoms, mild weather\nSummer (June-August): Festivals, but hot & humid\nFall (September-November): Beautiful foliage, comfortable temps\nWinter (December-February): Skiing, hot springs\n\nMy recommendation: Spring or Fall for the best experience!",
  europe: "Budget-friendly Europe tips:\n\n• Fly to Eastern Europe (Prague, Budapest, Krakow)\n• Use rail passes for transport\n• Stay in hostels or Airbnb\n• Eat at local markets\n• Book attractions in advance\n\nEstimated budget: $50-80/day\n\nWould you like specific city recommendations?",
  family: "Top family destinations in Asia:\n\n1. Singapore - Safe, clean, kid-friendly attractions\n2. Thailand - Beaches, elephants, cultural experiences\n3. Japan - Theme parks, technology, unique culture\n4. Malaysia - Diverse activities, affordable\n5. Bali - Resorts, water sports, nature\n\nAll offer great family activities and safe environments!",
  iceland: "Adventure activities in Iceland:\n\n• Glacier hiking & ice climbing\n• Snorkeling between continents\n• Whale watching tours\n• Volcano exploration\n• 4x4 highland tours\n• Northern Lights hunting\n• Hot spring hopping\n\nBest season: June-August for most activities\nWinter: December-March for Northern Lights"
};

export function AITravelAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: "ai", text: aiResponses.default, timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      text: text,
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = aiResponses.default;
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes("japan")) response = aiResponses.japan;
      else if (lowerText.includes("europe") || lowerText.includes("budget")) response = aiResponses.europe;
      else if (lowerText.includes("family")) response = aiResponses.family;
      else if (lowerText.includes("iceland") || lowerText.includes("adventure")) response = aiResponses.iceland;

      const aiMessage = {
        id: messages.length + 2,
        type: "ai",
        text: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <Bot className="w-8 h-8" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-50 w-96 max-w-[calc(100vw-4rem)] bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Travel Assistant</h3>
                  <div className="flex items-center space-x-1 text-sm opacity-90">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                        : "bg-white text-gray-900 shadow-md"
                    }`}
                  >
                    {message.type === "ai" && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-bold text-orange-500">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white rounded-2xl p-4 shadow-md">
                    <div className="flex space-x-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-2 h-2 bg-orange-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 bg-orange-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-2 h-2 bg-orange-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-6 py-3 bg-white border-t border-gray-200">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {sampleQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(question)}
                    className="px-3 py-1.5 bg-orange-100 text-orange-600 rounded-full text-xs font-medium whitespace-nowrap hover:bg-orange-200 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl hover:shadow-lg transition-all"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section for Landing Page - REMOVED */}
    </>
  );
}
