import { motion } from 'framer-motion'

export default function RowHighlight({ rowIndex, duration = 1, onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
      animate={{
        opacity: [0, 1, 1, 0],
        backgroundColor: ['rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.1)']
      }}
      transition={{ duration, times: [0, 0.2, 0.8, 1] }}
      onAnimationComplete={onComplete}
      className="absolute inset-0 pointer-events-none rounded"
      style={{ top: `${rowIndex * 40}px`, height: '40px' }}
    />
  )
}