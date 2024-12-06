import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { EmojiRain } from '../components/animations/EmojiRain'
import { PulsingEmoji } from '../components/animations/PulsingEmoji'
import { LottieEmoji } from '../components/animations/LottieEmoji'
import { LottieBackground } from '../components/animations/LottieBackground'
import { EmojiScene } from '../components/three/EmojiScene'
import { InteractiveEmoji } from '../components/animations/InteractiveEmoji'

const emotionTransitions = {
  '😊': ['🥰', '😄', '😌'],
  '😢': ['😭', '🥺', '😔'],
  '😠': ['😡', '🤬', '😤'],
  '😴': ['😪', '🥱', '💤'],
  '🤔': ['🧐', '🤨', '🤓'],
  '😷': ['🤒', '🤧', '🤮']
}

const emojiCategories = [
  {
    title: '🎨 Create',
    description: 'Express yourself through emoji stories',
    path: '/emoji',
    background: 'bg-gradient-to-br from-pink-500 to-purple-600'
  },
  {
    title: '🤖 Translate',
    description: 'AI-powered emoji translations',
    path: '/ai-translation',
    background: 'bg-gradient-to-br from-blue-500 to-cyan-600'
  },
  {
    title: '🌍 Explore',
    description: 'Discover emoji stories from around the world',
    path: '/explore',
    background: 'bg-gradient-to-br from-green-500 to-teal-600'
  }
]

export function HomePage() {
  const [showRain, setShowRain] = useState(false)
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)

  return (
    <div className="space-y-16 relative">
      <LottieBackground />
      <EmojiRain trigger={showRain} />

      {/* Hero Section */}
      <section className="text-center relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12"
        >
          <LottieEmoji type="star" size={120} className="opacity-75" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-gray-900 mb-6"
        >
          Express Yourself with Emojis 🎨
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Create, translate, and explore stories using the universal language of emojis
        </motion.p>

       {/* Emotion Evolution Board */}
        <div className="max-w-3xl mx-auto mb-12 bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Emotion Evolution Board
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-8">
            {Object.keys(emotionTransitions).map((emoji) => (
              <motion.div
                key={emoji}
                className="relative"
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedEmotion(emoji)}
              >
                <InteractiveEmoji emoji={emoji} size="lg" />
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedEmotion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-indigo-50 rounded-lg"
              >
                <p className="text-sm text-indigo-600 mb-3">Emotional Journey:</p>
                <div className="flex justify-center items-center space-x-4">
                  <InteractiveEmoji emoji={selectedEmotion} size="md" />
                  {emotionTransitions[selectedEmotion as keyof typeof emotionTransitions].map((emoji, index) => (
                    <React.Fragment key={emoji}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <InteractiveEmoji emoji={emoji} size="md" />
                      </motion.div>
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interactive Emoji Scene */}
        <div className="mb-12">
          <EmojiScene />
        </div>

        

         {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {emojiCategories.map((category, index) => (
            <motion.div
              key={category.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={category.path}
                className={`block p-6 rounded-xl shadow-lg ${category.background} text-white hover:scale-105 transition-transform`}
              >
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-white/90">{category.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        
      </section>
    </div>
  )
}