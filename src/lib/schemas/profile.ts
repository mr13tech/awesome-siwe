import * as z from 'zod'

// Base schema for social media
const socialMediaSchema = z.object({
  platform: z.enum(['twitter', 'github']),
  username: z.string().optional().default(''),
})

// Main profile schema
export const profileSchema = z.object({
  name: z.string().max(100).optional().default(''),
  ensName: z.string().optional().default(''),
  avatar: z.string().url('Invalid URL format').optional().or(z.literal('')),
  header: z.string().url('Invalid URL format').optional().or(z.literal('')),
  description: z
    .string()
    .max(160, 'Description must be less than 160 characters')
    .optional(),
  location: z.string().max(100).optional(),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  url: z.string().url('Invalid URL format').optional().or(z.literal('')),
  socialmedia: z.array(socialMediaSchema).default([
    { platform: 'twitter', username: '' },
    { platform: 'github', username: '' },
  ]),
})

export type ProfileFormData = z.infer<typeof profileSchema>

export const defaultProfileData: ProfileFormData = {
  name: '',
  ensName: '',
  avatar: '',
  header: '',
  description: '',
  location: '',
  email: '',
  url: '',
  socialmedia: [
    {
      platform: 'twitter',
      username: '',
    },
    {
      platform: 'github',
      username: '',
    },
  ],
}
