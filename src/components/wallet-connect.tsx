'use client'

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, type Connector } from 'wagmi'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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

export function WalletConnect() {
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

  return (
    <div className='mx-auto w-full max-w-md'>
      {account.status === 'connected' ? (
        <Card>
          <CardHeader>
            <CardTitle>Connected Wallet</CardTitle>
            <CardDescription>
              You&apos;re connected with {account.connector?.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex items-center space-x-4'>
              <Avatar className='h-12 w-12'>
                <AvatarFallback className='bg-primary/10'>
                  {account.connector?.name.charAt(0) || 'W'}
                </AvatarFallback>
              </Avatar>
              <div className='space-y-1'>
                <p className='text-sm font-medium'>Address</p>
                <p className='text-muted-foreground text-xs break-all'>
                  {account.addresses?.[0] || 'Unknown address'}
                </p>
              </div>
            </div>
            <div className='mt-4 text-sm'>
              <div className='flex justify-between py-1'>
                <span className='text-muted-foreground'>Chain ID</span>
                <span>{account.chainId}</span>
              </div>
              <div className='flex justify-between py-1'>
                <span className='text-muted-foreground'>Status</span>
                <span className='capitalize'>{account.status}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant='destructive'
              className='w-full'
              onClick={() => disconnect()}
            >
              Disconnect Wallet
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Connect Wallet</CardTitle>
            <CardDescription>
              Choose a wallet to connect to this application
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant='outline' className='w-full'>
                  Select Wallet
                </Button>
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
                        <div
                          className={`text-sm font-medium ${walletData.textColor}`}
                        >
                          {connector.name}
                        </div>
                      </Button>
                    )
                  })}
                </div>
                <DialogFooter className='flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'>
                  <Button
                    variant='secondary'
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {status === 'pending' && (
              <div className='text-muted-foreground py-2 text-center text-sm'>
                Connecting...
              </div>
            )}

            {error && (
              <div className='text-destructive py-2 text-center text-sm'>
                {error.message}
              </div>
            )}
          </CardContent>
          <CardFooter className='text-muted-foreground text-xs'>
            By connecting your wallet, you agree to our Terms of Service and
            Privacy Policy
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
