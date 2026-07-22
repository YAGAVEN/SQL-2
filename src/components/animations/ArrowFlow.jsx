import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ArrowFlow({ from, to, delay = 0, duration = 1, label = '' }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 p-4 bg-white rounded-lg border border-gray-200">
        {from}
      </div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: duration * 0.5 }}
        className="relative"
      >
        <ArrowRight className="w-6 h-6 text-blue-500" />
        {label && (
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
            {label}
          </span>
        )}
      </motion.div>
      <div className="flex-1 p-4 bg-white rounded-lg border border-gray-200">
        {to}
      </div>
    </div>
  )
}