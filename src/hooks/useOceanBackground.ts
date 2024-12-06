import { useMemo } from 'react'
import confettiAnimation from '../assets/animations/confetti.json'

export function useOceanBackground() {
  const animationData = useMemo(() => {
    return {
      ...confettiAnimation,
      layers: confettiAnimation.layers.map(layer => ({
        ...layer,
        shapes: layer.shapes.map(shape => ({
          ...shape,
          it: shape.it.map(item => {
            if (item.ty === 'fl') {
              return {
                ...item,
                c: { a: 0, k: [0.47, 0.73, 0.93, 1] } // Ocean blue color
              }
            }
            return item
          })
        }))
      }))
    }
  }, [])

  return {
    animationData,
    opacity: 0.1
  }
}