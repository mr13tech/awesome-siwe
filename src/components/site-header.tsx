'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Web3Button } from '@/components/web3-button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useAccount } from 'wagmi'

export function SiteHeader() {
  const pathname = usePathname()
  const { status } = useAccount()

  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='container flex h-16 items-center'>
        <div className='mr-4 flex'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='text-xl font-bold'>SIWE Demo</span>
          </Link>
        </div>
        <NavigationMenu className='hidden md:flex'>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href='/' legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathname === '/'}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {status === 'connected' && (
              <NavigationMenuItem>
                <Link href='/profile' legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={pathname === '/profile'}
                  >
                    Profile
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2'>
                  <li className='row-span-3'>
                    <NavigationMenuLink asChild>
                      <a
                        className='from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md'
                        href='https://github.com/spruceid/siwe'
                        target='_blank'
                        rel='noreferrer'
                      >
                        <div className='mt-4 mb-2 text-lg font-medium'>
                          SIWE Documentation
                        </div>
                        <p className='text-muted-foreground text-sm leading-tight'>
                          Learn more about Sign-In with Ethereum and how it
                          works.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className='hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none'
                        href='https://docs.login.xyz/'
                        target='_blank'
                        rel='noreferrer'
                      >
                        <div className='text-sm leading-none font-medium'>
                          Login.xyz
                        </div>
                        <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
                          Sign-In with Ethereum implementation and resources.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className='hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none'
                        href='https://wagmi.sh/'
                        target='_blank'
                        rel='noreferrer'
                      >
                        <div className='text-sm leading-none font-medium'>
                          Wagmi
                        </div>
                        <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
                          React hooks for Ethereum - used in this demo.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className='flex flex-1 items-center justify-end'>
          <Web3Button />
        </div>
      </div>
    </header>
  )
}
