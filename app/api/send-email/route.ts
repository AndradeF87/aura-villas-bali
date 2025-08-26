import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, data } = body

    let emailContent = ''
    let subject = ''

    switch (type) {
      case 'earnings-calculator':
        subject = `New Earnings Estimate Request - ${data.name}`
        emailContent = `
          <h2>New Earnings Estimate Request</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <hr />
          <h3>Property Details:</h3>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>Villa Category:</strong> ${data.villaCategory}</p>
          <p><strong>Bedrooms:</strong> ${data.bedrooms}</p>
          <p><strong>Amenities:</strong> ${data.amenities?.join(', ') || 'None selected'}</p>
        `
        break

      case 'qualification-form':
        subject = `New Property Management Inquiry - ${data.ownerName}`
        emailContent = `
          <h2>New Property Management Inquiry</h2>
          <h3>Owner Information:</h3>
          <p><strong>Name:</strong> ${data.ownerName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Preferred Contact Method:</strong> ${data.preferredContact || 'Email'}</p>
          <hr />
          <h3>Property Details:</h3>
          <p><strong>Villa Name:</strong> ${data.villaName}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>Bedrooms:</strong> ${data.bedrooms}</p>
          <p><strong>Current Occupancy Rate:</strong> ${data.currentOccupancy}</p>
          <hr />
          <h3>Management Information:</h3>
          <p><strong>Current Management Status:</strong> ${data.managementStatus}</p>
          <p><strong>Ready Date:</strong> ${data.readyDate}</p>
          <p><strong>Investment Ready:</strong> ${data.investmentReady}</p>
          <p><strong>Goals:</strong> ${data.goals}</p>
        `
        break

      case 'contact-form':
        subject = `New Contact Form Submission - ${data.name}`
        emailContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `
        break

      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        )
    }

    // Send email to hello@auravillasbali.com
    const { data: emailData, error } = await resend.emails.send({
      from: 'AURA Villas Bali <onboarding@resend.dev>', // Using Resend's test domain for now
      to: ['hello@auravillasbali.com'],
      subject: subject,
      html: emailContent,
      reply_to: data.email, // So you can reply directly to the customer
    })

    if (error) {
      console.error('Email send error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    // Optionally send a confirmation email to the user
    if (data.email) {
      await resend.emails.send({
        from: 'AURA Villas Bali <onboarding@resend.dev>',
        to: [data.email],
        subject: 'Thank you for contacting AURA Villas Bali',
        html: `
          <h2>Thank you for your interest in AURA Villas Bali</h2>
          <p>Dear ${data.name || 'Valued Customer'},</p>
          <p>We have received your inquiry and will get back to you within 24 hours.</p>
          <p>If you have any urgent questions, please feel free to contact us via WhatsApp at +62 812 3456 7890.</p>
          <br />
          <p>Best regards,<br />The AURA Villas Bali Team</p>
        `,
      })
    }

    return NextResponse.json({ success: true, id: emailData?.id })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}