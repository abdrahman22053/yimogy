import React from 'react'
import Lottie from 'lottie-react'
import { useLottieAnimation } from '../../hooks/useLottieAnimation'

type AnimationType = 'confetti' | 'sparkles' | 'star'

interface LottieEmojiProps {
  type: AnimationType
  size?: number
  loop?: boolean
  autoplay?: boolean
  className?: string
}

export function LottieEmoji({
  type,
  size = 100,
  loop = true,
  autoplay = true,
  className = ''
}: LottieEmojiProps) {
  const { animationData } = useLottieAnimation(type)

  return (
    <div style={{ width: size, height: size }} className={className}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
      />
    </div>
  )
}