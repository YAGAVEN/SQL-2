import { motion } from 'framer-motion'

export default function TableGrid({ headers, data, highlightRows = [], highlightCells = [], className = '' }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const isHighlighted = highlightRows.includes(rowIndex)
            return (
              <motion.tr
                key={rowIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rowIndex * 0.1 }}
                className={`border-b border-gray-200 ${
                  isHighlighted ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                {row.map((cell, cellIndex) => {
                  const cellKey = `${rowIndex}-${cellIndex}`
                  const isCellHighlighted = highlightCells.includes(cellKey)
                  return (
                    <td
                      key={cellIndex}
                      className={`px-4 py-3 text-sm text-gray-700 border border-gray-200 ${
                        isCellHighlighted ? 'bg-yellow-100 font-semibold' : ''
                      }`}
                    >
                      {cell}
                    </td>
                  )
                })}
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}