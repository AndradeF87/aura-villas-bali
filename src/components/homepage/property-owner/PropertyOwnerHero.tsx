import React from 'react';

interface PropertyOwnerHeroProps {
  className?: string;
}

const PropertyOwnerHero: React.FC<PropertyOwnerHeroProps> = ({ className = '' }) => {
  return (
    <section className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 ${className}`}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-black/40">
        <img 
          src="/images/bali-villa-luxury.jpg" 
          alt="Luxury Bali villa" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      
      <div className="relative container mx-auto px-6 max-w-6xl">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse"></span>
            Premium Property Management in Bali
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Turn Your Bali Villa Into a 
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Profitable Investment
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join 200+ property owners earning $15,000+ monthly through our premium 
            property management and guest experience platform.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
              Calculate Your Earnings
            </button>
            <button className="border-2 border-white/30 hover:border-amber-400 text-white hover:text-amber-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all backdrop-blur-sm">
              Schedule Consultation
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm text-gray-400 mb-4">Trusted by villa owners across Bali</p>
            <div className="flex justify-center items-center space-x-8 opacity-70">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">200+</div>
                <div className="text-xs text-gray-400">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">95%</div>
                <div className="text-xs text-gray-400">Occupancy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">$15K+</div>
                <div className="text-xs text-gray-400">Avg Monthly</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyOwnerHero;