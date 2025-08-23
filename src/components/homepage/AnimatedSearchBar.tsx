'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { GlassSearchBar } from './GlassSearchBar'

export function AnimatedSearchBar() {
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchRef.current) {
      // Magnetic effect on hover
      const handleMouseMove = (e: MouseEvent) => {
        const rect = searchRef.current!.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        const distance = Math.sqrt(x * x + y * y)
        
        if (distance < 100) {
          gsap.to(searchRef.current, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.3,
            ease: "power2.out"
          })
        }
      }

      const handleMouseLeave = () => {
        gsap.to(searchRef.current, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)"
        })
      }

      const element = searchRef.current
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return (
    <motion.div
      ref={searchRef}
      className="hero-search-container w-full"
      initial={{ y: 50, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 1.2,
        ease: "back.out(1.7)"
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <GlassSearchBar />
    </motion.div>
  )
}