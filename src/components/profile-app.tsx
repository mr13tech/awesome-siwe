'use client'

import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type ProfileData = {
  name: string
  bio: string
  email: string
  website: string
  avatarUrl: string
}

export function ProfileApp() {
  const account = useAccount()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Crypto Enthusiast',
    bio: 'Web3 developer and blockchain enthusiast. Exploring the decentralized future.',
    email: 'user@example.com',
    website: 'https://example.com',
    avatarUrl: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    // Here you would typically save the profile data to a backend or blockchain
    // For demo purposes, we're just closing the edit mode
    setIsEditing(false)
  }

  // If not connected, show a message
  if (account.status !== 'connected') {
    return (
      <Card className='mx-auto w-full max-w-md'>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Connect your wallet to view and edit your profile
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center py-8'>
          <Avatar className='mb-4 h-20 w-20'>
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <p className='text-muted-foreground text-center'>
            Your profile information will appear here after connecting your
            wallet
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='mx-auto w-full max-w-md'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </div>
            <Sheet open={isEditing} onOpenChange={setIsEditing}>
              <SheetTrigger asChild>
                <Button variant='outline' size='sm'>
                  Edit Profile
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit Profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid gap-2'>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                      id='name'
                      name='name'
                      value={profileData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='bio'>Bio</Label>
                    <Input
                      id='bio'
                      name='bio'
                      value={profileData.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={profileData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='website'>Website</Label>
                    <Input
                      id='website'
                      name='website'
                      value={profileData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='avatarUrl'>Avatar URL</Label>
                    <Input
                      id='avatarUrl'
                      name='avatarUrl'
                      value={profileData.avatarUrl}
                      onChange={handleInputChange}
                      placeholder='https://example.com/avatar.jpg'
                    />
                  </div>
                </div>
                <div className='mt-4 flex flex-col gap-2'>
                  <Button onClick={handleSave}>Save changes</Button>
                  <Button variant='outline' onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center space-y-4'>
            <Avatar className='h-24 w-24'>
              {profileData.avatarUrl ? (
                <AvatarImage
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                />
              ) : (
                <AvatarFallback className='text-lg'>
                  {profileData.name.charAt(0)}
                </AvatarFallback>
              )}
            </Avatar>

            <div className='text-center'>
              <h3 className='text-xl font-bold'>{profileData.name}</h3>
              <p className='text-muted-foreground mt-1 text-sm'>
                {profileData.bio}
              </p>
            </div>

            <div className='mt-4 w-full border-t pt-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm font-medium'>Wallet</p>
                  <p className='text-muted-foreground text-xs break-all'>
                    {account.addresses?.[0] || 'Unknown address'}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium'>Chain</p>
                  <p className='text-muted-foreground text-xs'>
                    ID: {account.chainId}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium'>Email</p>
                  <p className='text-muted-foreground text-xs'>
                    {profileData.email}
                  </p>
                </div>
                <div>
                  <p className='text-sm font-medium'>Website</p>
                  <p className='text-muted-foreground text-xs'>
                    {profileData.website}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <p className='text-muted-foreground text-xs'>
            Profile data is stored securely using SIWE authentication
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
