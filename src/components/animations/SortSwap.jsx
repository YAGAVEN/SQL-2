import { motion } from 'framer-motion'
import { ArrowUpDown } from 'lucide-react'

export default function SortSwap({ items, sortKey, ascending = true, delay = 0 }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
        <ArrowUpDown className="w-4 h-4" />
        Order by {sortKey} ({ascending ? 'ASC' : 'DESC'})
      </div>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + index * 0.15, duration: 0.4 }}
          className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="text-sm text-gray-700">{item.data}</div>
        </motion.div>
      ))}
    </div>
  )
}