import { motion } from "framer-motion";
import { Calendar, Star } from "lucide-react";
import { destinations } from "../../constants/landingPageData";

export function Destinations() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our most loved travel destinations around the world
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center text-7xl">
                {dest.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{dest.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{dest.duration}</span>
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{dest.rating}</span>
                    <span className="text-sm text-gray-500">({dest.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">{dest.price}</span>
                  <button className="px-4 py-2 bg-orange-100 text-orange-600 rounded-xl hover:bg-orange-200 transition-colors font-medium text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
