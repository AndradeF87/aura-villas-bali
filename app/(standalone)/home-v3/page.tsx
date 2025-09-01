import { Metadata } from 'next'
import { HomeV3 } from '@/components/homepage/v3/HomeV3'

export const metadata: Metadata = {
  title: 'AURA Villas Bali - Where Luxury Meets Paradise',
  description: 'Experience sophisticated luxury villa rentals in Bali with our immersive homepage featuring stunning animations and premium villa collections.',
  keywords: 'luxury villas Bali, premium accommodation, Uluwatu villas, Canggu villas, Seminyak villas, luxury travel Bali',
}

export default function HomeV3Page() {
  return <HomeV3 />
}