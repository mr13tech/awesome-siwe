'use client'

import { ProtectedRoute } from '@/components/protected-route'
import { formatAddress, formatDate } from '@/lib/auth'
import { Shield } from 'lucide-react'
import { SessionDetails } from '@/components/session-details'
import { ProfileCard } from '@/components/profile/card'
import { useSIWE } from '@/hooks/useSIWE'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
  const { session, isLoading, fetchSession } = useSIWE()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Fetch session data when the component mounts
    const init = async () => {
      await fetchSession()
      setIsReady(true)
    }
    init()
  }, [fetchSession])

  return (
    <ProtectedRoute>
      <div className='container mx-auto max-w-4xl py-8'>
        <h1 className='mb-8 text-3xl font-bold'>Your Profile</h1>

        {isLoading && !isReady ? (
          <div className='flex min-h-[30vh] items-center justify-center'>
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
              <p className='text-lg font-medium'>Loading profile data...</p>
            </div>
          </div>
        ) : (
          session && (
            <div className='rounded-lg bg-white p-6 shadow dark:bg-gray-800'>
              <ProfileCard
                initialData={{
                  name: 'luc',
                  ensName: 'luc.eth',
                  avatar:
                    'ipfs://bafkreifnrjhkl7ccr2ifwn2n7ap6dh2way25a6w5x2szegvj5pt4b5nvfu',
                  header:
                    'ipfs://bafkreie5e6fkxltkyyn3q5hwblhd3c42mpwlqnis2a6hmfwitzdgbt7zdu',
                  description:
                    'Create Epic Shit, DevRel @ ENS, Researcher @ V3X',
                  location: 'Breda, NL',
                  email: 'luc@ens.domains',
                  url: 'https://luc.computer',
                  socialmedia: [
                    {
                      platform: 'twitter',
                      username: 'lucemansnl',
                    },
                    {
                      platform: 'github',
                      username: 'lucemans',
                    },
                  ],
                }}
              />

              <div className='mt-8 mb-6'>
                <h2 className='mb-2 text-xl font-semibold'>
                  Account Information
                </h2>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Connected Wallet
                    </p>
                    <p className='font-medium'>
                      {session.address
                        ? formatAddress(session.address)
                        : 'Not connected'}
                    </p>
                    <p className='mt-1 text-xs break-all text-gray-500'>
                      {session.address}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Blockchain
                    </p>
                    <p className='font-medium'>
                      {session.chainId
                        ? `Chain ID: ${session.chainId}`
                        : 'Unknown chain'}
                    </p>
                  </div>
                </div>
              </div>

              <div className='mb-6'>
                <h2 className='mb-4 text-xl font-semibold'>
                  Security Information
                </h2>
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
                    <p className='font-medium'>
                      {session.issuedAt
                        ? formatDate(session.issuedAt)
                        : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Session Type
                    </p>
                    <p className='font-medium'>Iron-session with SIWE</p>
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
                    Sign-In with Ethereum (SIWE) is a secure authentication
                    method that uses your wallet to prove your identity without
                    sharing a password.
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
          )
        )}
      </div>
    </ProtectedRoute>
  )
}
