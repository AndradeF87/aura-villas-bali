import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface RelatedLink {
  href: string
  label: string
  description?: string
}

interface InternalLinksProps {
  title?: string
  links: RelatedLink[]
  className?: string
}

export function InternalLinks({ 
  title = 'Related Pages', 
  links, 
  className = '' 
}: InternalLinksProps) {
  return (
    <section className={`bg-sand-light rounded-xl p-6 ${className}`}>
      <h3 className="font-serif text-xl text-deep-green mb-4">{title}</h3>
      <div className="space-y-3">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-terracotta mt-0.5 group-hover:translate-x-1 transition-transform" />
            <div className="flex-1">
              <span className="font-medium text-deep-green group-hover:text-terracotta transition-colors">
                {link.label}
              </span>
              {link.description && (
                <p className="text-sm text-deep-green/60 mt-1">
                  {link.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// Predefined internal links for different pages
export const internalLinks = {
  homepage: [
    { href: '/villas', label: 'Browse Our Villas', description: 'Explore our luxury villa collection' },
    { href: '/pricing', label: 'Management Pricing', description: 'Transparent pricing for villa owners' },
    { href: '/about', label: 'About AURA', description: 'Our story and mission' },
  ],
  villas: [
    { href: '/contact', label: 'Book Your Stay', description: 'Contact us for availability' },
    { href: '/pricing', label: 'List Your Property', description: 'Join our villa management program' },
    { href: '/', label: 'Why Choose AURA', description: 'Learn about our services' },
  ],
  pricing: [
    { href: '/contact', label: 'Get Started', description: 'Contact us to list your property' },
    { href: '/villas', label: 'See Our Portfolio', description: 'View properties we manage' },
    { href: '/about', label: 'Meet Our Team', description: 'Learn about our expertise' },
  ],
  about: [
    { href: '/villas', label: 'Our Properties', description: 'Browse luxury villas' },
    { href: '/pricing', label: 'Management Services', description: 'Professional villa management' },
    { href: '/contact', label: 'Get in Touch', description: 'Start your journey with us' },
  ],
  contact: [
    { href: '/villas', label: 'Available Villas', description: 'Find your perfect Bali escape' },
    { href: '/pricing', label: 'Owner Services', description: 'Property management solutions' },
    { href: '/about', label: 'Why AURA', description: 'Our approach and values' },
  ],
}