'use client'

import { useSession } from 'next-auth/react'
import { ProtectedRoute } from '@/components/protected-route'
import { formatAddress, formatDate } from '@/lib/auth'
import { Shield } from 'lucide-react'
import { SessionDetails } from '@/components/session-details'

export default function ProfilePage() {
  const { data: session } = useSession()

  return (
    <ProtectedRoute>
      <div className='container mx-auto max-w-4xl py-8'>
        <h1 className='mb-8 text-3xl font-bold'>Your Profile</h1>

        <div className='rounded-lg bg-white p-6 shadow dark:bg-gray-800'>
          <div className='mb-6'>
            <h2 className='mb-2 text-xl font-semibold'>Account Information</h2>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Connected Wallet
                </p>
                <p className='font-medium'>
                  {session?.address
                    ? formatAddress(session.address)
                    : 'Not connected'}
                </p>
                <p className='mt-1 text-xs break-all text-gray-500'>
                  {session?.address}
                </p>
              </div>
              <div>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Blockchain
                </p>
                <p className='font-medium'>
                  {session?.chainId
                    ? `Chain ID: ${session.chainId}`
                    : 'Unknown chain'}
                </p>
              </div>
            </div>
          </div>

          <div className='mb-6'>
            <h2 className='mb-4 text-xl font-semibold'>Security Information</h2>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Authentication Type
                </p>
                <p className='font-medium'>Sign-In with Ethereum (SIWE)</p>
              </div>
              <div>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Last Signed In
                </p>
                <p className='font-medium'>{formatDate(session?.signedAt)}</p>
              </div>
              {session?.expirationTime && (
                <div>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Message Expiration
                  </p>
                  <p className='font-medium'>
                    {formatDate(session.expirationTime)}
                  </p>
                </div>
              )}
              <div>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Session Type
                </p>
                <p className='font-medium'>JWT with 30-day expiration</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className='mb-4 flex items-center text-xl font-semibold'>
              <Shield className='mr-2 h-5 w-5 text-green-500' />
              About Sign-In with Ethereum
            </h2>
            <div className='space-y-2 text-sm text-gray-600 dark:text-gray-300'>
              <p>
                Sign-In with Ethereum (SIWE) is a secure authentication method
                that uses your wallet to prove your identity without sharing a
                password.
              </p>
              <p>
                {
                  'When you sign a SIWE message, you are proving ownership of your Ethereum address without revealing any sensitive information'
                }
              </p>
              <p>Benefits of SIWE:</p>
              <ul className='list-disc space-y-1 pl-5'>
                <li>No password to remember or risk getting stolen</li>
                <li>Your private keys never leave your wallet</li>
                <li>Full control over your digital identity</li>
                <li>Seamless authentication across web3 applications</li>
              </ul>
            </div>
          </div>

          <SessionDetails />
        </div>
      </div>
    </ProtectedRoute>
  )
}
