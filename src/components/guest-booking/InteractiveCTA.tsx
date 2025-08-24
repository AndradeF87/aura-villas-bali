'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

interface InteractiveCTAProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function InteractiveCTA({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '' 
}: InteractiveCTAProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)

  // Magnetic effect on hover
  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const distance = Math.sqrt(x * x + y * y)
      
      if (distance < 80) {
        gsap.to(button, {
          x: x * 0.2,
          y: y * 0.2,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)"
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Ripple effect on click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const ripple = rippleRef.current
    if (!ripple) return

    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    
    gsap.fromTo(ripple, {
      scale: 0,
      opacity: 0.6
    }, {
      scale: 4,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    })

    onClick?.()
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-terracotta to-terracotta-dark text-white hover:shadow-lg hover:shadow-terracotta/30',
    secondary: 'bg-gradient-to-r from-deep-green to-deep-green-dark text-white hover:shadow-lg hover:shadow-deep-green/30'
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      className={`
        relative overflow-hidden rounded-lg font-semibold transition-all duration-300
        transform-gpu will-change-transform
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "back.out(1.7)" }}
    >
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Ripple effect element */}
      <div
        ref={rippleRef}
        className="absolute w-2 h-2 bg-white/30 rounded-full pointer-events-none z-0"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  )
}