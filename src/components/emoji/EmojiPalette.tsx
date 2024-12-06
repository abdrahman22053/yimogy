import React from 'react'
import { useDnd } from '../../contexts/DndContext'
import { emojiCategories } from '../../utils/emojiData'
import { InteractiveEmoji } from '../animations/InteractiveEmoji'
import { motion } from 'framer-motion'

export function EmojiPalette() {
  const { onDragStart } = useDnd()

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Emoji Palette</h3>
      <div className="space-y-4">
        {Object.entries(emojiCategories).map(([category, emojis], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <h4 className="text-sm font-medium text-gray-600 mb-2">{category}</h4>
            <div className="grid grid-cols-6 gap-2">
              {emojis.map((emoji, index) => (
                <motion.button
                  key={emoji}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  draggable
                  onDragStart={(e) => onDragStart(e, emoji)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: categoryIndex * 0.1 + index * 0.05,
                    type: 'spring',
                    stiffness: 500,
                    damping: 30
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <InteractiveEmoji emoji={emoji} size="sm" />
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}