import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Star, Filter } from "lucide-react";
import { destinations as allDestinations } from "../../constants/landingPageData";
import { DestinationModal } from "./DestinationModal";

export function Destinations({ searchQuery = "" }) {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const handleViewDetails = (dest) => {
    setSelectedDestination(dest);
    setIsModalOpen(true);
  };

  const handleBook = (destination, bookingData) => {
    console.log("Booking:", destination, bookingData);
    // Here you would typically send this to your backend
    alert(`Booking confirmed for ${destination.name}!`);
  };

  // Filter and sort destinations
  let destinations = [...allDestinations];
  
  // Search filter
  if (searchTerm) {
    destinations = destinations.filter(dest =>
      dest.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  if (filter !== "all") {
    destinations = destinations.filter(dest => {
      if (filter === "budget") return parseInt(dest.price.replace(/[^0-9]/g, "")) < 1500;
      if (filter === "luxury") return parseInt(dest.price.replace(/[^0-9]/g, "")) >= 2000;
      if (filter === "popular") return dest.rating >= 4.8;
      return true;
    });
  }

  if (sortBy === "price-low") {
    destinations.sort((a, b) => 
      parseInt(a.price.replace(/[^0-9]/g, "")) - parseInt(b.price.replace(/[^0-9]/g, ""))
    );
  } else if (sortBy === "price-high") {
    destinations.sort((a, b) => 
      parseInt(b.price.replace(/[^0-9]/g, "")) - parseInt(a.price.replace(/[^0-9]/g, ""))
    );
  } else if (sortBy === "rating") {
    destinations.sort((a, b) => b.rating - a.rating);
  }

  return (
    <>
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our most loved travel destinations around the world
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pl-12 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:outline-none transition-colors text-lg"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Search Results Indicator */}
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-center text-sm text-gray-600"
              >
                {destinations.length > 0 ? (
                  <span>
                    Found <strong className="text-orange-600">{destinations.length}</strong> destination{destinations.length !== 1 ? 's' : ''} matching "{searchTerm}"
                  </span>
                ) : (
                  <span className="text-red-600">No destinations found for "{searchTerm}"</span>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Filter:</span>
              <div className="flex gap-2">
                {["all", "popular", "budget", "luxury"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                      filter === f
                        ? "bg-orange-500 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-orange-100"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none bg-white"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </motion.div>

          {destinations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No destinations found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters to find more destinations
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilter("all");
                }}
                className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold"
              >
                Clear Search & Filters
              </button>
            </motion.div>
          ) : (
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
                onClick={() => handleViewDetails(dest)}
              >
                <div className="h-48 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center text-7xl overflow-hidden">
                  {typeof dest.image === 'string' && (dest.image.startsWith('http') || dest.image.includes('.jpg') || dest.image.includes('.png')) ? (
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{dest.image}</span>
                  )}
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
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(dest);
                      }}
                      className="px-4 py-2 bg-orange-100 text-orange-600 rounded-xl hover:bg-orange-200 transition-colors font-medium text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            </div>
          )}
        </div>
      </section>

      <DestinationModal
        destination={selectedDestination}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBook={handleBook}
      />
    </>
  );
}
