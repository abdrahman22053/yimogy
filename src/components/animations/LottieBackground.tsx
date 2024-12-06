import React from 'react'
import Lottie from 'lottie-react'
import { useOceanBackground } from '../../hooks/useOceanBackground'

export function LottieBackground() {
  const { animationData, opacity } = useOceanBackground()

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: opacity
        }}
      />
    </div>
  )
}