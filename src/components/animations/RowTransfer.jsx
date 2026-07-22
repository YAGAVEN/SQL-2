import { motion } from 'framer-motion'

export default function RowTransfer({ rowData, fromTable, toTable, delay = 0 }) {
  return (
    <div className="relative">
      {/* Source table */}
      <div className="bg-gray-100 rounded-lg p-4 mb-8">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">{fromTable}</h4>
        <div className="bg-white rounded border border-gray-200 p-2">
          {rowData.map((cell, index) => (
            <div key={index} className="text-xs text-gray-600 border-b border-gray-100 py-1">
              {cell}
            </div>
          ))}
        </div>
      </div>

      {/* Moving row */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -100 }}
        transition={{ delay, duration: 1 }}
        className="absolute left-1/2 -translate-x-1/2 bg-blue-500 text-white rounded-lg p-2 shadow-lg"
      >
        {rowData.join(', ')}
      </motion.div>

      {/* Destination table */}
      <div className="bg-gray-100 rounded-lg p-4 mt-8">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">{toTable}</h4>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 1, duration: 0.5 }}
          className="bg-white rounded border border-gray-200 p-2"
        >
          {rowData.map((cell, index) => (
            <div key={index} className="text-xs text-gray-600 border-b border-gray-100 py-1">
              {cell}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}