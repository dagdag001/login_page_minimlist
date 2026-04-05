import { motion } from "framer-motion";
import { MapPin, Shield, Clock, Star } from "lucide-react";
import { features as featuresData } from "../../constants/landingPageData";

const iconMap = {
  MapPin,
  Shield,
  Clock,
  Star
};

export function Features() {
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
            Why Choose TourismHub?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience travel planning made simple with our comprehensive features
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
