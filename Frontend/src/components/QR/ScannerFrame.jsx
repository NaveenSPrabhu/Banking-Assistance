import { motion } from "framer-motion";

export default function ScannerFrame() {
  return (
    <div className="flex justify-center">
      <div className="relative h-72 w-72 rounded-3xl border-4 border-blue-600 bg-slate-100 shadow-xl overflow-hidden">

        {/* Corner Borders */}
        <div className="absolute left-0 top-0 h-10 w-10 border-l-4 border-t-4 border-blue-700 rounded-tl-xl" />
        <div className="absolute right-0 top-0 h-10 w-10 border-r-4 border-t-4 border-blue-700 rounded-tr-xl" />
        <div className="absolute left-0 bottom-0 h-10 w-10 border-l-4 border-b-4 border-blue-700 rounded-bl-xl" />
        <div className="absolute right-0 bottom-0 h-10 w-10 border-r-4 border-b-4 border-blue-700 rounded-br-xl" />

        {/* Animated Scan Line */}
        <motion.div
          className="absolute left-4 right-4 h-1 rounded-full bg-cyan-500 shadow-lg"
          animate={{
            y: [10, 250, 10],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}