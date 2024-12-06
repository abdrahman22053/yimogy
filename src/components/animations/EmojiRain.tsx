import React, { useEffect, useState } from 'react'

interface RainingEmoji {
  id: number
  emoji: string
  x: number
  y: number
  rotation: number
  speed: number
  size: number
}

export function EmojiRain({ trigger = false }: { trigger?: boolean }) {
  const [emojis, setEmojis] = useState<RainingEmoji[]>([])

  useEffect(() => {
    if (!trigger) return

    const emojiSet = ['🎉', '🎈', '🎊', '✨', '⭐', '💫', '🌟']
    const newEmojis = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      emoji: emojiSet[Math.floor(Math.random() * emojiSet.length)],
      x: Math.random() * 100,
      y: -20,
      rotation: Math.random() * 360,
      speed: 3 + Math.random() * 5,
      size: 0.8 + Math.random() * 0.6
    }))

    setEmojis(prev => [...prev, ...newEmojis])

    const animationFrame = requestAnimationFrame(function animate() {
      setEmojis(prev =>
        prev
          .map(emoji => ({
            ...emoji,
            y: emoji.y + emoji.speed,
            rotation: emoji.rotation + emoji.speed
          }))
          .filter(emoji => emoji.y < 120)
      )

      if (document.hidden) return
      requestAnimationFrame(animate)
    })

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [trigger])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {emojis.map(emoji => (
        <div
          key={emoji.id}
          className="absolute transition-transform"
          style={{
            left: `${emoji.x}%`,
            top: `${emoji.y}%`,
            transform: `translateX(-50%) translateY(-50%) rotate(${emoji.rotation}deg) scale(${emoji.size})`,
            fontSize: '2rem'
          }}
        >
          {emoji.emoji}
        </div>
      ))}
    </div>
  )
}