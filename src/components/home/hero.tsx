import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useSIWE } from '@/hooks/useSIWE'
import { Web3Button } from '@/components/web3-button'
import { useAccount } from 'wagmi'

export function HomeHero() {
  const { isAuthenticated, signIn } = useSIWE()
  const { status } = useAccount()
  const isConnected = status === 'connected'

  return (
    <div className='flex max-w-3xl flex-col items-center gap-8 text-center'>
      <div className='space-y-4'>
        <h2 className='text-2xl font-semibold sm:text-3xl'>
          Welcome to the SIWE Demo
        </h2>
        <p className='text-muted-foreground mx-auto max-w-xl'>
          This application demonstrates how to use Sign-In with Ethereum (SIWE)
          for authentication and profile management. Connect your wallet to get
          started.
        </p>
      </div>

      <div className='item-center flex w-full max-w-md justify-center rounded border p-4 shadow'>
        <Web3Button />
      </div>
    </div>
  )
}
