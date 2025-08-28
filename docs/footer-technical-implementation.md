# AURA Villas Bali - Footer Technical Implementation Guide

## 🏗️ Technical Architecture

### Component Structure
```
src/components/layout/footer/
├── index.ts                 # Barrel exports
├── Footer.tsx              # Main footer container
├── PreFooterCTA.tsx        # Newsletter signup section
├── MainFooter/
│   ├── index.tsx           # Main footer grid
│   ├── BrandColumn.tsx     # Brand & social links
│   ├── QuickLinksColumn.tsx # Navigation links
│   ├── ServicesColumn.tsx   # Service offerings
│   ├── ResourcesColumn.tsx  # Resources & guides
│   └── ContactColumn.tsx    # Contact information
├── FooterBottom.tsx        # Copyright & legal
├── MobileFooter/
│   ├── index.tsx           # Mobile accordion layout
│   ├── AccordionSection.tsx # Expandable sections
│   └── StickyWhatsApp.tsx   # Floating WhatsApp button
└── hooks/
    ├── useFooterAnalytics.ts # Analytics tracking
    ├── useNewsletterSignup.ts # Newsletter functionality
    └── useAccordionState.ts   # Mobile accordion state
```

### Data Architecture
```typescript
// Footer data types
export interface FooterData {
  brand: BrandInfo;
  navigation: NavigationSection[];
  contact: ContactInfo;
  social: SocialLink[];
  legal: LegalLink[];
  newsletter: NewsletterConfig;
}

export interface BrandInfo {
  name: string;
  tagline: string;
  description: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  trustBadges: TrustBadge[];
}

export interface NavigationSection {
  id: string;
  title: string;
  links: NavigationLink[];
  order: number;
}

export interface ContactInfo {
  whatsapp: {
    number: string;
    message?: string;
    trackingId: string;
  };
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    country: string;
    coordinates?: [number, number];
  };
  businessHours: BusinessHours;
}

export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'whatsapp' | 'linkedin';
  url: string;
  icon: string;
  trackingId: string;
}
```

---

## 🎯 Implementation Strategy

### 1. Foundation Setup
```bash
# Create directory structure
mkdir -p src/components/layout/footer/{MainFooter,MobileFooter,hooks}

# Install additional dependencies
npm install react-hook-form @hookform/resolvers yup
npm install @headlessui/react # For accessible components
npm install framer-motion # For animations
npm install react-intersection-observer # For scroll animations
```

### 2. Core Footer Component
```typescript
// src/components/layout/footer/Footer.tsx
'use client';

import { FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/i18n/config';
import { PreFooterCTA } from './PreFooterCTA';
import { MainFooter } from './MainFooter';
import { FooterBottom } from './FooterBottom';
import { MobileFooter } from './MobileFooter';
import { StickyWhatsApp } from './MobileFooter/StickyWhatsApp';
import { useFooterData } from './hooks/useFooterData';
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface FooterProps {
  locale: Locale;
  dictionary: any; // Replace with proper type
}

export const Footer: FC<FooterProps> = ({ locale, dictionary }) => {
  const { isMobile } = useBreakpoint();
  const footerData = useFooterData(locale);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-deep-green relative overflow-hidden"
    >
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-sand/10 to-transparent" />
      </div>

      <div className="relative z-10">
        <PreFooterCTA
          locale={locale}
          dictionary={dictionary.footer}
          newsletter={footerData.newsletter}
        />

        {isMobile ? (
          <MobileFooter
            locale={locale}
            dictionary={dictionary.footer}
            data={footerData}
          />
        ) : (
          <MainFooter
            locale={locale}
            dictionary={dictionary.footer}
            data={footerData}
          />
        )}

        <FooterBottom
          locale={locale}
          dictionary={dictionary.footer}
          legal={footerData.legal}
        />
      </div>

      {isMobile && (
        <StickyWhatsApp
          phoneNumber={footerData.contact.whatsapp.number}
          message={footerData.contact.whatsapp.message}
          trackingId={footerData.contact.whatsapp.trackingId}
        />
      )}
    </motion.footer>
  );
};
```

### 3. Pre-Footer CTA Component
```typescript
// src/components/layout/footer/PreFooterCTA.tsx
'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNewsletterSignup } from './hooks/useNewsletterSignup';
import type { Locale } from '@/lib/i18n/config';

interface NewsletterFormData {
  email: string;
  consent?: boolean;
}

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  consent: yup.boolean().oneOf([true], 'Consent is required'),
});

interface PreFooterCTAProps {
  locale: Locale;
  dictionary: any;
  newsletter: any;
}

export const PreFooterCTA: FC<PreFooterCTAProps> = ({
  locale,
  dictionary,
  newsletter,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { signup, isLoading, error } = useNewsletterSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      await signup({
        email: data.email,
        locale,
        source: 'footer_cta',
        consent: data.consent,
      });
      setIsSubmitted(true);
      reset();
    } catch (err) {
      console.error('Newsletter signup failed:', err);
    }
  };

  if (isSubmitted) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-deep-green py-16 px-6"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-terracotta/10 backdrop-blur-md border border-terracotta/20 rounded-2xl p-8"
          >
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-2xl font-serif text-sand mb-2">
              {dictionary.newsletter.successTitle}
            </h3>
            <p className="text-sand/80">
              {dictionary.newsletter.successMessage}
            </p>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <section className="bg-deep-green py-20 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-terracotta/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sand/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-sand/10 backdrop-blur-md border border-sand/20 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif text-sand mb-4">
              {dictionary.newsletter.headline}
            </h2>
            <p className="text-sand/80 text-lg">
              {dictionary.newsletter.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  {...register('email')}
                  type="email"
                  placeholder={dictionary.newsletter.placeholder}
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-full text-sand placeholder-sand/60 focus:outline-none focus:ring-2 focus:ring-terracotta/50 focus:border-terracotta/50 transition-all"
                />
                {errors.email && (
                  <p className="text-terracotta text-sm mt-2 px-6">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-terracotta text-white rounded-full font-semibold hover:bg-terracotta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isLoading ? dictionary.newsletter.subscribing : dictionary.newsletter.subscribe}
              </motion.button>
            </div>

            {/* GDPR Consent for EU users */}
            {locale === 'es-ES' && (
              <div className="flex items-start gap-3 text-sm">
                <input
                  {...register('consent')}
                  type="checkbox"
                  id="consent"
                  className="mt-1 rounded border-sand/20 bg-white/10 text-terracotta focus:ring-terracotta/50"
                />
                <label htmlFor="consent" className="text-sand/80 flex-1">
                  {dictionary.newsletter.consent}
                </label>
                {errors.consent && (
                  <p className="text-terracotta text-sm">
                    {errors.consent.message}
                  </p>
                )}
              </div>
            )}

            {error && (
              <p className="text-terracotta text-sm text-center">
                {dictionary.newsletter.error}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};
```

### 4. Main Footer Grid Component
```typescript
// src/components/layout/footer/MainFooter/index.tsx
'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { BrandColumn } from './BrandColumn';
import { QuickLinksColumn } from './QuickLinksColumn';
import { ServicesColumn } from './ServicesColumn';
import { ResourcesColumn } from './ResourcesColumn';
import { ContactColumn } from './ContactColumn';
import type { Locale } from '@/lib/i18n/config';

interface MainFooterProps {
  locale: Locale;
  dictionary: any;
  data: any;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
    },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const MainFooter: FC<MainFooterProps> = ({
  locale,
  dictionary,
  data,
}) => {
  return (
    <section className="py-20 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-16">
          <motion.div variants={columnVariants} className="lg:col-span-1">
            <BrandColumn
              brand={data.brand}
              social={data.social}
              dictionary={dictionary.brand}
            />
          </motion.div>

          <motion.div variants={columnVariants}>
            <QuickLinksColumn
              links={data.navigation.quickLinks}
              dictionary={dictionary.quickLinks}
              locale={locale}
            />
          </motion.div>

          <motion.div variants={columnVariants}>
            <ServicesColumn
              services={data.navigation.services}
              dictionary={dictionary.services}
              locale={locale}
            />
          </motion.div>

          <motion.div variants={columnVariants}>
            <ResourcesColumn
              resources={data.navigation.resources}
              dictionary={dictionary.resources}
              locale={locale}
            />
          </motion.div>

          <motion.div variants={columnVariants} className="lg:col-span-1">
            <ContactColumn
              contact={data.contact}
              dictionary={dictionary.contact}
              locale={locale}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
```

### 5. Brand Column Component
```typescript
// src/components/layout/footer/MainFooter/BrandColumn.tsx
'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Instagram, Facebook, MessageCircle, Star } from 'lucide-react';

interface BrandColumnProps {
  brand: any;
  social: any[];
  dictionary: any;
}

const iconMap = {
  instagram: Instagram,
  facebook: Facebook,
  whatsapp: MessageCircle,
};

export const BrandColumn: FC<BrandColumnProps> = ({
  brand,
  social,
  dictionary,
}) => {
  return (
    <div className="space-y-6">
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Link href="/" className="block">
          <div>
            <span className="font-serif text-4xl font-bold tracking-wider text-sand">
              AURA
            </span>
            <span className="text-xs tracking-[0.3em] uppercase mt-1 block text-sand/80">
              {brand.tagline}
            </span>
          </div>
        </Link>
      </motion.div>

      {/* Description */}
      <p className="text-sand/80 leading-relaxed">
        {brand.description}
      </p>

      {/* Social Links */}
      <div className="flex gap-4">
        {social.map((link, index) => {
          const Icon = iconMap[link.platform as keyof typeof iconMap];
          if (!Icon) return null;

          return (
            <motion.a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-sand/10 flex items-center justify-center hover:bg-terracotta/20 transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Icon className="w-5 h-5 text-sand" />
            </motion.a>
          );
        })}
      </div>

      {/* Trust Badges */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sand/80 text-sm">4.9/5 (124 reviews)</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full" />
          <span className="text-sand/80 text-sm">Verified Partner</span>
        </div>
      </div>
    </div>
  );
};
```

### 6. Mobile Accordion Footer
```typescript
// src/components/layout/footer/MobileFooter/index.tsx
'use client';

import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { BrandColumn } from '../MainFooter/BrandColumn';
import { AccordionSection } from './AccordionSection';
import type { Locale } from '@/lib/i18n/config';

interface MobileFooterProps {
  locale: Locale;
  dictionary: any;
  data: any;
}

export const MobileFooter: FC<MobileFooterProps> = ({
  locale,
  dictionary,
  data,
}) => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-md mx-auto space-y-8">
        {/* Brand Section - Always Visible */}
        <div className="text-center">
          <BrandColumn
            brand={data.brand}
            social={data.social}
            dictionary={dictionary.brand}
          />
        </div>

        {/* Accordion Sections */}
        <div className="space-y-1">
          <AccordionSection
            title={dictionary.quickLinks.title}
            defaultExpanded={false}
          >
            <div className="space-y-3">
              {data.navigation.quickLinks.map((link: any) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="block text-sand/80 hover:text-terracotta transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection
            title={dictionary.services.title}
            defaultExpanded={false}
          >
            <div className="space-y-3">
              {data.navigation.services.map((service: any) => (
                <div key={service.id} className="text-sand/80">
                  {service.label}
                  {service.badge && (
                    <span className="ml-2 text-xs bg-terracotta/20 text-terracotta px-2 py-1 rounded">
                      {service.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection
            title={dictionary.resources.title}
            defaultExpanded={false}
          >
            <div className="space-y-3">
              {data.navigation.resources.map((resource: any) => (
                <div key={resource.id} className="text-sand/80">
                  {resource.label}
                  {resource.badge && (
                    <span className="ml-2 text-xs bg-terracotta/20 text-terracotta px-2 py-1 rounded">
                      {resource.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </AccordionSection>

          <AccordionSection
            title={dictionary.contact.title}
            defaultExpanded={false}
          >
            <div className="space-y-4">
              <a
                href={`https://wa.me/${data.contact.whatsapp.number}`}
                className="flex items-center gap-3 text-sand/80 hover:text-terracotta transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href={`mailto:${data.contact.email}`}
                className="flex items-center gap-3 text-sand/80 hover:text-terracotta transition-colors"
              >
                <Mail className="w-5 h-5" />
                {data.contact.email}
              </a>
              <div className="text-sand/80 text-sm">
                <div>{data.contact.address.street}</div>
                <div>{data.contact.address.city}, {data.contact.address.country}</div>
                <div className="mt-2">{data.contact.businessHours.display}</div>
              </div>
            </div>
          </AccordionSection>
        </div>
      </div>
    </section>
  );
};
```

### 7. Accordion Section Component
```typescript
// src/components/layout/footer/MobileFooter/AccordionSection.tsx
'use client';

import { FC, ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionSectionProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export const AccordionSection: FC<AccordionSectionProps> = ({
  title,
  children,
  defaultExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="border-b border-sand/10">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none focus:ring-2 focus:ring-terracotta/50 rounded"
        aria-expanded={isExpanded}
      >
        <span className="text-sand font-semibold text-lg">{title}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-terracotta" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
```

### 8. Sticky WhatsApp Component
```typescript
// src/components/layout/footer/MobileFooter/StickyWhatsApp.tsx
'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useFooterAnalytics } from '../hooks/useFooterAnalytics';

interface StickyWhatsAppProps {
  phoneNumber: string;
  message?: string;
  trackingId: string;
}

export const StickyWhatsApp: FC<StickyWhatsAppProps> = ({
  phoneNumber,
  message = 'Hello! I\'m interested in AURA villas.',
  trackingId,
}) => {
  const { trackClick } = useFooterAnalytics();

  const handleClick = () => {
    trackClick('whatsapp_sticky', trackingId);
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg z-50"
      style={{
        boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)',
      }}
    >
      <MessageCircle className="w-7 h-7 text-white" />
      
      {/* Pulse animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.button>
  );
};
```

---

## 📊 Performance & Analytics

### Analytics Integration
```typescript
// src/components/layout/footer/hooks/useFooterAnalytics.ts
import { useCallback } from 'react';
import { analytics } from '@/lib/analytics';

export const useFooterAnalytics = () => {
  const trackClick = useCallback((action: string, label?: string) => {
    analytics.track('Footer Interaction', {
      action,
      label,
      timestamp: Date.now(),
    });
  }, []);

  const trackNewsletterSignup = useCallback((email: string, source: string) => {
    analytics.track('Newsletter Signup', {
      email,
      source,
      timestamp: Date.now(),
    });
  }, []);

  return {
    trackClick,
    trackNewsletterSignup,
  };
};
```

### Newsletter Integration
```typescript
// src/components/layout/footer/hooks/useNewsletterSignup.ts
import { useState } from 'react';
import { useFooterAnalytics } from './useFooterAnalytics';

interface SignupData {
  email: string;
  locale: string;
  source: string;
  consent?: boolean;
}

export const useNewsletterSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { trackNewsletterSignup } = useFooterAnalytics();

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const result = await response.json();
      trackNewsletterSignup(data.email, data.source);
      
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signup,
    isLoading,
    error,
  };
};
```

This technical implementation provides a solid foundation for building the AURA footer system with proper TypeScript typing, performance optimization, accessibility features, and analytics integration. The modular architecture ensures maintainability and scalability as the project grows.