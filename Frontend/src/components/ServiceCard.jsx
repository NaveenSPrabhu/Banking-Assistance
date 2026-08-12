import { motion } from "framer-motion";

export default function ServiceCard({
  service,
  onClick,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="cursor-pointer rounded-2xl bg-white p-5 shadow-md transition hover:shadow-xl sm:p-6"
    >
      <h3 className="text-lg font-bold text-gray-800 sm:text-xl">
        {title || service?.service}
      </h3>
      <p className="mt-2 text-gray-600">
        {description || service?.description}
      </p>
    </motion.div>
  );
}
