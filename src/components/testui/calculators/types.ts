export interface CalculatorData {
  location: string
  bedrooms: number
  bathrooms: number
  amenities: string[]
  monthlyRevenue: number
  occupancyRate: number
  nightlyRate: number
  annualEarnings: number
  managementFee: number
  netIncome: number
}

export const locations = ['Canggu', 'Seminyak', 'Uluwatu']

export const amenitiesList = [
  'Private Pool',
  'Ocean View', 
  'Beach Access',
  'Chef Service',
  'Spa'
]

export const calculateEarnings = (
  location: string,
  bedrooms: number,
  bathrooms: number,
  amenities: string[]
): Omit<CalculatorData, 'location' | 'bedrooms' | 'bathrooms' | 'amenities'> => {
  // Base rates by location
  const locationRates: Record<string, number> = {
    Canggu: 2500000,
    Seminyak: 3500000,
    Uluwatu: 4000000
  }
  
  // Calculate base nightly rate
  let nightlyRate = locationRates[location] || 2500000
  
  // Adjust for bedrooms (15% increase per bedroom)
  nightlyRate += (bedrooms - 1) * nightlyRate * 0.15
  
  // Adjust for bathrooms (5% increase per bathroom)
  nightlyRate += (bathrooms - 1) * nightlyRate * 0.05
  
  // Adjust for amenities (5% per amenity)
  nightlyRate += amenities.length * nightlyRate * 0.05
  
  // Calculate occupancy based on location
  const occupancyRates: Record<string, number> = {
    Canggu: 85,
    Seminyak: 82,
    Uluwatu: 78
  }
  
  const occupancyRate = occupancyRates[location] || 80
  
  // Calculate monthly revenue (30 days * occupancy rate)
  const monthlyRevenue = Math.round(nightlyRate * 30 * (occupancyRate / 100))
  
  // Calculate annual earnings
  const annualEarnings = monthlyRevenue * 12
  
  // Management fee (15% for standard tier)
  const managementFee = Math.round(annualEarnings * 0.15)
  
  // Net income
  const netIncome = annualEarnings - managementFee
  
  return {
    monthlyRevenue,
    occupancyRate,
    nightlyRate: Math.round(nightlyRate),
    annualEarnings,
    managementFee,
    netIncome
  }
}