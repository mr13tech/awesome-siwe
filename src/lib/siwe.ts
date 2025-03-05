import { SiweMessage } from 'siwe'
import { getCsrfToken } from 'next-auth/react'

export async function createSiweMessage(address: string, statement: string) {
  const domain = window.location.host
  const origin = window.location.origin

  // Default to mainnet (chain ID 1)
  const chainId = 1

  const csrfToken = await getCsrfToken()
  if (!csrfToken) throw new Error('CSRF token not found')

  // Create a SIWE message with additional metadata
  const siweMessage = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId,
    nonce: csrfToken,
    // Adding optional fields for enhanced functionality
    issuedAt: new Date().toISOString(),
    expirationTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours from now
    resources: [
      `${origin}/profile`, // Example: specify resources this signature grants access to
    ],
  })

  return siweMessage.prepareMessage()
}

export function truncateAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
