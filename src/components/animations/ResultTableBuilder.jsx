import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function ResultTableBuilder({ headers, rows, delay = 0 }) {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
        className="bg-green-50 rounded-lg p-4 border border-green-200"
      >
        <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
          <Check className="w-4 h-4" />
          Result Table
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-100">
                {headers.map((header, index) => (
                  <motion.th
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay + index * 0.1, duration: 0.3 }}
                    className="px-3 py-2 text-left text-xs font-semibold text-green-800 border border-green-300"
                  >
                    {header}
                  </motion.th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <motion.tr
                  key={rowIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: delay + 0.5 + rowIndex * 0.3, duration: 0.4 }}
                  className="border-b border-green-100"
                >
                  {row.map((cell, cellIndex) => (
                    <motion.td
                      key={cellIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: delay + 0.5 + rowIndex * 0.3 + cellIndex * 0.05, duration: 0.3 }}
                      className="px-3 py-2 text-xs text-gray-700 border border-green-200 bg-white"
                    >
                      {cell}
                    </motion.td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}