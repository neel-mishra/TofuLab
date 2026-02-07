import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = typeof body?.email === 'string' ? body.email.trim() : ''

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    // TODO: send to your CRM, email provider, or database
    // e.g. await yourEmailService.subscribe(email)
    console.log('[Signup] Email captured:', email)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { message: 'Invalid request' },
      { status: 400 }
    )
  }
}
