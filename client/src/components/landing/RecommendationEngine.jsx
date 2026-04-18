import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, TrendingUp } from "lucide-react";
import japanImg from '../../japan.jpg';
import icelandImg from '../../iceland.jpg';
import barcelonaImg from '../../barcelona.jpg';
import parisImg from '../../paris.jpg';

const userPreferences = {
  budget: ["budget", "moderate", "luxury"],
  interests: ["beach", "adventure", "culture", "food", "nature", "city"],
  travelStyle: ["solo", "couple", "family", "group"],
  season: ["spring", "summer", "fall", "winter"]
};

const recommendedDestinations = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: japanImg,
    match: 95,
    reasons: ["Beach lover", "Adventure seeker", "Budget-friendly"],
    price: "$899",
    bestTime: "April - October",
    tags: ["beach", "adventure", "culture"]
  },
  {
    id: 2,
    name: "Kyoto, Japan",
    image: japanImg,
    match: 92,
    reasons: ["Culture enthusiast", "Food lover", "Photography"],
    price: "$1,599",
    bestTime: "March - May",
    tags: ["culture", "food", "city"]
  },
  {
    id: 3,
    name: "Iceland",
    image: icelandImg,
    match: 88,
    reasons: ["Nature lover", "Adventure seeker", "Unique experience"],
    price: "$2,199",
    bestTime: "June - August",
    tags: ["nature", "adventure"]
  },
  {
    id: 4,
    name: "Barcelona, Spain",
    image: barcelonaImg,
    match: 85,
    reasons: ["City explorer", "Beach access", "Food scene"],
    price: "$1,299",
    bestTime: "May - September",
    tags: ["city", "beach", "food"]
  }
];

export function RecommendationEngine() {
  const [preferences, setPreferences] = useState({
    budget: "moderate",
    interests: [],
    travelStyle: "solo",
    season: "summer"
  });
  const [showQuiz, setShowQuiz] = useState(false);
  const [recommendations, setRecommendations] = useState(recommendedDestinations);

  const handleInterestToggle = (interest) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateRecommendations = () => {
    // Simulate AI recommendation algorithm
    const scored = recommendedDestinations.map(dest => {
      let score = dest.match;
      preferences.interests.forEach(interest => {
        if (dest.tags.includes(interest)) score += 5;
      });
      return { ...dest, match: Math.min(score, 99) };
    });
    setRecommendations(scored.sort((a, b) => b.match - a.match));
    setShowQuiz(false);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-cream-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Recommendations</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Destinations Picked Just for You
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Our AI analyzes your preferences to suggest perfect destinations
          </p>
          <button
            onClick={() => setShowQuiz(true)}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold"
          >
            Personalize My Recommendations
          </button>
        </motion.div>

        {/* Preference Quiz Modal */}
        <AnimatePresence>
          {showQuiz && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowQuiz(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#f97316 #f3f4f6'
                  }}
                >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Tell Us About Your Travel Style</h3>
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Budget */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Budget Preference</label>
                  <div className="grid grid-cols-3 gap-3">
                    {userPreferences.budget.map(budget => (
                      <button
                        key={budget}
                        onClick={() => setPreferences({ ...preferences, budget })}
                        className={`px-4 py-3 rounded-xl font-medium transition-all ${
                          preferences.budget === budget
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {budget.charAt(0).toUpperCase() + budget.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Interests (Select all that apply)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {userPreferences.interests.map(interest => (
                      <button
                        key={interest}
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-4 py-3 rounded-xl font-medium transition-all ${
                          preferences.interests.includes(interest)
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {interest.charAt(0).toUpperCase() + interest.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Travel Style */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Travel Style</label>
                  <div className="grid grid-cols-4 gap-3">
                    {userPreferences.travelStyle.map(style => (
                      <button
                        key={style}
                        onClick={() => setPreferences({ ...preferences, travelStyle: style })}
                        className={`px-4 py-3 rounded-xl font-medium transition-all ${
                          preferences.travelStyle === style
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateRecommendations}
                  className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-semibold"
                >
                  Get My Recommendations
                </button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Recommendations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative"
            >
              {/* Match Badge */}
              <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>{dest.match}% Match</span>
              </div>

              <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-300 overflow-hidden">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{dest.name}</h3>
                
                {/* Reasons */}
                <div className="mb-4 space-y-1">
                  {dest.reasons.map((reason, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                {/* Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{dest.bestTime}</span>
                  </div>
                  <span className="text-xl font-bold text-orange-600">{dest.price}</span>
                </div>

                <button className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg transition-all font-medium">
                  Explore This Match
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
