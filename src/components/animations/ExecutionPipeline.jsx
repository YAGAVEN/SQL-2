import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

export default function ExecutionPipeline({ steps, currentStep, delay = 0 }) {
  return (
    <div className="space-y-2">
      {steps.map((step, index) => {
        const isCurrent = index === currentStep
        const isPast = index < currentStep
        const isFuture = index > currentStep

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + index * 0.2, duration: 0.4 }}
            className={`relative p-4 rounded-lg border-2 transition-all ${
              isCurrent
                ? 'bg-blue-50 border-blue-500 shadow-md'
                : isPast
                  ? 'bg-green-50 border-green-300'
                  : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm font-semibold ${
                  isCurrent ? 'text-blue-700' : isPast ? 'text-green-700' : 'text-gray-700'
                }`}>
                  {step.phase}
                </div>
                {step.description && (
                  <div className="text-xs text-gray-600 mt-1">{step.description}</div>
                )}
              </div>
              {isCurrent && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-3 h-3 bg-blue-500 rounded-full"
                />
              )}
            </div>
            {index < steps.length - 1 && (
              <div className="flex justify-center">
                <ArrowDown className="w-4 h-4 text-gray-400" />
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}