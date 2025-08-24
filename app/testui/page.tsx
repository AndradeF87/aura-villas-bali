'use client'

import { GlassmorphismLuxury } from '@/components/testui/calculators/GlassmorphismLuxury'
import { GlassmorphismLuxuryTrial } from '@/components/testui/calculators/GlassmorphismLuxuryTrial'

export default function TestUI() {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden">
      {/* Original Design - Keep this intact */}
      <section id="original" className="snap-start h-screen w-full">
        <GlassmorphismLuxury />
      </section>
      
      {/* Trial Design - Make changes here */}
      <section id="trial" className="snap-start h-screen w-full">
        <GlassmorphismLuxuryTrial />
      </section>
    </div>
  )
}