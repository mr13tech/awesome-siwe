'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, type Connector } from 'wagmi'
import { walletConfig } from '@/config/wallet'

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
    const getWalletConfig = (connectorId: string) => {
        // Convert connector ID to lowercase for comparison
        const lowerId = connectorId.toLowerCase()

        // Find matching wallet config or default to injected
        return (
            walletConfig.find(
                wallet =>
                    wallet.id.toLowerCase() === lowerId ||
                    (lowerId.includes(wallet.id.toLowerCase()) &&
                        wallet.id !== 'injected'),
            ) || walletConfig[3] // Default to injected
        )
    }

    // Get wallet provider info
    const getProviderInfo = (connector: Connector) => {
        // Check if the connector has a provider property
        const provider = connector.provider

        if (!provider) return null

        return {
            isMetaMask: provider.isMetaMask,
            isCoinbaseWallet: provider.isCoinbaseWallet,
            isWalletConnect: connector.id.toLowerCase().includes('walletconnect'),
            isSafe: connector.id.toLowerCase().includes('safe'),
        }
    }

    // Filter and sort connectors to avoid duplicates and prioritize specific wallets
    const getConnectors = () => {
        // First, check if we have specific wallet providers
        const hasMetaMask = connectors.some(
            c =>
                c.name.toLowerCase().includes('metamask') ||
                getProviderInfo(c)?.isMetaMask,
        )

        const hasCoinbase = connectors.some(
            c =>
                c.name.toLowerCase().includes('coinbase') ||
                getProviderInfo(c)?.isCoinbaseWallet,
        )

        // Filter out generic injected if we have specific injected wallets
        return (
            connectors
                .filter(connector => {
                    // If this is the generic injected connector
                    if (
                        connector.id === 'injected' &&
                        !connector.name.includes('MetaMask') &&
                        !connector.name.includes('Coinbase')
                    ) {
                        // Only keep it if we don't have specific injected wallets
                        return !hasMetaMask && !hasCoinbase
                    }
                    return true
                })
                // Sort to prioritize specific wallets
                .sort((a, b) => {
                    // MetaMask first
                    if (a.name.includes('MetaMask')) return -1
                    if (b.name.includes('MetaMask')) return 1

                    // Then WalletConnect
                    if (a.id.includes('walletConnect')) return -1
                    if (b.id.includes('walletConnect')) return 1

                    // Then Safe
                    if (a.id.includes('safe')) return -1
                    if (b.id.includes('safe')) return 1

                    return 0
                })
        )
    }

    const connectWallet = (connector: Connector) => {
        // Set connecting state
        setConnecting(connector)

        // Start connection
        connect({ connector })
    }

    // Get connection status for a specific connector
    const getStatus = (connector: Connector) => {
        if (connecting?.uid === connector.uid) {
            if (status === 'pending') return 'connecting'
            if (status === 'success') return 'connected'
            if (status === 'error') return 'error'
            return 'connecting'
        }
        return 'idle'
    }

    // Truncate address for display
    const formatAddress = (address: string) => {
        if (!address) return 'Unknown address'
        return `${address.slice(0, 6)}...${address.slice(-4)}`
    }

    const cancel = () => {
        setConnecting(null)
        setOpen(false)
    }

    return {
        open,
        setOpen,
        mounted,
        connecting,
        account,
        connectors,
        status,
        error,
        disconnect,
        getWalletConfig,
        getConnectors,
        connectWallet,
        getStatus,
        formatAddress,
        cancel,
    }
}
