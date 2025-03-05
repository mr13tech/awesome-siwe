'use client'

import Link from 'next/link'
import { Web3Button } from '@/components/web3-button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { useState } from 'react'
import { Menu, BookOpen } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-6 p-4'>
          <Link href='/' className='flex items-center space-x-2'>
            <span className='from-primary bg-gradient-to-r to-blue-600 bg-clip-text text-xl font-bold text-transparent'>
              awesome SIWE
            </span>
          </Link>

          <NavigationMenu className='hidden md:flex'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
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
        </div>

        <div className='flex items-center gap-2'>
          <div className='md:hidden'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='md:hidden'>
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-[240px] sm:w-[300px]'>
                <div className='flex flex-col gap-6 py-6'>
                  <Link
                    href='/'
                    className='flex items-center gap-2 text-lg font-bold'
                    onClick={() => setIsOpen(false)}
                  >
                    <span className='from-primary bg-gradient-to-r to-blue-600 bg-clip-text text-transparent'>
                      SIWE Demo
                    </span>
                  </Link>
                  <nav className='flex flex-col gap-4'>
                    <div className='text-sm font-medium'>Resources</div>
                    <div className='ml-4 flex flex-col gap-3'>
                      <a
                        href='https://github.com/spruceid/siwe'
                        target='_blank'
                        rel='noreferrer'
                        className='text-muted-foreground flex items-center gap-2 text-sm'
                      >
                        <BookOpen className='h-4 w-4' />
                        SIWE Documentation
                      </a>
                      <a
                        href='https://docs.login.xyz/'
                        target='_blank'
                        rel='noreferrer'
                        className='text-muted-foreground flex items-center gap-2 text-sm'
                      >
                        <BookOpen className='h-4 w-4' />
                        Login.xyz
                      </a>
                      <a
                        href='https://wagmi.sh/'
                        target='_blank'
                        rel='noreferrer'
                        className='text-muted-foreground flex items-center gap-2 text-sm'
                      >
                        <BookOpen className='h-4 w-4' />
                        Wagmi
                      </a>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Web3Button />
        </div>
      </div>
    </header>
  )
}
