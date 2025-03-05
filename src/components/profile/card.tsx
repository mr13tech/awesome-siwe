'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EditForm } from './edit-form'
import { ProfileData } from './data'
import type { ProfileFormData } from '@/lib/schemas/profile'
import { Pencil, X } from 'lucide-react'
import { toast } from 'sonner'

interface EditToggleProps {
  initialData: ProfileFormData
  onSaveProfile?: (data: ProfileFormData) => Promise<void>
}

export function ProfileCard({ initialData, onSaveProfile }: EditToggleProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [data, setData] = useState<ProfileFormData>(initialData)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = async (formData: ProfileFormData) => {
    setIsLoading(true)
    try {
      if (onSaveProfile) {
        // Use the provided save function
        await onSaveProfile(formData)
      } else {
        // Fallback to console log if no save function provided
        console.log('Saving profile data:', formData)
      }

      // Update the state with the new data
      setData(formData)

      // Exit edit mode
      setIsEditing(false)

      // Show success message if no external save function provided
      if (!onSaveProfile) {
        toast.success('Profile updated', {
          description:
            'Your profile information has been updated successfully.',
        })
      }
    } catch (error) {
      console.error('Error saving profile data:', error)
      toast.error('Error', {
        description: 'There was a problem saving your profile information.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className='relative'>
      {!isEditing ? (
        <>
          <div className='absolute top-4 right-4 z-10'>
            <Button
              variant='outline'
              size='sm'
              onClick={handleToggle}
              className='gap-2'
            >
              <Pencil className='h-4 w-4' />
              Edit Profile
            </Button>
          </div>
          <ProfileData data={data} />
        </>
      ) : (
        <>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Edit Profile Information</h2>
            <Button
              variant='outline'
              size='sm'
              onClick={handleCancel}
              className='gap-2'
            >
              <X className='h-4 w-4' />
              Cancel
            </Button>
          </div>
          <EditForm
            data={data}
            onSave={handleSave}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  )
}
