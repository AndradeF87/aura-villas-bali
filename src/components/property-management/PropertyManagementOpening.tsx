'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface PropertyManagementOpeningProps {
  onComplete: () => void
}

export function PropertyManagementOpening({ onComplete }: PropertyManagementOpeningProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const topCurtainRef = useRef<HTMLDivElement>(null)
  const bottomCurtainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete
    })

    // Quick fade in text
    tl.fromTo(textRef.current, 
      { 
        opacity: 0,
        scale: 0.9
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      }
    )
    
    // Hold briefly
    .to({}, { duration: 0.5 })
    
    // Fade out text quickly
    .to(textRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      ease: "power2.in"
    })
    
    // Animate curtains opening from center
    .to([topCurtainRef.current, bottomCurtainRef.current], {
      scaleY: 0,
      duration: 0.8,
      ease: "power2.inOut",
      stagger: 0
    })
    
    // Quick fade out of container
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.out"
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0"
      style={{ zIndex: 9999 }}
    >
      {/* Background Image (visible when curtains open) */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundImage: 'url(/images/Homepage-SUYAI-villa.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Top Curtain */}
      <div 
        ref={topCurtainRef}
        className="absolute top-0 left-0 right-0 bg-[#C96F4A]"
        style={{ 
          height: '50%',
          transformOrigin: 'top center'
        }}
      />
      
      {/* Bottom Curtain */}
      <div 
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 right-0 bg-[#C96F4A]"
        style={{ 
          height: '50%',
          transformOrigin: 'bottom center'
        }}
      />
      
      {/* Horizontal Line in Center */}
      <div 
        className="absolute left-0 right-0 h-[2px] bg-white/30"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10
        }}
      />
      
      {/* Opening Text */}
      <div 
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center text-white font-serif text-4xl md:text-6xl lg:text-7xl text-center px-8"
        style={{
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          zIndex: 20
        }}
      >
        Your Villa's Story Deserves AURA
      </div>
    </div>
  )
}