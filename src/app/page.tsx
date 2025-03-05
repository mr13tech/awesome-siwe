'use client'

import { useAccount } from 'wagmi'
import { HomeHero } from '@/components/home/hero'
import { HomeFeatures } from '@/components/home/features'

export default function Home() {
  const { status } = useAccount()
  const isConnected = status === 'connected'

  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='flex min-h-[80vh] flex-col items-center justify-center gap-8'>
        <div className='mb-8 text-center'>
          <h1 className='from-primary bg-gradient-to-r to-blue-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl'>
            SIWE Demo App
          </h1>
          <p className='text-muted-foreground mx-auto mt-4 max-w-2xl text-lg'>
            Sign-In with Ethereum demonstration with secure profile management
          </p>
        </div>

        <HomeHero isConnected={isConnected} />

        {!isConnected && (
          <div className='w-full space-y-6'>
            <HomeFeatures />
          </div>
        )}
      </div>
    </main>
  )
}
