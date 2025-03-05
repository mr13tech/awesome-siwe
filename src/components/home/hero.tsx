import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface HomeHeroProps {
  isConnected: boolean
}

export function HomeHero({ isConnected }: HomeHeroProps) {
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
          <p className='text-muted-foreground text-sm sm:text-base'>
            Connect your wallet using the button in the top right corner to
            access your profile.
          </p>
        )}
      </div>
    </div>
  )
}
