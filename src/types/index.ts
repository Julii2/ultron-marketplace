export interface Agent {
  id: string
  seller_id: string
  title: string
  description: string
  category: string
  pricing: PricingPlan[]
  fitness_score: number
  status: 'draft' | 'review' | 'certified' | 'live' | 'deprecated'
  deployment_endpoint?: string
  docker_image?: string
  resource_limits?: ResourceLimits
  created_at: string
  updated_at: string
  certified_at?: string
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year' | 'usage'
  limits: Record<string, number>
  features: string[]
  stripe_price_id?: string
}

export interface ResourceLimits {
  memory_mb: number
  cpu_cores: number
  storage_gb: number
  max_concurrent: number
}

export interface Seller {
  id: string
  stripe_connect_account_id: string
  email: string
  company_name: string
  legal_name: string
  tax_id: string
  kyc_status: 'pending' | 'verified' | 'rejected'
  kyc_completed_at: string | null
  commission_rate: number
  payout_schedule: 'daily' | 'weekly' | 'monthly'
  status: 'pending' | 'active' | 'suspended'
  created_at: string
  updated_at: string
}

export interface AgentManifest {
  manifest_version: string
  agent: {
    id: string
    name: string
    version: string
    description: string
    category: string
    tags: string[]
  }
  capabilities: {
    primary: string
    secondary: string[]
    languages: string[]
    frameworks: string[]
  }
  api: {
    schema: string
    endpoints: ApiEndpoint[]
    auth: 'api_key' | 'oauth' | 'jwt'
    rate_limits: RateLimits
  }
  pricing: {
    model: 'subscription' | 'usage' | 'saas' | 'service'
    currency: string
    plans: PricingPlan[]
    trial?: TrialConfig
  }
  requirements: {
    runtime: string
    memory_mb: number
    cpu_cores: number
    storage_gb: number
    dependencies: string[]
    env_vars: string[]
  }
  deployment: {
    type: 'container' | 'serverless'
    dockerfile: string
    health_check: string
    startup_timeout_seconds: number
    graceful_shutdown_seconds: number
  }
  security: {
    data_encryption: string
    pii_handling: string
    secrets_management: string
    vulnerability_scan: 'passed' | 'failed' | 'pending'
    penetration_test: 'passed' | 'failed' | 'pending'
  }
  compliance: {
    gdpr: boolean
    ccpa: boolean
    soc2: string
    hipaa: boolean
    data_residency: string[]
  }
  support: {
    sla_uptime: number
    response_time_hours: number
    channels: string[]
    documentation_url: string
  }
}

export interface ApiEndpoint {
  path: string
  method: string
  description: string
  request_schema?: any
  response_schema?: any
}

export interface RateLimits {
  requests_per_minute: number
  burst: number
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year' | 'usage'
  limits: Record<string, number>
  features: string[]
  stripe_price_id?: string
}

export interface TrialConfig {
  days: number
  limits: Record<string, number>
}

export interface ResourceLimits {
  memory_mb: number
  cpu_cores: number
  storage_gb: number
  max_concurrent: number
}

export interface Seller {
  id: string
  stripe_connect_account_id: string
  email: string
  company_name: string
  legal_name: string
  tax_id: string
  kyc_status: 'pending' | 'verified' | 'rejected'
  kyc_completed_at: string | null
  commission_rate: number
  payout_schedule: 'daily' | 'weekly' | 'monthly'
  status: 'pending' | 'active' | 'suspended'
  created_at: string
  updated_at: string
}

export interface AgentManifest {
  manifest_version: string
  agent: {
    id: string
    name: string
    version: string
    description: string
    category: string
    tags: string[]
  }
  capabilities: {
    primary: string
    secondary: string[]
    languages: string[]
    frameworks: string[]
  }
  api: {
    schema: string
    endpoints: ApiEndpoint[]
    auth: 'api_key' | 'oauth' | 'jwt'
    rate_limits: RateLimits
  }
  pricing: {
    model: 'subscription' | 'usage' | 'saas' | 'service'
    currency: string
    plans: PricingPlan[]
    trial?: TrialConfig
  }
  requirements: {
    runtime: string
    memory_mb: number
    cpu_cores: number
    storage_gb: number
    dependencies: string[]
    env_vars: string[]
  }
  deployment: {
    type: 'container' | 'serverless'
    dockerfile: string
    health_check: string
    startup_timeout_seconds: number
    graceful_shutdown_seconds: number
  }
  security: {
    data_encryption: string
    pii_handling: string
    secrets_management: string
    vulnerability_scan: 'passed' | 'failed' | 'pending'
    penetration_test: 'passed' | 'failed' | 'pending'
  }
  compliance: {
    gdpr: boolean
    ccpa: boolean
    soc2: string
    hipaa: boolean
    data_residency: string[]
  }
  support: {
    sla_uptime: number
    response_time_hours: number
    channels: string[]
    documentation_url: string
  }
}

export interface ApiEndpoint {
  path: string
  method: string
  description: string
  request_schema?: any
  response_schema?: any
}

export interface RateLimits {
  requests_per_minute: number
  burst: number
}

export interface PricingPlan {
  id: string
  name: string
  price: number
  interval: 'month' | 'year' | 'usage'
  limits: Record<string, number>
  features: string[]
  stripe_price_id?: string
}

export interface TrialConfig {
  days: number
  limits: Record<string, number>
}

export interface ResourceLimits {
  memory_mb: number
  cpu_cores: number
  storage_gb: number
  max_concurrent: number
}

export interface Seller {
  id: string
  stripe_connect_account_id: string
  email: string
  company_name: string
  legal_name: string
  tax_id: string
  kyc_status: 'pending' | 'verified' | 'rejected'
  kyc_completed_at: string | null
  commission_rate: number
  payout_schedule: 'daily' | 'weekly' | 'monthly'
  status: 'pending' | 'active' | 'suspended'
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  buyer_id: string
  agent_id: string
  seller_id: string
  plan_id: string
  stripe_subscription_id: string
  stripe_customer_id: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  created_at: string
}

export interface MarketplaceTransaction {
  id: string
  subscription_id: string
  buyer_id: string
  seller_id: string
  agent_id: string
  gross_amount_usd: number
  stripe_fee_usd: number
  platform_commission_usd: number
  seller_payout_usd: number
  stripe_payment_intent_id: string
  status: 'pending' | 'succeeded' | 'failed' | 'refunded'
  created_at: string
}

export interface ApiKey {
  id: string
  key: string
  buyer_email: string
  agent_id: string
  subscription_id: string
  seller_id: string
  status: 'active' | 'revoked' | 'expired'
  last_used_at: string | null
  created_at: string
  expires_at: string | null
}

export interface MarketplaceTransaction {
  id: string
  subscription_id: string
  buyer_id: string
  seller_id: string
  agent_id: string
  gross_amount_usd: number
  stripe_fee_usd: number
  platform_commission_usd: number
  seller_payout_usd: number
  stripe_payment_intent_id: string
  status: 'pending' | 'succeeded' | 'failed' | 'refunded'
  created_at: string
}