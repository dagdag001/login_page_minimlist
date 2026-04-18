import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";

export function SearchBar({ onSearch }) {
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    travelers: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(searchData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto -mt-8 relative z-10"
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="relative">
            <label htmlFor="destination" className="sr-only">Destination</label>
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="destination"
              type="text"
              placeholder="Where to?"
              value={searchData.destination}
              onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <label htmlFor="checkIn" className="sr-only">Check-in Date</label>
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="checkIn"
              type="date"
              value={searchData.checkIn}
              onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <label htmlFor="checkOut" className="sr-only">Check-out Date</label>
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="checkOut"
              type="date"
              value={searchData.checkOut}
              onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <label htmlFor="travelers" className="sr-only">Number of Travelers</label>
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              id="travelers"
              value={searchData.travelers}
              onChange={(e) => setSearchData({ ...searchData, travelers: parseInt(e.target.value) })}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors appearance-none bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
        >
          <Search className="w-5 h-5" />
          <span>Search Destinations</span>
        </button>
      </form>
    </motion.div>
  );
}
