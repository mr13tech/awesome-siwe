'use client'

import type { JSX } from 'react'
import { Github, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ProfileFormData } from '@/lib/schemas/profile'

interface SocialLinksProps {
  data: ProfileFormData
}

type SocialPlatform = 'twitter' | 'github'

interface SocialConfig {
  icon: JSX.Element
  url: (username: string) => string
}

const SOCIAL_CONFIGS: Record<SocialPlatform, SocialConfig> = {
  twitter: {
    icon: <Twitter className='h-4 w-4' />,
    url: username => `https://twitter.com/${username}`,
  },
  github: {
    icon: <Github className='h-4 w-4' />,
    url: username => `https://github.com/${username}`,
  },
}

export function SocialLinks({ data }: SocialLinksProps) {
  if (!data.socialmedia?.length) return null

  return (
    <div className='flex gap-2'>
      {data.socialmedia.map((social, index) => {
        const platform = social.platform.toLowerCase() as SocialPlatform
        const config = SOCIAL_CONFIGS[platform]
        if (!config) return null

        return (
          <Button
            key={`${platform}-${index}`}
            variant='outline'
            size='sm'
            asChild
            className='gap-2'
          >
            <a
              href={config.url(social.username)}
              target='_blank'
              rel='noopener noreferrer'
            >
              {config.icon}
              <span>{social.username}</span>
            </a>
          </Button>
        )
      })}
    </div>
  )
}
