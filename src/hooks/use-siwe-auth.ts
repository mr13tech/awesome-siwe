import { useState, useCallback } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { signIn, signOut, useSession } from 'next-auth/react'
import { createSiweMessage, SiweMessageOptions } from '@/lib/siwe'

/**
 * Error messages for SIWE authentication
 */
enum SiweAuthError {
  NO_WALLET = 'No wallet connected. Please connect your wallet first.',
  SIGN_CANCELLED = 'Message signing was cancelled by the user.',
  UNKNOWN = 'An unknown error occurred during authentication.',
  SERVER_ERROR = 'Server authentication failed. Please try again.',
}

/**
 * Hook for Sign-In with Ethereum authentication
 * Provides login, logout functionality and authentication state
 */
export function useSiweAuth() {
  const { address } = useAccount()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { signMessageAsync } = useSignMessage()

  /**
   * Initiates the SIWE login flow
   * 1. Creates a SIWE message
   * 2. Signs it with the connected wallet
   * 3. Verifies the signature with the server
   */
  const login = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      if (!address) {
        throw new Error(SiweAuthError.NO_WALLET)
      }

      // Create SIWE message with the connected address
      let message: string
      try {
        const messageOptions: SiweMessageOptions = {
          address,
          statement:
            'Sign in with Ethereum to authenticate with this application.',
          resources: [`${window.location.origin}/profile`],
        }

        message = await createSiweMessage(messageOptions)
      } catch (messageError) {
        console.error('Error creating SIWE message:', messageError)
        throw new Error(
          'Failed to create authentication message. Please try again.',
        )
      }

      // Sign the message with the user's wallet
      let signature
      try {
        signature = await signMessageAsync({ message })
      } catch (err) {
        // Handle user cancellation specifically
        if (
          (err as any)?.code === 4001 ||
          (err as Error)?.message?.includes('rejected')
        ) {
          throw new Error(SiweAuthError.SIGN_CANCELLED)
        }
        throw err
      }

      // Verify signature with NextAuth
      const response = await signIn('siwe', {
        message,
        signature,
        redirect: false,
      })

      if (response?.error) {
        console.error('NextAuth error:', response.error)
        throw new Error(response.error || SiweAuthError.SERVER_ERROR)
      }

      return true
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : SiweAuthError.UNKNOWN

      setError(errorMessage)
      console.error('SIWE authentication error:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [address, signMessageAsync])

  /**
   * Logs out the user from the SIWE session
   */
  const logout = useCallback(async () => {
    try {
      setLoading(true)
      await signOut({ redirect: false })
      return true
    } catch (err) {
      console.error('SIWE logout error:', err)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    login,
    logout,
    isAuthenticated: !!session?.address,
    userAddress: session?.address,
    loading,
    error,
    clearError: () => setError(null),
    session,
  }
}
