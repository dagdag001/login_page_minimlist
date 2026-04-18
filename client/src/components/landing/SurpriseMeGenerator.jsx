import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, Sparkles, MapPin, DollarSign, Calendar, Plane, RefreshCw } from "lucide-react";

const surpriseDestinations = [
  {
    id: 1,
    name: "Marrakech, Morocco",
    image: "🕌",
    tagline: "Get lost in the magical souks",
    price: "$1,099",
    duration: "6 days",
    highlights: ["Vibrant markets", "Desert safari", "Traditional riads"],
    vibe: "Exotic & Colorful"
  },
  {
    id: 2,
    name: "Reykjavik, Iceland",
    image: "🌋",
    tagline: "Chase the Northern Lights",
    price: "$2,299",
    duration: "7 days",
    highlights: ["Aurora viewing", "Hot springs", "Glacier hiking"],
    vibe: "Adventure & Nature"
  },
  {
    id: 3,
    name: "Lisbon, Portugal",
    image: "🏰",
    tagline: "Discover hidden coastal gems",
    price: "$1,399",
    duration: "8 days",
    highlights: ["Historic trams", "Coastal views", "Pastéis de nata"],
    vibe: "Charming & Relaxed"
  },
  {
    id: 4,
    name: "Queenstown, New Zealand",
    image: "🏔️",
    tagline: "Adventure capital of the world",
    price: "$2,799",
    duration: "10 days",
    highlights: ["Bungee jumping", "Milford Sound", "Wine tasting"],
    vibe: "Thrilling & Scenic"
  },
  {
    id: 5,
    name: "Cartagena, Colombia",
    image: "🏖️",
    tagline: "Caribbean charm meets history",
    price: "$999",
    duration: "6 days",
    highlights: ["Colonial architecture", "Beach islands", "Salsa dancing"],
    vibe: "Vibrant & Tropical"
  },
  {
    id: 6,
    name: "Chiang Mai, Thailand",
    image: "🛕",
    tagline: "Temple hopping and street food",
    price: "$799",
    duration: "9 days",
    highlights: ["Ancient temples", "Night markets", "Elephant sanctuary"],
    vibe: "Cultural & Affordable"
  }
];

export function SurpriseMeGenerator() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentDestination, setCurrentDestination] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const generateSurprise = () => {
    setIsSpinning(true);
    setShowResult(false);
    
    // Simulate spinning animation
    setTimeout(() => {
      const randomDest = surpriseDestinations[Math.floor(Math.random() * surpriseDestinations.length)];
      setCurrentDestination(randomDest);
      setIsSpinning(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Shuffle className="w-4 h-4" />
            <span>Feeling Adventurous?</span>
          </div>
          
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Surprise Me! 🎲
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Can't decide where to go? Let us pick a random amazing destination for you!
          </p>

          {/* Surprise Button */}
          <motion.button
            onClick={generateSurprise}
            disabled={isSpinning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-12 py-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-white rounded-3xl text-2xl font-bold shadow-2xl transition-all duration-300 ${
              isSpinning ? "cursor-not-allowed" : "hover:shadow-3xl"
            }`}
          >
            {isSpinning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-flex items-center space-x-3"
              >
                <RefreshCw className="w-8 h-8" />
                <span>Finding Your Adventure...</span>
              </motion.div>
            ) : (
              <div className="inline-flex items-center space-x-3">
                <Sparkles className="w-8 h-8" />
                <span>Surprise Me!</span>
                <Shuffle className="w-8 h-8" />
              </div>
            )}
          </motion.button>

          {/* Result Card */}
          <AnimatePresence>
            {showResult && currentDestination && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="mt-12 bg-white rounded-3xl overflow-hidden shadow-2xl"
              >
                {/* Confetti Effect */}
                <div className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 p-8 text-white">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="text-8xl mb-4"
                  >
                    {currentDestination.image}
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-2">{currentDestination.name}</h3>
                  <p className="text-xl opacity-90">{currentDestination.tagline}</p>
                </div>

                <div className="p-8">
                  {/* Vibe Badge */}
                  <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
                    ✨ {currentDestination.vibe}
                  </div>

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <div className="text-2xl font-bold text-gray-900">{currentDestination.price}</div>
                      <div className="text-sm text-gray-600">Starting Price</div>
                    </div>
                    <div className="text-center">
                      <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <div className="text-2xl font-bold text-gray-900">{currentDestination.duration}</div>
                      <div className="text-sm text-gray-600">Duration</div>
                    </div>
                    <div className="text-center">
                      <Plane className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                      <div className="text-2xl font-bold text-gray-900">Direct</div>
                      <div className="text-sm text-gray-600">Flights Available</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3">Trip Highlights</h4>
                    <div className="grid md:grid-cols-3 gap-3">
                      {currentDestination.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2 bg-orange-50 px-4 py-2 rounded-xl">
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                          <span className="text-sm font-medium text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all font-semibold">
                      Book This Adventure
                    </button>
                    <button
                      onClick={generateSurprise}
                      className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold flex items-center space-x-2"
                    >
                      <RefreshCw className="w-5 h-5" />
                      <span>Try Again</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fun Stats */}
          {!showResult && !isSpinning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-4xl font-bold text-orange-600 mb-2">127</div>
                <div className="text-gray-600">Surprise Trips Booked</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
                <div className="text-gray-600">Loved Their Surprise</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-4xl font-bold text-orange-600 mb-2">6</div>
                <div className="text-gray-600">Amazing Destinations</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
