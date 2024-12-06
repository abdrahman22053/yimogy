import React from 'react'
import { AlertCircle } from 'lucide-react'
import { TranslationError as TranslationErrorType } from '../../types/translation'
import { motion } from 'framer-motion'

interface TranslationErrorProps {
  error: TranslationErrorType
}

export function TranslationError({ error }: TranslationErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg"
    >
      <AlertCircle size={16} />
      <span className="text-sm">{error.message}</span>
    </motion.div>
  )
}