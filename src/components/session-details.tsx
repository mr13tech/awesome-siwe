'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Key } from 'lucide-react'
import { useSIWE } from '@/hooks/useSIWE'

export function SessionDetails() {
  const { session } = useSIWE()
  const [expanded, setExpanded] = useState(false)

  if (!session) {
    return null
  }

  return (
    <div className='mt-6 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'>
      <button
        onClick={() => setExpanded(!expanded)}
        className='flex w-full items-center justify-between p-4 text-left'
      >
        <div className='flex items-center space-x-2'>
          <Key className='h-4 w-4 text-blue-500' />
          <span className='font-medium'>Session Details</span>
        </div>
        {expanded ? (
          <ChevronUp className='h-4 w-4' />
        ) : (
          <ChevronDown className='h-4 w-4' />
        )}
      </button>

      {expanded && (
        <div className='border-t border-gray-200 p-4 dark:border-gray-700'>
          <pre className='overflow-auto rounded bg-gray-100 p-4 text-xs dark:bg-gray-800'>
            {JSON.stringify(session, null, 2)}
          </pre>
          <p className='mt-2 text-xs text-gray-500'>
            This is the raw session data stored after SIWE authentication. It
            contains your address, authentication timestamps, and other
            metadata.
          </p>
        </div>
      )}
    </div>
  )
}
