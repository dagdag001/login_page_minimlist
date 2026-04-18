import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const packages = [
  {
    id: 1,
    name: "Explorer",
    price: "$999",
    description: "Perfect for solo travelers and budget-conscious adventurers",
    features: [
      "3-star accommodation",
      "Breakfast included",
      "City tours",
      "24/7 support",
      "Travel insurance"
    ],
    popular: false
  },
  {
    id: 2,
    name: "Adventurer",
    price: "$1,799",
    description: "Ideal for couples and small groups seeking comfort",
    features: [
      "4-star accommodation",
      "All meals included",
      "Guided tours & activities",
      "Airport transfers",
      "Travel insurance",
      "Free cancellation"
    ],
    popular: true
  },
  {
    id: 3,
    name: "Luxury",
    price: "$3,499",
    description: "Ultimate experience with premium services",
    features: [
      "5-star accommodation",
      "All-inclusive dining",
      "Private tours & experiences",
      "Luxury transfers",
      "Comprehensive insurance",
      "Personal concierge",
      "Spa treatments"
    ],
    popular: false
  }
];

export function TravelPackages() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-cream-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Package
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect travel package that suits your style and budget
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                pkg.popular ? 'border-4 border-orange-500' : 'border border-orange-100'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-bold flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-white" />
                  <span>Most Popular</span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-orange-600 mb-2">{pkg.price}</div>
                <p className="text-sm text-gray-600">{pkg.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-xl hover:scale-[1.02]'
                    : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                }`}
              >
                Select Package
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
