import { Inter, Playfair_Display } from 'next/font/google'
import '../../globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
})

export default function HomeV3Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans overflow-x-hidden`}>
        {/* Completely isolated layout - no shared components */}
        {children}
      </body>
    </html>
  )
}