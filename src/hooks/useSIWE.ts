import { useState, useEffect, useCallback } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { useChainId } from 'wagmi'
import { SiweMessage } from 'siwe'

// This should match what's returned from your API
interface SIWESession {
  address: string | null
  chainId: number | null
  issuedAt: string | null
}

export function useSIWE() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { signMessageAsync } = useSignMessage()

  const [session, setSession] = useState<SIWESession | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch the user session
  const fetchSession = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/auth/me')
      const json = await res.json()

      if (json.address) {
        setSession(json)
      } else {
        setSession(null)
      }
      setLoading(false)
    } catch (err) {
      console.error('Error fetching session:', err)
      setSession(null)
      setLoading(false)
    }
  }, [])

  // Sign in with Ethereum
  const signIn = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      if (!address || !chainId) {
        throw new Error('Wallet not connected')
      }

      // 1. Get random nonce from API
      const nonceRes = await fetch('/api/auth/nonce')
      const nonce = await nonceRes.text()

      // 2. Create SIWE message
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the application.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      })

      // 3. Sign the message
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      // 4. Verify the signature
      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })

      if (!verifyRes.ok) {
        const error = await verifyRes.json()
        throw new Error(error.error || 'Error verifying signature')
      }

      // 5. If successful, update the session
      await fetchSession()
    } catch (err: any) {
      console.error('Error signing in:', err)
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }, [address, chainId, signMessageAsync, fetchSession])

  // Sign out
  const signOut = useCallback(async () => {
    try {
      setLoading(true)
      await fetch('/api/auth/logout')
      setSession(null)
    } catch (err) {
      console.error('Error signing out:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch session when component mounts and when window is focused
  useEffect(() => {
    fetchSession()

    // Refetch when window is focused (in case user logs out in another tab)
    window.addEventListener('focus', fetchSession)
    return () => window.removeEventListener('focus', fetchSession)
  }, [fetchSession])

  return {
    session,
    isConnected,
    isAuthenticated: !!session?.address,
    isLoading: loading,
    error,
    signIn,
    signOut,
    fetchSession,
  }
}
