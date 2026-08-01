import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
})

// Stripe Connect configuration
export const STRIPE_CONNECT_CONFIG = {
  type: 'express' as const,
  country: 'US',
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true },
  },
  business_type: 'company' as const,
  business_profile: {
    url: 'https://ultron-marketplace.vercel.app',
    mcc: '5734',
    product_description: 'AI Agent Software Services',
  },
}

// Price IDs (configure in Stripe Dashboard)
export const PRICE_IDS = {
  free: process.env.STRIPE_PRICE_FREE || 'price_free',
  pro: process.env.STRIPE_PRICE_PRO || 'price_pro_monthly',
  team: process.env.STRIPE_PRICE_TEAM || 'price_team_monthly',
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE || 'price_enterprise_monthly',
}

// Commission rate (20%)
export const PLATFORM_COMMISSION_RATE = 0.20

// Payout schedules
export const PAYOUT_SCHEDULES = {
  new: 'weekly',
  established: 'daily',
  verified: 'daily',
} as const