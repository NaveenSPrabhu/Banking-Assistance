import { motion } from "framer-motion";

export default function ServiceCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl"
    >
      <div className="text-5xl mb-4">{icon}</div>

      <h3 className="text-xl font-bold text-gray-800">
        {title}
      </h3>

      <p className="mt-2 text-gray-600">
        {description}
      </p>
    </motion.div>
  );
}