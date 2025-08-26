'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Check, 
  X, 
  ChevronDown,
  ChevronUp,
  Star,
  Sparkles,
  TrendingUp,
  Globe,
  Users,
  MessageSquare,
  Search,
  Palette,
  Camera,
  BarChart,
  Shield,
  Home,
  Calendar,
  HeadphonesIcon,
  Calculator,
  FileText,
  Award
} from 'lucide-react'

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<'marketing' | 'operations'>('operations')
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')

  // Operational Packages
  const operationalPackages = [
    {
      id: 'essential',
      name: 'Essential Operations',
      commission: '15%',
      description: 'Professional day-to-day operations without fixed costs',
      recommended: false,
      features: [
        { name: 'Daily Housekeeping Supervision', included: true },
        { name: 'Guest Check-in & Check-out Assistance', included: true },
        { name: 'Guest Support (8 AM - 8 PM)', included: true },
        { name: 'Maintenance Coordination', included: true },
        { name: 'Pool & Garden Scheduling', included: true },
        { name: 'Booking Calendar Management', included: true },
        { name: 'Monthly Stock Inventory', included: true },
        { name: 'Laundry Coordination', included: true },
        { name: 'Monthly Owner Report', included: true },
        { name: 'Basic Amenities Restocking', included: true },
        { name: 'Digital Guest Guidebook', included: true },
        { name: 'Monthly Preventive Maintenance', included: true },
        { name: 'Utility Bills Payment Assistance', included: true },
        { name: '24/7 Guest Support', included: false },
        { name: 'In-Villa Welcome Service', included: false },
        { name: 'Concierge Services', included: false },
        { name: 'Weekly Villa Inspections', included: false },
        { name: 'Dedicated Operations Manager', included: false },
        { name: 'Direct Staff Management', included: false },
        { name: 'Tax Reporting & Compliance', included: false }
      ]
    },
    {
      id: 'premium',
      name: 'Premium Operations',
      commission: '18%',
      description: 'Premium guest experiences with performance focus',
      recommended: true,
      features: [
        { name: 'Daily Housekeeping Supervision', included: true },
        { name: 'Guest Check-in & Check-out Assistance', included: true },
        { name: '24/7 Guest Support', included: true },
        { name: 'Maintenance Coordination', included: true },
        { name: 'Pool & Garden Scheduling', included: true },
        { name: 'Booking Calendar Management', included: true },
        { name: 'Monthly Stock Inventory', included: true },
        { name: 'Laundry Coordination', included: true },
        { name: 'Monthly Owner Report', included: true },
        { name: 'Basic Amenities Restocking', included: true },
        { name: 'Digital Guest Guidebook', included: true },
        { name: 'Monthly Preventive Maintenance', included: true },
        { name: 'Utility Bills Payment Assistance', included: true },
        { name: 'In-Villa Welcome Service', included: true },
        { name: 'Concierge Services', included: true },
        { name: 'Weekly Villa Inspections', included: true },
        { name: 'Dedicated Operations Manager', included: true },
        { name: 'Priority Maintenance Response', included: true },
        { name: 'Direct Staff Management', included: false },
        { name: 'Tax Reporting & Compliance', included: false }
      ]
    },
    {
      id: 'boutique',
      name: 'Boutique Full',
      commission: '23%',
      description: 'Fully hands-off, enterprise-grade experience',
      recommended: false,
      features: [
        { name: 'Daily Housekeeping Supervision', included: true },
        { name: 'Guest Check-in & Check-out Assistance', included: true },
        { name: '24/7 Guest Support', included: true },
        { name: 'Maintenance Coordination', included: true },
        { name: 'Pool & Garden Scheduling', included: true },
        { name: 'Booking Calendar Management', included: true },
        { name: 'Monthly Stock Inventory', included: true },
        { name: 'Laundry Coordination', included: true },
        { name: 'Monthly Owner Report', included: true },
        { name: 'Basic Amenities Restocking', included: true },
        { name: 'Digital Guest Guidebook', included: true },
        { name: 'Monthly Preventive Maintenance', included: true },
        { name: 'Utility Bills Payment Assistance', included: true },
        { name: 'In-Villa Welcome Service', included: true },
        { name: 'Concierge Services', included: true },
        { name: 'Weekly Villa Inspections', included: true },
        { name: 'Dedicated Operations Manager', included: true },
        { name: 'Priority Maintenance Response', included: true },
        { name: 'Direct Staff Management', included: true },
        { name: 'Tax Reporting & Compliance', included: true }
      ]
    }
  ]

  // Marketing Packages
  const marketingPackages = {
    strategy: {
      name: 'Strategic Brand Growth',
      description: 'Brand strategy foundations',
      packages: [
        {
          id: 'strategy-basic',
          name: 'Basic',
          price: 10500000,
          oneTime: true,
          features: [
            { name: 'Brand positioning', included: true },
            { name: 'Target audience definition', included: true },
            { name: 'Unique Selling Propositions', included: true },
            { name: 'Marketing channels recommendations', included: true },
            { name: 'Launch roadmap', included: true },
            { name: 'Brand tone of voice', included: true },
            { name: 'Messaging pillars', included: true },
            { name: 'Brand story', included: false },
            { name: 'Customer personas', included: false },
            { name: 'Competitor analysis', included: false },
            { name: 'Pricing strategy', included: false },
            { name: 'Content strategy', included: false },
            { name: 'KPI & goal mapping', included: false },
            { name: 'Marketing funnel', included: false }
          ]
        },
        {
          id: 'strategy-premium',
          name: 'Premium',
          price: 13000000,
          oneTime: true,
          recommended: true,
          features: [
            { name: 'Brand positioning', included: true },
            { name: 'Target audience definition', included: true },
            { name: 'Unique Selling Propositions', included: true },
            { name: 'Marketing channels recommendations', included: true },
            { name: 'Launch roadmap', included: true },
            { name: 'Brand tone of voice', included: true },
            { name: 'Messaging pillars', included: true },
            { name: 'Brand story', included: true },
            { name: 'Customer personas', included: true },
            { name: 'Competitor analysis', included: true },
            { name: 'Pricing strategy', included: true },
            { name: 'Content strategy', included: true },
            { name: 'KPI & goal mapping', included: true },
            { name: 'Marketing funnel', included: true }
          ]
        }
      ]
    },
    website: {
      name: 'Web Presence Essentials',
      description: 'Design & build a marketing website with core SEO',
      packages: [
        {
          id: 'website-basic',
          name: 'Basic',
          price: 14500000,
          oneTime: true,
          features: [
            { name: 'Semi-custom template design', included: true },
            { name: 'Mobile-responsive layout', included: true },
            { name: 'Up to 8 core pages', included: true },
            { name: 'Booking engine integration', included: true },
            { name: 'Photo & video gallery', included: true },
            { name: 'Contact form with notifications', included: true },
            { name: 'Speed optimization', included: true },
            { name: 'Basic SEO structure', included: true },
            { name: '3 months maintenance', included: true },
            { name: 'Blog section', included: false },
            { name: 'Daily/weekly backup setup', included: false },
            { name: 'Website hosting (1 year)', included: false },
            { name: 'Google Analytics & Maps', included: false },
            { name: 'Live chat integration', included: false },
            { name: 'Sticky header/smart navigation', included: false }
          ]
        },
        {
          id: 'website-premium',
          name: 'Premium',
          price: 22700000,
          oneTime: true,
          recommended: true,
          features: [
            { name: 'Custom design', included: true },
            { name: 'Mobile-responsive layout', included: true },
            { name: 'Up to 12 core pages', included: true },
            { name: 'Booking engine integration', included: true },
            { name: 'Photo & video gallery', included: true },
            { name: 'Contact form with notifications', included: true },
            { name: 'Speed optimization', included: true },
            { name: 'Basic SEO structure', included: true },
            { name: '3 months maintenance', included: true },
            { name: 'Blog section', included: true },
            { name: 'Daily/weekly backup setup', included: true },
            { name: 'Website hosting (1 year)', included: true },
            { name: 'Google Analytics & Maps', included: true },
            { name: 'Live chat integration', included: true },
            { name: 'Sticky header/smart navigation', included: true }
          ]
        }
      ]
    },
    maintenance: {
      name: 'Get Found, Get Booked',
      description: 'Keep site fast, secure & conversion-ready',
      packages: [
        {
          id: 'maintenance-basic',
          name: 'Basic',
          price: 6000000,
          features: [
            { name: 'Website maintenance & support', included: true },
            { name: 'Technical SEO (sitemap, robots)', included: true },
            { name: 'Image & performance optimization', included: true },
            { name: 'On-page optimization', included: true },
            { name: 'Google Search Console monitoring', included: true },
            { name: 'Local SEO management', included: true },
            { name: 'SEO copywriting', included: true },
            { name: '2 blog posts per month', included: true },
            { name: 'Roadmap planning', included: false },
            { name: 'Monthly performance dashboard', included: false },
            { name: 'Website edits (1 per month)', included: false },
            { name: 'SEO health audit', included: false }
          ]
        },
        {
          id: 'maintenance-premium',
          name: 'Premium',
          price: 7500000,
          recommended: true,
          features: [
            { name: 'Website maintenance & support', included: true },
            { name: 'Technical SEO (sitemap, robots)', included: true },
            { name: 'Image & performance optimization', included: true },
            { name: 'On-page optimization', included: true },
            { name: 'Google Search Console monitoring', included: true },
            { name: 'Local SEO management', included: true },
            { name: 'SEO copywriting', included: true },
            { name: '4 blog posts per month', included: true },
            { name: 'Roadmap planning', included: true },
            { name: 'Monthly performance dashboard', included: true },
            { name: 'Website edits (1 per month)', included: true },
            { name: 'SEO health audit', included: true }
          ]
        }
      ]
    },
    social: {
      name: 'Social Engagement Suite',
      description: 'Content creation & community management',
      packages: [
        {
          id: 'social-basic',
          name: 'Basic',
          price: 6500000,
          features: [
            { name: 'Monthly content production', included: true },
            { name: '2 feed posts per week', included: true },
            { name: '2 reels per month', included: true },
            { name: 'Post copywriting aligned with brand', included: true },
            { name: 'Instagram & Facebook optimization', included: true },
            { name: 'Ad campaign management', included: true },
            { name: 'Engagement handling', included: true },
            { name: 'Seasonal greetings & graphics', included: true },
            { name: 'Performance report (monthly)', included: true },
            { name: 'Google Maps recommendation lists', included: false },
            { name: 'Drone video (one-time)', included: false },
            { name: 'Pinterest pins', included: false },
            { name: 'Campaign strategy', included: false },
            { name: 'Content strategy', included: false }
          ]
        },
        {
          id: 'social-premium',
          name: 'Premium',
          price: 8000000,
          recommended: true,
          features: [
            { name: 'Monthly content production', included: true },
            { name: '3 feed posts per week', included: true },
            { name: '3 reels per month', included: true },
            { name: 'Post copywriting aligned with brand', included: true },
            { name: 'Instagram & Facebook optimization', included: true },
            { name: 'Ad campaign management', included: true },
            { name: 'Engagement handling', included: true },
            { name: 'Seasonal greetings & graphics', included: true },
            { name: 'Performance report (monthly)', included: true },
            { name: 'Google Maps recommendation lists', included: true },
            { name: 'Drone video (one-time)', included: true },
            { name: 'Pinterest pins', included: true },
            { name: 'Campaign strategy', included: true },
            { name: 'Content strategy', included: true }
          ]
        }
      ]
    }
  }

  const formatCurrency = (amount: number) => {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(amount)
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-sand-light flex items-center justify-center overflow-hidden">
        <div className="relative z-20 text-center text-deep-green max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl mb-4">
            Transparent Pricing
          </h1>
          <p className="text-xl sm:text-2xl text-deep-green/80">
            Choose the Perfect Package for Your Villa's Success
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-deep-green/80">
            <Calculator className="w-5 h-5" />
            <span>Commission-Based & Fixed Pricing Options</span>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-0 z-40 bg-white border-b border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="inline-flex rounded-full bg-sand-light p-1 my-6">
              <button
                onClick={() => setActiveTab('operations')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'operations'
                    ? 'bg-deep-green text-white'
                    : 'text-deep-green hover:text-deep-green/70'
                }`}
              >
                <Home className="w-5 h-5 inline mr-2" />
                Operations Management
              </button>
              <button
                onClick={() => setActiveTab('marketing')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === 'marketing'
                    ? 'bg-deep-green text-white'
                    : 'text-deep-green hover:text-deep-green/70'
                }`}
              >
                <TrendingUp className="w-5 h-5 inline mr-2" />
                Marketing & Growth
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Packages */}
      {activeTab === 'operations' && (
        <section className="py-20 bg-gradient-to-b from-white to-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl text-deep-green mb-4">
                Villa Operations Management
              </h2>
              <p className="text-lg text-deep-green/70 max-w-3xl mx-auto">
                End-to-end villa management with transparent commission-based pricing. 
                From daily operations to full financial transparency.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {operationalPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                    pkg.recommended ? 'ring-2 ring-terracotta transform scale-105' : ''
                  }`}
                >
                  {pkg.recommended && (
                    <div className="absolute top-0 right-0 bg-terracotta text-white px-4 py-1 rounded-bl-xl text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-8">
                    <h3 className="font-serif text-2xl text-deep-green mb-2">
                      {pkg.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-terracotta">{pkg.commission}</span>
                      <span className="text-deep-green/60 ml-2">of gross revenue</span>
                    </div>
                    <p className="text-deep-green/70 mb-6">
                      {pkg.description}
                    </p>

                    {/* Key Features */}
                    <ul className="space-y-3 mb-8">
                      {pkg.features.slice(0, 5).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm ${feature.included ? 'text-deep-green' : 'text-gray-400'}`}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setExpandedPackage(expandedPackage === pkg.id ? null : pkg.id)}
                      className="text-terracotta text-sm font-medium hover:text-terracotta-dark transition-colors mb-6 flex items-center gap-1"
                    >
                      {expandedPackage === pkg.id ? 'Show Less' : 'Show All Features'}
                      {expandedPackage === pkg.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {/* Expanded Features */}
                    {expandedPackage === pkg.id && (
                      <ul className="space-y-3 mb-8 border-t border-sand pt-6">
                        {pkg.features.slice(5).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            {feature.included ? (
                              <Check className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                            ) : (
                              <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                            )}
                            <span className={`text-sm ${feature.included ? 'text-deep-green' : 'text-gray-400'}`}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href="/contact"
                      className={`block w-full text-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        pkg.recommended
                          ? 'bg-terracotta text-white hover:bg-terracotta-dark'
                          : 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white'
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="bg-deep-green rounded-2xl p-8 text-white">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">100+</div>
                  <div className="text-white/80">Villas Managed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="text-white/80">Occupancy Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">50%</div>
                  <div className="text-white/80">Revenue Increase</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">4.9★</div>
                  <div className="text-white/80">Guest Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Marketing Packages */}
      {activeTab === 'marketing' && (
        <section className="py-20 bg-gradient-to-b from-white to-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Strategy Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="flex justify-center items-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8 text-terracotta" />
                  <h2 className="font-serif text-4xl text-deep-green">
                    {marketingPackages.strategy.name}
                  </h2>
                </div>
                <p className="text-lg text-deep-green/70">
                  {marketingPackages.strategy.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {marketingPackages.strategy.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                      pkg.recommended ? 'ring-2 ring-terracotta' : ''
                    }`}
                  >
                    {pkg.recommended && (
                      <div className="absolute -top-4 right-8 bg-terracotta text-white px-4 py-1 rounded-full text-sm font-medium">
                        Recommended
                      </div>
                    )}
                    <h3 className="font-serif text-2xl text-deep-green mb-4">{pkg.name}</h3>
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-terracotta">
                        {formatCurrency(pkg.price)}
                      </span>
                      <span className="text-deep-green/60 ml-2">one time</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm ${feature.included ? 'text-deep-green' : 'text-gray-400'}`}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={`block w-full text-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        pkg.recommended
                          ? 'bg-terracotta text-white hover:bg-terracotta-dark'
                          : 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white'
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Website Section */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="flex justify-center items-center gap-3 mb-4">
                  <Globe className="w-8 h-8 text-terracotta" />
                  <h2 className="font-serif text-4xl text-deep-green">
                    {marketingPackages.website.name}
                  </h2>
                </div>
                <p className="text-lg text-deep-green/70">
                  {marketingPackages.website.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {marketingPackages.website.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                      pkg.recommended ? 'ring-2 ring-terracotta' : ''
                    }`}
                  >
                    {pkg.recommended && (
                      <div className="absolute -top-4 right-8 bg-terracotta text-white px-4 py-1 rounded-full text-sm font-medium">
                        Recommended
                      </div>
                    )}
                    <h3 className="font-serif text-2xl text-deep-green mb-4">{pkg.name}</h3>
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-terracotta">
                        {formatCurrency(pkg.price)}
                      </span>
                      <span className="text-deep-green/60 ml-2">one time</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm ${feature.included ? 'text-deep-green' : 'text-gray-400'}`}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className={`block w-full text-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        pkg.recommended
                          ? 'bg-terracotta text-white hover:bg-terracotta-dark'
                          : 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white'
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Maintenance & Social Grid */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Maintenance Section */}
              <div>
                <div className="text-center mb-8">
                  <div className="flex justify-center items-center gap-3 mb-4">
                    <Search className="w-6 h-6 text-terracotta" />
                    <h3 className="font-serif text-3xl text-deep-green">
                      {marketingPackages.maintenance.name}
                    </h3>
                  </div>
                  <p className="text-deep-green/70">
                    {marketingPackages.maintenance.description}
                  </p>
                </div>

                <div className="space-y-6">
                  {marketingPackages.maintenance.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`relative bg-white rounded-xl shadow-lg p-6 ${
                        pkg.recommended ? 'ring-2 ring-terracotta' : ''
                      }`}
                    >
                      {pkg.recommended && (
                        <div className="absolute -top-3 right-6 bg-terracotta text-white px-3 py-0.5 rounded-full text-xs font-medium">
                          Recommended
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-serif text-xl text-deep-green">{pkg.name}</h4>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-terracotta">
                            {formatCurrency(pkg.price)}
                          </div>
                          <div className="text-xs text-deep-green/60">per month</div>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {pkg.features.slice(0, 5).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            {feature.included ? (
                              <Check className="w-4 h-4 text-terracotta flex-shrink-0" />
                            ) : (
                              <X className="w-4 h-4 text-gray-300 flex-shrink-0" />
                            )}
                            <span className={`text-xs ${feature.included ? 'text-deep-green' : 'text-gray-400'}`}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/contact"
                        className="block w-full text-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
                      >
                        Select Plan
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Section */}
              <div>
                <div className="text-center mb-8">
                  <div className="flex justify-center items-center gap-3 mb-4">
                    <MessageSquare className="w-6 h-6 text-terracotta" />
                    <h3 className="font-serif text-3xl text-deep-green">
                      {marketingPackages.social.name}
                    </h3>
                  </div>
                  <p className="text-deep-green/70">
                    {marketingPackages.social.description}
                  </p>
                </div>

                <div className="space-y-6">
                  {marketingPackages.social.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`relative bg-white rounded-xl shadow-lg p-6 ${
                        pkg.recommended ? 'ring-2 ring-terracotta' : ''
                      }`}
                    >
                      {pkg.recommended && (
                        <div className="absolute -top-3 right-6 bg-terracotta text-white px-3 py-0.5 rounded-full text-xs font-medium">
                          Recommended
                        </div>
                      )}
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-serif text-xl text-deep-green">{pkg.name}</h4>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-terracotta">
                            {formatCurrency(pkg.price)}
                          </div>
                          <div className="text-xs text-deep-green/60">per month</div>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {pkg.features.slice(0, 5).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            {feature.included ? (
                              <Check className="w-4 h-4 text-terracotta flex-shrink-0" />
                            ) : (
                              <X className="w-4 h-4 text-gray-300 flex-shrink-0" />
                            )}
                            <span className={`text-xs ${feature.included ? 'text-deep-green' : 'text-gray-400'}`}>
                              {feature.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/contact"
                        className="block w-full text-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
                      >
                        Select Plan
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-deep-green mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-deep-green/70">
              Everything you need to know about our pricing and packages
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-sand-light rounded-xl p-6">
              <h3 className="font-serif text-xl text-deep-green mb-3">
                How does commission-based pricing work?
              </h3>
              <p className="text-deep-green/70">
                Our commission is calculated as a percentage of your villa's gross monthly revenue after OTA fees. 
                You only pay when you earn, making it risk-free and aligned with your success.
              </p>
            </div>
            
            <div className="bg-sand-light rounded-xl p-6">
              <h3 className="font-serif text-xl text-deep-green mb-3">
                Can I combine operations and marketing packages?
              </h3>
              <p className="text-deep-green/70">
                Absolutely! Many of our clients combine operations management with marketing services for 
                comprehensive villa management. We offer special bundled rates for combined packages.
              </p>
            </div>

            <div className="bg-sand-light rounded-xl p-6">
              <h3 className="font-serif text-xl text-deep-green mb-3">
                What's included in the commission rates?
              </h3>
              <p className="text-deep-green/70">
                Our commission covers all management services listed in each package. Additional costs like 
                maintenance materials, staff salaries (in Essential & Premium), and marketing ad spend are 
                billed separately at cost.
              </p>
            </div>

            <div className="bg-sand-light rounded-xl p-6">
              <h3 className="font-serif text-xl text-deep-green mb-3">
                How quickly can I see results?
              </h3>
              <p className="text-deep-green/70">
                Most properties see improved occupancy rates within the first 60 days. Our average properties 
                experience a 50% increase in occupancy and 67% increase in revenue within 6 months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-terracotta to-terracotta-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl mb-4">
            Ready to Maximize Your Villa's Potential?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join 100+ villa owners who trust AURA with their properties
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/property-management"
              className="px-8 py-3 bg-white text-terracotta rounded-full font-medium hover:bg-sand-light transition-all duration-300 transform hover:scale-105"
            >
              Calculate Your Earnings
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-white/10 backdrop-blur text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 border border-white/30"
            >
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}