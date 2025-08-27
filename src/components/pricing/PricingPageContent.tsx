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

// Move all the existing content from pricing/page.tsx here
export default function PricingPageContent() {
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

  const handleOpenModal = (packageName: string, packageType: 'operations' | 'marketing') => {
    setSelectedPackageName(packageName)
    setSelectedPackageType(packageType)
    setFormData({ ...formData, packageName, packageType })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      packageName: '',
      packageType: ''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowEnvelope(true)
        setTimeout(() => {
          setShowModal(false)
          setShowEnvelope(false)
          setFormData({
            name: '',
            email: '',
            phone: '',
            packageName: '',
            packageType: ''
          })
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Copy ALL the rest of the pricing page content here (operationsPackages, marketingPackages, components, JSX, etc.)
  // This is just the structure - you need to copy the full content from the original file
  
  // ... rest of the pricing page implementation ...
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Copy all the JSX from the original pricing page here */}
    </div>
  )
}