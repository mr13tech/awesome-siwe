'use client'

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { WalletOption } from './wallet-option'
import { useWallet } from '@/hooks/use-wallet'

// We don't need isOpen and onOpenChange props anymore since the parent Dialog handles this
export function WalletConnectionDialog() {
  const {
    getConnectors,
    getWalletConfig,
    connectWallet,
    getStatus,
    status,
    error,
    cancel,
  } = useWallet()

  return (
    <DialogContent className='sm:max-w-md'>
      <DialogHeader>
        <DialogTitle className='text-xl'>Connect Wallet</DialogTitle>
        <DialogDescription className='text-muted-foreground text-sm'>
          Select one of the available wallet providers to connect
        </DialogDescription>
      </DialogHeader>
      <div className='grid max-h-[60vh] grid-cols-1 gap-4 overflow-y-auto py-4 pr-1'>
        {getConnectors().map(connector => {
          const config = getWalletConfig(connector.id)
          const connectorStatus = getStatus(connector)

          return (
            <WalletOption
              key={connector.uid}
              connector={connector}
              config={config}
              status={connectorStatus}
              onClick={() => connectWallet(connector)}
              disabled={
                connectorStatus === 'connecting' || status === 'pending'
              }
            />
          )
        })}
      </div>

      {error && (
        <Card className='border-destructive/50'>
          <CardContent className='p-4 text-center'>
            <div className='flex items-center justify-center gap-2'>
              <AlertCircle className='text-destructive h-5 w-5' />
              <p className='text-destructive text-sm'>{error.message}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <DialogFooter className='flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'>
        <Button variant='secondary' onClick={cancel} className='mt-2 sm:mt-0'>
          Cancel
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
