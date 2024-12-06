import React from 'react'
import { motion } from 'framer-motion'
import { InteractiveEmoji } from '../animations/InteractiveEmoji'

interface QuickAction {
  emoji: string
  label: string
  onClick: () => void
}

export function EmojiQuickActions() {
  const actions: QuickAction[] = [
    {
      emoji: '📝',
      label: 'New Story',
      onClick: () => console.log('New Story')
    },
    {
      emoji: '🔄',
      label: 'Translate',
      onClick: () => console.log('Translate')
    },
    {
      emoji: '💾',
      label: 'Save',
      onClick: () => console.log('Save')
    },
    {
      emoji: '📤',
      label: 'Share',
      onClick: () => console.log('Share')
    }
  ]

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg"
      >
        <div className="flex space-x-2">
          {actions.map((action) => (
            <motion.button
              key={action.label}
              onClick={action.onClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <InteractiveEmoji emoji={action.emoji} size="sm" />
              
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 pointer-events-none">
                <div className="bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {action.label}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}