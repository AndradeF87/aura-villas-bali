'use client'

import { useEffect } from 'react'

export function HideScrollbar() {
  useEffect(() => {
    // Add styles to hide scrollbar on html and body
    const style = document.createElement('style')
    style.innerHTML = `
      html {
        scrollbar-width: none !important; /* Firefox */
        -ms-overflow-style: none !important; /* Internet Explorer 10+ */
      }
      html::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
        display: none !important; /* WebKit */
      }
      body {
        scrollbar-width: none !important; /* Firefox */
        -ms-overflow-style: none !important; /* Internet Explorer 10+ */
      }
      body::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
        display: none !important; /* WebKit */
      }
      .homepage-wrapper {
        scrollbar-width: none !important; /* Firefox */
        -ms-overflow-style: none !important; /* Internet Explorer 10+ */
      }
      .homepage-wrapper::-webkit-scrollbar {
        width: 0 !important;
        height: 0 !important;
        display: none !important; /* WebKit */
      }
    `
    document.head.appendChild(style)
    
    // Also apply directly to body and html elements
    document.documentElement.style.scrollbarWidth = 'none'
    document.documentElement.style.msOverflowStyle = 'none'
    document.body.style.scrollbarWidth = 'none'
    document.body.style.msOverflowStyle = 'none'
    
    return () => {
      document.head.removeChild(style)
      // Reset on unmount
      document.documentElement.style.scrollbarWidth = ''
      document.documentElement.style.msOverflowStyle = ''
      document.body.style.scrollbarWidth = ''
      document.body.style.msOverflowStyle = ''
    }
  }, [])
  
  return null
}