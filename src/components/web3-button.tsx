'use client'

import { useState } from 'react'
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

// Wallet icons and data
const wallets = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '🦊',
    description: 'Connect to your MetaMask wallet',
    color: 'bg-orange-100 hover:bg-orange-200',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-300',
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: '🔗',
    description: 'Scan with WalletConnect to connect',
    color: 'bg-blue-100 hover:bg-blue-200',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-300',
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: '💰',
    description: 'Connect to your Coinbase wallet',
    color: 'bg-indigo-100 hover:bg-indigo-200',
    textColor: 'text-indigo-800',
    borderColor: 'border-indigo-300',
  },
  {
    id: 'injected',
    name: 'Injected',
    icon: '🔌',
    description: 'Connect with your browser wallet',
    color: 'bg-green-100 hover:bg-green-200',
    textColor: 'text-green-800',
    borderColor: 'border-green-300',
  },
]

export function Web3Button() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  // Map connector IDs to our wallet data
  const getWalletData = (connectorId: string) => {
    return (
      wallets.find(wallet => wallet.id === connectorId.toLowerCase()) ||
      wallets[3]
    ) // Default to injected
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

  if (account.status === 'connected') {
    return (
      <div className='flex items-center gap-2'>
        <Button variant='outline' size='sm' asChild>
          <Link href='/profile'>
            <Avatar className='mr-2 h-5 w-5'>
              <AvatarFallback className='text-xs'>
                {account.connector?.name.charAt(0) || 'W'}
              </AvatarFallback>
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
        <div className='grid grid-cols-2 gap-4 py-4'>
          {connectors.map(connector => {
            const walletData = getWalletData(connector.id)
            return (
              <Button
                key={connector.uid}
                onClick={() => handleConnect(connector)}
                disabled={false}
                variant='outline'
                className={`flex h-24 flex-col items-center justify-center space-y-2 ${walletData.color} ${walletData.borderColor}`}
              >
                <div className='text-2xl'>{walletData.icon}</div>
                <div className={`text-sm font-medium ${walletData.textColor}`}>
                  {connector.name}
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
