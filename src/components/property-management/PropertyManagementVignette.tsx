'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'

export function PropertyManagementVignette() {
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

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <>
      {/* Radial vignette gradient from bottom left corner - transparent overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 10% 90%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0) 50%)',
          zIndex: 15
        }}
      />
      
      {/* Property Management information */}
      <div 
        ref={vignetteRef}
        className="absolute bottom-12 left-12 z-20 opacity-0"
        style={{ maxWidth: '800px' }}
      >
        {/* Badge */}
        <div className="text-white/80 text-sm font-light tracking-wider mb-2">
          Selective Partnership • Limited Availability
        </div>
        
        {/* Main Headline - Single Line */}
        <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-serif mb-4">
          We Partner with Select
          <span className="text-terracotta"> Bali Villa Owners</span>
        </h2>
        
        {/* Subheadline */}
        <p className="text-white/70 text-lg mb-6 max-w-2xl">
          Not every property is right for AURA. We work with a limited number of exceptional villas 
          to ensure each one gets the attention, care, and results it deserves.
        </p>

        {/* Trust Points */}
        <div className="flex flex-wrap gap-6 mb-8 text-white/80">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-terracotta rounded-full"></div>
            <span>Founded 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-terracotta rounded-full"></div>
            <span>2 Properties Under Management</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-terracotta rounded-full"></div>
            <span>8 Properties by Jan 2026</span>
          </div>
        </div>
        
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
            See If You Qualify
          </span>
        </motion.button>
      </div>
    </>
  )
}