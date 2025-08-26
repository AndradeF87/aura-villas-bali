'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

interface Testimonial {
  id: number
  name: string
  villaName: string
  location: string
  quote: string
  beforeOccupancy: string
  afterOccupancy: string
  increasePercent: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Yanina & Fede",
    villaName: "SUYAI Villas Bali",
    location: "Uluwatu",
    quote: "We live abroad and AURA handles everything perfectly. It's like having a trusted partner who cares about our property as much as we do.",
    beforeOccupancy: "62%",
    afterOccupancy: "74%",
    increasePercent: 67,
    image: "/images/villas/SUYAIVillaUluwatu/SUYAI-Villa_Pool.webp"
  },
  {
    id: 2,
    name: "Agung Permana",
    villaName: "Manager, ONAYA Bali Resort",
    location: "Uluwatu",
    quote: "At the start our expectations with AURA was that they would help us improve our occupancy and increase our revenue, but they didn't just do that, they come to us with constant ideas on how we can improve our service and provide memorable moments to our Guests. The entire team loves to work with them, it was an amazing addition to us.",
    beforeOccupancy: "40%",
    afterOccupancy: "82%",
    increasePercent: 27,
    image: "/images/villas/ONAYABaliResort/ONAYA_Pool.webp"
  }
]

export function SuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTestimonial = testimonials[activeIndex]
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  
  // Handle swipe gestures
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50
    
    if (info.offset.x > swipeThreshold && activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    } else if (info.offset.x < -swipeThreshold && activeIndex < testimonials.length - 1) {
      setActiveIndex(activeIndex + 1)
    }
    
    // Reset position
    animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 })
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-serif text-[#2F4A3C] mb-4">
            Success Stories from Villa Owners Like You
          </h2>
          <p className="text-xl text-gray-600">
            Real results from real property owners who trusted AURA with their investment.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center overflow-hidden"
          ref={containerRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ x }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {/* Left side - Content */}
          <motion.div
            key={activeTestimonial.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Navigation Dots - Mobile Only at Top */}
            <div className="flex md:hidden justify-center gap-3 mb-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-[#C96F4A] w-6' 
                      : 'bg-gray-300'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="mb-6 md:mb-8">
              <h3 className="text-xl md:text-3xl font-serif text-[#2F4A3C] mb-1 md:mb-2">
                {activeTestimonial.name}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                {activeTestimonial.villaName}, {activeTestimonial.location}
              </p>
            </div>

            <blockquote className="text-base md:text-xl text-gray-700 italic mb-8 md:mb-12">
              "{activeTestimonial.quote}"
            </blockquote>

            {/* Occupancy Results */}
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-base md:text-lg font-bold text-[#2F4A3C]">Occupancy Results</h4>
              
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div>
                  <p className="text-xs md:text-sm text-gray-500 mb-1">Before AURA</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-700">
                    {activeTestimonial.beforeOccupancy}
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500 mb-1">With AURA</p>
                  <p className="text-xl md:text-2xl font-bold text-[#C96F4A]">
                    {activeTestimonial.afterOccupancy}
                  </p>
                </div>
              </div>

              <div className="pt-4 md:pt-6 border-t border-gray-200">
                <p className="text-2xl md:text-3xl font-bold text-[#2F4A3C]">
                  {activeTestimonial.increasePercent}% revenue increase
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            className="relative h-[500px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 25px -5px rgba(0, 0, 0, 0.15)'
            }}
          >
            <Image
              src={activeTestimonial.image}
              alt={activeTestimonial.villaName}
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Navigation Dots - Desktop Only */}
        <div className="hidden md:flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-[#C96F4A] w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}