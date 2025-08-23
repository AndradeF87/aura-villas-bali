'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GlassSearchBar } from './GlassSearchBar'

export function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <Image
          src="/images/Homepage-SUYAI-villa.webp"
          alt="SUYAI Boutique Villa in Bali"
          fill
          className={`object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          priority
        />
        
        {/* Video Background (loads after image) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* <source src="/videos/bali-villa-hero.mp4" type="video/mp4" /> */}
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        {/* Main Headline */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 animate-fade-in-up opacity-0">
          Life is all about creating good memories
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 opacity-0">
          Discover our exclusive collection of luxury villas where your story begins
        </p>

        {/* Search Bar */}
        <div className="w-full animate-fade-in-up animation-delay-400 opacity-0">
          <GlassSearchBar />
        </div>

        {/* Trust Indicators for Guests */}
        <div className="flex justify-center gap-8 md:gap-16 mt-16 animate-fade-in-up animation-delay-600 opacity-0">
          <div>
            <div className="text-3xl md:text-4xl font-bold">2</div>
            <div className="text-sm md:text-base opacity-90">Boutique Villas</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold">9.5+</div>
            <div className="text-sm md:text-base opacity-90">Guest Rating</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold">24/7</div>
            <div className="text-sm md:text-base opacity-90">Concierge Service</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white opacity-75"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}