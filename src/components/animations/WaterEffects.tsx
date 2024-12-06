import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  startY: number
}

interface WaveEmoji {
  id: number
  emoji: string
  x: number
  y: number
  delay: number
  duration: number
  scale: number
  rotation: number
}

export function BubbleEffect() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    const createBubble = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100, // Random starting position
      startY: Math.random() * 100,
      size: 10 + Math.random() * 30,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2
    })

    const initialBubbles = Array.from({ length: 20 }, createBubble)
    setBubbles(initialBubbles)

    const interval = setInterval(() => {
      setBubbles(prev => [...prev.slice(-19), createBubble()])
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-ocean-200/20 backdrop-blur-sm"
            initial={{
              x: `${bubble.x}%`,
              y: `${bubble.startY}%`,
              width: bubble.size,
              height: bubble.size,
              opacity: 0
            }}
            animate={{
              y: `${bubble.startY - 100}%`,
              opacity: [0, 0.5, 0],
              scale: [1, 1.2, 1],
              x: [
                `${bubble.x}%`,
                `${bubble.x + Math.sin(bubble.startY) * 10}%`,
                `${bubble.x}%`
              ]
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: bubble.duration,
              delay: bubble.delay,
              ease: 'easeInOut',
              repeat: Infinity
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export function WaveEmojis() {
  const [waves, setWaves] = useState<WaveEmoji[]>([])
  const oceanEmojis = ['🌊', '🐋', '🐬', '🐟', '🐠', '🦈', '🐙', '🦑', '🦐', '🦀', '🐚', '🏊‍♂️', '🤿', '🎣']

  useEffect(() => {
    const createWave = () => ({
      id: Math.random(),
      emoji: oceanEmojis[Math.floor(Math.random() * oceanEmojis.length)],
      x: Math.random() * 100,
      y: Math.random() * 100, // Random starting position
      delay: Math.random() * 2,
      duration: 15 + Math.random() * 10,
      scale: 0.8 + Math.random() * 0.4,
      rotation: Math.random() * 360
    })

    const initialWaves = Array.from({ length: 15 }, createWave)
    setWaves(initialWaves)

    const interval = setInterval(() => {
      setWaves(prev => [...prev.slice(-14), createWave()])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {waves.map(wave => (
          <motion.div
            key={wave.id}
            className="absolute text-4xl filter blur-[0.3px]"
            initial={{
              x: `${wave.x}%`,
              y: `${wave.y}%`,
              opacity: 0,
              scale: wave.scale,
              rotate: wave.rotation
            }}
            animate={{
              y: [`${wave.y}%`, `${wave.y - 20}%`, `${wave.y + 20}%`, `${wave.y}%`],
              x: [`${wave.x}%`, `${wave.x + 10}%`, `${wave.x - 10}%`, `${wave.x}%`],
              opacity: [0, 0.7, 0.7, 0],
              scale: [wave.scale, wave.scale * 1.2, wave.scale * 1.2, wave.scale],
              rotate: [wave.rotation, wave.rotation + 20, wave.rotation - 20, wave.rotation]
            }}
            transition={{
              duration: wave.duration,
              delay: wave.delay,
              ease: 'easeInOut',
              times: [0, 0.3, 0.7, 1],
              repeat: Infinity
            }}
          >
            {wave.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}