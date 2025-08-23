'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

interface NavigationHeaderProps {
  onMenuClick: () => void
}

export function NavigationHeader({ onMenuClick }: NavigationHeaderProps) {
  const navRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const propertyRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Fade in navigation elements after curtain animation
    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(logoRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(propertyRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(menuRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-30 p-8"
    >
      <div className="flex items-center justify-between">
        {/* Logo - matching main homepage style */}
        <div ref={logoRef} className="opacity-0">
          <a href="/" className="flex items-center space-x-2 group">
            <div className="text-white drop-shadow-lg">
              <span className="font-serif text-3xl font-bold tracking-wider group-hover:text-terracotta-light transition-colors">
                AURA
              </span>
              <span className="text-xs tracking-[0.3em] uppercase mt-1 block">
                Villas Bali
              </span>
            </div>
          </a>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-6">
          {/* List Your Property Button */}
          <button
            ref={propertyRef}
            className="opacity-0 px-6 py-2.5 text-white border border-white/30 
                     rounded-full hover:bg-white/10 backdrop-blur-sm
                     transition-all duration-300 hover:scale-105"
          >
            List Your Property
          </button>

          {/* Hamburger Menu */}
          <button
            ref={menuRef}
            onClick={onMenuClick}
            className="opacity-0 relative w-12 h-12 flex flex-col items-center justify-center 
                     group hover:scale-110 transition-transform duration-300"
            aria-label="Open menu"
          >
            <span className="block w-8 h-[2px] bg-white mb-[6px] transition-all duration-300 
                           group-hover:w-10" />
            <span className="block w-8 h-[2px] bg-white mb-[6px] transition-all duration-300 
                           group-hover:w-10 group-hover:delay-75" />
            <span className="block w-8 h-[2px] bg-white transition-all duration-300 
                           group-hover:w-10 group-hover:delay-150" />
          </button>
        </div>
      </div>
    </nav>
  )
}