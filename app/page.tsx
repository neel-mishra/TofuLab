'use client'

import Link from "next/link"
import { useState, useEffect } from "react"

const navItems = [
  { label: 'Features', href: '#' },
  { label: 'Integrations', href: '#' },
  { label: 'Why switch to TofuLab?', href: '#' },
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

const partnerLogos = [
  { name: 'Shopify', domain: 'shopify.com', logoSrc: '/images/shopify-logo.png' },
  { name: 'Klaviyo', domain: 'klaviyo.com', logoSrc: '/images/klaviyo-logo.png' },
  { name: 'Segment', domain: 'segment.com', logoSrc: '/images/segment-logo.png' },
  { name: 'HubSpot', domain: 'hubspot.com', logoSrc: '/images/hubspot-logo.png' },
  { name: 'Stripe', domain: 'stripe.com', logoSrc: '/images/stripe-logo.png' },
  { name: 'Mailchimp', domain: 'mailchimp.com', logoSrc: '/images/mailchimp-logo.png' },
  { name: 'Zapier', domain: 'zapier.com', logoSrc: '/images/zapier-logo.png' },
  { name: 'Intercom', domain: 'intercom.com', logoSrc: '/images/intercom-logo.png' },
]

const badges = [
  'Top Performer', 'Best in Class', 'Editor\'s Choice',
  '4.9/5', 'Leader',
]

const reviews = [
  { name: 'Sarah Chen', role: 'Head of Growth, TechCo', date: 'Jan 2025', text: 'Mia Agent cut our reporting time by 80%. We used to spend hours pulling data from Meta and Google. Now we get a single briefing every morning with recommendations.' },
  { name: 'James Park', role: 'Performance Lead, Agency X', date: 'Dec 2024', text: 'Finally an AI that actually executes. We connected our TikTok and Amazon accounts and Mia manages budgets and creative tests without us babysitting dashboards.' },
  { name: 'Alex Rivera', role: 'CMO, D2C Brand', date: 'Jan 2025', text: 'The end-to-end actions are real. Mia created and launched a full campaign from a brief. We still review everything, but the first draft is already 90% there.' },
  { name: 'Jordan Lee', role: 'Director of Marketing', date: 'Nov 2024', text: 'Switched from manual reporting and multiple tools. One AI teammate that speaks the language of our stack. Support was great during migration.' },
]

const featureCards = [
  { icon: 'clock', title: '24/7 support', desc: 'Our team and Mia Agent are available around the clock for growth and marketing teams.' },
  { icon: 'check', title: '97%+ CSAT', desc: 'Customers rate TofuLab among the highest for ease of use and impact on marketing execution.' },
  { icon: 'zap', title: 'Deep API integration', desc: 'Real actions across Meta, Google, TikTok, and Amazon — not just read-only dashboards.' },
]

const SIGNUP_ENDPOINT = process.env.NEXT_PUBLIC_SIGNUP_ENDPOINT ?? '/api/signup'

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [heroEmail, setHeroEmail] = useState('')
  const [heroStatus, setHeroStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [heroError, setHeroError] = useState<string | null>(null)
  const [sliderIndex, setSliderIndex] = useState(0)
  const [sliderTransition, setSliderTransition] = useState(true)
  const customers = partnerLogos
  const duplicatedCustomers = [...customers, ...customers]

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderTransition(true)
      setSliderIndex((i) => (i + 1 <= customers.length ? i + 1 : i))
    }, 3000)
    return () => clearInterval(interval)
  }, [customers.length])

  useEffect(() => {
    if (sliderIndex >= customers.length) {
      const reset = () => {
        setSliderTransition(false)
        setSliderIndex(0)
      }
      const t = setTimeout(reset, 600)
      return () => clearTimeout(t)
    }
  }, [sliderIndex, customers.length])

  async function handleStartFreeTrial() {
    const email = heroEmail.trim()
    if (!email) return
    setHeroStatus('loading')
    setHeroError(null)
    try {
      const res = await fetch(SIGNUP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message ?? `Request failed (${res.status})`)
      }
      setHeroStatus('success')
      setHeroEmail('')
    } catch (err) {
      setHeroStatus('error')
      setHeroError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-sans antialiased" style={{ ['--header-bg' as string]: '#1a1a1a' }}>
      {/* Announcement bar */}
      <div className="bg-[#252525] border-b border-[#2d2d2d] py-2 text-center text-sm">
        <span className="text-white/80">Sign up for a free trial and get 30% off for 6 months.</span>{' '}
        <Link href="#" className="text-[#5cb85c] font-medium underline hover:text-[#4c9a4c]">
          LEARN MORE
        </Link>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#2d2d2d]/80 backdrop-blur-sm [background:var(--header-bg)]">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between [background:var(--header-bg)]">
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
              href="/pricing"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-[#1a1a1a] bg-[#5cb85c] hover:bg-[#4c9a4c] transition-colors"
            >
              Start a FREE trial
            </Link>
            <button
              type="button"
              className="md:hidden p-2 text-white/90 hover:text-white"
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
          <div className="md:hidden border-t border-[#2d2d2d] bg-[#1a1a1a] px-6 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm font-medium text-white/90 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* Hero - text (narrow) + image right, matching Hostfully-style layout */}
        <section className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            <div className="max-w-[520px] flex-shrink-0 text-center mx-auto md:mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight mb-6">
                AI agent for supercharged marketing teams
              </h1>
              <p className="text-white/80 text-base mb-8">
                Mia Agent works alongside your marketers to plan, analyze, optimize, and report across Meta, Google, TikTok, and Amazon.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleStartFreeTrial()}
                  disabled={heroStatus === 'loading'}
                  className="flex-1 min-w-0 h-12 px-4 rounded-lg bg-[#252525] border border-[#3d3d3d] text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#5cb85c]/40 focus:border-[#5cb85c] disabled:opacity-60"
                  aria-label="Work email"
                />
                <button
                  type="button"
                  onClick={handleStartFreeTrial}
                  disabled={!heroEmail.trim() || heroStatus === 'loading'}
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg font-semibold text-[#1a1a1a] bg-[#5cb85c] hover:bg-[#4c9a4c] transition-colors whitespace-nowrap flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {heroStatus === 'loading' ? 'Sending…' : heroStatus === 'success' ? 'Check your email' : 'Start a FREE trial'}
                </button>
              </div>
              <p className="mt-4 text-xs text-white/60 text-center whitespace-nowrap">
                For growth teams, marketers, and agencies who want an AI teammate, not another dashboard.
              </p>
              {heroStatus === 'error' && heroError && (
                <p className="mt-2 text-sm text-red-400" role="alert">{heroError}</p>
              )}
              {heroStatus === 'success' && (
                <p className="mt-2 text-sm text-[#5cb85c]" role="status">Thanks! We&apos;ll be in touch.</p>
              )}
            </div>
            <div className="w-full min-w-0 flex-1 flex justify-center md:justify-end">
              <div className="w-full max-w-[520px] aspect-video rounded-xl bg-[#252525] border border-[#3d3d3d] overflow-hidden flex-shrink-0">
                <img
                  src="/images/hero-product-ui.png"
                  alt="TofuLab product interface"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Integration / partner logos */}
        <section className="border-t border-[#2d2d2d] pt-0 pb-12 flex flex-col items-stretch">
          <div className="max-w-[1200px] mx-auto px-6 w-full flex flex-col items-start">
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 self-center">Over 200 teams have switched from spreadsheets and legacy tools to TofuLab</h2>
            <div className="w-full max-w-[min(100%,720px)] mx-auto overflow-hidden mb-8" aria-label="Customer logos">
              <div
                className="flex gap-4"
                style={{
                  width: 'max-content',
                  transform: `translateX(-${sliderIndex * 176}px)`,
                  transition: sliderTransition ? 'transform 0.6s ease-out' : 'none',
                }}
              >
                {duplicatedCustomers.map((partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="h-14 w-[160px] flex-shrink-0 rounded-lg bg-[#252525] border border-[#3d3d3d] flex items-center justify-center gap-2 px-3 text-sm font-medium text-white/60"
                  >
                    <img
                      src={partner.logoSrc ?? `https://logo.clearbit.com/${partner.domain}`}
                      alt=""
                      className="h-6 w-6 object-contain flex-shrink-0"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                    <span className="truncate">{partner.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 self-center">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-2 rounded-full bg-[#252525] border border-[#3d3d3d] text-xs font-medium text-white/70"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison / rating section */}
        <section className="border-t border-[#2d2d2d] py-16">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-12">
              TofuLab has been the highest-rated AI marketing agent on G2 since 2025.
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-[700px] mx-auto">
              <div className="p-6 rounded-xl bg-[#252525] border border-[#3d3d3d] text-left">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10" />
                  <span className="font-semibold text-white/90">Competitor X</span>
                </div>
                <p className="text-white/70 text-sm">4.5 (2K reviews)</p>
                <div className="flex gap-0.5 mt-2 text-[#5cb85c]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="p-6 rounded-xl bg-[#252525] border-2 border-[#5cb85c]/50 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <img src="/images/tofulab-logo.png" alt="" width={24} height={24} className="object-contain" />
                  <span className="font-semibold text-white">TofuLab</span>
                </div>
                <p className="text-white/70 text-sm">4.8 (2K reviews)</p>
                <div className="flex gap-0.5 mt-2 text-[#5cb85c]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Migration stat */}
        <section className="border-t border-[#2d2d2d] py-12">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <p className="text-xl font-medium text-white/90">
              On average, 4–7 marketing teams switch from legacy tools to TofuLab each month.
            </p>
          </div>
        </section>

        {/* Testimonials - alternating strips, two columns */}
        <section className="bg-[#252525] py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-[#1a1a1a] border border-[#2d2d2d]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#5cb85c]/20 flex items-center justify-center text-[#5cb85c] font-semibold">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-white">{r.name}</p>
                      <p className="text-sm text-white/60">{r.role} · {r.date}</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{r.text}</p>
                  <Link href="#" className="inline-block mt-3 text-sm text-[#5cb85c] hover:underline">
                    Read more
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured testimonial - centered */}
        <section className="py-16 border-t border-[#2d2d2d]">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8 relative">
              <span className="text-[#5cb85c]/40 text-5xl font-serif leading-none absolute -top-2 left-0">&quot;</span>
              Mia doesn&apos;t just summarize data. It recommends budget shifts and creates campaigns. We went from weekly manual reports to daily automated analyses and improved ROAS by 33%.<span className="text-[#5cb85c]/40 text-5xl font-serif leading-none align-top">&quot;</span>
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#252525] flex items-center justify-center">
                <img src="/images/hostfully-logo.png" alt="" className="w-full h-full object-contain" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Neel Mishra</p>
                <p className="text-sm text-white/60">Head of Growth, Hostfully</p>
              </div>
            </div>
          </div>
        </section>

        {/* Customer logos / cards */}
        <section className="bg-[#252525] py-16 border-t border-[#2d2d2d]">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-2xl font-bold text-white text-center mb-12">
              Over 200 teams have switched from spreadsheets and legacy tools to TofuLab.
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-[#1a1a1a] border border-[#2d2d2d]"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/10 mb-4" />
                  <h3 className="font-semibold text-white mb-2">Customer {i}</h3>
                  <p className="text-sm text-white/60">
                    Short testimonial or use case placeholder for social proof.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key features - 3 horizontal cards */}
        <section className="py-16 border-t border-[#2d2d2d] bg-[#252525]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {featureCards.map((card, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-xl bg-[#1a1a1a] border border-[#2d2d2d]">
                  <div className="w-12 h-12 rounded-lg bg-[#5cb85c]/20 flex items-center justify-center flex-shrink-0 text-[#5cb85c]">
                    {card.icon === 'clock' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                      </svg>
                    )}
                    {card.icon === 'check' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                    {card.icon === 'zap' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{card.title}</h3>
                    <p className="text-sm text-white/70">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Onboarding / migration CTA */}
        <section className="py-20 border-t border-[#2d2d2d]">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Switching to TofuLab takes minutes.
            </h2>
            <p className="text-lg text-white/80 mb-12 max-w-[600px] mx-auto">
              We connect your ad accounts, migrate your workflows, and train Mia on your brand. Stop overpaying for old tools and get an AI teammate that executes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <span className="px-6 py-3 rounded-lg border-2 border-[#5cb85c] text-white font-medium">
                Step 1: Get in touch
              </span>
              <span className="text-white/50">→</span>
              <span className="px-6 py-3 rounded-lg text-white/80 font-medium">Step 2: Free migration</span>
              <span className="text-white/50">→</span>
              <span className="px-6 py-3 rounded-lg text-white/80 font-medium">Step 3: Launch</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#"
                className="inline-flex px-6 py-3 rounded-lg font-semibold text-[#1a1a1a] bg-[#5cb85c] hover:bg-[#4c9a4c] transition-colors"
              >
                Start a FREE trial
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
