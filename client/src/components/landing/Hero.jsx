import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import { travelCards } from "../../constants/landingPageData";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-200 to-purple-300 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full blur-3xl opacity-25"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full flex-1 flex items-center">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center w-full">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Your Next{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Explore breathtaking destinations, create unforgettable memories, 
              and experience the world like never before. Your perfect journey awaits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link 
                to="/signup"
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold text-center flex items-center justify-center space-x-2"
              >
                <span>Start Exploring</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Link>
              
              <button 
                onClick={() => document.getElementById('destinations-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-gray-700 rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              >
                <span>Browse Destinations</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">No booking fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">Best price guarantee</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Floating Travel Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] hidden lg:block"
          >
            {travelCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  rotate: index === 1 ? -5 : index === 2 ? 5 : 0
                }}
                transition={{ delay: 0.3 + index * 0.2 }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                className="absolute bg-white rounded-3xl shadow-2xl p-6 w-64"
                style={{
                  top: `${index * 120}px`,
                  left: `${index * 40}px`,
                }}
              >
                <div className="text-6xl mb-4">{card.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{card.destination}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-600">{card.price}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{card.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
