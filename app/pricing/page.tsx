'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
  Award,
  Mail
} from 'lucide-react'

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<'marketing' | 'operations'>('operations')
  const [activeMarketingSection, setActiveMarketingSection] = useState<'strategy' | 'website' | 'maintenance' | 'social'>('strategy')
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
  const [showModal, setShowModal] = useState(false)
  const [selectedPackageName, setSelectedPackageName] = useState('')
  const [selectedPackageType, setSelectedPackageType] = useState<'operations' | 'marketing'>('operations')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showEnvelope, setShowEnvelope] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    packageName: '',
    packageType: ''
  })

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
        { name: 'Guest Support (8 AM – 8 PM)', included: true },
        { name: 'Maintenance Coordination', included: true },
        { name: 'Pool & Garden Scheduling', included: true },
        { name: 'Booking Calendar Management', included: true },
        { name: 'Monthly Stock Inventory', included: true },
        { name: 'Laundry Coordination', included: true },
        { name: 'Monthly Owner Report', included: true },
        { name: 'Basic Amenities Restocking', included: true },
        { name: 'Digital Guest Guidebook', included: true },
        { name: 'Monthly Preventive Maintenance Walkthrough', included: true },
        { name: 'Utility Bills Payment Assistance', included: true },
        { name: 'In-Villa Welcome (with refreshments)', included: false },
        { name: 'Concierge Services (Tours, Spa, Transport)', included: false },
        { name: 'Weekly Villa Inspections (with photo/video reports)', included: false },
        { name: 'Dedicated Operations Manager', included: false },
        { name: 'Monthly Deep Cleaning Coordination', included: false },
        { name: 'Priority Maintenance Response + Repairs Buffer (Rp 500,000/month included)', included: false },
        { name: 'Personalized Guest Gifts', included: false },
        { name: 'VIP Amenities (Premium toiletries & gifts – at cost)', included: false },
        { name: 'Staff Hiring Assistance (optional)', included: false },
        { name: 'Quarterly Performance Review', included: false },
        { name: 'Local Authority Liaison (Banjar, licensing)', included: false },
        { name: 'Direct Staffing Management - We hire, train, and pay villa staff under AURA payroll', included: false },
        { name: 'Complete HR Management (leave, replacement, bonus structure)', included: false },
        { name: 'Expense & Cash Flow Management - All operational expenses processed directly with one simple monthly invoice covering all costs', included: false },
        { name: 'Monthly Tax Reporting & Compliance - PPH Tax Reports submitted on your behalf', included: false },
        { name: 'Monthly financial report with complete breakdown', included: false },
        { name: 'Annual Profit & Loss Summary', included: false },
        { name: 'Quarterly staff evaluations and performance reports', included: false },
        { name: 'Annual CAPEX Planning Assistance for villa improvements', included: false }
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
        { name: 'Guest Support (8 AM – 8 PM)', included: '24/7' },
        { name: 'Maintenance Coordination', included: true },
        { name: 'Pool & Garden Scheduling', included: true },
        { name: 'Booking Calendar Management', included: true },
        { name: 'Monthly Stock Inventory', included: true },
        { name: 'Laundry Coordination', included: true },
        { name: 'Monthly Owner Report', included: true },
        { name: 'Basic Amenities Restocking', included: true },
        { name: 'Digital Guest Guidebook', included: true },
        { name: 'Monthly Preventive Maintenance Walkthrough', included: true },
        { name: 'Utility Bills Payment Assistance', included: true },
        { name: 'In-Villa Welcome (with refreshments)', included: true },
        { name: 'Concierge Services (Tours, Spa, Transport)', included: true },
        { name: 'Weekly Villa Inspections (with photo/video reports)', included: true },
        { name: 'Dedicated Operations Manager', included: true },
        { name: 'Monthly Deep Cleaning Coordination', included: true },
        { name: 'Priority Maintenance Response + Repairs Buffer (Rp 500,000/month included)', included: true },
        { name: 'Personalized Guest Gifts', included: true },
        { name: 'VIP Amenities (Premium toiletries & gifts – at cost)', included: true },
        { name: 'Staff Hiring Assistance (optional)', included: true },
        { name: 'Quarterly Performance Review', included: true },
        { name: 'Local Authority Liaison (Banjar, licensing)', included: true },
        { name: 'Direct Staffing Management - We hire, train, and pay villa staff under AURA payroll', included: false },
        { name: 'Complete HR Management (leave, replacement, bonus structure)', included: false },
        { name: 'Expense & Cash Flow Management - All operational expenses processed directly with one simple monthly invoice covering all costs', included: false },
        { name: 'Monthly Tax Reporting & Compliance - PPH Tax Reports submitted on your behalf', included: false },
        { name: 'Monthly financial report with complete breakdown', included: false },
        { name: 'Annual Profit & Loss Summary', included: false },
        { name: 'Quarterly staff evaluations and performance reports', included: false },
        { name: 'Annual CAPEX Planning Assistance for villa improvements', included: false }
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
        { name: 'Guest Support (8 AM – 8 PM)', included: '24/7' },
        { name: 'Maintenance Coordination', included: true },
        { name: 'Pool & Garden Scheduling', included: true },
        { name: 'Booking Calendar Management', included: true },
        { name: 'Monthly Stock Inventory', included: true },
        { name: 'Laundry Coordination', included: true },
        { name: 'Monthly Owner Report', included: true },
        { name: 'Basic Amenities Restocking', included: true },
        { name: 'Digital Guest Guidebook', included: true },
        { name: 'Monthly Preventive Maintenance Walkthrough', included: true },
        { name: 'Utility Bills Payment Assistance', included: true },
        { name: 'In-Villa Welcome (with refreshments)', included: true },
        { name: 'Concierge Services (Tours, Spa, Transport)', included: true },
        { name: 'Weekly Villa Inspections (with photo/video reports)', included: true },
        { name: 'Dedicated Operations Manager', included: true },
        { name: 'Monthly Deep Cleaning Coordination', included: true },
        { name: 'Priority Maintenance Response + Repairs Buffer (Rp 500,000/month included)', included: true },
        { name: 'Personalized Guest Gifts', included: true },
        { name: 'VIP Amenities (Premium toiletries & gifts – at cost)', included: true },
        { name: 'Staff Hiring Assistance (optional)', included: true },
        { name: 'Quarterly Performance Review', included: true },
        { name: 'Local Authority Liaison (Banjar, licensing)', included: true },
        { name: 'Direct Staffing Management - We hire, train, and pay villa staff under AURA payroll', included: true },
        { name: 'Complete HR Management (leave, replacement, bonus structure)', included: true },
        { name: 'Expense & Cash Flow Management - All operational expenses processed directly with one simple monthly invoice covering all costs', included: true },
        { name: 'Monthly Tax Reporting & Compliance - PPH Tax Reports submitted on your behalf', included: true },
        { name: 'Monthly financial report with complete breakdown', included: true },
        { name: 'Annual Profit & Loss Summary', included: true },
        { name: 'Quarterly staff evaluations and performance reports', included: true },
        { name: 'Annual CAPEX Planning Assistance for villa improvements', included: true }
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
          name: 'Essential',
          price: 10500000,
          oneTime: true,
          features: [
            { name: 'Brand positioning – Define how your brand stands out in the market', included: true },
            { name: 'Target audience definition – Identify who your ideal customers are', included: true },
            { name: 'Unique Selling Propositions (USPs) – Highlight what makes your offer different', included: true },
            { name: 'Suggested marketing channels – Recommend the best platforms to reach your audience', included: true },
            { name: 'Launch roadmap – Outline key steps to introduce your brand or campaign', included: true },
            { name: 'Brand tone of voice – Set the style and personality of your brand communication', included: true },
            { name: 'Messaging pillars – Create consistent themes to guide all your messages', included: true },
            { name: 'Brand story – Craft a compelling narrative behind your brand', included: false },
            { name: 'Customer personas – Build detailed profiles of your key customer types', included: false },
            { name: 'Competitor analysis – Review how your brand compares to others in the market', included: false },
            { name: 'Pricing strategy – Plan Yearly pricing for each season and year over year adjustment', included: false },
            { name: 'Content strategy – Decide what content to post, when, and where', included: false },
            { name: 'KPI & goal mapping – Define measurable targets to track success', included: false },
            { name: 'Marketing funnel – Map the customer journey from awareness to loyalty', included: false }
          ]
        },
        {
          id: 'strategy-premium',
          name: 'Boutique',
          price: 13000000,
          oneTime: true,
          recommended: true,
          features: [
            { name: 'Brand positioning – Define how your brand stands out in the market', included: true },
            { name: 'Target audience definition – Identify who your ideal customers are', included: true },
            { name: 'Unique Selling Propositions (USPs) – Highlight what makes your offer different', included: true },
            { name: 'Suggested marketing channels – Recommend the best platforms to reach your audience', included: true },
            { name: 'Launch roadmap – Outline key steps to introduce your brand or campaign', included: true },
            { name: 'Brand tone of voice – Set the style and personality of your brand communication', included: true },
            { name: 'Messaging pillars – Create consistent themes to guide all your messages', included: true },
            { name: 'Brand story – Craft a compelling narrative behind your brand', included: true },
            { name: 'Customer personas – Build detailed profiles of your key customer types', included: true },
            { name: 'Competitor analysis – Review how your brand compares to others in the market', included: true },
            { name: 'Pricing strategy – Plan Yearly pricing for each season and year over year adjustment', included: true },
            { name: 'Content strategy – Decide what content to post, when, and where', included: true },
            { name: 'KPI & goal mapping – Define measurable targets to track success', included: true },
            { name: 'Marketing funnel – Map the customer journey from awareness to loyalty', included: true }
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
          name: 'Essential',
          price: 14500000,
          oneTime: true,
          features: [
            { name: 'Website Design', included: 'semi-custom (Template)' },
            { name: 'Mobile-responsive layout', included: true },
            { name: 'Core Pages', included: 'up to 8' },
            { name: 'Booking Engine Integration', included: true },
            { name: 'Photo & Video Gallery', included: true },
            { name: 'Contact Form with Email Notification', included: true },
            { name: 'Speed Optimization (lazy loading, caching setup)', included: true },
            { name: 'Basic SEO Structure (clean URLs, header tags, etc.)', included: true },
            { name: '3 Months Maintenance', included: true },
            { name: 'Blog Section', included: false },
            { name: 'Daily/Weekly Backup Setup', included: false },
            { name: 'Website Hosting (one year)', included: false },
            { name: 'Google Analytics & Google Maps Integration', included: false },
            { name: 'Live Chat Integration (WhatsApp or others)', included: false },
            { name: 'Sticky Header or Smart Navigation', included: false }
          ]
        },
        {
          id: 'website-premium',
          name: 'Boutique',
          price: 22700000,
          oneTime: true,
          recommended: true,
          features: [
            { name: 'Website Design', included: 'custom' },
            { name: 'Mobile-responsive layout', included: true },
            { name: 'Core Pages', included: 'up to 12' },
            { name: 'Booking Engine Integration', included: true },
            { name: 'Photo & Video Gallery', included: true },
            { name: 'Contact Form with Email Notification', included: true },
            { name: 'Speed Optimization (lazy loading, caching setup)', included: true },
            { name: 'Basic SEO Structure (clean URLs, header tags, etc.)', included: true },
            { name: '3 Months Maintenance', included: true },
            { name: 'Blog Section', included: true },
            { name: 'Daily/Weekly Backup Setup', included: true },
            { name: 'Website Hosting (one year)', included: true },
            { name: 'Google Analytics & Google Maps Integration', included: true },
            { name: 'Live Chat Integration (WhatsApp or others)', included: true },
            { name: 'Sticky Header or Smart Navigation', included: true }
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
          name: 'Essential',
          price: 6000000,
          features: [
            { name: 'Website Maintenance & Technical Support (Security Updates, Backups & more)', included: true },
            { name: 'Technical SEO (sitemap, robots.txt, crawl fixes)', included: true },
            { name: 'Image and performance optimization', included: true },
            { name: 'On-page optimization (titles, meta tags, headings)', included: true },
            { name: 'Google Search Console monitoring', included: true },
            { name: 'Local SEO (Google Business Profile management)', included: true },
            { name: 'Copywriting for SEO and conversions', included: true },
            { name: 'Blog Posts', included: '2 per month' },
            { name: 'Roadmap planning (Future website features/changes)', included: false },
            { name: 'Monthly performance dashboard (traffic, goals, rankings)', included: false },
            { name: 'Website Edits / Change Requests', included: false },
            { name: 'SEO health audit (monthly or quarterly)', included: false }
          ]
        },
        {
          id: 'maintenance-premium',
          name: 'Boutique',
          price: 7500000,
          recommended: true,
          features: [
            { name: 'Website Maintenance & Technical Support (Security Updates, Backups & more)', included: true },
            { name: 'Technical SEO (sitemap, robots.txt, crawl fixes)', included: true },
            { name: 'Image and performance optimization', included: true },
            { name: 'On-page optimization (titles, meta tags, headings)', included: true },
            { name: 'Google Search Console monitoring', included: true },
            { name: 'Local SEO (Google Business Profile management)', included: true },
            { name: 'Copywriting for SEO and conversions', included: true },
            { name: 'Blog Posts', included: '4 per month' },
            { name: 'Roadmap planning (Future website features/changes)', included: true },
            { name: 'Monthly performance dashboard (traffic, goals, rankings)', included: true },
            { name: 'Website Edits / Change Requests', included: '1 per month' },
            { name: 'SEO health audit (monthly or quarterly)', included: true }
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
          name: 'Essential',
          price: 6500000,
          features: [
            { name: 'Monthly content production (Photos & Videos)', included: true },
            { name: 'Original feed Posts (Instagram)', included: '2 per week' },
            { name: 'Original feed Reels (Instagram)', included: '2 per month' },
            { name: 'Post copywriting aligned with Brand and Marketing strategy', included: true },
            { name: 'Optimization and maintenance of Instagram and Facebook profile/page', included: true },
            { name: 'Ad campaign management (Ad costs not included. Budgeted by Customer)', included: true },
            { name: 'Engagement handling (Comments, DMs, resharing stories with personalized covers)', included: true },
            { name: 'Seasonal greetings and promotional graphics', included: true },
            { name: 'Performance report (Monthly)', included: true },
            { name: 'Google Maps recommendation lists', included: false },
            { name: 'Drone video (one-time)', included: false },
            { name: 'Pinterest Pins', included: false },
            { name: 'Campaign strategy – Plan ideas and structure for promotional campaigns', included: false },
            { name: 'Content strategy – Decide what content to post, when, and where', included: false }
          ]
        },
        {
          id: 'social-premium',
          name: 'Boutique',
          price: 8000000,
          recommended: true,
          features: [
            { name: 'Monthly content production (Photos & Videos)', included: true },
            { name: 'Original feed Posts (Instagram)', included: '3 per week' },
            { name: 'Original feed Reels (Instagram)', included: '3 per month' },
            { name: 'Post copywriting aligned with Brand and Marketing strategy', included: true },
            { name: 'Optimization and maintenance of Instagram and Facebook profile/page', included: true },
            { name: 'Ad campaign management (Ad costs not included. Budgeted by Customer)', included: true },
            { name: 'Engagement handling (Comments, DMs, resharing stories with personalized covers)', included: true },
            { name: 'Seasonal greetings and promotional graphics', included: true },
            { name: 'Performance report (Monthly)', included: true },
            { name: 'Google Maps recommendation lists', included: true },
            { name: 'Drone video (one-time)', included: true },
            { name: 'Pinterest Pins', included: true },
            { name: 'Campaign strategy – Plan ideas and structure for promotional campaigns', included: true },
            { name: 'Content strategy – Decide what content to post, when, and where', included: true }
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
      {/* Tab Navigation */}
      <section className="sticky top-0 z-40 bg-white border-b border-sand pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="inline-flex rounded-full bg-sand-light p-1 my-3 md:my-6">
              <button
                onClick={() => {
                  setActiveTab('operations')
                  window.scrollTo(0, 0)
                }}
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
                onClick={() => {
                  setActiveTab('marketing')
                  window.scrollTo(0, 0)
                }}
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

            {/* Mobile Comparison Layout */}
            <div className="block md:hidden mb-12 pt-10">
              {/* Package Indicators */}
              <div className="bg-white rounded-t-2xl p-4 space-y-3">
                {operationalPackages.map((pkg, index) => {
                  const colors = [
                    { bg: 'bg-sand-light', check: 'text-terracotta' },
                    { bg: 'bg-terracotta', check: 'text-white' },
                    { bg: 'bg-deep-green', check: 'text-white' }
                  ]
                  const color = colors[index]
                  
                  return (
                    <div key={pkg.id} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${color.bg}`}>
                        <Check className={`w-4 h-4 ${color.check}`} />
                      </div>
                      <span className="text-sm font-medium text-deep-green">
                        {pkg.name} — {pkg.commission}
                        {pkg.recommended && (
                          <span className="ml-2 text-xs bg-terracotta text-white px-2 py-0.5 rounded-full">
                            POPULAR
                          </span>
                        )}
                        {pkg.id === 'boutique' && (
                          <span className="ml-2 text-xs text-deep-green/60 italic">
                            by invitation only
                          </span>
                        )}
                      </span>
                    </div>
                  )
                })}
              </div>
              
              {/* Comparison Table */}
              <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden border-t-2 border-sand">
                
                {/* Features List - Same as desktop */}
                <div>
                  {[
                    'Daily Housekeeping Supervision',
                    'Guest Check-in & Check-out Assistance',
                    'Guest Support (8 AM – 8 PM)',
                    'Maintenance Coordination',
                    'Pool & Garden Scheduling',
                    'Booking Calendar Management',
                    'Monthly Stock Inventory',
                    'Laundry Coordination',
                    'Monthly Owner Report',
                    'Basic Amenities Restocking',
                    'Digital Guest Guidebook',
                    'Monthly Preventive Maintenance Walkthrough',
                    'Utility Bills Payment Assistance',
                    'In-Villa Welcome (with refreshments)',
                    'Concierge Services (Tours, Spa, Transport)',
                    'Weekly Villa Inspections (with photo/video reports)',
                    'Dedicated Operations Manager',
                    'Monthly Deep Cleaning Coordination',
                    'Priority Maintenance Response + Repairs Buffer (Rp 500,000/month included)',
                    'Personalized Guest Gifts',
                    'VIP Amenities (Premium toiletries & gifts – at cost)',
                    'Staff Hiring Assistance (optional)',
                    'Quarterly Performance Review',
                    'Local Authority Liaison (Banjar, licensing)',
                    'Direct Staffing Management - We hire, train, and pay villa staff under AURA payroll',
                    'Complete HR Management (leave, replacement, bonus structure)',
                    'Expense & Cash Flow Management - All operational expenses processed directly with one simple monthly invoice covering all costs',
                    'Monthly Tax Reporting & Compliance - PPH Tax Reports submitted on your behalf',
                    'Monthly financial report with complete breakdown',
                    'Annual Profit & Loss Summary',
                    'Quarterly staff evaluations and performance reports',
                    'Annual CAPEX Planning Assistance for villa improvements'
                  ].map((featureName, idx) => {
                    const displayName = featureName;
                    
                    return (
                      <div key={idx} className={`flex items-center border-b border-sand/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-sand-light/10'}`}>
                        <div className="flex-1 p-3 text-xs text-deep-green leading-tight">
                          {displayName}
                        </div>
                        {operationalPackages.map((pkg, pkgIndex) => {
                          // Special handling for Guest Support - same as desktop
                          if (featureName === 'Guest Support') {
                            const colors = [
                              { bg: 'bg-sand-light', check: 'text-terracotta' },
                              { bg: 'bg-terracotta', check: 'text-white' },
                              { bg: 'bg-deep-green', check: 'text-white' }
                            ]
                            const color = colors[pkgIndex]
                            
                            if (pkg.id === 'essential') {
                              return (
                                <div key={pkg.id} className="w-9 px-1 flex justify-center">
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${color.bg}`}>
                                    <Check className={`w-3 h-3 ${color.check}`} />
                                  </div>
                                </div>
                              )
                            } else {
                              // Premium and Boutique get "24/7" text
                              return (
                                <div key={pkg.id} className="w-9 px-1 flex justify-center">
                                  <span className="text-[10px] font-semibold text-terracotta">24/7</span>
                                </div>
                              )
                            }
                          }
                          
                          // Regular feature handling
                          const feature = pkg.features.find(f => f.name === featureName);
                          const isIncluded = feature?.included || 
                            pkg.id === 'boutique'; // Boutique Full has everything
                          
                          const included = isIncluded
                          const colors = [
                            { bg: 'bg-sand-light', check: 'text-terracotta' },
                            { bg: 'bg-terracotta', check: 'text-white' },
                            { bg: 'bg-deep-green', check: 'text-white' }
                          ]
                          const color = colors[pkgIndex]
                          
                          return (
                            <div key={pkg.id} className="w-9 px-1 flex justify-center">
                              {included === '24/7' ? (
                                <div className={`text-xs font-bold ${pkgIndex === 0 ? 'text-terracotta' : pkgIndex === 1 ? 'text-terracotta' : 'text-deep-green'}`}>
                                  24/7
                                </div>
                              ) : included ? (
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${color.bg}`}>
                                  <Check className={`w-3 h-3 ${color.check}`} />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-100">
                                  <X className="w-3 h-3 text-gray-300" />
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
                
              </div>
              
              {/* Single CTA */}
              <div className="mt-4">
                <button
                  onClick={() => handleOpenModal('Operations Packages', 'operations')}
                  className="block w-full text-center px-6 py-3 bg-terracotta text-white rounded-full font-medium transition-all duration-300 hover:bg-terracotta-dark"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Desktop Comparison Table */}
            <div className="hidden md:block mb-12 pt-10">
              <div className="bg-white rounded-2xl shadow-xl overflow-visible relative">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-sand relative">
                      <th className="text-left p-6 bg-sand-light/50 rounded-tl-2xl">
                      </th>
                      {operationalPackages.map((pkg, index) => (
                        <th key={pkg.id} className={`text-center bg-sand-light/30 min-w-[200px] h-[140px] relative ${index === operationalPackages.length - 1 ? 'rounded-tr-2xl' : ''}`}>
                          {pkg.recommended && (
                            <div className="absolute -top-8 inset-x-0 bg-terracotta text-white text-xs py-1 font-medium rounded-t-lg">
                              MOST POPULAR
                            </div>
                          )}
                          <div className="relative h-full">
                            <div className="absolute top-2 right-2 text-right">
                              <div className="text-2xl font-bold text-terracotta">
                                {pkg.commission}
                              </div>
                              <div className="text-[10px] text-deep-green/60">
                                (after OTA fees)
                              </div>
                            </div>
                            <div className="absolute bottom-10 left-0 right-0 text-center">
                              <h3 className="font-serif text-3xl text-deep-green">
                                {pkg.name.split(' ')[0]}
                              </h3>
                            </div>
                            {pkg.id === 'boutique' && (
                              <div className="absolute bottom-3 left-0 right-0 text-center">
                                <p className="text-xs text-deep-green/60 italic">
                                  by invitation only
                                </p>
                              </div>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Get unique features list */}
                    {[
                      'Daily Housekeeping Supervision',
                      'Guest Check-in & Check-out Assistance',
                      'Guest Support (8 AM – 8 PM)',
                      'Maintenance Coordination',
                      'Pool & Garden Scheduling',
                      'Booking Calendar Management',
                      'Monthly Stock Inventory',
                      'Laundry Coordination',
                      'Monthly Owner Report',
                      'Basic Amenities Restocking',
                      'Digital Guest Guidebook',
                      'Monthly Preventive Maintenance Walkthrough',
                      'Utility Bills Payment Assistance',
                      'In-Villa Welcome (with refreshments)',
                      'Concierge Services (Tours, Spa, Transport)',
                      'Weekly Villa Inspections (with photo/video reports)',
                      'Dedicated Operations Manager',
                      'Monthly Deep Cleaning Coordination',
                      'Priority Maintenance Response + Repairs Buffer (Rp 500,000/month included)',
                      'Personalized Guest Gifts',
                      'VIP Amenities (Premium toiletries & gifts – at cost)',
                      'Staff Hiring Assistance (optional)',
                      'Quarterly Performance Review',
                      'Local Authority Liaison (Banjar, licensing)',
                      'Direct Staffing Management - We hire, train, and pay villa staff under AURA payroll',
                      'Complete HR Management (leave, replacement, bonus structure)',
                      'Expense & Cash Flow Management - All operational expenses processed directly with one simple monthly invoice covering all costs',
                      'Monthly Tax Reporting & Compliance - PPH Tax Reports submitted on your behalf',
                      'Monthly financial report with complete breakdown',
                      'Annual Profit & Loss Summary',
                      'Quarterly staff evaluations and performance reports',
                      'Annual CAPEX Planning Assistance for villa improvements'
                    ].map((featureName, idx) => (
                      <tr key={idx} className={`border-b border-sand/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-sand-light/10'}`}>
                        <td className="p-4 text-base text-deep-green font-medium">
                          {featureName}
                        </td>
                        {operationalPackages.map((pkg, pkgIndex) => {
                          const colors = [
                            { bg: 'bg-sand-light', check: 'text-terracotta' },
                            { bg: 'bg-terracotta', check: 'text-white' },
                            { bg: 'bg-deep-green', check: 'text-white' }
                          ]
                          const color = colors[pkgIndex]
                          
                          // Special handling for Guest Support
                          if (featureName === 'Guest Support') {
                            if (pkg.id === 'essential') {
                              return (
                                <td key={pkg.id} className="p-4 text-center">
                                  <div className={`inline-flex items-center justify-center w-8 h-8 ${color.bg} rounded-full`}>
                                    <Check className={`w-5 h-5 ${color.check} font-bold`} />
                                  </div>
                                </td>
                              );
                            } else {
                              // Premium and Boutique get "24/7" text
                              return (
                                <td key={pkg.id} className="p-4 text-center">
                                  <span className="text-sm font-semibold text-terracotta">24/7</span>
                                </td>
                              );
                            }
                          }
                          
                          const feature = pkg.features.find(f => f.name === featureName);
                          const isIncluded = feature?.included || 
                            pkg.id === 'boutique'; // Boutique Full has everything
                          
                          return (
                            <td key={pkg.id} className="p-4 text-center">
                              {isIncluded === '24/7' ? (
                                <div className={`font-bold text-lg ${pkgIndex === 0 ? 'text-terracotta' : pkgIndex === 1 ? 'text-terracotta' : 'text-deep-green'}`}>
                                  24/7
                                </div>
                              ) : isIncluded ? (
                                <div className={`inline-flex items-center justify-center w-8 h-8 ${color.bg} rounded-full`}>
                                  <Check className={`w-5 h-5 ${color.check} font-bold`} />
                                </div>
                              ) : (
                                <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                  <X className="w-5 h-5 text-gray-400" />
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-sand">
                      <td className="p-6 bg-sand-light/50 rounded-bl-2xl"></td>
                      {operationalPackages.map((pkg, index) => (
                        <td key={pkg.id} className={`p-6 text-center bg-sand-light/30 ${index === operationalPackages.length - 1 ? 'rounded-br-2xl' : ''}`}>
                          <button
                            onClick={() => handleOpenModal(pkg.name, 'operations')}
                            className={`inline-block px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                              pkg.recommended
                                ? 'bg-terracotta text-white hover:bg-terracotta-dark transform hover:scale-105'
                                : 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white'
                            }`}
                          >
                            Get Started
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
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
        <>
          {/* Marketing Submenu - Desktop Only */}
          <section className="hidden md:block sticky top-[216px] z-30 bg-white border-b border-sand">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center py-4">
                <div className="inline-flex rounded-full bg-sand-light p-1">
                  <button
                    onClick={() => {
                      setActiveMarketingSection('strategy')
                      window.scrollTo(0, 0)
                    }}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                      activeMarketingSection === 'strategy'
                        ? 'bg-deep-green text-white'
                        : 'text-deep-green hover:text-deep-green/70'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    Strategic Brand Growth
                  </button>
                  <button
                    onClick={() => {
                      setActiveMarketingSection('website')
                      window.scrollTo(0, 0)
                    }}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                      activeMarketingSection === 'website'
                        ? 'bg-deep-green text-white'
                        : 'text-deep-green hover:text-deep-green/70'
                    }`}
                  >
                    <Globe className="w-4 h-4 inline mr-1" />
                    Web Presence
                  </button>
                  <button
                    onClick={() => {
                      setActiveMarketingSection('maintenance')
                      window.scrollTo(0, 0)
                    }}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                      activeMarketingSection === 'maintenance'
                        ? 'bg-deep-green text-white'
                        : 'text-deep-green hover:text-deep-green/70'
                    }`}
                  >
                    <Search className="w-4 h-4 inline mr-1" />
                    Get Found, Get Booked
                  </button>
                  <button
                    onClick={() => {
                      setActiveMarketingSection('social')
                      window.scrollTo(0, 0)
                    }}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                      activeMarketingSection === 'social'
                        ? 'bg-deep-green text-white'
                        : 'text-deep-green hover:text-deep-green/70'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Social Engagement
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-gradient-to-b from-white to-sand-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* On Mobile - Show All Sections */}
            <div className="block md:hidden space-y-20">
              
              {/* Strategy Section Mobile */}
              <div>
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

              {/* Mobile Comparison Layout for Strategy - Same style as Operations */}
              <div className="mb-12">
                {/* Package Indicators */}
                <div className="bg-white rounded-t-2xl p-4 space-y-3">
                  {marketingPackages.strategy.packages.map((pkg, index) => {
                    const colors = [
                      { bg: 'bg-sand-light', check: 'text-terracotta' },
                      { bg: 'bg-terracotta', check: 'text-white' }
                    ]
                    const color = colors[index]
                    
                    return (
                      <div key={pkg.id} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${color.bg}`}>
                          <Check className={`w-4 h-4 ${color.check}`} />
                        </div>
                        <span className="text-sm font-medium text-deep-green">
                          {pkg.name} — {formatCurrency(pkg.price)}
                          {pkg.recommended && (
                            <span className="ml-2 text-xs bg-terracotta text-white px-2 py-0.5 rounded-full">
                              RECOMMENDED
                            </span>
                          )}
                        </span>
                      </div>
                    )
                  })}
                </div>
                
                {/* Comparison Table */}
                <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden border-t-2 border-sand">
                  {/* Features List */}
                  <div>
                    {[...new Set(marketingPackages.strategy.packages.flatMap(pkg => pkg.features.map(f => f.name)))].map((featureName, idx) => (
                      <div key={idx} className={`flex items-center border-b border-sand/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-sand-light/10'}`}>
                        <div className="flex-1 p-3 text-xs text-deep-green leading-tight">
                          {featureName}
                        </div>
                        {marketingPackages.strategy.packages.map((pkg, pkgIndex) => {
                          const feature = pkg.features.find(f => f.name === featureName)
                          const included = feature?.included || false
                          const colors = [
                            { bg: 'bg-sand-light', check: 'text-terracotta' },
                            { bg: 'bg-terracotta', check: 'text-white' }
                          ]
                          const color = colors[pkgIndex]
                          
                          return (
                            <div key={pkg.id} className="min-w-[80px] px-1 flex justify-center">
                              {included ? (
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${color.bg}`}>
                                  <Check className={`w-3 h-3 ${color.check}`} />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-100">
                                  <X className="w-3 h-3 text-gray-300" />
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Single CTA */}
                <div className="mt-4">
                  <button
                    onClick={() => handleOpenModal('Marketing Package', 'marketing')}
                    className="block w-full text-center px-6 py-3 bg-terracotta text-white rounded-full font-medium transition-all duration-300 hover:bg-terracotta-dark"
                  >
                    Get Started
                  </button>
                </div>
              </div>
              </div>

              {/* Website Section Mobile */}
              <div>
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

                {/* Mobile Comparison Layout for Website - Same style as Operations */}
                <div className="mb-12">
                  {/* Package Indicators */}
                  <div className="bg-white rounded-t-2xl p-4 space-y-3">
                    {marketingPackages.website.packages.map((pkg, index) => {
                      const colors = [
                        { bg: 'bg-sand-light', check: 'text-terracotta' },
                        { bg: 'bg-terracotta', check: 'text-white' },
                        { bg: 'bg-deep-green', check: 'text-white' }
                      ]
                      const color = colors[index]
                      
                      return (
                        <div key={pkg.id} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${color.bg}`}>
                            <Check className={`w-4 h-4 ${color.check}`} />
                          </div>
                          <span className="text-sm font-medium text-deep-green">
                            {pkg.name} — {formatCurrency(pkg.price)}
                            {pkg.recommended && (
                              <span className="ml-2 text-xs bg-terracotta text-white px-2 py-0.5 rounded-full">
                                RECOMMENDED
                              </span>
                            )}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Comparison Table */}
                  <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden border-t-2 border-sand">
                    {/* Features List */}
                    <div>
                      {[...new Set(marketingPackages.website.packages.flatMap(pkg => pkg.features.map(f => f.name)))].map((featureName, idx) => (
                        <div key={idx} className={`flex items-center border-b border-sand/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-sand-light/10'}`}>
                          <div className="flex-1 p-3 text-xs text-deep-green leading-tight">
                            {featureName}
                          </div>
                          {marketingPackages.website.packages.map((pkg, pkgIndex) => {
                            const feature = pkg.features.find(f => f.name === featureName)
                            const included = feature?.included || false
                            const colors = [
                              { bg: 'bg-sand-light', check: 'text-terracotta' },
                              { bg: 'bg-terracotta', check: 'text-white' },
                              { bg: 'bg-deep-green', check: 'text-white' }
                            ]
                            const color = colors[pkgIndex]
                            
                            return (
                              <div key={pkg.id} className="min-w-[80px] px-1 flex justify-center">
                                {typeof included === 'string' ? (
                                  <div className={`text-[9px] font-bold ${pkgIndex === 0 ? 'text-terracotta' : pkgIndex === 1 ? 'text-terracotta' : 'text-deep-green'} text-center leading-tight`}>
                                    {included}
                                  </div>
                                ) : included ? (
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${color.bg}`}>
                                    <Check className={`w-3 h-3 ${color.check}`} />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-100">
                                    <X className="w-3 h-3 text-gray-300" />
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Single CTA */}
                  <div className="mt-4">
                    <button
                      onClick={() => handleOpenModal('Marketing Package', 'marketing')}
                      className="block w-full text-center px-6 py-3 bg-terracotta text-white rounded-full font-medium transition-all duration-300 hover:bg-terracotta-dark"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>

              {/* Maintenance Section Mobile */}
              <div>
                <div className="text-center mb-12">
                  <div className="flex justify-center items-center gap-3 mb-4">
                    <Search className="w-8 h-8 text-terracotta" />
                    <h2 className="font-serif text-4xl text-deep-green">
                      {marketingPackages.maintenance.name}
                    </h2>
                  </div>
                  <p className="text-lg text-deep-green/70">
                    {marketingPackages.maintenance.description}
                  </p>
                </div>

                {/* Mobile Comparison Layout for Maintenance - Same style as Operations */}
                <div className="mb-12">
                  {/* Package Indicators */}
                  <div className="bg-white rounded-t-2xl p-4 space-y-3">
                    {marketingPackages.maintenance.packages.map((pkg, index) => {
                      const colors = [
                        { bg: 'bg-sand-light', check: 'text-terracotta' },
                        { bg: 'bg-terracotta', check: 'text-white' },
                        { bg: 'bg-deep-green', check: 'text-white' }
                      ]
                      const color = colors[index]
                      
                      return (
                        <div key={pkg.id} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${color.bg}`}>
                            <Check className={`w-4 h-4 ${color.check}`} />
                          </div>
                          <span className="text-sm font-medium text-deep-green">
                            {pkg.name} — {formatCurrency(pkg.price)}/month
                            {pkg.recommended && (
                              <span className="ml-2 text-xs bg-terracotta text-white px-2 py-0.5 rounded-full">
                                RECOMMENDED
                              </span>
                            )}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Comparison Table */}
                  <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden border-t-2 border-sand">
                    {/* Features List */}
                    <div>
                      {[...new Set(marketingPackages.maintenance.packages.flatMap(pkg => pkg.features.map(f => f.name)))].map((featureName, idx) => (
                        <div key={idx} className={`flex items-center border-b border-sand/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-sand-light/10'}`}>
                          <div className="flex-1 p-3 text-xs text-deep-green leading-tight">
                            {featureName}
                          </div>
                          {marketingPackages.maintenance.packages.map((pkg, pkgIndex) => {
                            const feature = pkg.features.find(f => f.name === featureName)
                            const included = feature?.included || false
                            const colors = [
                              { bg: 'bg-sand-light', check: 'text-terracotta' },
                              { bg: 'bg-terracotta', check: 'text-white' },
                              { bg: 'bg-deep-green', check: 'text-white' }
                            ]
                            const color = colors[pkgIndex]
                            
                            return (
                              <div key={pkg.id} className="min-w-[80px] px-1 flex justify-center">
                                {typeof included === 'string' ? (
                                  <div className={`text-[9px] font-bold ${pkgIndex === 0 ? 'text-terracotta' : pkgIndex === 1 ? 'text-terracotta' : 'text-deep-green'} text-center leading-tight`}>
                                    {included}
                                  </div>
                                ) : included ? (
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${color.bg}`}>
                                    <Check className={`w-3 h-3 ${color.check}`} />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-100">
                                    <X className="w-3 h-3 text-gray-300" />
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Single CTA */}
                  <div className="mt-4">
                    <button
                      onClick={() => handleOpenModal('Marketing Package', 'marketing')}
                      className="block w-full text-center px-6 py-3 bg-terracotta text-white rounded-full font-medium transition-all duration-300 hover:bg-terracotta-dark"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Section Mobile */}
              <div>
                <div className="text-center mb-12">
                  <div className="flex justify-center items-center gap-3 mb-4">
                    <MessageSquare className="w-8 h-8 text-terracotta" />
                    <h2 className="font-serif text-4xl text-deep-green">
                      {marketingPackages.social.name}
                    </h2>
                  </div>
                  <p className="text-lg text-deep-green/70">
                    {marketingPackages.social.description}
                  </p>
                </div>

                {/* Mobile Comparison Layout for Social - Same style as Operations */}
                <div className="mb-12">
                  {/* Package Indicators */}
                  <div className="bg-white rounded-t-2xl p-4 space-y-3">
                    {marketingPackages.social.packages.map((pkg, index) => {
                      const colors = [
                        { bg: 'bg-sand-light', check: 'text-terracotta' },
                        { bg: 'bg-terracotta', check: 'text-white' }
                      ]
                      const color = colors[index]
                      
                      return (
                        <div key={pkg.id} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${color.bg}`}>
                            <Check className={`w-4 h-4 ${color.check}`} />
                          </div>
                          <span className="text-sm font-medium text-deep-green">
                            {pkg.name} — {formatCurrency(pkg.price)}/month
                            {pkg.recommended && (
                              <span className="ml-2 text-xs bg-terracotta text-white px-2 py-0.5 rounded-full">
                                RECOMMENDED
                              </span>
                            )}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Comparison Table */}
                  <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden border-t-2 border-sand">
                    {/* Features List */}
                    <div>
                      {[...new Set(marketingPackages.social.packages.flatMap(pkg => pkg.features.map(f => f.name)))].map((featureName, idx) => (
                        <div key={idx} className={`flex items-center border-b border-sand/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-sand-light/10'}`}>
                          <div className="flex-1 p-3 text-xs text-deep-green leading-tight">
                            {featureName}
                          </div>
                          {marketingPackages.social.packages.map((pkg, pkgIndex) => {
                            const feature = pkg.features.find(f => f.name === featureName)
                            const included = feature?.included || false
                            const colors = [
                              { bg: 'bg-sand-light', check: 'text-terracotta' },
                              { bg: 'bg-terracotta', check: 'text-white' }
                            ]
                            const color = colors[pkgIndex]
                            
                            return (
                              <div key={pkg.id} className="min-w-[80px] px-1 flex justify-center">
                                {typeof included === 'string' ? (
                                  <div className={`text-[9px] font-bold ${pkgIndex === 0 ? 'text-terracotta' : 'text-deep-green'} text-center leading-tight`}>
                                    {included}
                                  </div>
                                ) : included ? (
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${color.bg}`}>
                                    <Check className={`w-3 h-3 ${color.check}`} />
                                  </div>
                                ) : (
                                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gray-100">
                                    <X className="w-3 h-3 text-gray-300" />
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Single CTA */}
                  <div className="mt-4">
                    <button
                      onClick={() => handleOpenModal('Marketing Package', 'marketing')}
                      className="block w-full text-center px-6 py-3 bg-terracotta text-white rounded-full font-medium transition-all duration-300 hover:bg-terracotta-dark"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Sections with Conditional Display */}
            <div className="hidden md:block">

            {/* Strategy Section */}
            {activeMarketingSection === 'strategy' && (
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

              {/* Desktop Comparison Table for Strategy */}
              <div className="mb-12 pt-10">
                <div className="bg-white rounded-2xl shadow-xl overflow-visible relative">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-sand relative">
                          <th className="text-left p-6 bg-sand-light/50 rounded-tl-2xl"></th>
                          {marketingPackages.strategy.packages.map((pkg, index) => (
                            <th key={pkg.id} className={`text-center bg-sand-light/30 min-w-[200px] h-[140px] relative ${index === marketingPackages.strategy.packages.length - 1 ? 'rounded-tr-2xl' : ''}`}>
                              {pkg.recommended && (
                                <div className="absolute -top-8 inset-x-0 bg-terracotta text-white text-xs py-1 font-medium rounded-t-lg">
                                  RECOMMENDED
                                </div>
                              )}
                              <div className="relative h-full">
                                <div className="absolute top-2 right-2 text-right">
                                  <div className="text-xl font-bold text-terracotta">
                                    {formatCurrency(pkg.price)}
                                  </div>
                                  <div className="text-[10px] text-deep-green/60">
                                    one time
                                  </div>
                                </div>
                                <div className="absolute bottom-10 left-0 right-0 text-center">
                                  <h3 className="font-serif text-3xl text-deep-green">
                                    {pkg.name}
                                  </h3>
                                </div>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Get all unique features */}
                        {[...new Set(marketingPackages.strategy.packages.flatMap(pkg => pkg.features.map(f => f.name)))].map((featureName, idx) => (
                          <tr key={idx} className={`border-b border-sand/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-sand-light/10'}`}>
                            <td className="p-4 text-base text-deep-green font-medium">
                              {featureName}
                            </td>
                            {marketingPackages.strategy.packages.map((pkg, pkgIndex) => {
                              const feature = pkg.features.find(f => f.name === featureName);
                              const isIncluded = feature?.included || false;
                              const colors = [
                                { bg: 'bg-sand-light', check: 'text-terracotta' },
                                { bg: 'bg-terracotta', check: 'text-white' }
                              ]
                              const color = colors[pkgIndex]
                              
                              return (
                                <td key={pkg.id} className="p-4 text-center">
                                  {typeof isIncluded === 'string' ? (
                                    <div className={`font-bold text-base ${pkgIndex === 0 ? 'text-terracotta' : 'text-deep-green'}`}>
                                      {isIncluded}
                                    </div>
                                  ) : isIncluded ? (
                                    <div className={`inline-flex items-center justify-center w-8 h-8 ${color.bg} rounded-full`}>
                                      <Check className={`w-5 h-5 ${color.check} font-bold`} />
                                    </div>
                                  ) : (
                                    <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                      <X className="w-5 h-5 text-gray-400" />
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-sand">
                          <td className="p-6 bg-sand-light/50 rounded-bl-2xl"></td>
                          {marketingPackages.strategy.packages.map((pkg, index) => (
                            <td key={pkg.id} className={`p-6 text-center bg-sand-light/30 ${index === marketingPackages.strategy.packages.length - 1 ? 'rounded-br-2xl' : ''}`}>
                              <button
                                onClick={() => handleOpenModal('Marketing Package', 'marketing')}
                                className={`inline-block px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                  pkg.recommended
                                    ? 'bg-terracotta text-white hover:bg-terracotta-dark transform hover:scale-105'
                                    : 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white'
                                }`}
                              >
                                Get Started
                              </button>
                            </td>
                          ))}
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Website Section Desktop */}
            {activeMarketingSection === 'website' && (
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

              {/* Mobile Card Layout for Website */}
              <div className="block md:hidden mb-12 pt-10">
                <div className="space-y-4">
                  {marketingPackages.website.packages.map((pkg) => (
                    <div key={pkg.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                      {pkg.recommended && (
                        <div className="bg-terracotta text-white text-xs py-2 text-center font-medium">
                          RECOMMENDED
                        </div>
                      )}
                      <div className="p-6">
                        <div className="text-center mb-4">
                          <h3 className="font-serif text-3xl text-deep-green mb-2">
                            {pkg.name}
                          </h3>
                          <div className="text-xl font-bold text-terracotta">
                            {formatCurrency(pkg.price)}
                          </div>
                          <div className="text-xs text-deep-green/60">
                            one time
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <h4 className="font-semibold text-deep-green border-b border-sand pb-2">Features</h4>
                          {pkg.features.map((feature) => (
                            <div key={feature.name} className="flex items-start gap-2">
                              <div className={`mt-1 ${feature.included ? 'text-terracotta' : 'text-gray-300'}`}>
                                {feature.included ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                              </div>
                              <span className={`text-sm ${feature.included ? 'text-deep-green' : 'text-gray-400'}`}>
                                {feature.name}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <button
                          onClick={() => handleOpenModal('Marketing Package', 'marketing')}
                          className={`block w-full text-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                            pkg.recommended
                              ? 'bg-terracotta text-white hover:bg-terracotta-dark'
                              : 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white'
                          }`}
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Comparison Table for Website */}
              <div className="hidden md:block mb-12 pt-10">
                <div className="bg-white rounded-2xl shadow-xl overflow-visible relative">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-sand relative">
                          <th className="text-left p-6 bg-sand-light/50 rounded-tl-2xl"></th>
                          {marketingPackages.website.packages.map((pkg, index) => (
                            <th key={pkg.id} className={`text-center bg-sand-light/30 min-w-[200px] h-[140px] relative ${index === marketingPackages.website.packages.length - 1 ? 'rounded-tr-2xl' : ''}`}>
                              {pkg.recommended && (
                                <div className="absolute -top-8 inset-x-0 bg-terracotta text-white text-xs py-1 font-medium rounded-t-lg">
                                  RECOMMENDED
                                </div>
                              )}
                              <div className="relative h-full">
                                <div className="absolute top-2 right-2 text-right">
                                  <div className="text-xl font-bold text-terracotta">
                                    {formatCurrency(pkg.price)}
                                  </div>
                                  <div className="text-[10px] text-deep-green/60">
                                    one time
                                  </div>
                                </div>
                                <div className="absolute bottom-10 left-0 right-0 text-center">
                                  <h3 className="font-serif text-3xl text-deep-green">
                                    {pkg.name}
                                  </h3>
                                </div>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Get all unique features */}
                        {[...new Set(marketingPackages.website.packages.flatMap(pkg => pkg.features.map(f => f.name)))].map((featureName, idx) => (
                          <tr key={idx} className={`border-b border-sand/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-sand-light/10'}`}>
                            <td className="p-4 text-base text-deep-green font-medium">
                              {featureName}
                            </td>
                            {marketingPackages.website.packages.map((pkg, pkgIndex) => {
                              const feature = pkg.features.find(f => f.name === featureName);
                              const isIncluded = feature?.included || false;
                              const colors = [
                                { bg: 'bg-sand-light', check: 'text-terracotta' },
                                { bg: 'bg-terracotta', check: 'text-white' }
                              ]
                              const color = colors[pkgIndex]
                              
                              return (
                                <td key={pkg.id} className="p-4 text-center">
                                  {typeof isIncluded === 'string' ? (
                                    <div className={`font-bold text-base ${pkgIndex === 0 ? 'text-terracotta' : 'text-deep-green'}`}>
                                      {isIncluded}
                                    </div>
                                  ) : isIncluded ? (
                                    <div className={`inline-flex items-center justify-center w-8 h-8 ${color.bg} rounded-full`}>
                                      <Check className={`w-5 h-5 ${color.check} font-bold`} />
                                    </div>
                                  ) : (
                                    <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                      <X className="w-5 h-5 text-gray-400" />
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-sand">
                          <td className="p-6 bg-sand-light/50 rounded-bl-2xl"></td>
                          {marketingPackages.website.packages.map((pkg, index) => (
                            <td key={pkg.id} className={`p-6 text-center bg-sand-light/30 ${index === marketingPackages.website.packages.length - 1 ? 'rounded-br-2xl' : ''}`}>
                              <button
                                onClick={() => handleOpenModal('Marketing Package', 'marketing')}
                                className={`inline-block px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                  pkg.recommended
                                    ? 'bg-terracotta text-white hover:bg-terracotta-dark transform hover:scale-105'
                                    : 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white'
                                }`}
                              >
                                Get Started
                              </button>
                            </td>
                          ))}
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Maintenance Section */}
            {activeMarketingSection === 'maintenance' && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="flex justify-center items-center gap-3 mb-4">
                  <Search className="w-8 h-8 text-terracotta" />
                  <h2 className="font-serif text-4xl text-deep-green">
                    {marketingPackages.maintenance.name}
                  </h2>
                </div>
                <p className="text-lg text-deep-green/70">
                  {marketingPackages.maintenance.description}
                </p>
              </div>

              {/* Mobile Card Layout for Maintenance */}
              <div className="block md:hidden mb-12 pt-10">
                <div className="space-y-4">
                  {marketingPackages.maintenance.packages.map((pkg) => (
                    <div key={pkg.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                      {pkg.recommended && (
                        <div className="bg-terracotta text-white text-xs py-2 text-center font-medium">
                          RECOMMENDED
                        </div>
                      )}
                      <div className="p-6">
                        <div className="text-center mb-4">
                          <h3 className="font-serif text-3xl text-deep-green mb-2">
                            {pkg.name}
                          </h3>
                          <div className="text-xl font-bold text-terracotta">
                            {formatCurrency(pkg.price)}
                          </div>
                          <div className="text-xs text-deep-green/60">
                            per month
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <h4 className="font-semibold text-deep-green border-b border-sand pb-2">Features</h4>
                          {pkg.features.map((feature) => (
                            <div key={feature.name} className="flex items-start gap-2">
                              <div className={`mt-1 ${feature.included ? 'text-terracotta' : 'text-gray-300'}`}>
                                {feature.included ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                              </div>
                              <span className={`text-sm ${feature.included ? 'text-deep-green' : 'text-gray-400'}`}>
                                {feature.name}
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <button
                          onClick={() => handleOpenModal('Marketing Package', 'marketing')}
                          className={`block w-full text-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                            pkg.recommended
                              ? 'bg-terracotta text-white hover:bg-terracotta-dark'
                              : 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white'
                          }`}
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Comparison Table for Maintenance */}
              <div className="hidden md:block mb-12 pt-10">
                <div className="bg-white rounded-2xl shadow-xl overflow-visible relative">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-sand relative">
                          <th className="text-left p-6 bg-sand-light/50 rounded-tl-2xl"></th>
                          {marketingPackages.maintenance.packages.map((pkg, index) => (
                            <th key={pkg.id} className={`text-center bg-sand-light/30 min-w-[200px] h-[140px] relative ${index === marketingPackages.maintenance.packages.length - 1 ? 'rounded-tr-2xl' : ''}`}>
                              {pkg.recommended && (
                                <div className="absolute -top-8 inset-x-0 bg-terracotta text-white text-xs py-1 font-medium rounded-t-lg">
                                  RECOMMENDED
                                </div>
                              )}
                              <div className="relative h-full">
                                <div className="absolute top-2 right-2 text-right">
                                  <div className="text-xl font-bold text-terracotta">
                                    {formatCurrency(pkg.price)}
                                  </div>
                                  <div className="text-[10px] text-deep-green/60">
                                    per month
                                  </div>
                                </div>
                                <div className="absolute bottom-10 left-0 right-0 text-center">
                                  <h3 className="font-serif text-3xl text-deep-green">
                                    {pkg.name}
                                  </h3>
                                </div>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Get all unique features */}
                        {[...new Set(marketingPackages.maintenance.packages.flatMap(pkg => pkg.features.map(f => f.name)))].map((featureName, idx) => (
                          <tr key={idx} className={`border-b border-sand/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-sand-light/10'}`}>
                            <td className="p-4 text-base text-deep-green font-medium">
                              {featureName}
                            </td>
                            {marketingPackages.maintenance.packages.map((pkg, pkgIndex) => {
                              const feature = pkg.features.find(f => f.name === featureName);
                              const isIncluded = feature?.included || false;
                              const colors = [
                                { bg: 'bg-sand-light', check: 'text-terracotta' },
                                { bg: 'bg-terracotta', check: 'text-white' },
                                { bg: 'bg-deep-green', check: 'text-white' }
                              ]
                              const color = colors[pkgIndex]
                              
                              return (
                                <td key={pkg.id} className="p-4 text-center">
                                  {typeof isIncluded === 'string' ? (
                                    <div className={`font-bold text-base ${pkgIndex === 0 ? 'text-terracotta' : pkgIndex === 1 ? 'text-terracotta' : 'text-deep-green'}`}>
                                      {isIncluded}
                                    </div>
                                  ) : isIncluded ? (
                                    <div className={`inline-flex items-center justify-center w-8 h-8 ${color.bg} rounded-full`}>
                                      <Check className={`w-5 h-5 ${color.check} font-bold`} />
                                    </div>
                                  ) : (
                                    <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                      <X className="w-5 h-5 text-gray-400" />
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-sand">
                          <td className="p-6 bg-sand-light/50 rounded-bl-2xl"></td>
                          {marketingPackages.maintenance.packages.map((pkg, index) => (
                            <td key={pkg.id} className={`p-6 text-center bg-sand-light/30 ${index === marketingPackages.maintenance.packages.length - 1 ? 'rounded-br-2xl' : ''}`}>
                              <button
                                onClick={() => handleOpenModal('Marketing Package', 'marketing')}
                                className={`inline-block px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                  pkg.recommended
                                    ? 'bg-terracotta text-white hover:bg-terracotta-dark transform hover:scale-105'
                                    : 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white'
                                }`}
                              >
                                Get Started
                              </button>
                            </td>
                          ))}
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Social Section */}
            {activeMarketingSection === 'social' && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <div className="flex justify-center items-center gap-3 mb-4">
                  <MessageSquare className="w-8 h-8 text-terracotta" />
                  <h2 className="font-serif text-4xl text-deep-green">
                    {marketingPackages.social.name}
                  </h2>
                </div>
                <p className="text-lg text-deep-green/70">
                  {marketingPackages.social.description}
                </p>
              </div>

              {/* Mobile Card Layout for Social */}
              <div className="block md:hidden mb-12 pt-10">
                <div className="space-y-4">
                  {marketingPackages.social.packages.map((pkg) => (
                    <div key={pkg.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                      {pkg.recommended && (
                        <div className="bg-terracotta text-white text-xs py-2 text-center font-medium">
                          RECOMMENDED
                        </div>
                      )}
                      <div className="p-6">
                        <div className="text-center mb-4">
                          <h3 className="font-serif text-3xl text-deep-green mb-2">
                            {pkg.name}
                          </h3>
                          <div className="text-xl font-bold text-terracotta">
                            {formatCurrency(pkg.price)}
                          </div>
                          <div className="text-xs text-deep-green/60">
                            per month
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <h4 className="font-semibold text-deep-green border-b border-sand pb-2">Features</h4>
                          {pkg.features.map((feature) => (
                            <div key={feature.name} className="flex items-start gap-2">
                              {typeof feature.included === 'string' ? (
                                <>
                                  <div className="mt-1 text-terracotta">
                                    <Check className="w-4 h-4" />
                                  </div>
                                  <span className="text-sm text-deep-green">
                                    {feature.name}
                                    <span className="font-bold text-terracotta ml-1">({feature.included})</span>
                                  </span>
                                </>
                              ) : (
                                <>
                                  <div className={`mt-1 ${feature.included ? 'text-terracotta' : 'text-gray-300'}`}>
                                    {feature.included ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                                  </div>
                                  <span className={`text-sm ${feature.included ? 'text-deep-green' : 'text-gray-400'}`}>
                                    {feature.name}
                                  </span>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <button
                          onClick={() => handleOpenModal('Marketing Package', 'marketing')}
                          className={`block w-full text-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                            pkg.recommended
                              ? 'bg-terracotta text-white hover:bg-terracotta-dark'
                              : 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white'
                          }`}
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Comparison Table for Social */}
              <div className="hidden md:block mb-12 pt-10">
                <div className="bg-white rounded-2xl shadow-xl overflow-visible relative">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-sand relative">
                          <th className="text-left p-6 bg-sand-light/50 rounded-tl-2xl"></th>
                          {marketingPackages.social.packages.map((pkg, index) => (
                            <th key={pkg.id} className={`text-center bg-sand-light/30 min-w-[200px] h-[140px] relative ${index === marketingPackages.social.packages.length - 1 ? 'rounded-tr-2xl' : ''}`}>
                              {pkg.recommended && (
                                <div className="absolute -top-8 inset-x-0 bg-terracotta text-white text-xs py-1 font-medium rounded-t-lg">
                                  RECOMMENDED
                                </div>
                              )}
                              <div className="relative h-full">
                                <div className="absolute top-2 right-2 text-right">
                                  <div className="text-xl font-bold text-terracotta">
                                    {formatCurrency(pkg.price)}
                                  </div>
                                  <div className="text-[10px] text-deep-green/60">
                                    per month
                                  </div>
                                </div>
                                <div className="absolute bottom-10 left-0 right-0 text-center">
                                  <h3 className="font-serif text-3xl text-deep-green">
                                    {pkg.name}
                                  </h3>
                                </div>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Get all unique features */}
                        {[...new Set(marketingPackages.social.packages.flatMap(pkg => pkg.features.map(f => f.name)))].map((featureName, idx) => (
                          <tr key={idx} className={`border-b border-sand/30 ${idx % 2 === 0 ? 'bg-white' : 'bg-sand-light/10'}`}>
                            <td className="p-4 text-base text-deep-green font-medium">
                              {featureName}
                            </td>
                            {marketingPackages.social.packages.map((pkg, pkgIndex) => {
                              const feature = pkg.features.find(f => f.name === featureName);
                              const isIncluded = feature?.included || false;
                              const colors = [
                                { bg: 'bg-sand-light', check: 'text-terracotta' },
                                { bg: 'bg-terracotta', check: 'text-white' }
                              ]
                              const color = colors[pkgIndex]
                              
                              return (
                                <td key={pkg.id} className="p-4 text-center">
                                  {typeof isIncluded === 'string' ? (
                                    <div className={`font-bold text-base ${pkgIndex === 0 ? 'text-terracotta' : 'text-deep-green'}`}>
                                      {isIncluded}
                                    </div>
                                  ) : isIncluded ? (
                                    <div className={`inline-flex items-center justify-center w-8 h-8 ${color.bg} rounded-full`}>
                                      <Check className={`w-5 h-5 ${color.check} font-bold`} />
                                    </div>
                                  ) : (
                                    <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                      <X className="w-5 h-5 text-gray-400" />
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-sand">
                          <td className="p-6 bg-sand-light/50 rounded-bl-2xl"></td>
                          {marketingPackages.social.packages.map((pkg, index) => (
                            <td key={pkg.id} className={`p-6 text-center bg-sand-light/30 ${index === marketingPackages.social.packages.length - 1 ? 'rounded-br-2xl' : ''}`}>
                              <button
                                onClick={() => handleOpenModal('Marketing Package', 'marketing')}
                                className={`inline-block px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                  pkg.recommended
                                    ? 'bg-terracotta text-white hover:bg-terracotta-dark transform hover:scale-105'
                                    : 'border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white'
                                }`}
                              >
                                Get Started
                              </button>
                            </td>
                          ))}
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            )}
            </div>
          </div>
        </section>

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
              <button
                onClick={() => handleOpenModal('Consultation', 'operations')}
                className="px-8 py-3 bg-white/10 backdrop-blur text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 border border-white/30"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </section>
        </>
      )}

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal content */}
            <h3 className="font-serif text-2xl text-deep-green mb-2">
              Get Started with {selectedPackageName}
            </h3>
            <p className="text-gray-600 mb-6">
              Leave your details and we'll contact you within 24 hours to discuss your {selectedPackageType === 'operations' ? 'villa management' : 'marketing'} needs.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="+62 xxx xxxx xxxx"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By submitting, you agree to be contacted by AURA Villas Bali
            </p>
          </div>
        </div>
      )}

      {/* Envelope Animation */}
      <AnimatePresence>
        {showEnvelope && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[60] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                x: [0, 0, 500],
                y: [0, -50, -200],
                rotate: [0, -15, -30]
              }}
              transition={{ 
                duration: 1.5,
                times: [0, 0.3, 1],
                ease: "easeOut"
              }}
              className="bg-white rounded-lg shadow-2xl p-4"
            >
              <Mail className="w-16 h-16 text-terracotta" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: 2,
                  ease: "easeInOut"
                }}
                className="text-terracotta font-serif text-2xl"
              >
                Message Sent!
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}