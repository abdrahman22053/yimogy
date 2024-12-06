import React from 'react'
import { motion } from 'framer-motion'

interface TranslationResultProps {
  text: string
  type: 'emoji-to-text' | 'text-to-emoji'
}

export function TranslationResult({ text, type }: TranslationResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-ocean-50 rounded-lg p-6"
    >
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Translation Result
      </h3>
      <div className={`${
        type === 'text-to-emoji' ? 'text-3xl' : 'text-lg'
      } text-gray-800`}>
        {text}
      </div>
    </motion.div>
  )
}