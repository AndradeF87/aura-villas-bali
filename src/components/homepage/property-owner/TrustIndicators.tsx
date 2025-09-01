import React from 'react';

interface MetricCard {
  icon: string;
  value: string;
  label: string;
  description: string;
  color: string;
}

interface TrustIndicatorsProps {
  className?: string;
}

const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ className = '' }) => {
  const metrics: MetricCard[] = [
    {
      icon: '📈',
      value: '85%',
      label: 'Average Occupancy Rate',
      description: '25% above Bali average',
      color: 'text-green-500'
    },
    {
      icon: '💰',
      value: 'Rp 500M+',
      label: 'Annual Revenue Generated',
      description: 'For our villa partners',
      color: 'text-amber-500'
    },
    {
      icon: '⭐',
      value: '4.9★',
      label: 'Guest Satisfaction',
      description: 'From 2,000+ verified reviews',
      color: 'text-blue-500'
    },
    {
      icon: '🏠',
      value: '50+',
      label: 'Elite Villas Managed',
      description: 'Across Uluwatu, Canggu & Seminyak',
      color: 'text-purple-500'
    }
  ];

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Proven Results That Speak for Themselves
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our property owners consistently outperform the market with higher occupancy rates, 
            premium pricing, and exceptional guest experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="mb-4">
                  <div className="text-5xl mb-4">
                    {metric.icon}
                  </div>
                </div>
                
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {metric.value}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {metric.label}
                </h3>
                
                <p className="text-sm text-gray-600">
                  {metric.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Social Proof */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">Trusted by property owners from:</p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Canggu</div>
            <div className="text-2xl font-bold text-gray-400">Seminyak</div>
            <div className="text-2xl font-bold text-gray-400">Ubud</div>
            <div className="text-2xl font-bold text-gray-400">Uluwatu</div>
            <div className="text-2xl font-bold text-gray-400">Sanur</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;