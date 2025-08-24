import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // AURA Brand Colors
        terracotta: {
          DEFAULT: '#C96F4A',
          dark: '#B05A38',
          light: '#DD8B68',
        },
        'terracotta-dark': '#B05A38',
        'deep-green': {
          DEFAULT: '#2F4A3C',
          dark: '#243829',
          light: '#3A5C4A',
        },
        'deep-green-dark': '#243829',
        sand: {
          DEFAULT: '#E8DCC8',
          dark: '#D4C4A8',
          light: '#F2E9DC',
        },
        ivory: {
          DEFAULT: '#F8F4F0',
          dark: '#EDE6DD',
          light: '#FDFBF9',
        },
        cream: '#F8F4F0', // Alias for ivory
        'antique-gold': {
          DEFAULT: '#C1A265',
          dark: '#A88A50',
          light: '#D4B67A',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-in',
        'fadeInUp': 'fadeInUp 0.8s ease-out',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config