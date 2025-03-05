import { NextResponse } from 'next/server'
import { ironOptions } from '@/lib/iron-session-config'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    // Get the cookie store
    const cookieStore = cookies()

    // Delete the session cookie
    cookieStore.delete(ironOptions.cookieName)

    // Return success response
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error logging out:', error)
    return NextResponse.json({ error: 'Failed to log out' }, { status: 500 })
  }
}
