# Email Setup Guide for AURA Villas Bali

## Overview
The application uses Resend to send emails from form submissions to hello@auravillasbali.com.

## Setup Steps

### 1. Create Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. You get 100 emails/day for free, or upgrade for more

### 2. Get Your API Key
1. After signing up, go to [https://resend.com/api-keys](https://resend.com/api-keys)
2. Create a new API key
3. Copy the key (starts with `re_`)

### 3. Configure Environment Variables
1. Create a `.env.local` file in the root directory
2. Add your Resend API key:
```
RESEND_API_KEY=re_your_api_key_here
```

### 4. Domain Verification (For Production)
To send emails from @auravillasbali.com:

1. Go to Resend Dashboard > Domains
2. Add domain: auravillasbali.com
3. Add the DNS records Resend provides to your domain:
   - SPF record
   - DKIM records
   - (Optional) DMARC record for better deliverability
4. Wait for verification (usually takes a few minutes)
5. Update the API route to use your verified domain

### 5. Test the Setup
1. Fill out any form on the website
2. Check that email arrives at hello@auravillasbali.com
3. Check Resend dashboard for delivery status

## Email Types

The application sends 3 types of emails:

1. **Earnings Calculator** - When users complete the earnings calculator
2. **Qualification Form** - When users submit the property management inquiry
3. **Contact Form** - General contact form submissions (if added)

## Troubleshooting

### Emails not sending?
- Check API key is correct in `.env.local`
- Check Resend dashboard for errors
- Check browser console for API errors
- Ensure you're not hitting the rate limit

### Emails going to spam?
- Verify your domain in Resend
- Add SPF, DKIM, and DMARC records
- Ensure email content isn't triggering spam filters

### Development Testing
For development, you can:
1. Use Resend's test mode
2. Use the free tier (100 emails/day)
3. Check emails in Resend dashboard even if not delivered

## Production Checklist
- [ ] Domain verified in Resend
- [ ] DNS records added (SPF, DKIM, DMARC)
- [ ] API key in production environment variables
- [ ] Error handling tested
- [ ] Email templates reviewed
- [ ] Reply-to addresses configured

## Support
- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com