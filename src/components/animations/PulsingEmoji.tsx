import React from 'react'

interface PulsingEmojiProps {
  emoji: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export function PulsingEmoji({ emoji, size = 'md', color }: PulsingEmojiProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  }

  return (
    <div className="relative inline-block">
      <div
        className={`${sizeClasses[size]} animate-pulse transition-all duration-1000 ease-in-out`}
        style={{ color }}
      >
        {emoji}
      </div>
      <div
        className="absolute inset-0 animate-ping opacity-75 transition-all duration-1000 ease-in-out"
        style={{ color }}
      >
        {emoji}
      </div>
    </div>
  )
}