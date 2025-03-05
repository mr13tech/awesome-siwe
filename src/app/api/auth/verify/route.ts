import { NextRequest, NextResponse } from 'next/server'
import { SiweMessage } from 'siwe'
import { sealData, unsealData } from 'iron-session'
import { ironOptions, IronSessionData } from '@/lib/iron-session-config'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { message, signature } = await req.json()

    // Validate input
    if (!message || !signature) {
      return NextResponse.json(
        { error: 'Missing message or signature' },
        { status: 400 },
      )
    }

    // Get the session cookie
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get(ironOptions.cookieName)

    if (!sessionCookie?.value) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 })
    }

    // Unseal the session data
    const sessionData = await unsealData<IronSessionData>(sessionCookie.value, {
      password: ironOptions.password,
    })

    // Parse and verify the SIWE message
    const siweMessage = new SiweMessage(message)
    const fields = await siweMessage.verify({ signature })

    // Verify that the nonce in the message matches the one in the session
    if (fields.data.nonce !== sessionData.nonce) {
      return NextResponse.json({ error: 'Invalid nonce' }, { status: 422 })
    }

    // Transform SIWE fields into the expected IronSessionData structure
    const newSessionData: IronSessionData = {
      ...sessionData,
      siwe: {
        data: {
          address: fields.data.address,
          chainId: fields.data.chainId,
          nonce: fields.data.nonce,
          domain: fields.data.domain,
          uri: fields.data.uri,
          version: fields.data.version,
          issuedAt: fields.data.issuedAt ?? new Date().toISOString(),
          statement: fields.data.statement ?? '',
          resources: fields.data.resources ?? [],
        },
      },
    }

    // Seal the updated session data
    const seal = await sealData(newSessionData, {
      password: ironOptions.password,
    })

    // Set the updated session cookie
    cookieStore.set({
      name: ironOptions.cookieName,
      value: seal,
      httpOnly: ironOptions.cookieOptions?.httpOnly ?? true,
      path: ironOptions.cookieOptions?.path ?? '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: ironOptions.cookieOptions?.sameSite ?? 'strict',
    })

    // Return success response
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error verifying message:', error)
    return NextResponse.json(
      { ok: false, error: 'Failed to verify message' },
      { status: 400 },
    )
  }
}
