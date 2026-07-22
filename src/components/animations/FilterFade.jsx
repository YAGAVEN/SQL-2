import { motion } from 'framer-motion'

export default function FilterFade({ rows, condition, delay = 0 }) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-gray-700 mb-3">
        Filter: {condition}
      </div>
      {rows.map((row, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 1, x: 0 }}
          animate={{
            opacity: row.passes ? 1 : 0.3,
            x: row.passes ? 0 : -20,
            scale: row.passes ? 1 : 0.95
          }}
          transition={{ delay: delay + index * 0.2, duration: 0.5 }}
          className={`p-3 rounded-lg border ${
            row.passes
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200 opacity-50'
          }`}
        >
          <div className="text-sm text-gray-700">{row.data}</div>
          {!row.passes && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + index * 0.2 + 0.3 }}
              className="text-xs text-red-600 mt-1"
            >
              ✗ Filtered out
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}