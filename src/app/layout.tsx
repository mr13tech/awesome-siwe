import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookieToInitialState } from 'wagmi'
import { getConfig } from '@/config/wagmi'
import { Providers } from '@/app/providers'
import { Header } from '@/components/header'
import React from 'react'
import { headers } from 'next/headers'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SIWE Demo App',
  description: 'Sign-In with Ethereum demonstration with profile management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie'),
  )

  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers initialState={initialState}>
          <div className='relative flex min-h-screen flex-col'>
            <Header />
            <div className='flex-1'>{children}</div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
