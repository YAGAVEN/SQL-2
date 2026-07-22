import { motion } from 'framer-motion'

export default function CodeBlock({ code, language = 'sql', delay = 0 }) {
  const highlightSQL = (code) => {
    // Simple SQL syntax highlighting
    const keywords = ['SELECT', 'FROM', 'WHERE', 'ORDER BY', 'GROUP BY', 'HAVING', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'BETWEEN', 'NULL', 'IS', 'DISTINCT', 'LIMIT', 'OFFSET']
    const functions = ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'COALESCE']

    let highlighted = code
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
      highlighted = highlighted.replace(regex, `<span class="sql-keyword">${keyword}</span>`)
    })
    functions.forEach(func => {
      const regex = new RegExp(`\\b${func}\\b`, 'gi')
      highlighted = highlighted.replace(regex, `<span class="sql-function">${func}</span>`)
    })

    return highlighted
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-gray-700"
    >
      <pre className="text-gray-100">
        <code dangerouslySetInnerHTML={{ __html: highlightSQL(code) }} />
      </pre>
    </motion.div>
  )
}