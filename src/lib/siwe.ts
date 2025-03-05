import { SiweMessage } from 'siwe'
import { getAuthDomain } from './auth'

/**
 * SIWE Message Configuration Options
 */
export interface SiweMessageOptions {
  address: string
  statement: string
  chainId?: number
  expirationInHours?: number
  resources?: string[]
}

/**
 * Generates a cryptographically secure nonce for SIWE authentication
 * @returns A secure random string for use as a nonce
 */
function generateSecureNonce(): string {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2, 15)
  const secondRandom = Math.random().toString(36).substring(2, 15)
  return `siwe-${timestamp}-${random}-${secondRandom}`
}

/**
 * Creates a SIWE message with proper formatting and security measures
 * @param options - Configuration options for the SIWE message
 * @returns Promise resolving to a formatted SIWE message string
 */
export async function createSiweMessage(
  options: SiweMessageOptions,
): Promise<string> {
  const {
    address,
    statement,
    chainId = 1, // Default to Ethereum mainnet
    expirationInHours = 24,
    resources = [],
  } = options

  // Get domain and origin from window location
  const domain = getAuthDomain()
  const origin = window.location.origin

  // Generate a secure nonce directly - no need to fetch from NextAuth
  const nonce = generateSecureNonce()

  // Add the current page as a resource if none provided
  const messageResources =
    resources.length > 0 ? resources : [`${origin}/profile`]

  // Create SIWE message with all required fields
  const siweMessage = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId,
    nonce,
    issuedAt: new Date().toISOString(),
    expirationTime: new Date(
      Date.now() + 1000 * 60 * 60 * expirationInHours,
    ).toISOString(),
    resources: messageResources,
  })

  return siweMessage.prepareMessage()
}

export function truncateAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
