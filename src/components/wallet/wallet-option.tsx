'use client'

import Image from 'next/image'
import type { Connector } from 'wagmi'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { WalletConfig } from '@/config/wallet'

type WalletOptionProps = {
  connector: Connector
  config: WalletConfig
  status: 'idle' | 'connecting' | 'connected' | 'error'
  onClick: () => void
  disabled: boolean
}

export function WalletOption({
  connector,
  config,
  status,
  onClick,
  disabled,
}: WalletOptionProps) {
  return (
    <Button
      key={connector.uid}
      onClick={onClick}
      variant='outline'
      disabled={disabled}
      className={`relative flex h-16 w-full items-center justify-start gap-4 border px-4 transition-all duration-300 ${disabled ? 'opacity-70' : 'hover:border-primary/50 hover:shadow-sm'} ${status === 'connecting' ? 'border-blue-400/50 bg-blue-50/10' : ''} ${status === 'connected' ? 'border-green-400/50 bg-green-50/10' : ''} ${status === 'error' ? 'border-red-400/50 bg-red-50/10' : ''}`}
    >
      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white p-1 shadow-sm'>
        {config.iconSrc ? (
          <Image
            src={config.iconSrc}
            alt={connector.name}
            width={32}
            height={32}
            className='h-8 w-8'
          />
        ) : (
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-lg font-medium text-gray-800'>
            {connector.name.charAt(0)}
          </div>
        )}
      </div>
      <div className='flex flex-col items-start'>
        <div className='text-sm font-medium'>{connector.name}</div>
        <div className='text-muted-foreground text-xs'>
          {status === 'connecting'
            ? 'Waiting for approval...'
            : status === 'connected'
              ? 'Connected successfully!'
              : status === 'error'
                ? 'Connection failed'
                : config.description}
        </div>
      </div>

      {/* Status indicators */}
      {status === 'connecting' && (
        <div className='absolute right-4'>
          <Loader2 className='h-5 w-5 animate-spin text-blue-500' />
        </div>
      )}
      {status === 'connected' && (
        <div className='absolute right-4'>
          <CheckCircle2 className='h-5 w-5 text-green-500' />
        </div>
      )}
      {status === 'error' && (
        <div className='absolute right-4'>
          <AlertCircle className='h-5 w-5 text-red-500' />
        </div>
      )}
    </Button>
  )
}
