import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Share2, Bookmark, Users, MessageCircle, Eye, ThumbsUp, Send } from "lucide-react";

const sharedTrips = [
  {
    id: 1,
    user: { name: "Sarah Johnson", avatar: "👩‍💼", followers: 1234 },
    destination: "Santorini, Greece",
    image: "🏛️",
    caption: "Best sunset views ever! 🌅 #SantoriniMagic",
    likes: 342,
    comments: 28,
    saves: 156,
    views: 2341,
    tags: ["#Greece", "#Sunset", "#Travel"]
  },
  {
    id: 2,
    user: { name: "Mike Chen", avatar: "👨‍💻", followers: 892 },
    destination: "Tokyo, Japan",
    image: "🗾",
    caption: "Cherry blossoms in full bloom 🌸 Magical experience!",
    likes: 521,
    comments: 45,
    saves: 234,
    views: 3892,
    tags: ["#Japan", "#CherryBlossom", "#Tokyo"]
  },
  {
    id: 3,
    user: { name: "Emma Wilson", avatar: "👩‍🎨", followers: 2156 },
    destination: "Bali, Indonesia",
    image: "🌴",
    caption: "Paradise found! 🏝️ Rice terraces are breathtaking",
    likes: 678,
    comments: 67,
    saves: 389,
    views: 5234,
    tags: ["#Bali", "#Paradise", "#Nature"]
  }
];

const savedDestinations = [
  { id: 1, name: "Maldives", image: "🏖️", savedDate: "2 days ago" },
  { id: 2, name: "Swiss Alps", image: "🏔️", savedDate: "1 week ago" },
  { id: 3, name: "Dubai", image: "🕌", savedDate: "2 weeks ago" },
  { id: 4, name: "Iceland", image: "🌋", savedDate: "1 month ago" }
];

export function SocialFeatures() {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [showShareModal, setShowShareModal] = useState(null);

  const toggleLike = (postId) => {
    const newLiked = new Set(likedPosts);
    if (newLiked.has(postId)) {
      newLiked.delete(postId);
    } else {
      newLiked.add(postId);
    }
    setLikedPosts(newLiked);
  };

  const toggleSave = (postId) => {
    const newSaved = new Set(savedPosts);
    if (newSaved.has(postId)) {
      newSaved.delete(postId);
    } else {
      newSaved.add(postId);
    }
    setSavedPosts(newSaved);
  };

  const sharePost = (postId) => {
    setShowShareModal(postId);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Users className="w-4 h-4" />
            <span>Social Travel Community</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your Adventures
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with fellow travelers, share experiences, and save your favorite destinations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Community Feed</h3>
            
            {sharedTrips.map((trip, index) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                {/* User Header */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-4xl">{trip.user.avatar}</div>
                    <div>
                      <div className="font-bold text-gray-900">{trip.user.name}</div>
                      <div className="text-sm text-gray-500">{trip.destination}</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all font-semibold text-sm">
                    Follow
                  </button>
                </div>

                {/* Image */}
                <div className="h-80 bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center text-9xl">
                  {trip.image}
                </div>

                {/* Actions */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleLike(trip.id)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 transition-colors"
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            likedPosts.has(trip.id) ? "fill-pink-500 text-pink-500" : ""
                          }`}
                        />
                        <span className="font-semibold">
                          {trip.likes + (likedPosts.has(trip.id) ? 1 : 0)}
                        </span>
                      </motion.button>
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-6 h-6" />
                        <span className="font-semibold">{trip.comments}</span>
                      </button>
                      <button
                        onClick={() => sharePost(trip.id)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
                      >
                        <Share2 className="w-6 h-6" />
                      </button>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleSave(trip.id)}
                      className="text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      <Bookmark
                        className={`w-6 h-6 ${
                          savedPosts.has(trip.id) ? "fill-orange-500 text-orange-500" : ""
                        }`}
                      />
                    </motion.button>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{trip.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Bookmark className="w-4 h-4" />
                      <span>{trip.saves} saves</span>
                    </div>
                  </div>

                  {/* Caption */}
                  <p className="text-gray-900 mb-2">
                    <span className="font-bold">{trip.user.name}</span> {trip.caption}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {trip.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-sm text-blue-600 hover:underline cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Saved Destinations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-6 shadow-lg sticky top-4"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Bookmark className="w-5 h-5 text-orange-500" />
                <span>Saved Destinations</span>
              </h3>
              <div className="space-y-3">
                {savedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="flex items-center space-x-3 p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors cursor-pointer"
                  >
                    <div className="text-3xl">{dest.image}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{dest.name}</div>
                      <div className="text-xs text-gray-500">{dest.savedDate}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-orange-100 text-orange-600 rounded-xl hover:bg-orange-200 transition-colors font-semibold text-sm">
                View All Saved
              </button>
            </motion.div>

            {/* Trending Hashtags */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trending Now</h3>
              <div className="space-y-2">
                {["#SummerVibes", "#BeachLife", "#MountainEscape", "#CityBreak", "#FoodieTravel"].map((tag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <span className="text-blue-600 font-semibold">{tag}</span>
                    <span className="text-sm text-gray-500">{Math.floor(Math.random() * 1000)}+ posts</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Share This Trip</h3>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { name: "Facebook", icon: "📘", color: "bg-blue-500" },
                  { name: "Twitter", icon: "🐦", color: "bg-sky-500" },
                  { name: "Instagram", icon: "📷", color: "bg-pink-500" },
                  { name: "WhatsApp", icon: "💬", color: "bg-green-500" }
                ].map((platform) => (
                  <button
                    key={platform.name}
                    className={`${platform.color} text-white p-4 rounded-2xl hover:scale-105 transition-transform`}
                  >
                    <div className="text-3xl mb-2">{platform.icon}</div>
                    <div className="text-xs font-semibold">{platform.name}</div>
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-2 p-4 bg-gray-100 rounded-xl">
                <input
                  type="text"
                  value="https://tourismhub.com/trip/12345"
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                />
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold text-sm">
                  Copy
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
