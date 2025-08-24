'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function PropertyManagementHero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-deep-green to-deep-green/90 overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="relative container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left Content - 3/5 width */}
          <div className="w-full lg:w-3/5">
            {/* Selective Badge */}
            <div className="inline-block mb-6">
              <span className="bg-terracotta/20 text-terracotta px-4 py-2 rounded-full text-sm font-medium">
                Selective Partnership • Limited Availability
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              We Partner with Select Bali Villa Owners
              <span className="block text-terracotta mt-2">
                To Tell Each Villa's Story
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Not every property is right for AURA, and that's by design. 
              We select few villas to ensure each receives the attention, care and results it deserves.
            </p>

            {/* Trust Points */}
            <div className="flex flex-wrap gap-6 mb-10 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                <span>Founded 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                <span>3 Properties Under Management</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                <span>8 Properties by Jan 2026</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#qualification"
                className="px-8 py-4 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-all duration-300 text-center"
              >
                See If You Qualify
              </a>
              <a
                href="#tiers"
                className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 border border-white/30 text-center"
              >
                View Service Tiers
              </a>
            </div>
          </div>

          {/* Right Images - 3 Side-by-Side Vertical 9:16 Layout with Parallax */}
          <div className="hidden lg:flex w-2/5 gap-4 items-center justify-center">
            {/* Image 1 - Slowest parallax */}
            <div 
              className="relative w-1/3 aspect-[9/16] rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ease-out opacity-0 animate-fadeInRight animation-delay-200 group"
              style={{ transform: `translateY(${scrollY * 0.05}px)` }}
            >
              <Image
                src="/images/Homepage-SUYAI-villa.webp"
                alt="SUYAI Villa"
                width={360}
                height={640}
                className="object-cover w-full h-full transition-all duration-500 group-hover:scale-[1.02] group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Image 2 - Medium parallax, slightly elevated */}
            <div 
              className="relative w-1/3 aspect-[9/16] rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ease-out opacity-0 animate-fadeInRight animation-delay-400 -mt-8 group"
              style={{ transform: `translateY(${scrollY * 0.08}px)` }}
            >
              <Image
                src="/images/Homepage-SUYAI-villa.webp"
                alt="Luxury Villa Pool"
                width={360}
                height={640}
                className="object-cover w-full h-full transition-all duration-500 group-hover:scale-[1.02] group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Image 3 - Fastest parallax */}
            <div 
              className="relative w-1/3 aspect-[9/16] rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ease-out opacity-0 animate-fadeInRight animation-delay-600 group"
              style={{ transform: `translateY(${scrollY * 0.11}px)` }}
            >
              <Image
                src="/images/Homepage-SUYAI-villa.webp"
                alt="Villa Interior"
                width={360}
                height={640}
                className="object-cover w-full h-full transition-all duration-500 group-hover:scale-[1.02] group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}