import { test, expect } from '@playwright/test'

test.describe('Spanish Translations', () => {
  test('Homepage should be fully in Spanish', async ({ page }) => {
    // Navigate to Spanish homepage
    await page.goto('http://localhost:3000/es-ES')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Get all text content
    const textContent = await page.textContent('body')
    
    // List of English words/phrases that should NOT appear
    const englishPhrases = [
      'Villas Bali',  // This is OK as it's the brand tagline
      'Villa Management',
      'Premium Location',
      'Selective Partnership',
      'Success Stories',
      'Property Details',
      'Calculate Your Earnings',
      'Trust Indicators',
      'Featured Villas',
      'Explore by Area',
      'Why Book with AURA',
      'How We Work',
      'Qualification Form',
      'Early Partner Program',
      'Service Tiers',
      'Technology Section',
      'Core Values',
      'Frequently Asked Questions',
      'Contact Us',
      'About Us',
      'Pricing',
      'View Details',
      'Book Now',
      'Learn More',
      'Get Started',
      'Sign Up',
      'Submit',
      'Next',
      'Previous',
      'Back',
      'Continue',
      'Close',
      'Open',
      'Menu',
      'Search',
      'Filter',
      'Sort',
      'Loading',
      'Error',
      'Success',
      'Warning',
      'Info'
    ]
    
    // Check for each English phrase
    const foundEnglish = []
    for (const phrase of englishPhrases) {
      // Skip brand names and proper nouns
      if (['AURA', 'Bali', 'Villas Bali', 'WhatsApp', 'Instagram', 'Facebook'].includes(phrase)) {
        continue
      }
      
      // Use case-sensitive search
      if (textContent?.includes(phrase)) {
        foundEnglish.push(phrase)
      }
    }
    
    // Report found English phrases
    if (foundEnglish.length > 0) {
      console.log('Found English phrases:', foundEnglish)
    }
    
    // Expect no English phrases
    expect(foundEnglish).toHaveLength(0)
    
    // Check specific elements are in Spanish
    
    // Navigation
    const navigation = page.locator('nav, [role="navigation"], .navigation-header').first()
    if (await navigation.isVisible()) {
      const navText = await navigation.textContent()
      expect(navText).not.toContain('About Us')
      expect(navText).not.toContain('Contact')
      expect(navText).not.toContain('Villas')
      expect(navText).not.toContain('Pricing')
    }
    
    // Hero section
    const hero = page.locator('[class*="hero"], [class*="Hero"]').first()
    if (await hero.isVisible()) {
      const heroText = await hero.textContent()
      expect(heroText).not.toContain('Discover')
      expect(heroText).not.toContain('Experience')
      expect(heroText).not.toContain('Book Now')
    }
    
    // Buttons
    const buttons = await page.locator('button, a[class*="button"], [role="button"]').all()
    for (const button of buttons) {
      const buttonText = await button.textContent()
      if (buttonText) {
        expect(buttonText).not.toMatch(/^(Submit|Next|Back|Continue|Close|Open|Learn More|Get Started|Book Now|View Details)$/i)
      }
    }
    
    // Form labels and placeholders
    const inputs = await page.locator('input, textarea, select').all()
    for (const input of inputs) {
      const placeholder = await input.getAttribute('placeholder')
      if (placeholder) {
        expect(placeholder).not.toMatch(/^(Enter|Type|Select|Choose|Search|Filter)/i)
      }
    }
    
    // Check that Spanish content exists
    const spanishIndicators = [
      'Descubre',
      'Reservar',
      'Gestión',
      'Propiedades',
      'Experiencia',
      'Contacto',
      'Nosotros',
      'Precios',
      'Ganancias',
      'Siguiente',
      'Anterior',
      'Enviar',
      'Cerrar',
      'Abrir'
    ]
    
    let foundSpanish = 0
    for (const indicator of spanishIndicators) {
      if (textContent?.includes(indicator)) {
        foundSpanish++
      }
    }
    
    // Expect at least some Spanish content
    expect(foundSpanish).toBeGreaterThan(0)
    
    console.log(`Found ${foundSpanish} Spanish indicators out of ${spanishIndicators.length}`)
  })
  
  test('Property Management page should be in Spanish', async ({ page }) => {
    await page.goto('http://localhost:3000/es-ES/property-management')
    await page.waitForLoadState('networkidle')
    
    const textContent = await page.textContent('body')
    
    // Check for Spanish content
    expect(textContent).toContain('Gestión')
    
    // Should not contain English
    expect(textContent).not.toContain('Property Management')
    expect(textContent).not.toContain('Calculate Your Earnings')
    expect(textContent).not.toContain('How We Work')
  })
  
  test('Guest Booking page should be in Spanish', async ({ page }) => {
    await page.goto('http://localhost:3000/es-ES/guest-booking')
    await page.waitForLoadState('networkidle')
    
    const textContent = await page.textContent('body')
    
    // Check for Spanish content
    expect(textContent).toContain('Reservar')
    
    // Should not contain English
    expect(textContent).not.toContain('Guest Booking')
    expect(textContent).not.toContain('Why Book with AURA')
    expect(textContent).not.toContain('Featured Villas')
  })
})