'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'

interface HamburgerMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Our Villas', href: '/villas' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
]

export function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (isOpen) {
      // Animate menu items in with stagger
      gsap.fromTo(menuItemsRef.current,
        {
          opacity: 0,
          x: -30,
          y: 0
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2
        }
      )
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center
                       text-white hover:scale-110 transition-transform duration-300 group"
              aria-label="Close menu"
            >
              <span className="relative block w-8 h-8">
                <span className="absolute top-1/2 left-0 w-full h-[2px] bg-white 
                               transform -translate-y-1/2 rotate-45 transition-all duration-300
                               group-hover:rotate-[225deg]" />
                <span className="absolute top-1/2 left-0 w-full h-[2px] bg-white 
                               transform -translate-y-1/2 -rotate-45 transition-all duration-300
                               group-hover:-rotate-[225deg]" />
              </span>
            </button>

            {/* Menu Items */}
            <nav className="text-center">
              {menuItems.map((item, index) => (
                <div
                  key={item.label}
                  ref={el => {
                    if (el) menuItemsRef.current[index] = el
                  }}
                  className="opacity-0"
                >
                  <a
                    href={item.href}
                    className="block py-4 px-8 text-white text-4xl md:text-5xl lg:text-6xl 
                             font-serif hover:text-[#C96F4A] transition-colors duration-300
                             relative group"
                    onClick={onClose}
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C96F4A] 
                                     transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                </div>
              ))}
            </nav>

            {/* Social Links */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                Instagram
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                Facebook
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                WhatsApp
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}