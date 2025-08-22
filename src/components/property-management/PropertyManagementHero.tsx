'use client'

export function PropertyManagementHero() {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-deep-green to-deep-green/90">
      <div className="absolute inset-0 bg-black/10" />
      
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl">
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
            We work with a limited number of exceptional villas to ensure 
            each one gets the attention, care, and results it deserves.
          </p>

          {/* Trust Points */}
          <div className="flex flex-wrap gap-6 mb-10 text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-terracotta rounded-full"></div>
              <span>Founded 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-terracotta rounded-full"></div>
              <span>2 Properties Under Management</span>
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
      </div>
    </section>
  )
}