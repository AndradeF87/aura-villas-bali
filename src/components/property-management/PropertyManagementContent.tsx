'use client'

import { PropertyManagementVignette } from './PropertyManagementVignette'

export function PropertyManagementContent() {
  return (
    <div className="relative w-full h-screen">
      {/* Subtle gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Property Management Vignette - Bottom Left */}
      <PropertyManagementVignette />
    </div>
  )
}