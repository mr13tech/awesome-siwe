import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts an IPFS URL to an HTTP URL for display
 * @param url - The IPFS URL to convert (ipfs://...)
 * @returns HTTP URL for the IPFS content
 */
export function getIPFSUrl(url: string): string {
  if (!url) return ''

  // If already an HTTP URL, return as is
  if (url.startsWith('http')) return url

  // Convert IPFS URL to HTTP URL
  return url.replace('ipfs://', 'https://ipfs.io/ipfs/')
}
