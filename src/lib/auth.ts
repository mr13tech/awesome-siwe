/**
 * Authentication utilities
 * This file contains utilities for authentication related functions
 */

/**
 * Gets the authentication domain from environment or defaults to localhost:3000
 * @returns Domain string for SIWE authentication
 */
export const getAuthDomain = (): string => {
  // If running in browser, use window.location.host
  if (typeof window !== 'undefined') {
    return window.location.host
  }

  // In Node.js environment (server-side), use environment variables
  const nextAuthUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  try {
    return new URL(nextAuthUrl).host
  } catch (error) {
    console.warn('Invalid NEXTAUTH_URL, falling back to localhost:3000', error)
    return 'localhost:3000'
  }
}

/**
 * Formats an Ethereum address for display
 * @param address - The full Ethereum address to format
 * @param prefixLength - Number of characters to show at start (default: 6)
 * @param suffixLength - Number of characters to show at end (default: 4)
 * @returns Formatted address string with ellipsis
 */
export function formatAddress(
  address: string,
  prefixLength = 6,
  suffixLength = 4,
): string {
  if (!address || address.length < prefixLength + suffixLength) {
    return address || ''
  }

  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`
}

/**
 * Format a timestamp for display
 * @param dateString - ISO date string to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    dateStyle: 'medium',
    timeStyle: 'short',
  },
): string {
  if (!dateString) return 'Unknown'

  try {
    return new Date(dateString).toLocaleString(undefined, options)
  } catch (e) {
    console.error('Error formatting date:', e)
    return 'Invalid date'
  }
}
