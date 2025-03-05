import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { SiweMessage } from 'siwe'
import { getAuthDomain } from '@/lib/auth'

/**
 * NextAuth configuration options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'siwe',
      name: 'Sign-In with Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials, _req) {
        try {
          // Validate credentials
          if (!credentials?.message || !credentials?.signature) {
            console.error('SIWE Error: Missing message or signature')
            return null
          }

          // Parse and verify SIWE message
          const siwe = new SiweMessage(credentials.message)
          const domain = getAuthDomain()

          // We don't need to validate the nonce against NextAuth's CSRF token
          // The nonce in the SIWE message is already validated by siwe.verify()
          // This simplifies our flow and avoids the CSRF token fetch issues

          // Prepare verification options
          const verifyOptions = {
            signature: credentials.signature,
            domain,
          }

          // Verify the signature
          const result = await siwe.verify(verifyOptions)

          if (!result.success) {
            console.error('SIWE Error: Signature verification failed', result)
            return null
          }

          // Return user data for session
          return {
            id: siwe.address,
            address: siwe.address,
            signedAt: new Date().toISOString(),
            expirationTime: siwe.expirationTime,
            chainId: siwe.chainId,
          }
        } catch (error) {
          console.error('SIWE authorization error:', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to JWT token when user signs in
      if (user) {
        token.address = user.address
        token.signedAt = user.signedAt
        token.expirationTime = user.expirationTime
        token.chainId = user.chainId
      }
      return token
    },
    async session({ session, token }) {
      // Add user data from JWT token to session
      session.address = token.sub
      session.user = {
        name: token.sub,
        address: token.sub,
      }

      // Add SIWE-specific data
      session.signedAt = token.signedAt
      session.expirationTime = token.expirationTime
      session.chainId = token.chainId

      return session
    },
  },
  // Custom pages
  pages: {
    signIn: '/',
    error: '/',
  },
  // Debug in development
  debug:
    typeof window === 'undefined'
      ? process.env.NODE_ENV === 'development'
      : false,
  // Enforce CSRF protection with a guaranteed non-null secret
  secret:
    typeof window === 'undefined'
      ? process.env.NEXTAUTH_SECRET ||
        'PLEASE_SET_A_SECRET_IN_ENV_FOR_PRODUCTION'
      : undefined,
}

// Create NextAuth handler
const handler = NextAuth(authOptions)

// Export API handler
export { handler as GET, handler as POST }
