import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do I book a trip?",
    answer: "Booking is simple! Browse our destinations, select your preferred package, choose your dates, and complete the secure checkout process. You'll receive instant confirmation via email."
  },
  {
    id: 2,
    question: "What is your cancellation policy?",
    answer: "We offer flexible cancellation policies depending on your package. Standard bookings can be cancelled up to 14 days before departure for a full refund. Premium packages include free cancellation up to 48 hours before travel."
  },
  {
    id: 3,
    question: "Are flights included in the package price?",
    answer: "Flight inclusion varies by package. Some packages include round-trip flights, while others focus on accommodation and activities. Check the package details or contact our support team for specific information."
  },
  {
    id: 4,
    question: "Do you offer travel insurance?",
    answer: "Yes! All our packages include basic travel insurance. You can also upgrade to comprehensive coverage that includes medical emergencies, trip cancellation, and lost baggage protection."
  },
  {
    id: 5,
    question: "Can I customize my itinerary?",
    answer: "Absolutely! While we offer curated packages, we're happy to customize your itinerary to match your preferences. Contact our travel specialists to create your perfect trip."
  },
  {
    id: 6,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. Payment plans are available for bookings over $2,000."
  }
];

export function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about planning your trip
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-orange-50 transition-colors"
                aria-expanded={openId === faq.id}
              >
                <span className="font-bold text-gray-900 pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-orange-600 flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
