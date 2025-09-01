'use client'

import { useRef, useState, useEffect } from 'react'
import { TechnologySection } from '@/components/property-management/TechnologySection'
import { QualificationForm } from '@/components/property-management/QualificationForm'

export function TechnologySectionWrapper() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFixed, setIsFixed] = useState(false)
  const [shouldUnfix, setShouldUnfix] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const containerTop = rect.top
      const containerHeight = containerRef.current.offsetHeight
      const viewportHeight = window.innerHeight

      // Fix the technology section when it reaches the top
      if (containerTop <= 0 && !shouldUnfix) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }

      // Unfix when we've scrolled past it (when qualification form should be fully visible)
      if (containerTop <= -viewportHeight) {
        setShouldUnfix(true)
        setIsFixed(false)
      } else if (containerTop > -viewportHeight) {
        setShouldUnfix(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [shouldUnfix])

  return (
    <div ref={containerRef} className="relative">
      {/* Technology Section Container */}
      <div className={`${isFixed && !shouldUnfix ? 'fixed top-0 left-0 right-0 z-0' : 'relative z-10'}`}>
        <TechnologySection />
      </div>
      
      {/* Spacer when fixed */}
      {isFixed && !shouldUnfix && (
        <div style={{ height: '100vh' }} />
      )}
      
      {/* Qualification Form slides up over Technology Section */}
      <div className="relative z-20 bg-white">
        <QualificationForm />
      </div>
    </div>
  )
}