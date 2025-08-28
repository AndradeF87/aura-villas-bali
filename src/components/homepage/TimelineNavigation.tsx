'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface NavItem {
  id: string
  label: string
  element: HTMLElement
}

export function TimelineNavigation() {
  const [navItems, setNavItems] = useState<NavItem[]>([])
  const [activeSection, setActiveSection] = useState<string>('')
  const [isTimelineHovered, setIsTimelineHovered] = useState(false)
  const [isOverDarkBg, setIsOverDarkBg] = useState(false)

  useEffect(() => {
    // Dynamically detect all major sections
    const detectSections = () => {
      // Get all sections including the calculator
      const calculatorSection = document.getElementById('calculator-section')
      const sections = document.querySelectorAll('section, [id], .content-section, [class*="section"]')
      
      // Start with calculator section if it exists
      const validSections: Element[] = []
      if (calculatorSection) {
        validSections.push(calculatorSection)
      }
      
      // Add other content sections
      Array.from(sections).forEach(section => {
        const htmlSection = section as HTMLElement
        // Skip if it's the calculator (already added) or doesn't meet criteria
        if (htmlSection.id === 'calculator-section') return
        
        if (htmlSection.offsetHeight > 100 && // Has substantial content
            htmlSection.offsetParent !== null && // Is visible
            !htmlSection.classList.contains('hidden')) { // Not hidden
          validSections.push(htmlSection)
        }
      })

      // Generate navigation items dynamically
      const items = validSections.map((section, index) => {
        const htmlSection = section as HTMLElement
        const heading = htmlSection.querySelector('h1, h2, h3')
        const headingText = heading?.textContent || ''
        const id = htmlSection.id || `section-${index}`
        
        // Specific label mapping based on section content
        let label = ''
        if (id === 'calculator-section') {
          label = 'Earning Calculator'
        } else if (htmlSection.className.includes('hero') || headingText.toLowerCase().includes('partner')) {
          label = 'AURA Partnership'
        } else if (htmlSection.className.includes('success') || headingText.toLowerCase().includes('success')) {
          label = 'Success Stories'
        } else if (htmlSection.className.includes('challenge') || headingText.toLowerCase().includes('challenge')) {
          label = 'Challenges'
        } else if (htmlSection.className.includes('work') || headingText.toLowerCase().includes('how we work')) {
          label = 'How We Work'
        } else if (htmlSection.className.includes('technology') || htmlSection.className.includes('smart') || headingText.toLowerCase().includes('technology')) {
          label = 'Smart Tools'
        } else if (htmlSection.className.includes('qualification') || htmlSection.className.includes('qualify') || headingText.toLowerCase().includes('qualify')) {
          label = 'Qualification'
        } else if (htmlSection.className.includes('service') || htmlSection.className.includes('tier') || headingText.toLowerCase().includes('service')) {
          label = 'Service Levels'
        } else {
          // Fallback based on index for any missed sections
          const fallbackLabels = ['Earning Calculator', 'AURA Partnership', 'Success Stories', 'Challenges', 'How We Work', 'Smart Tools', 'Qualification', 'Service Levels']
          label = fallbackLabels[index] || `Section ${index + 1}`
        }
        
        // Don't truncate these specific labels
        label = label.trim()
        
        return {
          id,
          label,
          element: htmlSection
        }
      })

      setNavItems(items)
    }

    detectSections()
    
    // Re-detect on window resize or DOM changes
    window.addEventListener('resize', detectSections)
    
    // Use MutationObserver for dynamic content
    const observer = new MutationObserver(detectSections)
    observer.observe(document.body, { childList: true, subtree: true })
    
    return () => {
      window.removeEventListener('resize', detectSections)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    // Set up active section tracking based on scroll position
    if (navItems.length === 0) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // Find which section is currently at or near the top of the viewport
      let currentActive = ''
      
      // Check each section to see which one is closest to the top
      for (let i = 0; i < navItems.length; i++) {
        const item = navItems[i]
        const element = item.element
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top
        
        // Special handling for calculator section (fixed position)
        if (item.id === 'calculator-section') {
          if (scrollY < 100) {
            currentActive = 'calculator-section'
            break
          }
        } else {
          // Check if this section is at or just passed the top of the viewport
          // We use a threshold of 100px to account for sections that are just entering
          if (elementTop <= 100 && elementTop > -rect.height) {
            currentActive = item.id
          }
        }
      }
      
      // If no section found but we're scrolled, use the last visible section
      if (!currentActive && scrollY > 100) {
        for (let i = navItems.length - 1; i >= 0; i--) {
          const item = navItems[i]
          if (item.id !== 'calculator-section') {
            const rect = item.element.getBoundingClientRect()
            if (rect.top < window.innerHeight) {
              currentActive = item.id
              break
            }
          }
        }
      }
      
      if (currentActive) {
        setActiveSection(currentActive)
      }
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [navItems])

  useEffect(() => {
    // Check background color
    const handleScroll = () => {
      // Check if timeline is over dark background (green section)
      const timelineElement = document.querySelector('.fixed.right-12')
      if (timelineElement) {
        const rect = timelineElement.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        // Temporarily hide timeline to check what's behind
        const originalPointerEvents = (timelineElement as HTMLElement).style.pointerEvents
        const originalVisibility = (timelineElement as HTMLElement).style.visibility;
        (timelineElement as HTMLElement).style.pointerEvents = 'none';
        (timelineElement as HTMLElement).style.visibility = 'hidden'
        
        let elementsAtPoint: Element[] = []
        
        if (typeof window !== 'undefined' && document.elementsFromPoint) {
          try {
            elementsAtPoint = document.elementsFromPoint(centerX, centerY)
          } catch (e) {
            const element = document.elementFromPoint(centerX, centerY)
            if (element) {
              elementsAtPoint = [element]
            }
          }
        }
        
        // Restore timeline visibility
        (timelineElement as HTMLElement).style.visibility = originalVisibility;
        (timelineElement as HTMLElement).style.pointerEvents = originalPointerEvents
        
        let isDark = false
        
        // Check for dark green background
        for (const element of elementsAtPoint) {
          const styles = window.getComputedStyle(element as HTMLElement)
          const bgColor = styles.backgroundColor
          const bgImage = styles.backgroundImage
          
          if (bgColor === 'rgb(47, 74, 60)' || // #2F4A3C in RGB
              bgImage.includes('47, 74, 60') || 
              bgImage.includes('2f4a3c') ||
              bgImage.includes('linear-gradient') && element.id === 'original' ||
              bgImage.includes('1a1a1a') ||
              (element.classList && element.classList.toString().includes('calculator-card'))) {
            isDark = true
            break
          }
        }
        
        setIsOverDarkBg(isDark)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (element: HTMLElement) => {
    // Special handling for calculator section - scroll to top
    if (element.id === 'calculator-section') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      return
    }
    
    // No offset - scroll directly to the top of the element
    const elementPosition = element.getBoundingClientRect().top + window.scrollY

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }

  if (navItems.length === 0) return null
  
  // Dynamic colors based on background
  const dotBorderColor = isOverDarkBg ? 'rgba(255, 255, 255, 0.3)' : 'rgba(201, 111, 74, 0.4)'
  const activeDotColor = isOverDarkBg ? '#C96F4A' : '#C96F4A'
  const dotBgColor = isOverDarkBg ? '#1a1a1a' : '#F8F4F0'
  const labelBgColor = isOverDarkBg ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)'
  const labelTextColor = isOverDarkBg ? '#F8F4F0' : '#2F4A3C'

  return (
    <div>
      {/* Timeline Navigation */}
      <div 
        className="fixed right-12 top-1/2 -translate-y-1/2 hidden md:block" 
        style={{ height: '70vh', zIndex: 2147483647, backgroundColor: 'transparent' }}
        onMouseEnter={() => setIsTimelineHovered(true)}
        onMouseLeave={() => setIsTimelineHovered(false)}
      >
      {/* Timeline container */}
      <div className="relative h-full flex items-center justify-center" style={{ backgroundColor: 'transparent' }}>
        {/* Static vertical line */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 h-full w-0.5"
          style={{ 
            backgroundColor: isOverDarkBg ? 'rgba(255, 255, 255, 0.1)' : 'rgba(201, 111, 74, 0.2)',
            top: 0,
            zIndex: 0
          }}
        />
        
        {/* Navigation dots - spread across the full height */}
        <div className="relative flex flex-col justify-between h-full py-4 items-center" style={{ zIndex: 1 }}>
          {navItems.map((item, index) => {
            // Only highlight the dot if its section is active (at the top of the screen)
            const isDotActive = activeSection === item.id
            
            return (
              <div 
                key={item.id}
                className="relative flex items-center"
              >
                {/* Label - shows for all when timeline is hovered */}
                <motion.div
                  className="absolute right-8 whitespace-nowrap"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ 
                    opacity: isTimelineHovered ? 1 : 0,
                    x: isTimelineHovered ? 0 : 10
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div 
                    className="rounded-lg px-3 py-1.5 shadow-lg transition-colors duration-300"
                    style={{ 
                      backgroundColor: labelBgColor,
                      backdropFilter: isOverDarkBg ? 'blur(10px)' : 'none'
                    }}
                  >
                    <span 
                      className="text-sm font-medium transition-colors duration-300"
                      style={{ color: labelTextColor }}
                    >
                      {item.label}
                    </span>
                  </div>
                </motion.div>
                
                {/* Dot with background */}
                <button
                  className="relative z-10"
                  onClick={() => scrollToSection(item.element)}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <motion.div
                    className="rounded-full border-2 transition-all duration-300"
                    animate={{
                      width: activeSection === item.id ? 18 : 14,
                      height: activeSection === item.id ? 18 : 14,
                      borderColor: isDotActive ? activeDotColor : dotBorderColor
                    }}
                    whileHover={{
                      scale: 1.2,
                      borderColor: activeDotColor
                    }}
                    style={{
                      backgroundColor: isDotActive ? activeDotColor : dotBgColor,
                      boxShadow: activeSection === item.id ? `0 4px 12px ${isOverDarkBg ? 'rgba(201, 111, 74, 0.5)' : 'rgba(201, 111, 74, 0.3)'}` : 'none'
                    }}
                  />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
    </div>
  )
}