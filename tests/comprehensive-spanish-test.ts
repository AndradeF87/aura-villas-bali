import { test, expect } from '@playwright/test'

test.describe('Comprehensive Spanish Translation Test', () => {
  test('Spanish homepage should have NO English text at all', async ({ page }) => {
    // Navigate to Spanish version
    await page.goto('http://localhost:3002/es-ES')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    
    // Take screenshot for debugging
    await page.screenshot({ 
      path: 'tests/screenshots/spanish-page-full.png', 
      fullPage: true 
    })
    
    // Get all text content from the page
    const pageText = await page.evaluate(() => {
      // Remove script and style elements
      const scripts = document.querySelectorAll('script, style, noscript')
      scripts.forEach(el => el.remove())
      
      // Get all text
      return document.body.innerText || document.body.textContent || ''
    })
    
    console.log('Page text sample (first 500 chars):', pageText.substring(0, 500))
    
    // List of English phrases that absolutely should NOT appear
    const forbiddenEnglishPhrases = [
      // Navigation
      'Property Management',
      'Guest Booking',
      'About',
      'Contact',
      'Villas',
      
      // Hero/Headers
      'Experience Elevated',
      'Premium Villa Management',
      'Luxury Redefined',
      
      // Buttons/CTAs
      'Learn More',
      'Get Started',
      'Book Now',
      'View Details',
      'Apply Now',
      'Submit',
      'Send Message',
      'Contact Us',
      'Start Now',
      'Discover More',
      
      // Sections
      'Why Book with AURA',
      'Why Choose AURA',
      'Calculate Your Earnings',
      'Success Stories',
      'How We Work',
      'Service Tiers',
      'Technology',
      'Challenges',
      'Our Services',
      'Featured Villas',
      
      // Calculator specific
      'Nightly Rate',
      'Expected Occupancy',
      'Management Tier',
      'Essential',
      'Premium',
      'Boutique',
      'Your Property Details',
      'Your Estimated Earnings',
      'Annual Net Earnings',
      'Monthly Revenue',
      'Monthly Earnings',
      'Show Detailed',
      'Hide Detailed',
      'Start Earning',
      
      // Common UI elements
      'Loading',
      'Please wait',
      'Required',
      'Optional',
      'Select',
      'Choose',
      'Enter',
      'Click here',
      
      // Property Management specific
      'Higher Occupancy',
      'Premium Rates',
      'Year-Round Bookings',
      'revenue increase',
      'View testimonial',
      
      // WhatsApp
      'Chat with us',
      'Hi AURA team'
    ]
    
    // Check for forbidden English phrases
    const foundEnglish = []
    for (const phrase of forbiddenEnglishPhrases) {
      if (pageText.includes(phrase)) {
        foundEnglish.push(phrase)
        console.error(`❌ Found English: "${phrase}"`)
      }
    }
    
    // Check that key Spanish phrases ARE present
    const requiredSpanishPhrases = [
      'Gestión', // Management
      'Reserva', // Booking
      'Acerca', // About
      'Contacto', // Contact
      'Ganancias', // Earnings
      'Calcul', // Calculate
      'Español' // Spanish language indicator
    ]
    
    const missingSpanish = []
    for (const phrase of requiredSpanishPhrases) {
      if (!pageText.includes(phrase)) {
        missingSpanish.push(phrase)
        console.error(`⚠️ Missing Spanish keyword: "${phrase}"`)
      }
    }
    
    // Report results
    if (foundEnglish.length > 0) {
      console.error('\n❌ ENGLISH TEXT FOUND:')
      foundEnglish.forEach(text => console.error(`   - ${text}`))
    }
    
    if (missingSpanish.length > 0) {
      console.error('\n⚠️ EXPECTED SPANISH NOT FOUND:')
      missingSpanish.forEach(text => console.error(`   - ${text}`))
    }
    
    if (foundEnglish.length === 0 && missingSpanish.length === 0) {
      console.log('✅ Page is fully translated to Spanish!')
    }
    
    // Assert no English text was found
    expect(foundEnglish).toHaveLength(0)
    expect(missingSpanish).toHaveLength(0)
  })
  
  test('Interactive elements should work in Spanish', async ({ page }) => {
    await page.goto('http://localhost:3002/es-ES')
    await page.waitForLoadState('networkidle')
    
    // Test navigation menu
    const navLinks = await page.locator('nav a').count()
    console.log(`Found ${navLinks} navigation links`)
    
    // Check all navigation links for English text
    for (let i = 0; i < navLinks; i++) {
      const linkText = await page.locator('nav a').nth(i).textContent()
      console.log(`Nav link ${i}: ${linkText}`)
      
      // Should not contain common English nav terms
      expect(linkText).not.toContain('Property Management')
      expect(linkText).not.toContain('Guest Booking')
      expect(linkText).not.toContain('About')
      expect(linkText).not.toContain('Contact')
    }
    
    // Test buttons
    const buttons = await page.locator('button').count()
    console.log(`Found ${buttons} buttons`)
    
    // Check all buttons for English text
    for (let i = 0; i < Math.min(buttons, 10); i++) { // Check first 10 buttons
      const buttonText = await page.locator('button').nth(i).textContent()
      if (buttonText && buttonText.trim()) {
        console.log(`Button ${i}: ${buttonText}`)
        
        // Should not contain common English button text
        expect(buttonText).not.toContain('Get Started')
        expect(buttonText).not.toContain('Learn More')
        expect(buttonText).not.toContain('Submit')
        expect(buttonText).not.toContain('Send')
      }
    }
  })
  
  test('Forms should have Spanish labels and placeholders', async ({ page }) => {
    await page.goto('http://localhost:3002/es-ES')
    await page.waitForLoadState('networkidle')
    
    // Check all input fields
    const inputs = await page.locator('input[type="text"], input[type="email"], input[type="tel"], textarea').all()
    
    for (const input of inputs) {
      const placeholder = await input.getAttribute('placeholder')
      const label = await input.evaluate((el) => {
        const id = el.id
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`)
          return label?.textContent || ''
        }
        return ''
      })
      
      if (placeholder) {
        console.log(`Input placeholder: ${placeholder}`)
        // Common English placeholders to check
        expect(placeholder).not.toContain('Enter your')
        expect(placeholder).not.toContain('Your name')
        expect(placeholder).not.toContain('Email address')
        expect(placeholder).not.toContain('Phone number')
      }
      
      if (label) {
        console.log(`Input label: ${label}`)
        // Common English labels to check
        expect(label).not.toContain('Name')
        expect(label).not.toContain('Email')
        expect(label).not.toContain('Phone')
        expect(label).not.toContain('Message')
      }
    }
    
    // Check all select dropdowns
    const selects = await page.locator('select').all()
    
    for (const select of selects) {
      const options = await select.locator('option').allTextContents()
      console.log('Select options:', options)
      
      for (const option of options) {
        if (option && option !== '') {
          // Common English select options to check
          expect(option).not.toContain('Select')
          expect(option).not.toContain('Choose')
          expect(option).not.toContain('Please select')
        }
      }
    }
  })
})