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
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const { scrollYProgress } = useScroll()
  
  // Transform for the progress line
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    // Dynamically detect all major sections
    const detectSections = () => {
      const sections = document.querySelectorAll('section, [id], .content-section, [class*="section"]')
      
      // Filter for actual content sections
      const validSections = Array.from(sections).filter(section => {
        const htmlSection = section as HTMLElement
        return htmlSection.offsetHeight > 100 && // Has substantial content
               htmlSection.offsetParent !== null && // Is visible
               !htmlSection.classList.contains('hidden') && // Not hidden
               !htmlSection.classList.contains('fixed') // Not fixed positioned
      })

      // Generate navigation items dynamically
      const items = validSections.map((section, index) => {
        const htmlSection = section as HTMLElement
        const heading = htmlSection.querySelector('h1, h2, h3')
        const id = htmlSection.id || `section-${index}`
        
        // Smart label extraction
        let label = ''
        if (heading) {
          label = heading.textContent || ''
        } else if (htmlSection.getAttribute('aria-label')) {
          label = htmlSection.getAttribute('aria-label') || ''
        } else if (htmlSection.className.includes('hero')) {
          label = 'Welcome'
        } else if (htmlSection.className.includes('calculator')) {
          label = 'Calculator'
        } else if (htmlSection.className.includes('service')) {
          label = 'Services'
        } else if (htmlSection.className.includes('technology')) {
          label = 'Technology'
        } else if (htmlSection.className.includes('qualification')) {
          label = 'Qualify'
        } else if (htmlSection.className.includes('partner')) {
          label = 'Partnership'
        } else if (htmlSection.className.includes('work')) {
          label = 'How We Work'
        } else {
          label = `Section ${index + 1}`
        }
        
        // Clean up label
        label = label.trim().replace(/\s+/g, ' ').substring(0, 20)
        
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
      observer.observe(item.element)
    })

    return () => observer.disconnect()
  }, [navItems])

  useEffect(() => {
    // Calculate scroll progress
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const scrollableHeight = documentHeight - windowHeight
      const progress = Math.min((scrollTop / scrollableHeight) * 100, 100)
      setScrollProgress(Math.round(progress))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (element: HTMLElement) => {
    const offset = 80 // Account for fixed header
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }

  if (navItems.length === 0) return null

  return (
    <div className="fixed right-12 top-1/2 -translate-y-1/2 z-[90] hidden md:block">
      {/* Timeline container */}
      <div className="relative">
        {/* Background line */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gray-200" />
        
        {/* Progress line */}
        <motion.div 
          className="absolute left-1/2 top-0 w-[2px] -translate-x-1/2 bg-[#C96F4A]"
          style={{ height: progressHeight }}
        />
        
        {/* Navigation dots */}
        <div className="relative flex flex-col gap-8">
          {navItems.map((item, index) => (
            <div 
              key={item.id}
              className="relative flex items-center"
            >
              {/* Label */}
              <motion.div
                className="absolute right-8 whitespace-nowrap"
                initial={{ opacity: 0, x: 10 }}
                animate={{ 
                  opacity: (hoveredItem === item.id || activeSection === item.id) ? 1 : 0,
                  x: (hoveredItem === item.id || activeSection === item.id) ? 0 : 10
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="rounded-lg bg-white px-3 py-1.5 shadow-lg">
                  <span className="text-sm font-medium text-[#2F4A3C]">
                    {item.label}
                  </span>
                </div>
              </motion.div>
              
              {/* Dot */}
              <button
                className="relative z-10"
                onClick={() => scrollToSection(item.element)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                aria-label={`Navigate to ${item.label}`}
              >
                <motion.div
                  className="rounded-full border-2 transition-all duration-300"
                  animate={{
                    width: activeSection === item.id ? 16 : 12,
                    height: activeSection === item.id ? 16 : 12,
                    backgroundColor: activeSection === item.id ? '#C96F4A' : '#ffffff',
                    borderColor: activeSection === item.id ? '#C96F4A' : '#e5e7eb'
                  }}
                  whileHover={{
                    scale: 1.2,
                    borderColor: '#C96F4A'
                  }}
                  style={{
                    boxShadow: activeSection === item.id ? '0 4px 12px rgba(201, 111, 74, 0.3)' : 'none'
                  }}
                />
              </button>
            </div>
          ))}
        </div>
        
        {/* Progress indicator */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
          <motion.div 
            className="rounded-full bg-white px-3 py-1.5 shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-xs font-medium text-[#2F4A3C]">
              {scrollProgress}% explored
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}