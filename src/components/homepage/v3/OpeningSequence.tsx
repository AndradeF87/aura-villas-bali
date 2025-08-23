'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface OpeningSequenceProps {
  onComplete: () => void
}

export function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onComplete
    })

    // Typewriter effect for opening text
    const text = "Where Luxury Meets Paradise"
    const chars = text.split('')
    
    if (textRef.current) {
      textRef.current.innerHTML = chars.map(char => 
        `<span class="opacity-0 inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('')
      
      const spans = textRef.current.querySelectorAll('span')
      
      // Animate text in with typewriter effect
      tl.fromTo(spans, 
        { 
          opacity: 0,
          scale: 0.95,
          y: 20
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.03,
          ease: "power2.out"
        }
      )
      
      // Hold for 2 seconds
      .to({}, { duration: 2 })
      
      // Fade out text
      .to(textRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "power2.in"
      })
      
      // Show line
      .set(lineRef.current, { opacity: 1 })
      
      // Expand curtain from line (reveals background as it expands)
      .fromTo(curtainRef.current, 
        {
          clipPath: 'inset(50% 0 50% 0)', // Start as horizontal line
        },
        {
          clipPath: 'inset(0% 0 0% 0)', // Expand to full height
          duration: 1.5,
          ease: "power3.inOut"
        }
      )
      
      // Fade out entire overlay
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Hide the element after animation
          if (containerRef.current) {
            containerRef.current.style.display = 'none'
          }
        }
      })
    }

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <>
      {/* Background Image (always behind, revealed by curtain) */}
      <div 
        ref={curtainRef}
        className="fixed inset-0"
        style={{ 
          zIndex: 1,
          clipPath: 'inset(50% 0 50% 0)',
          backgroundImage: 'url(/images/Homepage-SUYAI-villa.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Terracotta Overlay with text */}
      <div 
        ref={containerRef}
        className="fixed inset-0 bg-[#C96F4A] flex items-center justify-center"
        style={{ zIndex: 9999 }}
      >
        {/* Opening Text */}
        <div 
          ref={textRef}
          className="absolute text-white font-serif text-5xl md:text-7xl lg:text-8xl text-center px-8"
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            zIndex: 30
          }}
        />
        
        {/* Horizontal Line (visual indicator) */}
        <div 
          ref={lineRef}
          className="absolute left-0 right-0 h-[2px] bg-white/50 opacity-0"
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20
          }}
        />
      </div>
    </>
  )
}