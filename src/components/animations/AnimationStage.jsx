import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

export default function AnimationStage({ children, title, onReplay }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {onReplay && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReplay}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Play className="w-4 h-4" />
            Replay
          </motion.button>
        )}
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4 min-h-[300px]">
        {children}
      </div>
    </div>
  )
}