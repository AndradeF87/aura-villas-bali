'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function OwnerHero() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/luxury-villa-pool.jpg"
          alt="Luxury Bali Villa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-terracotta">★</span>
            <span className="text-white text-sm">Trusted by 50+ Villa Owners in Bali</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
            Your Villa Deserves More Than Management—
            <span className="text-terracotta block mt-2">It Deserves AURA</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            We transform Bali villas into thriving hospitality businesses through 
            selective partnerships, heartfelt service, and AI-powered marketing
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-white">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Rp 500M+ Revenue Generated</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>85% Average Occupancy</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>4.9★ Guest Rating</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/property-management"
              className="px-8 py-4 bg-terracotta text-white font-semibold rounded-lg hover:bg-terracotta-dark transition-all transform hover:scale-105 shadow-xl"
            >
              Start Your Villa Transformation
            </Link>
            <button
              onClick={() => setShowVideo(true)}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/30 flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Watch Success Stories
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
          <div className="relative max-w-4xl w-full aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-terracotta"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center justify-center h-full text-white">
              <p>Video content would go here</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}