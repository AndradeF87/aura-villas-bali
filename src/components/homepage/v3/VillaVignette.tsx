'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'

const villas = [
  {
    name: 'ONAYA Bali Resort',
    location: 'Uluwatu',
    amenities: '4 Bedrooms • 4 Bathrooms • Private Pool • Ocean View',
    image: '/images/Homepage-SUYAI-villa.webp'
  },
  {
    name: 'SUYAI Villa',
    location: 'Canggu',
    amenities: '5 Bedrooms • 5 Bathrooms • Infinity Pool • Beach Access',
    image: '/images/Homepage-SUYAI-villa.webp'
  }
]

export function VillaVignette() {
  const [currentVilla, setCurrentVilla] = useState(0)
  const vignetteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial entrance animation
    const tl = gsap.timeline()
    
    tl.fromTo(vignetteRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 1,
        ease: "power3.out"
      }
    )

    // Villa rotation every 8 seconds
    const interval = setInterval(() => {
      setCurrentVilla((prev) => (prev + 1) % villas.length)
    }, 8000)

    return () => {
      clearInterval(interval)
      tl.kill()
    }
  }, [])

  const villa = villas[currentVilla]

  return (
    <>
      {/* Radial vignette gradient from bottom left corner - transparent overlay */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 10% 90%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0) 50%)',
          zIndex: 15
        }}
      />
      
      {/* Villa information */}
      <div 
        ref={vignetteRef}
        className="absolute bottom-12 left-12 z-20 opacity-0"
        style={{ maxWidth: '500px' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVilla}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Location */}
            <div className="text-white/80 text-sm font-light tracking-wider mb-2">
              {villa.location}
            </div>
            
            {/* Villa Name - Single Line */}
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-serif mb-4 whitespace-nowrap">
              {villa.name}
            </h2>
            
            {/* Amenities */}
            <p className="text-white/70 text-sm mb-6">
              {villa.amenities}
            </p>
            
            {/* CTA Button with glass effect */}
            <motion.button
              className="relative group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                            translate-x-[-100%] group-hover:translate-x-[100%] 
                            transition-transform duration-700 ease-out rounded-full" />
              <span className="relative px-8 py-3 text-white font-medium inline-block">
                Check Availability
              </span>
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}