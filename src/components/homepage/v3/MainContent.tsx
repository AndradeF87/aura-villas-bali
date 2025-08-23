'use client'

import { VillaVignette } from './VillaVignette'

export function MainContent() {
  return (
    <div className="relative w-full h-screen">
      {/* Subtle gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Villa Vignette - Bottom Left */}
      <VillaVignette />
    </div>
  )
}