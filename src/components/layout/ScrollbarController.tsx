'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollbarController() {
  const pathname = usePathname()
  
  // Pages where scrollbar should only be visible while scrolling
  const pagesWithHiddenScrollbar = ['/pricing', '/about', '/contact', '/villas']
  const shouldHideScrollbar = pagesWithHiddenScrollbar.includes(pathname)
  
  useEffect(() => {
    if (!shouldHideScrollbar) {
      // Remove classes if not on target pages
      document.body.classList.remove('scrollbar-on-scroll', 'is-scrolling')
      return
    }
    
    // Add the base class for scrollbar styling
    document.body.classList.add('scrollbar-on-scroll')
    
    let scrollTimeout: NodeJS.Timeout
    
    const handleScroll = () => {
      // Add scrolling class
      document.body.classList.add('is-scrolling')
      
      // Clear existing timeout
      clearTimeout(scrollTimeout)
      
      // Set timeout to remove scrolling class after scroll stops
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling')
      }, 1000) // Hide after 1 second of no scrolling
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
      document.body.classList.remove('scrollbar-on-scroll', 'is-scrolling')
    }
  }, [shouldHideScrollbar])
  
  return null
}