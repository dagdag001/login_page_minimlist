import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Plane } from "lucide-react"

export function SmallHeader() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-transparent border-none shadow-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link
            to="/"
            className="text-gray-700 hover:text-orange-600 transition-colors"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-1.5"
            >
              <Plane className="w-4 h-4 text-orange-500" />
              <span className="text-base font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                TourismHub
              </span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm text-gray-700 hover:text-orange-600 transition-colors font-medium"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}