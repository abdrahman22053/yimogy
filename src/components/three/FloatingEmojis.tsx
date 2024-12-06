import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'

function Emoji({ position, emoji }: { position: [number, number, number], emoji: string }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.1
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime + position[1]) * 0.1
  })

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      position={position}
    >
      <group ref={ref}>
        <Text
          fontSize={1}
          color="#4f46e5"
          anchorX="center"
          anchorY="middle"
        >
          {emoji}
        </Text>
      </group>
    </Float>
  )
}

function Scene() {
  const emojis = ['🎨', '✨', '💫', '🌟', '🎉', '💝', '🌈']
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {emojis.map((emoji, i) => (
        <Emoji
          key={i}
          emoji={emoji}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5
          ]}
        />
      ))}
    </>
  )
}

export function FloatingEmojisScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}