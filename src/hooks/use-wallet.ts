'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAccount, useConnect, useDisconnect, type Connector } from 'wagmi'
import { wallets } from '@/config/wallet'

export function useWallet() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [connecting, setConnecting] = useState<Connector | null>(null)

  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  // Handle SSR
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle connection success
  useEffect(() => {
    if (status === 'success' && connecting) {
      // Close dialog after successful connection
      window.setTimeout(() => {
        setConnecting(null)
        setOpen(false)
      }, 1000) // Short delay to show success state
    }
  }, [status, connecting])

  // Handle connection error
  useEffect(() => {
    if (status === 'error' && connecting) {
      setConnecting(null)
    }
  }, [status, connecting])

  // Close dialog when account is connected
  useEffect(() => {
    if (account.status === 'connected' && open) {
      setConnecting(null)
      setOpen(false)
    }
  }, [account.status, open])

  // Map connector IDs to our wallet config
  const getWalletConfig = useCallback((connectorId: string) => {
    // Convert connector ID to lowercase for comparison
    const lowerId = connectorId.toLowerCase()

    // Find matching wallet config or default to injected
    return (
      wallets.find(
        wallet =>
          wallet.id.toLowerCase() === lowerId ||
          (lowerId.includes(wallet.id.toLowerCase()) &&
            wallet.id !== 'injected'),
      ) || wallets[3] // Default to injected
    )
  }, [])

  const connectWallet = useCallback(
    (connector: Connector) => {
      setConnecting(connector)
      connect({ connector })
    },
    [connect],
  )

  // Simple status check for a connector
  const getStatus = useCallback(
    (connector: Connector) => {
      if (connecting?.uid === connector.uid) {
        if (status === 'pending') return 'connecting'
        if (status === 'success') return 'connected'
        if (status === 'error') return 'error'
        return 'connecting'
      }
      return 'idle'
    },
    [connecting, status],
  )

  // Truncate address for display
  const formatAddress = (address: string) => {
    if (!address) return 'Unknown address'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const cancel = useCallback(() => {
    setConnecting(null)
    setOpen(false)
  }, [])

  return {
    open,
    setOpen,
    mounted,
    connecting,
    account,
    connectors, // Direct export from wagmi
    status,
    error,
    disconnect,
    getWalletConfig,
    connectWallet,
    getStatus,
    formatAddress,
    cancel,
  }
}
