import { SessionOptions } from 'iron-session'

// Update type for iron-session with App Router
export interface IronSessionData {
  nonce?: string
  siwe?: {
    data: {
      address: string
      chainId: number
      nonce: string
      domain: string
      uri: string
      version: string
      issuedAt: string
      statement?: string
      resources?: string[]
      [key: string]: any
    }
  }
}

// Iron session options
export const ironOptions: SessionOptions = {
  cookieName: 'siwe',
  password: process.env.IRON_SESSION_PASSWORD as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true, // Cannot be accessed by client-side JavaScript
    sameSite: 'strict', // Cookie is sent only to the same site as the one that originated it
    path: '/',
  },
}
