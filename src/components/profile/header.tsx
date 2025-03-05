'use client'

import { User } from 'lucide-react'
import Image from 'next/image'
import { getIPFSUrl } from '@/lib/utils'
import type { ProfileFormData } from '@/lib/schemas/profile'
import { Skeleton } from '@/components/ui/skeleton'

interface HeaderProps {
  data: ProfileFormData
  isLoading?: boolean
}

export function ProfileHeader({ data, isLoading }: HeaderProps) {
  const headerUrl = data.header ? getIPFSUrl(data.header) : null
  const avatarUrl = data.avatar ? getIPFSUrl(data.avatar) : null

  if (isLoading) {
    return (
      <div className='relative'>
        <Skeleton className='h-48 w-full rounded-t-lg' />
        <div className='absolute -bottom-16 left-4'>
          <Skeleton className='border-background h-32 w-32 rounded-full border-4' />
        </div>
        <div className='mt-24 space-y-4 px-4 pt-8'>
          <div className='space-y-2'>
            <Skeleton className='h-8 w-48' />
            <Skeleton className='h-4 w-32' />
          </div>
          <Skeleton className='h-16 w-full' />
        </div>
      </div>
    )
  }

  return (
    <div className='relative'>
      {/* Header Image */}
      <div className='bg-muted group relative h-48 w-full overflow-hidden rounded-t-lg transition-all'>
        {headerUrl ? (
          <Image
            src={headerUrl}
            alt='Profile header'
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, 768px'
            priority
          />
        ) : (
          <div className='from-muted to-muted/50 flex h-full w-full items-center justify-center bg-gradient-to-br'>
            <span className='text-muted-foreground text-sm'>
              No header image
            </span>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className='absolute right-8 -bottom-16'>
        <div className='border-background bg-muted hover:border-primary/20 group relative h-32 w-32 overflow-hidden rounded-full border-4 transition-all'>
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt='Profile avatar'
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-110'
              sizes='128px'
              priority
            />
          ) : (
            <div className='from-muted to-muted/50 flex h-full w-full items-center justify-center bg-gradient-to-br'>
              <User className='text-muted-foreground h-16 w-16' />
            </div>
          )}
        </div>
      </div>

      {/* Profile Info - Increased top margin and added padding-top */}
      <div className='mt-24 space-y-4 px-4 pt-8'>
        <div className='space-y-1'>
          <div className='flex items-baseline gap-2'>
            <h1 className='text-2xl font-bold tracking-tight'>{data.name}</h1>
            {data.ensName && (
              <span className='text-primary text-sm font-medium'>
                {data.ensName}
              </span>
            )}
          </div>
          {data.description && (
            <p className='text-muted-foreground text-sm leading-relaxed'>
              {data.description}
            </p>
          )}
        </div>
        <div className='flex flex-wrap gap-x-6 gap-y-2 text-sm'>
          {data.location && (
            <span className='text-muted-foreground flex items-center gap-1'>
              <span className='text-primary/60'>📍</span> {data.location}
            </span>
          )}
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className='text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors'
            >
              <span className='text-primary/60'>✉️</span> {data.email}
            </a>
          )}
          {data.url && (
            <a
              href={data.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors'
            >
              <span className='text-primary/60'>🔗</span>{' '}
              {new URL(data.url).hostname}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
