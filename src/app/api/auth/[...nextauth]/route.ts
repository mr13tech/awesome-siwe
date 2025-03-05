import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getCsrfToken } from 'next-auth/react'
import { SiweMessage } from 'siwe'

// Get domain from env or default to localhost:3000
const getAuthDomain = () => {
  if (typeof window !== 'undefined') {
    return window.location.host
  }
  return process.env.NEXTAUTH_URL
    ? new URL(process.env.NEXTAUTH_URL).host
    : 'localhost:3000'
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'siwe',
      name: 'siwe',
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
      async authorize(credentials, req) {
        try {
          if (!credentials?.message || !credentials?.signature)
            throw new Error('Missing message or signature')

          const siwe = new SiweMessage(credentials.message)
          const domain = getAuthDomain()

          const result = await siwe.verify({
            signature: credentials.signature,
            domain,
            nonce: await getCsrfToken({ req }),
          })

          if (!result.success) throw new Error('Verification failed')

          return {
            id: siwe.address,
            address: siwe.address,
            signedAt: new Date().toISOString(),
            expirationTime: siwe.expirationTime,
            chainId: siwe.chainId,
          }
        } catch (e) {
          console.error(e)
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
      if (user) {
        token.address = user.address
        token.signedAt = user.signedAt
        token.expirationTime = user.expirationTime
        token.chainId = user.chainId
      }
      return token
    },
    async session({ session, token }) {
      session.address = token.sub
      session.user = {
        name: token.sub,
        address: token.sub,
      }
      session.signedAt = token.signedAt
      session.expirationTime = token.expirationTime
      session.chainId = token.chainId

      return session
    },
  },
  pages: {
    signIn: '/',
    error: '/',
  },
})

export { handler as GET, handler as POST }
