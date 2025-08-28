import { getDictionary } from '@/lib/i18n/dictionaries'
import { Locale } from '@/lib/i18n/config'
import PricingPageClient from './PricingPageClient'
import { pricingMetadata } from './metadata'

export const metadata = pricingMetadata

export default async function PricingPage({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  
  return <PricingPageClient dictionary={dictionary} locale={locale} />
}