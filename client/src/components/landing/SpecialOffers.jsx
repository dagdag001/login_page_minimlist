import { motion } from "framer-motion";
import { Tag, Clock, TrendingDown } from "lucide-react";

const offers = [
  {
    id: 1,
    title: "Early Bird Special",
    discount: "30% OFF",
    description: "Book 3 months in advance and save big on your dream vacation",
    validUntil: "Limited time offer",
    icon: Clock,
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    title: "Group Discount",
    discount: "25% OFF",
    description: "Travel with 4+ people and enjoy exclusive group rates",
    validUntil: "Valid all year",
    icon: Tag,
    color: "from-green-500 to-green-600"
  },
  {
    id: 3,
    title: "Last Minute Deals",
    discount: "40% OFF",
    description: "Spontaneous traveler? Grab amazing deals on immediate departures",
    validUntil: "While supplies last",
    icon: TrendingDown,
    color: "from-red-500 to-red-600"
  }
];

export function SpecialOffers() {
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
            Special Offers & Deals
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these exclusive limited-time offers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${offer.color}`} />
                <div className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${offer.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{offer.discount}</div>
                    <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{offer.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">{offer.validUntil}</span>
                    <button className="px-4 py-2 bg-orange-100 text-orange-600 rounded-xl hover:bg-orange-200 transition-colors font-medium text-sm">
                      Claim Offer
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
