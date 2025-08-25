'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Testimonial {
  id: number
  name: string
  villaName: string
  location: string
  quote: string
  beforeRevenue: string
  afterRevenue: string
  increasePercent: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emma & David Thompson",
    villaName: "Tropical Paradise",
    location: "Seminyak",
    quote: "We live abroad and AURA handles everything perfectly. It's like having a trusted partner who cares about our property as much as we do.",
    beforeRevenue: "Rp 180M/year",
    afterRevenue: "Rp 480M/year",
    increasePercent: 167,
    image: "/images/villa-tropical-paradise.jpg"
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    villaName: "Ocean View Estate",
    location: "Uluwatu",
    quote: "AURA transformed our villa from a personal retreat into a profitable investment. Their attention to detail is exceptional.",
    beforeRevenue: "Rp 220M/year",
    afterRevenue: "Rp 540M/year",
    increasePercent: 145,
    image: "/images/villa-ocean-view.jpg"
  },
  {
    id: 3,
    name: "James & Linda Chen",
    villaName: "Sunset Haven",
    location: "Canggu",
    quote: "The personalized service and strategic marketing have exceeded our expectations. Our occupancy rate has never been higher.",
    beforeRevenue: "Rp 150M/year",
    afterRevenue: "Rp 420M/year",
    increasePercent: 180,
    image: "/images/villa-sunset-haven.jpg"
  }
]

export function SuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTestimonial = testimonials[activeIndex]

  return (
    <section className="py-24 bg-[#F8F4F0]">
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
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            key={activeTestimonial.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h3 className="text-3xl font-serif text-[#2F4A3C] mb-2">
                {activeTestimonial.name}
              </h3>
              <p className="text-gray-600">
                {activeTestimonial.villaName}, {activeTestimonial.location}
              </p>
            </div>

            <blockquote className="text-xl text-gray-700 italic mb-12">
              "{activeTestimonial.quote}"
            </blockquote>

            {/* Revenue Results */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-[#2F4A3C]">Revenue Results</h4>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Before AURA</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {activeTestimonial.beforeRevenue}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">With AURA</p>
                  <p className="text-2xl font-bold text-[#C96F4A]">
                    {activeTestimonial.afterRevenue}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-3xl font-bold text-[#2F4A3C]">
                  {activeTestimonial.increasePercent}% revenue increase
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            className="relative h-[500px] bg-gray-200 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              Villa Image
            </div>
            {/* Uncomment when images are available
            <Image
              src={activeTestimonial.image}
              alt={activeTestimonial.villaName}
              fill
              className="object-cover"
            />
            */}
          </motion.div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mt-12">
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