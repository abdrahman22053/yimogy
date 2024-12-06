import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ParticleEmoji } from './ParticleEmoji'

interface InteractiveEmojiProps {
  emoji: string
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
}

export function InteractiveEmoji({
  emoji,
  size = 'md',
  interactive = true
}: InteractiveEmojiProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  }

  const handleClick = () => {
    if (!interactive) return
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 1000)
  }

  return (
    <div className="relative inline-block">
      <motion.div
        className={`${sizeClasses[size]} cursor-pointer relative`}
        animate={{
          scale: isClicked ? 1.4 : isHovered ? 1.2 : 1,
          rotate: isClicked ? [0, -10, 10, -10, 10, 0] : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 15
        }}
        onHoverStart={() => interactive && setIsHovered(true)}
        onHoverEnd={() => interactive && setIsHovered(false)}
        onClick={handleClick}
      >
        {emoji}
      </motion.div>
      {isHovered && <ParticleEmoji emoji={emoji} />}
    </div>
  )
}