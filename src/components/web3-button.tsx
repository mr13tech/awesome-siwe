'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useWallet } from '@/hooks/use-wallet'
import { WalletConnectionDialog } from './wallet/wallet-connection-dialog'
import { ConnectedWallet } from './wallet/connected-wallet'
import { Loader2 } from 'lucide-react'

export function Web3Button() {
  const { mounted, account, open, setOpen } = useWallet()

  if (!mounted) {
    return (
      <Button
        variant='outline'
        size='sm'
        disabled
        className='relative min-w-[120px] overflow-hidden'
      >
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        <span className='truncate'>Loading...</span>
      </Button>
    )
  }

  if (account.status === 'connected') {
    return <ConnectedWallet />
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size='sm'
          className='from-primary hover:to-primary relative overflow-hidden bg-gradient-to-r to-blue-600 transition-all duration-300 hover:from-blue-600'
        >
          Connect Wallet
        </Button>
      </DialogTrigger>
      <WalletConnectionDialog />
    </Dialog>
  )
}
