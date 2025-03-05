'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount } from 'wagmi'
import { Profile } from '@/components/profile'

export default function ProfilePage() {
  const router = useRouter()
  const { status } = useAccount()

  // Redirect to home if not connected
  useEffect(() => {
    if (status === 'disconnected') {
      router.push('/')
    }
  }, [status, router])

  // Show loading state while checking connection
  if (status === 'reconnecting' || status === 'connecting') {
    return (
      <div className='container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-16'>
        <div className='text-center'>
          <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]' />
          <p className='text-muted-foreground mt-4'>
            Verifying wallet connection...
          </p>
        </div>
      </div>
    )
  }

  // If disconnected and not yet redirected, show access denied
  if (status === 'disconnected') {
    return (
      <div className='container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-16'>
        <div className='text-center'>
          <h1 className='mb-2 text-2xl font-bold'>Access Denied</h1>
          <p className='text-muted-foreground'>
            Please connect your wallet to view your profile.
          </p>
        </div>
      </div>
    )
  }

  return (
    <main className='container mx-auto px-4 py-8'>
      <div className='flex min-h-[80vh] flex-col items-center justify-center'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold tracking-tight'>Your Profile</h1>
          <p className='text-muted-foreground mt-2'>
            Manage your personal information
          </p>
        </div>

        <div className='w-full max-w-2xl'>
          <Profile />
        </div>
      </div>
    </main>
  )
}
