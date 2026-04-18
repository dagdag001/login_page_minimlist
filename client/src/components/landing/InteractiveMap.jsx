import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const mapDestinations = [
  { id: 1, name: "Santorini", x: "52%", y: "45%", region: "Europe" },
  { id: 2, name: "Maldives", x: "60%", y: "55%", region: "Asia" },
  { id: 3, name: "Swiss Alps", x: "50%", y: "38%", region: "Europe" },
  { id: 4, name: "Dubai", x: "58%", y: "48%", region: "Middle East" },
  { id: 5, name: "Bali", x: "70%", y: "58%", region: "Asia" },
  { id: 6, name: "Paris", x: "48%", y: "35%", region: "Europe" },
  { id: 7, name: "Tokyo", x: "78%", y: "42%", region: "Asia" },
  { id: 8, name: "New York", x: "22%", y: "38%", region: "Americas" }
];

export function InteractiveMap() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Destinations Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Click on any location to discover amazing travel packages
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-blue-100 via-green-50 to-orange-100 rounded-3xl p-8 shadow-2xl overflow-hidden"
          style={{ minHeight: "500px" }}
        >
          {/* Simplified world map representation */}
          <div className="relative w-full h-full min-h-[400px]">
            {/* Decorative continents (simplified shapes) */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
              {/* Simplified continent shapes */}
              <ellipse cx="200" cy="200" rx="150" ry="120" fill="#10b981" opacity="0.3" />
              <ellipse cx="500" cy="180" rx="200" ry="140" fill="#10b981" opacity="0.3" />
              <ellipse cx="700" cy="250" rx="180" ry="160" fill="#10b981" opacity="0.3" />
              <ellipse cx="350" cy="350" rx="120" ry="100" fill="#10b981" opacity="0.3" />
            </svg>

            {/* Destination pins */}
            {mapDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                className="absolute cursor-pointer group"
                style={{ left: dest.x, top: dest.y, transform: "translate(-50%, -50%)" }}
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  >
                    <MapPin className="w-8 h-8 text-orange-600 fill-orange-500 drop-shadow-lg" />
                  </motion.div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-white px-4 py-2 rounded-xl shadow-xl whitespace-nowrap">
                      <div className="font-bold text-gray-900">{dest.name}</div>
                      <div className="text-xs text-gray-500">{dest.region}</div>
                    </div>
                    <div className="w-2 h-2 bg-white rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1" />
                  </div>

                  {/* Pulse effect */}
                  <motion.div
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="absolute inset-0 rounded-full bg-orange-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-5 h-5 text-orange-600 fill-orange-500" />
              <span className="font-semibold text-gray-900">Available Destinations</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
