import { createClient } from '@supabase/supabase-js'
import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, application_id } = body

    if (!email || !application_id) {
      return Response.json(
        { error: 'Email and application_id are required' },
        { status: 400 }
      )
    }

    // Create Stripe Connect Express account
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'US',
      email: email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_type: 'company',
      business_profile: {
        url: 'https://ultron-marketplace.vercel.app',
        mcc: '5734',
        product_description: 'AI Agent Software Services'
      },
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: 'auto',
      },
    })

    // Create Account Link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/seller/onboarding/refresh`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/seller/onboarding/complete`,
      type: 'account_onboarding',
    })

    // Save to Supabase
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )

    const { error } = await supabase
      .from('sellers')
      .upsert({
        id: application_id,
        stripe_account_id: account.id,
        email: email,
        onboarding_status: 'pending',
        onboarding_url: accountLink.url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Supabase error:', error)
      return Response.json(
        { error: 'Failed to save seller' },
        { status: 500 }
      )
    }

    return Response.json({
      success: true,
      onboarding_url: accountLink.url,
      account_id: account.id
    })

  } catch (error: any) {
    console.error('Stripe Connect error:', error)
    return Response.json(
      { error: error.message || 'Failed to create Stripe Connect account' },
      { status: 500 }
    )
  }
}