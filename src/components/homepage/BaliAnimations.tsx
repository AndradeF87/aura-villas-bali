'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'

export function BaliAnimations() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leavesRef = useRef<HTMLDivElement[]>([])
  const birdsRef = useRef<HTMLDivElement[]>([])
  const ripplesRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll()
  const leafY = useTransform(scrollYProgress, [0, 1], ['0%', '150%'])
  const birdY = useTransform(scrollYProgress, [0, 1], ['0%', '200%'])

  // Create floating leaves animation
  useEffect(() => {
    if (leavesRef.current.length) {
      leavesRef.current.forEach((leaf, index) => {
        gsap.to(leaf, {
          y: -20,
          rotation: 10,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3
        })
        
        gsap.to(leaf, {
          x: 15,
          duration: 4 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        })
      })
    }
  }, [])

  // Create bird flying animation
  useEffect(() => {
    if (birdsRef.current.length) {
      birdsRef.current.forEach((bird, index) => {
        gsap.fromTo(bird, {
          x: -100,
          y: 50 + index * 20,
          rotation: -5
        }, {
          x: window.innerWidth + 100,
          y: 30 + index * 15,
          rotation: 5,
          duration: 15 + index * 2,
          repeat: -1,
          ease: "sine.inOut",
          delay: index * 5
        })
      })
    }
  }, [])

  // Water ripple effect on click
  const createRipple = (e: React.MouseEvent) => {
    if (ripplesRef.current) {
      const rect = ripplesRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const ripple = document.createElement('div')
      ripple.className = 'water-ripple'
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      
      ripplesRef.current.appendChild(ripple)
      
      setTimeout(() => {
        ripple.remove()
      }, 1000)
    }
  }

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-5 pointer-events-none overflow-hidden"
    >
      {/* Floating Tropical Leaves */}
      <motion.div style={{ y: leafY }} className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`leaf-${i}`}
            ref={el => el && (leavesRef.current[i] = el)}
            className={`absolute tropical-leaf leaf-${i + 1}`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            <svg
              width="24"
              height="32"
              viewBox="0 0 24 32"
              className="drop-shadow-sm"
            >
              <path
                d="M12 0C12 0 0 8 0 16C0 24 12 32 12 32C12 32 24 24 24 16C24 8 12 0 12 0Z"
                fill="rgba(34, 197, 94, 0.3)"
                stroke="rgba(34, 197, 94, 0.5)"
                strokeWidth="0.5"
              />
              <path
                d="M12 2L12 30"
                stroke="rgba(34, 197, 94, 0.4)"
                strokeWidth="1"
              />
              <path
                d="M6 12C8 12 12 16 12 16C12 16 16 12 18 12"
                stroke="rgba(34, 197, 94, 0.3)"
                strokeWidth="0.5"
                fill="none"
              />
            </svg>
          </div>
        ))}
      </motion.div>

      {/* Flying Birds */}
      <motion.div style={{ y: birdY }} className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={`bird-${i}`}
            ref={el => el && (birdsRef.current[i] = el)}
            className={`absolute bird bird-${i + 1}`}
            style={{
              top: `${15 + i * 10}%`,
            }}
          >
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              className="drop-shadow-sm"
            >
              <path
                d="M2 6C2 6 6 2 10 2C14 2 18 6 18 6C18 6 14 10 10 10C6 10 2 6 2 6Z"
                fill="rgba(255, 255, 255, 0.4)"
                className="bird-body"
              />
              <path
                d="M0 6C2 4 4 4 6 6C4 8 2 8 0 6Z"
                fill="rgba(255, 255, 255, 0.3)"
                className="bird-wing-left"
              />
              <path
                d="M20 6C18 4 16 4 14 6C16 8 18 8 20 6Z"
                fill="rgba(255, 255, 255, 0.3)"
                className="bird-wing-right"
              />
            </svg>
          </div>
        ))}
      </motion.div>

      {/* Sunset Color Transitions */}
      <div className="absolute inset-0 sunset-overlay pointer-events-none" />

      {/* Water Ripples Container */}
      <div
        ref={ripplesRef}
        className="absolute inset-0 z-10 pointer-events-auto"
        onClick={createRipple}
        style={{ cursor: 'none' }}
      />

      {/* Particle System */}
      <div className="absolute inset-0 particles-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`particle particle-${i + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}