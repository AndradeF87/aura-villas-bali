'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  
  // Check if we're on the property management page
  const isPropertyManagement = pathname === '/property-management'
  
  // Pages that should have a solid navigation bar (no hero image)
  const solidNavPages = ['/contact', '/experiences', '/destinations']
  const needsSolidNav = solidNavPages.some(page => pathname?.startsWith(page))

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Guest-focused navigation
  const navLinks = [
    { 
      href: '/villas', 
      label: 'Our Villas',
      dropdown: [
        { href: '/villas', label: 'All Villas' },
        { href: '/villas/uluwatu', label: 'Uluwatu (2 properties)' },
        { href: '/villas/canggu', label: 'Canggu (Coming Soon)' },
        { href: '/villas/seminyak', label: 'Seminyak (Coming Soon)' },
      ]
    },
    { 
      href: '/destinations', 
      label: 'Destinations',
      dropdown: [
        { href: '/destinations/uluwatu', label: 'Uluwatu' },
        { href: '/destinations/canggu', label: 'Canggu' },
        { href: '/destinations/seminyak', label: 'Seminyak' },
      ]
    },
    { href: '/experiences', label: 'Experiences' },
    { href: '/contact', label: 'Contact' },
  ]

  // Secondary link for property owners
  const ownerLink = { href: '/property-management', label: 'Property Management' }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || needsSolidNav
        ? 'bg-white shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className={`transition-all duration-300 ${
              isScrolled || needsSolidNav ? 'text-terracotta' : 'text-white drop-shadow-lg'
            }`}>
              <span className="font-serif text-3xl font-bold tracking-wider group-hover:text-terracotta-light transition-colors">
                AURA
              </span>
              <span className="text-xs tracking-[0.3em] uppercase mt-1 block">
                Villas Bali
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                {link.dropdown ? (
                  <>
                    <button
                      className={`flex items-center space-x-1 transition-all duration-300 font-medium hover:text-terracotta ${
                        isScrolled || needsSolidNav ? 'text-deep-green' : 'text-white drop-shadow-lg'
                      }`}
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
                      activeDropdown === link.label 
                        ? 'opacity-100 translate-y-0 visible' 
                        : 'opacity-0 -translate-y-2 invisible'
                    }`}
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-3 text-deep-green hover:bg-sand-light hover:text-terracotta transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`transition-all duration-300 font-medium hover:text-terracotta ${
                      isScrolled || needsSolidNav ? 'text-deep-green' : 'text-white drop-shadow-lg'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Divider */}
            <div className={`h-6 w-px ${
              isScrolled || needsSolidNav ? 'bg-gray-300' : 'bg-white/30'
            }`} />
            
            {/* Owner Link with Glass Effect */}
            <Link
              href={ownerLink.href}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                isScrolled || needsSolidNav
                  ? 'bg-terracotta/10 text-terracotta border border-terracotta/20 hover:bg-terracotta hover:text-white'
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 drop-shadow-lg'
              }`}
            >
              {ownerLink.label}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled || needsSolidNav ? 'text-deep-green' : 'text-white drop-shadow-lg'
            }`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 top-20 bg-white transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <div key={link.href}>
              {link.dropdown ? (
                <div>
                  <button
                    className="w-full text-left px-4 py-3 text-deep-green font-medium flex items-center justify-between"
                    onClick={() => setActiveDropdown(activeDropdown === link.label ? null : link.label)}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      activeDropdown === link.label ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {activeDropdown === link.label && (
                    <div className="pl-8 space-y-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block py-2 text-deep-green/70 hover:text-terracotta"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-deep-green font-medium hover:text-terracotta transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          
          <div className="pt-4 px-4 space-y-3">
            <Link
              href={ownerLink.href}
              className="block w-full text-center px-6 py-3 bg-terracotta/10 text-terracotta border border-terracotta/20 rounded-full font-medium hover:bg-terracotta hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {ownerLink.label}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}