'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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
  const { scrollYProgress } = useScroll()
  
  // Transform for the progress line
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

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
    // Set up Intersection Observer for active section tracking
    if (navItems.length === 0) return

    // Check scroll position for calculator section
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // If we're at the top of the page (scroll < 100px), activate calculator section
      if (scrollY < 100 && navItems.length > 0 && navItems[0].id === 'calculator-section') {
        setActiveSection('calculator-section')
        return
      }
      
      // Otherwise use intersection observer for other sections
    }

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = navItems.find(item => item.element === entry.target)
          if (section) {
            setActiveSection(section.id)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    navItems.forEach(item => {
      // Don't observe the calculator section with IntersectionObserver since it's fixed
      if (item.id !== 'calculator-section') {
        observer.observe(item.element)
      }
    })

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => {
      observer.disconnect()
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
  const lineColor = isOverDarkBg ? 'rgba(255, 255, 255, 0.2)' : 'rgba(201, 111, 74, 0.3)'
  const progressColor = isOverDarkBg ? '#C96F4A' : '#2F4A3C'
  const dotBorderColor = isOverDarkBg ? 'rgba(255, 255, 255, 0.3)' : 'rgba(201, 111, 74, 0.4)'
  const activeDotColor = isOverDarkBg ? '#C96F4A' : '#C96F4A'
  const labelBgColor = isOverDarkBg ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.9)'
  const labelTextColor = isOverDarkBg ? '#F8F4F0' : '#2F4A3C'

  return (
    <>
      {/* Mobile Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200/30 md:hidden" style={{ zIndex: 2147483647 }}>
        <motion.div 
          className="h-full bg-gradient-to-r from-[#C96F4A] to-[#2F4A3C]"
          style={{ width: scrollYProgress }}
        />
      </div>

      {/* Desktop Timeline Navigation */}
      <div 
        className="fixed right-12 top-1/2 -translate-y-1/2 hidden md:block" 
        style={{ height: '70vh', zIndex: 2147483647, backgroundColor: 'transparent' }}
        onMouseEnter={() => setIsTimelineHovered(true)}
        onMouseLeave={() => setIsTimelineHovered(false)}
      >
      {/* Timeline container - now with explicit height */}
      <div className="relative h-full flex items-center" style={{ backgroundColor: 'transparent' }}>
        {/* Background line */}
        <div 
          className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 transition-colors duration-300"
          style={{ backgroundColor: lineColor }}
        />
        
        {/* Progress line */}
        <motion.div 
          className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 transition-colors duration-300"
          style={{ 
            height: progressHeight,
            backgroundColor: progressColor 
          }}
        />
        
        {/* Navigation dots - spread across the full height */}
        <div className="relative flex flex-col justify-between h-full py-4">
          {navItems.map((item, index) => (
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
              
              {/* Dot */}
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
                    borderColor: activeSection === item.id ? activeDotColor : dotBorderColor
                  }}
                  whileHover={{
                    scale: 1.2,
                    borderColor: activeDotColor
                  }}
                  style={{
                    backgroundColor: activeSection === item.id ? activeDotColor : 'transparent',
                    boxShadow: activeSection === item.id ? `0 4px 12px ${isOverDarkBg ? 'rgba(201, 111, 74, 0.5)' : 'rgba(201, 111, 74, 0.3)'}` : 'none'
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}