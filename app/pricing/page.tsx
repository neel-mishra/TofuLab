'use client'

import Link from "next/link"
import { useState } from "react"

const navItems = [
  { label: 'Features', href: '/' },
  { label: 'Integrations', href: '/' },
  { label: 'Why switch to TofuLab?', href: '/' },
  { label: 'Pricing', href: '/pricing' },
]

function TofuLabLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md [background:var(--header-bg)]">
        <img
          src="/images/tofulab-logo.png"
          alt=""
          width={32}
          height={32}
          className="h-7 w-7 object-contain mix-blend-lighten"
          aria-hidden
        />
      </span>
      <span className="text-xl font-semibold"><span className="text-[#5cb85c]">Tofu</span><span className="text-white">Lab</span></span>
    </Link>
  )
}

const plans = [
  {
    name: 'Starter',
    price: '$99',
    period: '/month',
    description: 'For small teams getting started with AI-powered marketing.',
    features: [
      '1 connected workspace',
      'Mia Agent: reports & recommendations',
      'Up to 3 ad accounts',
      'Email support',
    ],
    cta: 'Start free trial',
    href: '/',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$299',
    period: '/month',
    description: 'For growing teams that need full automation.',
    features: [
      '5 connected workspaces',
      'Mia Agent: full campaign actions',
      'Unlimited ad accounts',
      'Priority support',
      'Custom integrations',
    ],
    cta: 'Start free trial',
    href: '/',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large teams with advanced security and SLAs.',
    features: [
      'Unlimited workspaces',
      'Dedicated success manager',
      'SSO & advanced security',
      'Custom SLA',
      'On-premise options',
    ],
    cta: 'Contact sales',
    href: '#',
    highlighted: false,
  },
]

export default function PricingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-sans antialiased" style={{ ['--header-bg' as string]: '#1a1a1a' }}>
      {/* Announcement bar */}
      <div className="bg-[#252525] border-b border-[#2d2d2d] py-2 px-4 sm:px-6 text-center text-xs sm:text-sm">
        <span className="text-white/80">Sign up for a free trial and get 30% off for 6 months.</span>{' '}
        <Link href="/" className="text-[#5cb85c] font-medium underline hover:text-[#4c9a4c]">
          LEARN MORE
        </Link>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#2d2d2d]/80 backdrop-blur-sm [background:var(--header-bg)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 [background:var(--header-bg)]">
          <TofuLabLogo />
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-sm font-semibold text-[#1a1a1a] bg-[#5cb85c] hover:bg-[#4c9a4c] transition-colors min-h-[44px] items-center"
            >
              Start a FREE trial
            </Link>
            <button
              type="button"
              className="md:hidden p-3 -m-1 text-white/90 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#2d2d2d] bg-[#1a1a1a] px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm font-medium text-white/90 hover:text-white py-3 min-h-[44px] flex items-center" onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main>
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
          <div className="text-center mb-10 sm:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Simple, transparent pricing</h1>
            <p className="text-white/80 text-base sm:text-lg max-w-[560px] mx-auto px-2">
              Start with a free trial. No credit card required. Switch plans or cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-5 sm:p-6 md:p-8 flex flex-col ${
                  plan.highlighted
                    ? 'border-[#5cb85c] bg-[#252525] ring-2 ring-[#5cb85c]/30'
                    : 'border-[#2d2d2d] bg-[#252525]/80'
                }`}
              >
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">{plan.name}</h2>
                <div className="flex items-baseline gap-1 mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/60">{plan.period}</span>
                </div>
                <p className="text-white/70 text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="text-[#5cb85c] shrink-0">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={`block w-full text-center py-3 px-4 rounded-lg font-semibold text-sm transition-colors min-h-[48px] flex items-center justify-center ${
                    plan.highlighted
                      ? 'bg-[#5cb85c] text-[#1a1a1a] hover:bg-[#4c9a4c]'
                      : 'bg-[#252525] border border-[#3d3d3d] text-white hover:bg-[#2d2d2d]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-white/50 text-xs sm:text-sm mt-8 sm:mt-12 px-4">
            All plans include a 14-day free trial. Need a custom plan? <Link href="#" className="text-[#5cb85c] hover:underline">Contact us</Link>.
          </p>
        </section>
      </main>
    </div>
  )
}
