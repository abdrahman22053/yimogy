import React from 'react'
import { ArrowDownUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface TranslationControlsProps {
  mode: 'text-to-emoji' | 'emoji-to-text'
  onToggleMode: () => void
}

export function TranslationControls({ mode, onToggleMode }: TranslationControlsProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-gray-900">
        {mode === 'text-to-emoji' ? 'Text to Ocean Emojis' : 'Ocean Emojis to Text'}
      </h2>
      <motion.button
        onClick={onToggleMode}
        className="flex items-center space-x-2 text-ocean-600 hover:text-ocean-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowDownUp size={20} />
        <span>Switch Mode</span>
      </motion.button>
    </div>
  )
}