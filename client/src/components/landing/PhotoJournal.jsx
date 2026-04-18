import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, MapPin, Calendar, Heart, MessageCircle, Plus, Image as ImageIcon, X } from "lucide-react";

const sampleJournals = [
  {
    id: 1,
    trip: "Santorini Adventure",
    destination: "Santorini, Greece",
    date: "June 2026",
    coverImage: "🌅",
    photos: [
      { id: 1, image: "🏛️", caption: "Stunning white architecture", likes: 45, location: "Oia" },
      { id: 2, image: "🌊", caption: "Crystal blue waters", likes: 38, location: "Ammoudi Bay" },
      { id: 3, image: "🍷", caption: "Wine tasting at sunset", likes: 52, location: "Santo Wines" },
      { id: 4, image: "🏖️", caption: "Red Beach paradise", likes: 41, location: "Red Beach" }
    ],
    memories: 24,
    isPublic: true
  },
  {
    id: 2,
    trip: "Tokyo Exploration",
    destination: "Tokyo, Japan",
    date: "April 2026",
    coverImage: "🌸",
    photos: [
      { id: 1, image: "🗼", caption: "Tokyo Tower at night", likes: 67, location: "Minato" },
      { id: 2, image: "🍱", caption: "Best sushi ever!", likes: 89, location: "Tsukiji Market" },
      { id: 3, image: "🌸", caption: "Cherry blossom season", likes: 124, location: "Ueno Park" },
      { id: 4, image: "🏯", caption: "Imperial Palace gardens", likes: 56, location: "Chiyoda" }
    ],
    memories: 31,
    isPublic: true
  }
];

export function PhotoJournal() {
  const [journals, setJournals] = useState(sampleJournals);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Camera className="w-4 h-4" />
            <span>Capture Your Memories</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Photo Travel Journals
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Document your adventures with beautiful photo journals and share your stories
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold inline-flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Journal</span>
          </button>
        </motion.div>

        {/* Journals Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {journals.map((journal, index) => (
            <motion.div
              key={journal.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedJournal(journal)}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              {/* Cover */}
              <div className="relative h-64 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center text-9xl">
                {journal.coverImage}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{journal.trip}</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{journal.destination}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{journal.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photo Grid Preview */}
              <div className="p-6">
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {journal.photos.slice(0, 4).map((photo) => (
                    <div
                      key={photo.id}
                      className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-3xl hover:scale-105 transition-transform"
                    >
                      {photo.image}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    {journal.memories} memories captured
                  </div>
                  <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors font-medium text-sm">
                    View Journal
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Journal Detail Modal */}
        <AnimatePresence>
          {selectedJournal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedJournal(null)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-4 md:inset-8 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
              >
                {/* Header */}
                <div className="relative h-48 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center text-7xl">
                  {selectedJournal.coverImage}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <button
                    onClick={() => setSelectedJournal(null)}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-3xl font-bold mb-2">{selectedJournal.trip}</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-5 h-5" />
                        <span>{selectedJournal.destination}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-5 h-5" />
                        <span>{selectedJournal.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photos Grid */}
                <div className="flex-1 overflow-y-auto p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {selectedJournal.photos.map((photo, idx) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => setSelectedPhoto(photo)}
                        className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                      >
                        <div className="h-64 flex items-center justify-center text-8xl">
                          {photo.image}
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-1 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{photo.location}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <button className="flex items-center space-x-1 text-pink-500">
                                <Heart className="w-5 h-5 fill-pink-500" />
                                <span className="text-sm font-semibold">{photo.likes}</span>
                              </button>
                              <button className="text-gray-600">
                                <MessageCircle className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-900 font-medium">{photo.caption}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Create Journal Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCreateModal(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-3xl shadow-2xl z-50 p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Create New Journal</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Trip Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Summer in Paris"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Destination
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Paris, France"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Photos
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <ImageIcon className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-xl hover:scale-[1.02] transition-all font-semibold">
                    Create Journal
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
