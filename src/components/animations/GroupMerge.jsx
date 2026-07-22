import { motion } from 'framer-motion'
import { Group } from 'lucide-react'

export default function GroupMerge({ groups, groupBy, delay = 0 }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Group className="w-4 h-4" />
        Group by {groupBy}
      </div>
      {groups.map((group, groupIndex) => (
        <motion.div
          key={group.key}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + groupIndex * 0.3, duration: 0.5 }}
          className="bg-blue-50 rounded-lg p-4 border border-blue-200"
        >
          <div className="text-sm font-semibold text-blue-700 mb-2">
            {group.key}
          </div>
          <div className="space-y-1">
            {group.items.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + groupIndex * 0.3 + itemIndex * 0.1, duration: 0.3 }}
                className="text-xs text-gray-600 bg-white rounded px-2 py-1"
              >
                {item}
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + groupIndex * 0.3 + 0.5, duration: 0.3 }}
            className="text-sm text-blue-600 mt-2 font-medium"
          >
            Count: {group.count}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}