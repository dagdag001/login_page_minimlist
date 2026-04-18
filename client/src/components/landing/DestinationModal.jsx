import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Star, MapPin, Users, Wifi, Coffee, Utensils, Car } from "lucide-react";
import { useState } from "react";

export function DestinationModal({ destination, isOpen, onClose, onBook }) {
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    travelers: 1
  });

  if (!destination) return null;

  const handleBook = () => {
    onBook?.(destination, bookingData);
    onClose();
  };

  const amenities = [
    { icon: Wifi, label: "Free WiFi" },
    { icon: Coffee, label: "Breakfast" },
    { icon: Utensils, label: "Restaurant" },
    { icon: Car, label: "Airport Transfer" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="relative h-full flex flex-col">
              {/* Header Image */}
              <div className="relative h-64 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center text-8xl overflow-hidden">
                {destination.image.startsWith('/') || destination.image.startsWith('http') ? (
                  <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
                ) : (
                  destination.image
                )}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{destination.name}</h2>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{destination.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{destination.rating}</span>
                        <span className="text-sm">({destination.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Starting from</div>
                    <div className="text-3xl font-bold text-orange-600">{destination.price}</div>
                    <div className="text-sm text-gray-500">per person</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">About This Destination</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Experience the beauty and culture of {destination.name}. This carefully curated package includes 
                    accommodation, guided tours, and unforgettable experiences that will make your trip truly special. 
                    Discover hidden gems, taste local cuisine, and create memories that will last a lifetime.
                  </p>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">What's Included</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-gray-700">
                        <amenity.icon className="w-5 h-5 text-orange-500" />
                        <span className="text-sm">{amenity.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Form */}
                <div className="bg-orange-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Book Your Trip</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label htmlFor="modal-checkIn" className="block text-sm font-semibold text-gray-700 mb-2">
                        Check-in
                      </label>
                      <input
                        id="modal-checkIn"
                        type="date"
                        value={bookingData.checkIn}
                        onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-checkOut" className="block text-sm font-semibold text-gray-700 mb-2">
                        Check-out
                      </label>
                      <input
                        id="modal-checkOut"
                        type="date"
                        value={bookingData.checkOut}
                        onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-travelers" className="block text-sm font-semibold text-gray-700 mb-2">
                        Travelers
                      </label>
                      <select
                        id="modal-travelers"
                        value={bookingData.travelers}
                        onChange={(e) => setBookingData({ ...bookingData, travelers: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none appearance-none bg-white"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={handleBook}
                    className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-semibold"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
