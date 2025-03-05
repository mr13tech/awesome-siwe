'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, type Connector } from 'wagmi'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

// Wallet data with improved styling
const wallets = [
  {
    id: 'metamask',
    name: 'MetaMask',
    iconSrc: '/icons/metamask.svg',
    description: 'Connect to your MetaMask wallet',
    color: 'bg-orange-100 hover:bg-orange-200',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-300',
  },
  {
    id: 'walletConnect',
    name: 'WalletConnect',
    iconSrc: '/icons/walletconnect.svg',
    description: 'Scan with WalletConnect to connect',
    color: 'bg-blue-100 hover:bg-blue-200',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-300',
  },
  {
    id: 'safe',
    name: 'Safe',
    iconSrc: '/icons/safe.svg',
    description: 'Connect to your Safe wallet',
    color: 'bg-green-100 hover:bg-green-200',
    textColor: 'text-green-800',
    borderColor: 'border-green-300',
  },
  {
    id: 'injected',
    name: 'Injected',
    iconSrc: '/icons/injected.svg',
    description: 'Connect with your browser wallet',
    color: 'bg-emerald-100 hover:bg-emerald-200',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-300',
  },
]

export function Web3Button() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  // Handle SSR
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Map connector IDs to our wallet data
  const getWalletData = (connectorId: string) => {
    // Convert connector ID to lowercase for comparison
    const lowerId = connectorId.toLowerCase()

    // Find matching wallet data or default to injected
    return (
      wallets.find(
        wallet =>
          wallet.id.toLowerCase() === lowerId ||
          (lowerId.includes(wallet.id.toLowerCase()) &&
            wallet.id !== 'injected'),
      ) || wallets[3] // Default to injected
    )
  }

  // Get wallet provider info
  const getWalletProviderInfo = (connector: Connector) => {
    // Check if the connector has a provider property
    const provider = (connector as any).provider

    if (!provider) return null

    return {
      isMetaMask: provider.isMetaMask,
      isCoinbaseWallet: provider.isCoinbaseWallet,
      isWalletConnect: connector.id.toLowerCase().includes('walletconnect'),
      isSafe: connector.id.toLowerCase().includes('safe'),
    }
  }

  // Filter and sort connectors to avoid duplicates and prioritize specific wallets
  const getFilteredConnectors = () => {
    // First, check if we have specific wallet providers
    const hasMetaMask = connectors.some(
      c =>
        c.name.toLowerCase().includes('metamask') ||
        getWalletProviderInfo(c)?.isMetaMask,
    )

    const hasCoinbase = connectors.some(
      c =>
        c.name.toLowerCase().includes('coinbase') ||
        getWalletProviderInfo(c)?.isCoinbaseWallet,
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

  const handleConnect = (connector: Connector) => {
    connect({ connector })
    setIsDialogOpen(false)
  }

  // Truncate address for display
  const truncateAddress = (address: string) => {
    if (!address) return 'Unknown address'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!isMounted) {
    return <Button>Connect Wallet</Button>
  }

  if (account.status === 'connected') {
    const walletData = account.connector
      ? getWalletData(account.connector.id)
      : wallets[3]

    return (
      <div className='flex items-center gap-2'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/profile' className='flex items-center'>
            <Avatar className='mr-2 h-6 w-6'>
              {walletData.iconSrc ? (
                <AvatarImage src={walletData.iconSrc} alt={walletData.name} />
              ) : (
                <AvatarFallback className='text-xs'>
                  {walletData.name.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>
            {truncateAddress(account.addresses?.[0] || '')}
          </Link>
        </Button>
        <Button variant='ghost' size='sm' onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Select one of the available wallet providers to connect
          </DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-1 gap-4 py-4'>
          {getFilteredConnectors().map(connector => {
            const walletData = getWalletData(connector.id)
            return (
              <Button
                key={connector.uid}
                onClick={() => handleConnect(connector)}
                variant='outline'
                className={`flex h-16 w-full items-center justify-start gap-4 px-4 ${walletData.color} ${walletData.borderColor} border`}
              >
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white p-1 shadow-sm'>
                  {walletData.iconSrc ? (
                    <Image
                      src={walletData.iconSrc}
                      alt={connector.name}
                      width={32}
                      height={32}
                      className='h-8 w-8'
                    />
                  ) : (
                    <div className='text-2xl'>{connector.name.charAt(0)}</div>
                  )}
                </div>
                <div className='flex flex-col items-start'>
                  <div
                    className={`text-sm font-medium ${walletData.textColor}`}
                  >
                    {connector.name}
                  </div>
                  <div className='text-xs text-gray-600'>
                    {walletData.description}
                  </div>
                </div>
              </Button>
            )
          })}
        </div>

        {status === 'pending' && (
          <Card>
            <CardContent className='p-4 text-center'>
              <div className='mb-2 inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]' />
              <p className='text-muted-foreground text-sm'>Connecting...</p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card>
            <CardContent className='text-destructive p-4 text-center'>
              <p className='text-sm'>{error.message}</p>
            </CardContent>
          </Card>
        )}

        <DialogFooter className='flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'>
          <Button variant='secondary' onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
