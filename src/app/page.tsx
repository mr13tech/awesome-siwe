'use client'

import { WalletConnect } from '@/components/wallet-connect'
import { ProfileApp } from '@/components/profile-app'

export default function Home() {
  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='flex min-h-[80vh] flex-col items-center justify-center gap-8'>
        <div className='mb-8 text-center'>
          <h1 className='text-4xl font-bold tracking-tight'>SIWE Demo App</h1>
          <p className='text-muted-foreground mt-2 text-lg'>
            Sign-In with Ethereum demonstration with profile management
          </p>
        </div>

        <div className='grid w-full max-w-4xl gap-8 md:grid-cols-2'>
          <div>
            <WalletConnect />
          </div>
          <div>
            <ProfileApp />
          </div>
        </div>
      </div>
    </main>
  )
}
