'use client'

import { Card } from '@/components/ui/card'
import { ProfileHeader } from './header'
import { SocialLinks } from './social-links'
import type { ProfileFormData } from '@/lib/schemas/profile'
import { Skeleton } from '@/components/ui/skeleton'

interface DataProps {
  data?: ProfileFormData
  isLoading?: boolean
  error?: string
}

function ProfileSkeleton() {
  return (
    <div className='relative'>
      <div className='bg-muted relative h-48 w-full overflow-hidden rounded-t-lg' />
      <div className='absolute -bottom-16 left-4'>
        <Skeleton className='h-32 w-32 rounded-full' />
      </div>
      <div className='mt-24 space-y-4 px-4 pt-8'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-48' />
          <Skeleton className='h-4 w-32' />
        </div>
        <Skeleton className='h-16 w-full' />
        <div className='flex gap-2'>
          <Skeleton className='h-8 w-24' />
          <Skeleton className='h-8 w-24' />
        </div>
      </div>
    </div>
  )
}

export function ProfileData({ data, isLoading, error }: DataProps) {
  if (error) {
    return (
      <Card className='overflow-hidden'>
        <div className='flex h-48 items-center justify-center'>
          <p className='text-destructive'>{error}</p>
        </div>
      </Card>
    )
  }

  if (isLoading || !data) {
    return (
      <Card className='overflow-hidden'>
        <ProfileSkeleton />
      </Card>
    )
  }

  return (
    <Card className='overflow-hidden'>
      <ProfileHeader data={data} />
      <div className='mt-2 p-4 pt-6'>
        <SocialLinks data={data} />
      </div>
    </Card>
  )
}
