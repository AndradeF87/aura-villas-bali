import { test, expect } from '@playwright/test'

test.describe('Spanish Translations - Complete Check', () => {
  test('Homepage with Property Management content should have NO English text when in Spanish', async ({ page }) => {
    // Navigate to Spanish homepage which contains property management content
    await page.goto('http://localhost:3002/es-ES')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // List of English strings that should NOT appear
    const englishStrings = [
      'Property Management',
      'We Partner with Select Bali Villa Owners',
      'Selective Partnership',
      'Limited Availability',
      'Founded',
      'Properties Under Management',
      'Properties by Jan 2026',
      'Take Qualification Quiz',
      'View Our Marketing Packages',
      'Choose Your Partnership Level',
      'Transparent pricing',
      'Most Popular',
      'after OTA Fees',
      'What\'s Included',
      'Available in Higher Tiers',
      'BEST FOR',
      'Apply for Invitation',
      'Get Started',
      'Not sure which tier is right for you',
      'Essential',
      'Premium',
      'Boutique Full',
      'For established villas',
      'Full-service management',
      'White-glove service'
    ]
    
    // Check that none of these English strings appear
    for (const englishText of englishStrings) {
      const elements = await page.locator(`text="${englishText}"`).count()
      if (elements > 0) {
        console.log(`❌ Found English text: "${englishText}"`)
      }
      expect(elements, `English text "${englishText}" should not appear`).toBe(0)
    }
    
    // Verify Spanish strings ARE present
    const spanishStrings = [
      'Nos asociamos con propietarios selectos',
      'Asociación Selectiva',
      'Disponibilidad Limitada',
      'Fundada',
      'Propiedades Bajo Gestión',
      'Propiedades para Ene 2026',
      'Realizar Cuestionario de Calificación',
      'Ver Nuestros Paquetes de Marketing',
      'Elige Tu Nivel de Asociación',
      'después de Tarifas OTA',
      'Lo que está Incluido',
      'Disponible en Niveles Superiores',
      'MEJOR PARA',
      'Solicitar Invitación',
      'Comenzar'
    ]
    
    for (const spanishText of spanishStrings) {
      const elements = await page.locator(`text="${spanishText}"`).count()
      if (elements === 0) {
        console.log(`⚠️ Missing Spanish text: "${spanishText}"`)
      }
      expect(elements, `Spanish text "${spanishText}" should appear`).toBeGreaterThan(0)
    }
    
    console.log('✅ Property Management content Spanish translation check complete')
  })
  
  test('Navigation should be fully in Spanish', async ({ page }) => {
    // Navigate to Spanish homepage
    await page.goto('http://localhost:3002/es-ES')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Check navigation is in Spanish
    const navEnglish = [
      'Villas',
      'Pricing',
      'About Us',
      'Contact',
      'Buy & Rent'
    ]
    
    for (const text of navEnglish) {
      const count = await page.locator(`nav >> text="${text}"`).count()
      expect(count, `Navigation should not have English text "${text}"`).toBe(0)
    }
    
    // Check navigation has Spanish
    const navSpanish = [
      'Villas',
      'Precios',
      'Acerca de',
      'Contacto',
      'Comprar y Alquilar'
    ]
    
    for (const text of navSpanish) {
      const count = await page.locator(`nav >> text="${text}"`).count()
      expect(count, `Navigation should have Spanish text "${text}"`).toBeGreaterThan(0)
    }
    
    console.log('✅ Navigation Spanish translation check complete')
  })
  
  test('Calculator component should be fully in Spanish', async ({ page }) => {
    await page.goto('http://localhost:3002/es-ES')
    await page.waitForLoadState('networkidle')
    
    // Check calculator title
    const calculatorEnglish = [
      'Estimate Your Villa\'s',
      'Earnings Potential',
      'Start by selecting your villa location',
      'How many bedrooms does your villa have?',
      'What category best describes your villa?',
      'Customize with amenities'
    ]
    
    for (const text of calculatorEnglish) {
      const count = await page.locator(`text="${text}"`).count()
      expect(count, `Calculator should not have English text "${text}"`).toBe(0)
    }
    
    // Check Spanish translations exist
    const calculatorSpanish = [
      'Estima el Potencial de',
      'Ganancias de tu Villa',
      'Comienza seleccionando la ubicación de tu villa',
      '¿Cuántas habitaciones tiene tu villa?',
      '¿Qué categoría describe mejor tu villa?',
      'Personaliza con comodidades'
    ]
    
    for (const text of calculatorSpanish) {
      const count = await page.locator(`text="${text}"`).count()
      expect(count, `Calculator should have Spanish text "${text}"`).toBeGreaterThan(0)
    }
    
    console.log('✅ Calculator Spanish translation check complete')
  })
})