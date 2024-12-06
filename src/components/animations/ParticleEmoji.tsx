import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  emoji: string
  scale: number
  rotation: number
}

export function ParticleEmoji({ emoji }: { emoji: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createParticle = (x: number, y: number) => {
      const particle: Particle = {
        id: Math.random(),
        x,
        y,
        emoji,
        scale: 0.5 + Math.random() * 0.5,
        rotation: Math.random() * 360
      }
      particlesRef.current.push(particle)
      
      const element = document.createElement('div')
      element.style.position = 'absolute'
      element.style.left = `${x}px`
      element.style.top = `${y}px`
      element.style.transform = `scale(${particle.scale}) rotate(${particle.rotation}deg)`
      element.style.fontSize = '24px'
      element.textContent = emoji
      container.appendChild(element)

      setTimeout(() => {
        container.removeChild(element)
        particlesRef.current = particlesRef.current.filter(p => p.id !== particle.id)
      }, 1000)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      if (Math.random() > 0.8) {
        createParticle(x, y)
      }
    }

    container.addEventListener('mousemove', handleMouseMove)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [emoji])

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )
}