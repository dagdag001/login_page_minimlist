import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Star, Lock, CheckCircle, Target, TrendingUp } from "lucide-react";

const challenges = [
  {
    id: 1,
    name: "Beach Bum",
    description: "Visit 5 beach destinations",
    icon: "🏖️",
    progress: 3,
    total: 5,
    points: 500,
    unlocked: false,
    color: "from-blue-400 to-cyan-500"
  },
  {
    id: 2,
    name: "Mountain Explorer",
    description: "Conquer 3 mountain destinations",
    icon: "⛰️",
    progress: 2,
    total: 3,
    points: 400,
    unlocked: false,
    color: "from-green-400 to-emerald-500"
  },
  {
    id: 3,
    name: "Culture Vulture",
    description: "Visit 10 UNESCO World Heritage sites",
    icon: "🏛️",
    progress: 10,
    total: 10,
    points: 1000,
    unlocked: true,
    color: "from-purple-400 to-pink-500"
  },
  {
    id: 4,
    name: "Foodie Traveler",
    description: "Try local cuisine in 7 countries",
    icon: "🍜",
    progress: 5,
    total: 7,
    points: 700,
    unlocked: false,
    color: "from-orange-400 to-red-500"
  },
  {
    id: 5,
    name: "Island Hopper",
    description: "Visit 4 different islands",
    icon: "🏝️",
    progress: 4,
    total: 4,
    points: 600,
    unlocked: true,
    color: "from-teal-400 to-blue-500"
  },
  {
    id: 6,
    name: "City Slicker",
    description: "Explore 8 major cities",
    icon: "🌆",
    progress: 6,
    total: 8,
    points: 800,
    unlocked: false,
    color: "from-indigo-400 to-purple-500"
  },
  {
    id: 7,
    name: "Adventure Seeker",
    description: "Complete 5 adventure activities",
    icon: "🪂",
    progress: 3,
    total: 5,
    points: 900,
    unlocked: false,
    color: "from-red-400 to-pink-500"
  },
  {
    id: 8,
    name: "Globe Trotter",
    description: "Visit all 7 continents",
    icon: "🌍",
    progress: 4,
    total: 7,
    points: 2000,
    unlocked: false,
    color: "from-yellow-400 to-orange-500"
  }
];

const badges = [
  { id: 1, name: "First Trip", icon: "🎉", earned: true },
  { id: 2, name: "5 Countries", icon: "🌏", earned: true },
  { id: 3, name: "10 Countries", icon: "🗺️", earned: true },
  { id: 4, name: "Solo Traveler", icon: "🎒", earned: true },
  { id: 5, name: "Group Leader", icon: "👥", earned: false },
  { id: 6, name: "Budget Master", icon: "💰", earned: true },
  { id: 7, name: "Luxury Lover", icon: "💎", earned: false },
  { id: 8, name: "Early Bird", icon: "🐦", earned: true }
];

export function TravelChallenges() {
  const [selectedTab, setSelectedTab] = useState("challenges");
  const totalPoints = challenges.reduce((sum, c) => sum + (c.unlocked ? c.points : 0), 0);
  const completedChallenges = challenges.filter(c => c.unlocked).length;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Trophy className="w-4 h-4" />
            <span>Gamify Your Travels</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Travel Challenges & Badges
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete challenges, earn badges, and unlock rewards as you explore the world
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Trophy className="w-10 h-10 mx-auto mb-3 text-yellow-500" />
            <div className="text-3xl font-bold text-gray-900 mb-1">{totalPoints}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Target className="w-10 h-10 mx-auto mb-3 text-orange-500" />
            <div className="text-3xl font-bold text-gray-900 mb-1">{completedChallenges}/{challenges.length}</div>
            <div className="text-sm text-gray-600">Challenges Complete</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Award className="w-10 h-10 mx-auto mb-3 text-purple-500" />
            <div className="text-3xl font-bold text-gray-900 mb-1">{badges.filter(b => b.earned).length}</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <TrendingUp className="w-10 h-10 mx-auto mb-3 text-green-500" />
            <div className="text-3xl font-bold text-gray-900 mb-1">Level 12</div>
            <div className="text-sm text-gray-600">Traveler Rank</div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setSelectedTab("challenges")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                selectedTab === "challenges"
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Challenges
            </button>
            <button
              onClick={() => setSelectedTab("badges")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                selectedTab === "badges"
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Badges
            </button>
          </div>
        </div>

        {/* Challenges Grid */}
        {selectedTab === "challenges" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className={`relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all ${
                  challenge.unlocked ? "ring-2 ring-yellow-400" : ""
                }`}
              >
                {/* Unlocked Badge */}
                {challenge.unlocked && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-full shadow-lg">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                )}

                {/* Locked Overlay */}
                {!challenge.unlocked && challenge.progress === 0 && (
                  <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-[2px] rounded-3xl flex items-center justify-center">
                    <Lock className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                <div className={`w-16 h-16 bg-gradient-to-r ${challenge.color} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto`}>
                  {challenge.icon}
                </div>

                <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                  {challenge.name}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-4">
                  {challenge.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{challenge.progress}/{challenge.total}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${challenge.color}`}
                    />
                  </div>
                </div>

                {/* Points */}
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-gray-900">{challenge.points} points</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Badges Grid */}
        {selectedTab === "badges" && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`relative bg-white rounded-2xl p-6 shadow-lg text-center ${
                  !badge.earned ? "opacity-50 grayscale" : ""
                }`}
              >
                <div className="text-5xl mb-3">{badge.icon}</div>
                <div className="text-sm font-bold text-gray-900">{badge.name}</div>
                {badge.earned && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Leaderboard Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl p-8 text-center text-white"
        >
          <Trophy className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Join the Global Leaderboard!</h3>
          <p className="mb-6 opacity-90">Compete with travelers worldwide and climb the ranks</p>
          <button className="px-8 py-3 bg-white text-orange-600 rounded-xl hover:shadow-xl hover:scale-105 transition-all font-semibold">
            View Leaderboard
          </button>
        </motion.div>
      </div>
    </section>
  );
}
