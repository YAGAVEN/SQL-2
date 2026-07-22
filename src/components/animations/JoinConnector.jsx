import { motion } from 'framer-motion'
import { Merge } from 'lucide-react'

export default function JoinConnector({
  leftTable, rightTable, joinType = 'INNER',
  leftKey, rightKey,
  matches, delay = 0
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Merge className="w-4 h-4" />
        {joinType} JOIN on {leftKey} = {rightKey}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Table */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay, duration: 0.5 }}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Left Table</h4>
          {leftTable.map((row, index) => (
            <div key={index} className="text-xs text-gray-600 border-b py-1">
              {row}
            </div>
          ))}
        </motion.div>

        {/* Connection Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <div className="text-center">
            <Merge className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-xs text-gray-600">
              {matches.length} matches
            </div>
          </div>
        </motion.div>

        {/* Right Table */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay, duration: 0.5 }}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Right Table</h4>
          {rightTable.map((row, index) => (
            <div key={index} className="text-xs text-gray-600 border-b py-1">
              {row}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Result Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 1, duration: 0.5 }}
        className="bg-green-50 rounded-lg border border-green-200 p-4"
      >
        <h4 className="text-sm font-semibold text-green-700 mb-2">Result Table</h4>
        {matches.map((match, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 1 + index * 0.2, duration: 0.3 }}
            className="text-xs text-gray-700 bg-white rounded px-2 py-1 mb-1"
          >
            {match}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}