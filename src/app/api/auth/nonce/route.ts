import { NextResponse } from 'next/server'
import { generateNonce } from 'siwe'
import { sealData } from 'iron-session'
import { ironOptions, IronSessionData } from '@/lib/iron-session-config'
import { cookies } from 'next/headers'

// Get and set nonce for SIWE authentication
export async function GET() {
  try {
    // Generate a new nonce for SIWE
    const nonce = generateNonce()

    // Create session data with the nonce
    const sessionData: IronSessionData = {
      nonce,
    }

    // Seal the session data
    const seal = await sealData(sessionData, {
      password: ironOptions.password,
    })

    // Get the cookie store
    const cookieStore = cookies()

    // Set the sealed session cookie
    cookieStore.set({
      name: ironOptions.cookieName,
      value: seal,
      httpOnly: ironOptions.cookieOptions?.httpOnly ?? true,
      path: ironOptions.cookieOptions?.path ?? '/',
      secure:
        ironOptions.cookieOptions?.secure ??
        process.env.NODE_ENV === 'production',
      sameSite: ironOptions.cookieOptions?.sameSite ?? 'strict',
    })

    // Return the nonce
    return new NextResponse(nonce, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    })
  } catch (error) {
    console.error('Error generating nonce:', error)
    return NextResponse.json(
      { error: 'Failed to generate nonce' },
      { status: 500 },
    )
  }
}
