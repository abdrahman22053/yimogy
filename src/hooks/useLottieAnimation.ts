import { useMemo } from 'react'
import confettiAnimation from '../assets/animations/confetti.json'
import sparklesAnimation from '../assets/animations/sparkles.json'
import starAnimation from '../assets/animations/star.json'

type AnimationType = 'confetti' | 'sparkles' | 'star'

const animations = {
  confetti: confettiAnimation,
  sparkles: sparklesAnimation,
  star: starAnimation
}

export function useLottieAnimation(type: AnimationType) {
  const animationData = useMemo(() => animations[type], [type])

  return {
    animationData
  }
}