'use client'

import { Home, Camera, Megaphone, TrendingUp } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description: "We learn about your villa, your goals, and what makes your property special. Not every villa is right for AURA—and that's okay.",
    icon: Home,
    duration: '30-min conversation',
    color: 'bg-sand-beige'
  },
  {
    number: '02',
    title: 'Villa Storytelling',
    description: 'Our team visits your property to capture its essence. Professional photography, unique positioning, and authentic storytelling that resonates with the right guests.',
    icon: Camera,
    duration: '2-3 days on-site',
    color: 'bg-warm-ivory'
  },
  {
    number: '03',
    title: 'Launch & List',
    description: 'We activate your presence across premium channels, optimize your pricing, and start accepting bookings. Your villa gets the attention it deserves.',
    icon: Megaphone,
    duration: '7-10 days to go live',
    color: 'bg-sand-beige'
  },
  {
    number: '04',
    title: 'Optimize & Grow',
    description: "Using real data and guest feedback, we continuously refine your villa's positioning, pricing, and guest experience to maximize both revenue and satisfaction.",
    icon: TrendingUp,
    duration: 'Ongoing partnership',
    color: 'bg-warm-ivory'
  }
]

// Individual step component with scroll-based zoom
function WorkStep({ step, index, isLast }: { step: typeof steps[0], index: number, isLast: boolean }) {
  const stepRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start end", "end start"]
  })

  // Calculate scale based on distance from center
  const scale = useTransform(scrollYProgress, 
    [0, 0.3, 0.5, 0.7, 1],
    [0.85, 0.95, 1.1, 0.95, 0.85]
  )

  // Also scale the icon separately for more dramatic effect
  const iconScale = useTransform(scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1], 
    [0.8, 0.9, 1.2, 0.9, 0.8]
  )

  // Opacity animation
  const opacity = useTransform(scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0.5, 0.8, 1, 1, 0.8, 0.5]
  )

  const Icon = step.icon

  return (
    <motion.div ref={stepRef} className="relative">
      {/* Connector Line - centered at icon position */}
      {!isLast && (
        <div className="hidden md:block absolute left-12 top-24 w-0.5 h-24 bg-white/20"></div>
      )}

      {/* Step Card */}
      <motion.div 
        className="flex flex-col md:flex-row gap-6 mb-8 group"
        style={{ scale, opacity }}
      >
        {/* Number & Icon */}
        <div className="flex md:block items-center gap-4 md:gap-0">
          <motion.div 
            className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center`}
            style={{ scale: iconScale }}
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-10 h-10 text-terracotta" />
          </motion.div>
          <div className="md:hidden">
            <div className="text-terracotta font-bold text-xl mb-1">{step.number}</div>
            <h3 className="font-serif text-2xl text-white">{step.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 md:ml-8">
          <div className="hidden md:flex items-center gap-4 mb-3">
            <span className="text-terracotta font-bold text-xl">{step.number}</span>
            <h3 className="font-serif text-3xl text-white">{step.title}</h3>
          </div>
          <p className="text-white/70 mb-3 text-lg leading-relaxed">
            {step.description}
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur rounded-full">
            <span className="text-sm font-medium text-white/80">
              Timeline: {step.duration}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function HowWeWork() {
  return (
    <section className="py-20 bg-deep-green">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            How We Work Together
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            A simple, transparent process designed to get your villa performing 
            at its best—without the complexity.
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <WorkStep 
              key={step.number} 
              step={step} 
              index={index} 
              isLast={index === steps.length - 1} 
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-white/10 backdrop-blur rounded-2xl text-white border border-white/20">
          <h3 className="font-serif text-3xl mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
            We're currently accepting applications for our 2025 cohort. 
            Only 6 spots remaining for properties that align with our vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#qualification"
              className="px-8 py-4 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta/90 transition-all duration-300"
            >
              Check Your Eligibility
            </a>
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/20 backdrop-blur text-white rounded-full font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              Schedule Discovery Call
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}