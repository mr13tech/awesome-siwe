'use client'

import { Web3Button } from '@/components/web3-button'
import { Button } from '@/components/ui/button'
import { useAccount } from 'wagmi'
import Link from 'next/link'

export default function Home() {
  const { status } = useAccount()

  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='flex min-h-[80vh] flex-col items-center justify-center gap-8'>
        <div className='absolute top-4 right-4'></div>

        <div className='mb-8 text-center'>
          <h1 className='text-4xl font-bold tracking-tight'>SIWE Demo App</h1>
          <p className='text-muted-foreground mt-2 text-lg'>
            Sign-In with Ethereum demonstration with profile management
          </p>
        </div>

        <div className='flex max-w-2xl flex-col items-center gap-8 text-center'>
          <div className='space-y-4'>
            <h2 className='text-2xl font-semibold'>Welcome to the SIWE Demo</h2>
            <p className='text-muted-foreground'>
              This application demonstrates how to use Sign-In with Ethereum
              (SIWE) for authentication and profile management. Connect your
              wallet to get started.
            </p>
          </div>

          <div className='grid w-full max-w-md gap-4'>
            {status === 'connected' ? (
              <Button asChild size='lg'>
                <Link href='/profile'>View Your Profile</Link>
              </Button>
            ) : (
              <div className='space-y-4'>
                <p className='text-muted-foreground text-sm'>
                  Connect your wallet using the button in the top right corner
                  to access your profile.
                </p>
                <div className='bg-muted/30 rounded-lg border p-6'>
                  <h3 className='mb-2 font-medium'>Features:</h3>
                  <ul className='text-muted-foreground space-y-1 text-left text-sm'>
                    <li>• Secure authentication with Ethereum</li>
                    <li>• Profile management</li>
                    <li>• Multiple wallet connection options</li>
                    <li>• Responsive design</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
