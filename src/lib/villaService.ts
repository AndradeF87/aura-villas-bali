import { createClient } from './supabase/client'
import type { Villa, SearchFilters } from '@/types/villa'

export class VillaService {
  private supabase = createClient()

  async searchVillas(filters: SearchFilters): Promise<Villa[]> {
    let query = this.supabase
      .from('villa_search_view')
      .select('*')

    // Location filter
    if (filters.location && filters.location !== 'All Locations') {
      query = query.eq('area', filters.location)
    }

    // Guest capacity filter
    if (filters.guests) {
      query = query.gte('max_guests', filters.guests)
    }

    // Price range filter
    if (filters.priceRange) {
      if (filters.priceRange.min) {
        query = query.gte('base_price', filters.priceRange.min)
      }
      if (filters.priceRange.max) {
        query = query.lte('base_price', filters.priceRange.max)
      }
    }

    // Amenity filters
    if (filters.amenities && filters.amenities.length > 0) {
      query = query.overlaps('amenities', filters.amenities)
    }

    // Check availability if dates provided
    if (filters.checkIn && filters.checkOut) {
      const { data: availableVillas } = await this.supabase
        .from('villa_availability')
        .select('villa_id')
        .gte('date', filters.checkIn.toISOString().split('T')[0])
        .lte('date', filters.checkOut.toISOString().split('T')[0])
        .eq('is_available', true)

      if (availableVillas) {
        const availableVillaIds = availableVillas.map(av => av.villa_id)
        query = query.in('id', availableVillaIds)
      }
    }

    // Order by featured first, then rating
    query = query.order('featured', { ascending: false })
    query = query.order('rating', { ascending: false })

    const { data, error } = await query

    if (error) {
      console.error('Error fetching villas:', error)
      throw new Error('Failed to fetch villas')
    }

    return data || []
  }

  async getFeaturedVillas(limit: number = 6): Promise<Villa[]> {
    const { data, error } = await this.supabase
      .from('villa_search_view')
      .select('*')
      .eq('featured', true)
      .order('rating', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching featured villas:', error)
      throw new Error('Failed to fetch featured villas')
    }

    return data || []
  }

  async getVillaBySlug(slug: string): Promise<Villa | null> {
    const { data, error } = await this.supabase
      .from('villas')
      .select(`
        *,
        location:locations(*),
        images:villa_images(*),
        amenities:villa_amenities(
          amenity:amenities(*)
        ),
        reviews:reviews(*)
      `)
      .eq('slug', slug)
      .eq('status', 'active')
      .single()

    if (error) {
      console.error('Error fetching villa:', error)
      return null
    }

    return data
  }

  async checkAvailability(villaId: string, checkIn: Date, checkOut: Date): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('villa_availability')
      .select('date, is_available')
      .eq('villa_id', villaId)
      .gte('date', checkIn.toISOString().split('T')[0])
      .lte('date', checkOut.toISOString().split('T')[0])

    if (error) {
      console.error('Error checking availability:', error)
      return false
    }

    // Check if all dates are available
    return data?.every(day => day.is_available) || false
  }

  async submitBookingInquiry(inquiry: {
    villaId: string
    guestName: string
    guestEmail: string
    guestPhone?: string
    checkIn: Date
    checkOut: Date
    guests: number
    message?: string
    specialRequests?: string[]
  }) {
    const { data, error } = await this.supabase
      .from('bookings')
      .insert({
        villa_id: inquiry.villaId,
        guest_name: inquiry.guestName,
        guest_email: inquiry.guestEmail,
        guest_phone: inquiry.guestPhone,
        check_in: inquiry.checkIn.toISOString().split('T')[0],
        check_out: inquiry.checkOut.toISOString().split('T')[0],
        number_of_guests: inquiry.guests,
        guest_message: inquiry.message,
        special_requests: inquiry.specialRequests?.join(', '),
        status: 'inquiry',
        booking_reference: this.generateBookingReference()
      })
      .select()
      .single()

    if (error) {
      console.error('Error submitting booking inquiry:', error)
      throw new Error('Failed to submit booking inquiry')
    }

    return data
  }

  private generateBookingReference(): string {
    const prefix = 'AURA'
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    return `${prefix}${timestamp}${random}`
  }
}

export const villaService = new VillaService()