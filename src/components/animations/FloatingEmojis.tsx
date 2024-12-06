import React from 'react'
import { useEffect, useState } from 'react'

interface FloatingEmoji {
  id: number
  emoji: string
  x: number
  y: number
  speed: number
  amplitude: number
  phase: number
}

export function FloatingEmojis() {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([])

  useEffect(() => {
    const emojisToFloat = ['✨', '🌟', '💫', '⭐', '🎉', '🎨', '💝', '🌈']
    const initialEmojis = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: emojisToFloat[i % emojisToFloat.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.5 + Math.random() * 1.5,
      amplitude: 20 + Math.random() * 30,
      phase: Math.random() * Math.PI * 2
    }))

    setEmojis(initialEmojis)

    let animationFrame: number
    let startTime = Date.now()

    const animate = () => {
      const currentTime = Date.now()
      const elapsed = (currentTime - startTime) / 1000

      setEmojis(prevEmojis =>
        prevEmojis.map(emoji => ({
          ...emoji,
          y: (emoji.y - emoji.speed) % 100,
          x: emoji.x + Math.sin(elapsed + emoji.phase) * 0.5
        }))
      )

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {emojis.map(emoji => (
        <div
          key={emoji.id}
          className="absolute text-2xl transition-transform animate-pulse"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
            transform: `translateX(-50%) translateY(-50%) scale(${0.8 + Math.sin(emoji.phase) * 0.2})`,
            opacity: 0.7,
            filter: 'blur(0.3px)',
            animation: `float ${3 + Math.random() * 2}s infinite ease-in-out`
          }}
        >
          {emoji.emoji}
        </div>
      ))}
    </div>
  )
}