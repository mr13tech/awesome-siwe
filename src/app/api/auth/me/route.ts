import { NextResponse } from 'next/server'
import { unsealData } from 'iron-session'
import { ironOptions, IronSessionData } from '@/lib/iron-session-config'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    // Get the session cookie
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get(ironOptions.cookieName)

    if (!sessionCookie?.value) {
      return NextResponse.json({ address: null, chainId: null, issuedAt: null })
    }

    // Unseal the session data
    const sessionData = await unsealData<IronSessionData>(sessionCookie.value, {
      password: ironOptions.password,
    })

    // Check if we have valid SIWE data
    if (!sessionData.siwe?.data?.address) {
      return NextResponse.json({ address: null, chainId: null, issuedAt: null })
    }

    // Return the session data in a consistent format
    return NextResponse.json({
      address: sessionData.siwe.data.address || null,
      chainId: sessionData.siwe.data.chainId || null,
      issuedAt: sessionData.siwe.data.issuedAt || null,
      // Include any other fields you need from the SIWE data
    })
  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json({
      address: null,
      chainId: null,
      issuedAt: null,
      error: 'Error fetching session data',
    })
  }
}
