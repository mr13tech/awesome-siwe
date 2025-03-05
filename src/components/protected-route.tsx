'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import React from 'react'
import { useSIWE } from '@/hooks/useSIWE'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, fetchSession } = useSIWE()
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      await fetchSession()
      setIsChecking(false)
    }

    checkAuth()
  }, [fetchSession])

  useEffect(() => {
    if (isChecking || isLoading) return

    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, isChecking, router])

  if (isLoading || isChecking) {
    return (
      <div className='flex min-h-[50vh] items-center justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <svg
            className='text-primary h-10 w-10 animate-spin'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
          <p className='text-lg font-medium'>Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
