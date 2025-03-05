import { useState, useCallback } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { signIn, signOut, useSession } from 'next-auth/react'
import { createSiweMessage } from '@/lib/siwe'

export function useSiweAuth() {
  const { address } = useAccount()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { signMessageAsync } = useSignMessage()

  const login = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      if (!address) {
        throw new Error('No wallet connected')
      }

      // Create SIWE message
      const message = await createSiweMessage(
        address,
        'Sign in with Ethereum to the app.',
      )

      // Sign message
      const signature = await signMessageAsync({ message })

      // Verify signature
      const response = await signIn('siwe', {
        message,
        signature,
        redirect: false,
      })

      if (response?.error) {
        throw new Error(response.error)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [address, signMessageAsync])

  const logout = useCallback(async () => {
    try {
      setLoading(true)
      await signOut({ redirect: false })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const isConnected = !!session?.address
  const userAddress = session?.address as string | undefined

  return {
    login,
    logout,
    isConnected,
    userAddress,
    loading,
    error,
  }
}
