import { motion } from "framer-motion";
import { Plane } from "lucide-react";
const Logo = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center space-x-2"
    >
      <Plane className="w-6 h-6 text-orange-500" />
      <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
        TourismHub
      </span>
    </motion.div>
  );
};
export default Logo;
