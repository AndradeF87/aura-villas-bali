import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      bookingReference,
      villaId,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guests,
      message,
      specialRequests
    } = body

    // Here you would integrate with your email service
    // Example with Resend:
    /*
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'bookings@aura-villas-bali.com',
      to: ['reservations@aura-villas-bali.com'],
      subject: `New Villa Inquiry - ${bookingReference}`,
      html: `
        <h2>New Villa Booking Inquiry</h2>
        <p><strong>Booking Reference:</strong> ${bookingReference}</p>
        <p><strong>Guest:</strong> ${guestName}</p>
        <p><strong>Email:</strong> ${guestEmail}</p>
        <p><strong>Phone:</strong> ${guestPhone || 'Not provided'}</p>
        <p><strong>Check-in:</strong> ${checkIn}</p>
        <p><strong>Check-out:</strong> ${checkOut}</p>
        <p><strong>Guests:</strong> ${guests}</p>
        <p><strong>Message:</strong> ${message || 'None'}</p>
        <p><strong>Special Requests:</strong> ${specialRequests?.join(', ') || 'None'}</p>
      `
    })

    // Also send confirmation to guest
    await resend.emails.send({
      from: 'bookings@aura-villas-bali.com',
      to: [guestEmail],
      subject: `Your Villa Inquiry - ${bookingReference}`,
      html: `
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${guestName},</p>
        <p>We've received your villa inquiry with reference number: <strong>${bookingReference}</strong></p>
        <p>Our team will get back to you within 2 hours with availability and pricing details.</p>
        <p>If you have any urgent questions, please WhatsApp us at +62 812 3456 7890</p>
        <p>Best regards,<br>The AURA Team</p>
      `
    })
    */

    // For now, just log the inquiry
    console.log('New booking inquiry received:', {
      bookingReference,
      guestName,
      guestEmail,
      checkIn,
      checkOut,
      guests
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry notification sent successfully'
    })

  } catch (error) {
    console.error('Error sending inquiry notification:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}