import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered their dream destinations with TourismHub
            </p>
            <div className="flex flex-col sm:flex-row justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-white text-orange-600 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
