import React, { useEffect, useState, useCallback, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

export function EmojiScene() {
  const [isMounted, setIsMounted] = useState(false)
  const fishControls = useAnimation()
  const sharkControls = useAnimation()
  const animationRef = useRef<boolean>(true)

  const resetAnimation = useCallback(async () => {
    if (!isMounted) return

    try {
      await Promise.all([
        fishControls.set({ x: '40%', y: 0, rotate: 0 }),
        sharkControls.set({ x: '120%', y: '10%' })
      ])
    } catch (error) {
      console.error('Reset error:', error)
    }
  }, [fishControls, sharkControls, isMounted])

  const runAnimation = useCallback(async () => {
    if (!isMounted || !animationRef.current) return

    try {
      // Fish swimming normally
      await fishControls.start({
        y: [0, -20, 0],
        transition: {
          duration: 2,
          repeat: 2,
          ease: "easeInOut"
        }
      })

      if (!animationRef.current) return

      // Shark appears
      await sharkControls.start({
        x: '60%',
        transition: { duration: 2, ease: "easeIn" }
      })

      if (!animationRef.current) return

      // Fish panics
      await fishControls.start({
        rotate: [0, 90],
        y: 20,
        transition: { duration: 0.5, ease: "easeOut" }
      })

      if (!animationRef.current) return

      // Shark investigates
      await sharkControls.start({
        x: '40%',
        transition: { duration: 1.5, ease: "easeInOut" }
      })

      if (!animationRef.current) return

      // Shark leaves
      await sharkControls.start({
        x: '-20%',
        transition: { duration: 3, ease: "easeInOut" }
      })

      if (!animationRef.current) return

      // Fish recovers
      await fishControls.start({
        rotate: 0,
        y: 0,
        transition: { duration: 1, ease: "easeOut" }
      })

      if (!animationRef.current) return

      // Reset shark position
      await sharkControls.set({ x: '120%' })

      // Pause before next cycle
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Start the sequence again if still mounted
      if (animationRef.current && isMounted) {
        runAnimation()
      }
    } catch (error) {
      console.error('Animation error:', error)
      if (animationRef.current && isMounted) {
        await resetAnimation()
        runAnimation()
      }
    }
  }, [fishControls, sharkControls, isMounted, resetAnimation])

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
      animationRef.current = false
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      animationRef.current = true
      resetAnimation().then(() => runAnimation())
    }
    return () => {
      animationRef.current = false
    }
  }, [isMounted, resetAnimation, runAnimation])

  return (
    <div className="w-full h-[400px] bg-gradient-to-b from-ocean-200 to-ocean-400 rounded-xl overflow-hidden relative">
      <motion.div
        initial={false}
        animate={fishControls}
        className="absolute text-6xl"
        style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))' }}
      >
        🐠
      </motion.div>

      <motion.div
        initial={false}
        animate={sharkControls}
        className="absolute text-8xl"
        style={{ filter: 'drop-shadow(4px 4px 4px rgba(0,0,0,0.3))' }}
      >
        🦈
      </motion.div>

      {/* Add some bubbles for atmosphere */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 animate-swim"
            style={{
              width: Math.random() * 20 + 10 + 'px',
              height: Math.random() * 20 + 10 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's',
              animationDuration: Math.random() * 3 + 2 + 's'
            }}
          />
        ))}
      </div>
    </div>
  )
}