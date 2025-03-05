import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useWallet } from '@/hooks/use-wallet'
import { useSiweAuth } from '@/hooks/use-siwe-auth'
import { Loader2 } from 'lucide-react'

interface HomeHeroProps {
  isConnected: boolean
}

export function HomeHero({ isConnected }: HomeHeroProps) {
  const { setOpen } = useWallet()
  const { isAuthenticated, login, loading } = useSiweAuth()

  const handleConnectWallet = () => {
    setOpen(true)
  }

  const handleSignIn = async () => {
    await login()
  }

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

      <div className='grid w-full max-w-md gap-6'>
        {isConnected ? (
          isAuthenticated ? (
            <Button
              asChild
              size='lg'
              className='group relative overflow-hidden transition-all duration-300 hover:pr-12'
            >
              <Link
                href='/profile'
                className='flex items-center justify-center gap-2'
              >
                View Your Profile
                <ArrowRight className='absolute right-4 h-5 w-5 translate-x-3 transform opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100' />
              </Link>
            </Button>
          ) : (
            <Button
              size='lg'
              className='group relative overflow-hidden transition-all duration-300'
              onClick={handleSignIn}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  Signing In...
                </>
              ) : (
                'Sign In with Ethereum'
              )}
            </Button>
          )
        ) : (
          <Button
            size='lg'
            className='from-primary hover:to-primary relative overflow-hidden bg-gradient-to-r to-blue-600 transition-all duration-300 hover:from-blue-600'
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </div>
  )
}
