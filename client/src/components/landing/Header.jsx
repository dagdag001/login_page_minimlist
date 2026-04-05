import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

export function Header() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-orange-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Plane className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              TourismHub
            </span>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Log in
            </Link>
            <Link 
              to="/signup" 
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
