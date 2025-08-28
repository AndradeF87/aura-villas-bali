import { test, expect } from '@playwright/test'

test.describe('Final Spanish Translation Validation', () => {
  test('Spanish homepage should have NO English text', async ({ page }) => {
    await page.goto('http://localhost:3002/es-ES')
    await page.waitForLoadState('networkidle')
    
    // Wait for content to be rendered
    await page.waitForTimeout(2000)
    
    // Take a screenshot for visual verification
    await page.screenshot({ path: 'tests/screenshots/spanish-homepage.png', fullPage: true })
    
    // Get all visible text content
    const textContent = await page.evaluate(() => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const parent = node.parentElement
            if (!parent) return NodeFilter.FILTER_REJECT
            
            // Skip script and style elements
            if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') {
              return NodeFilter.FILTER_REJECT
            }
            
            // Skip hidden elements
            const style = window.getComputedStyle(parent)
            if (style.display === 'none' || style.visibility === 'hidden') {
              return NodeFilter.FILTER_REJECT
            }
            
            // Only accept non-empty text
            const text = node.textContent?.trim()
            if (!text || text.length === 0) {
              return NodeFilter.FILTER_REJECT
            }
            
            return NodeFilter.FILTER_ACCEPT
          }
        }
      )
      
      const texts = []
      let node
      while (node = walker.nextNode()) {
        const text = node.textContent?.trim()
        if (text && text.length > 0) {
          texts.push(text)
        }
      }
      
      return texts.join(' ')
    })
    
    console.log('Extracted text content:', textContent.substring(0, 500))
    
    // Common English words that should NOT appear
    const englishPhrases = [
      'Experience Elevated',
      'Premium Villa Management',
      'Property Management',
      'Guest Booking',
      'About',
      'Contact',
      'Learn More',
      'Get Started',
      'Book Now',
      'View Details',
      'Why Book with AURA',
      'Calculate Your Earnings',
      'Success Stories',
      'How We Work',
      'Service Tiers',
      'Technology',
      'Challenges',
      'Qualification',
      'Select your',
      'Select Your',
      'Choose your',
      'Choose Your',
      'Expected Occupancy',
      'Management Tier',
      'Essential',
      'Premium',
      'Boutique',
      'Higher Occupancy',
      'Premium Rates',
      'Year-Round Bookings',
      'Annual Net Earnings',
      'Monthly Revenue',
      'Monthly Earnings',
      'Show Detailed',
      'Hide Detailed',
      'Start Earning',
      'Chat with us',
      'Hi AURA team'
    ]
    
    // Check for English phrases
    const foundEnglishPhrases = []
    for (const phrase of englishPhrases) {
      if (textContent.includes(phrase)) {
        foundEnglishPhrases.push(phrase)
      }
    }
    
    // Report found English phrases
    if (foundEnglishPhrases.length > 0) {
      console.error('Found English phrases that should be translated:')
      foundEnglishPhrases.forEach(phrase => {
        console.error(`  - "${phrase}"`)
      })
    }
    
    // Check that Spanish content IS present
    const expectedSpanishContent = [
      'Gestión Premium de Villas',
      'Reserva de Huéspedes',
      'Acerca de',
      'Contacto',
      'Experiencia Elevada',
      'Calcula Tus Ganancias',
      'Por Qué Reservar con AURA'
    ]
    
    const missingSpanishContent = []
    for (const content of expectedSpanishContent) {
      if (!textContent.includes(content)) {
        missingSpanishContent.push(content)
      }
    }
    
    if (missingSpanishContent.length > 0) {
      console.error('Expected Spanish content not found:')
      missingSpanishContent.forEach(content => {
        console.error(`  - "${content}"`)
      })
    }
    
    // Final assertions
    expect(foundEnglishPhrases.length).toBe(0)
    expect(missingSpanishContent.length).toBe(0)
  })
  
  test('Spanish property management sections should be fully translated', async ({ page }) => {
    await page.goto('http://localhost:3002/es-ES')
    await page.waitForLoadState('networkidle')
    
    // Scroll to property management sections
    await page.evaluate(() => {
      // Scroll to calculator
      const calculator = document.querySelector('[class*="Calculate"]')
      calculator?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
    
    await page.waitForTimeout(1000)
    
    // Check calculator section
    const calculatorText = await page.locator('section:has-text("Calcula")').textContent()
    
    // Should NOT contain English calculator text
    expect(calculatorText).not.toContain('Calculate Your Earnings')
    expect(calculatorText).not.toContain('Nightly Rate')
    expect(calculatorText).not.toContain('Expected Occupancy')
    expect(calculatorText).not.toContain('Management Tier')
    
    // Should contain Spanish text
    expect(calculatorText).toContain('Calcula Tus Ganancias')
    
    // Scroll to service tiers
    await page.evaluate(() => {
      const tiers = document.querySelector('[class*="ServiceTier"]')
      tiers?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
    
    await page.waitForTimeout(1000)
    
    // Check service tiers section
    const tiersText = await page.locator('section:has-text("Nivel")').textContent()
    
    // Should NOT contain English tier text
    expect(tiersText).not.toContain('Choose Your Partnership Level')
    expect(tiersText).not.toContain('Get Started')
    expect(tiersText).not.toContain('Apply for Invitation')
  })
  
  test('WhatsApp button should use Spanish text', async ({ page }) => {
    await page.goto('http://localhost:3002/es-ES')
    await page.waitForLoadState('networkidle')
    
    // Scroll to trigger WhatsApp button visibility
    await page.evaluate(() => window.scrollBy(0, 200))
    await page.waitForTimeout(1000)
    
    // Hover over WhatsApp button to see tooltip
    const whatsappButton = page.locator('button[aria-label*="WhatsApp"]')
    if (await whatsappButton.isVisible()) {
      await whatsappButton.hover()
      await page.waitForTimeout(500)
      
      // Check tooltip text
      const tooltipText = await page.locator('button[aria-label*="WhatsApp"] span').textContent()
      
      // Should be in Spanish
      expect(tooltipText).not.toContain('Chat with us')
      expect(tooltipText).toContain('Chatea con nosotros')
    }
  })
  
  test('Success stories should be in Spanish', async ({ page }) => {
    await page.goto('http://localhost:3002/es-ES')
    await page.waitForLoadState('networkidle')
    
    // Scroll to success stories
    await page.evaluate(() => {
      const stories = document.querySelector('[class*="SuccessStories"]')
      stories?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
    
    await page.waitForTimeout(1000)
    
    // Check success stories text
    const storiesSection = page.locator('section:has-text("Historias")')
    if (await storiesSection.isVisible()) {
      const storiesText = await storiesSection.textContent()
      
      // Should NOT have English text
      expect(storiesText).not.toContain('Success Stories')
      expect(storiesText).not.toContain('revenue increase')
      expect(storiesText).not.toContain('View testimonial')
      
      // Should have Spanish text
      expect(storiesText).toContain('Historias de Éxito')
      expect(storiesText).toContain('aumento de ingresos')
    }
  })
})