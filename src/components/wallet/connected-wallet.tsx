'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { useWallet } from '@/hooks/use-wallet'
import { LogOut } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export function ConnectedWallet() {
  const { account, disconnect, getWalletConfig, formatAddress } = useWallet()

  if (account.status !== 'connected') {
    return null
  }

  const config = account.connector
    ? getWalletConfig(account.connector.id)
    : undefined

  const address = account.addresses?.[0] || ''
  const formattedAddress = formatAddress(address)

  return (
    <div className='flex items-center gap-2'>
      <Button
        variant='outline'
        size='sm'
        asChild
        className='border-primary/20 hover:border-primary/50 flex items-center gap-2 transition-all duration-300'
      >
        <Link href='/profile' className='flex items-center'>
          <Avatar className='border-primary/20 mr-2 h-6 w-6 border'>
            {config?.iconSrc ? (
              <AvatarImage src={config.iconSrc} alt={config.name} />
            ) : (
              <AvatarFallback className='text-xs'>
                {account.connector?.name.charAt(0) || 'W'}
              </AvatarFallback>
            )}
          </Avatar>
          <span className='hidden sm:inline'>{formattedAddress}</span>
          <span className='inline sm:hidden'>
            {address.substring(0, 4)}...{address.substring(address.length - 4)}
          </span>
        </Link>
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='text-muted-foreground hover:text-foreground transition-colors'
          >
            <LogOut className='h-4 w-4' />
            <span className='sr-only'>Disconnect</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-md'>
          <div className='space-y-4 py-4 text-center'>
            <h3 className='text-lg font-medium'>Disconnect Wallet</h3>
            <p className='text-muted-foreground text-sm'>
              Are you sure you want to disconnect your wallet?
            </p>
            <div className='flex justify-center gap-2 pt-2'>
              <Button variant='outline' onClick={() => disconnect()}>
                Yes, disconnect
              </Button>
              <DialogTrigger asChild>
                <Button>Cancel</Button>
              </DialogTrigger>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
