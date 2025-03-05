import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    address?: string
    user: {
      name?: string | null
      address?: string
    }
    signedAt?: string
    expirationTime?: string
    chainId?: number
  }

  interface User extends DefaultUser {
    address?: string
    signedAt?: string
    expirationTime?: string
    chainId?: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    address?: string
    signedAt?: string
    expirationTime?: string
    chainId?: number
  }
}
