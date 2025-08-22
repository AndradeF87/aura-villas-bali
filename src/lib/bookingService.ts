import { createClient } from './supabase/client'
import type { BookingInquiry } from '@/types/villa'

export class BookingService {
  private supabase = createClient()

  async submitInquiry(inquiry: BookingInquiry) {
    const bookingReference = this.generateBookingReference()
    
    const { data, error } = await this.supabase
      .from('bookings')
      .insert({
        booking_reference: bookingReference,
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
        payment_status: 'pending',
        base_amount: 0, // Will be calculated by backend
        total_amount: 0, // Will be calculated by backend
        currency: 'USD'
      })
      .select()
      .single()

    if (error) {
      console.error('Error submitting booking inquiry:', error)
      throw new Error('Failed to submit booking inquiry')
    }

    // Send notification email (implement with your email service)
    await this.sendInquiryNotification(bookingReference, inquiry)

    return { ...data, bookingReference }
  }

  async checkAvailability(villaId: string, checkIn: Date, checkOut: Date) {
    const startDate = checkIn.toISOString().split('T')[0]
    const endDate = checkOut.toISOString().split('T')[0]

    const { data: availability, error } = await this.supabase
      .from('villa_availability')
      .select('date, is_available, price')
      .eq('villa_id', villaId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date')

    if (error) {
      console.error('Error checking availability:', error)
      throw new Error('Failed to check availability')
    }

    const isAvailable = availability?.every(day => day.is_available) || false
    const totalPrice = availability?.reduce((sum, day) => sum + (day.price || 0), 0) || 0

    return {
      available: isAvailable,
      dates: availability,
      totalPrice,
      averagePrice: availability?.length ? totalPrice / availability.length : 0
    }
  }

  private generateBookingReference(): string {
    const prefix = 'AURA'
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    return `${prefix}${timestamp}${random}`
  }

  private async sendInquiryNotification(bookingReference: string, inquiry: BookingInquiry) {
    try {
      // This would integrate with your email service (Resend, SendGrid, etc.)
      const response = await fetch('/api/send-inquiry-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingReference,
          ...inquiry
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send notification')
      }
    } catch (error) {
      console.error('Error sending inquiry notification:', error)
      // Don't throw error here - booking was successful even if notification failed
    }
  }

  async getBookingByReference(reference: string) {
    const { data, error } = await this.supabase
      .from('bookings')
      .select(`
        *,
        villa:villas(name, slug, location:locations(*))
      `)
      .eq('booking_reference', reference)
      .single()

    if (error) {
      console.error('Error fetching booking:', error)
      return null
    }

    return data
  }

  async updateBookingStatus(bookingId: string, status: string, notes?: string) {
    const { data, error } = await this.supabase
      .from('bookings')
      .update({
        status,
        internal_notes: notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId)
      .select()
      .single()

    if (error) {
      console.error('Error updating booking status:', error)
      throw new Error('Failed to update booking status')
    }

    return data
  }
}

export const bookingService = new BookingService()