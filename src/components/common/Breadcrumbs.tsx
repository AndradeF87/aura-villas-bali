'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center space-x-2 text-sm ${className}`}
    >
      <Link 
        href="/" 
        className="flex items-center text-deep-green/60 hover:text-deep-green transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        
        return (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-deep-green/40" />
            {isLast || !item.href ? (
              <span 
                className="text-deep-green font-medium"
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="text-deep-green/60 hover:text-deep-green transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}

// JSON-LD Schema for breadcrumbs
export function generateBreadcrumbSchema(items: BreadcrumbItem[], baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: item.href ? `${baseUrl}${item.href}` : undefined
      }))
    ]
  }
}