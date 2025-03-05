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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'

type ProfileData = {
  name: string
  bio: string
  email: string
  website: string
  avatarUrl: string
  twitter: string
  github: string
  emailNotifications: boolean
  publicProfile: boolean
}

export function Profile() {
  const account = useAccount()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Crypto Enthusiast',
    bio: 'Web3 developer and blockchain enthusiast. Exploring the decentralized future.',
    email: 'user@example.com',
    website: 'https://example.com',
    avatarUrl: '',
    twitter: '@web3dev',
    github: 'github.com/web3dev',
    emailNotifications: false,
    publicProfile: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setProfileData(prev => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSave = () => {
    // Here you would typically save the profile data to a backend or blockchain
    // For demo purposes, we're just closing the edit mode
    setIsEditing(false)
  }

  return (
    <div className='w-full'>
      <Tabs defaultValue='profile' className='w-full'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
          <TabsTrigger value='wallet'>Wallet</TabsTrigger>
          <TabsTrigger value='settings'>Settings</TabsTrigger>
        </TabsList>

        <TabsContent value='profile' className='mt-6'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Your personal information secured with SIWE
                  </CardDescription>
                </div>
                <Sheet open={isEditing} onOpenChange={setIsEditing}>
                  <SheetTrigger asChild>
                    <Button variant='outline' size='sm'>
                      Edit Profile
                    </Button>
                  </SheetTrigger>
                  <SheetContent className='sm:max-w-md'>
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
                        <Label htmlFor='twitter'>Twitter</Label>
                        <Input
                          id='twitter'
                          name='twitter'
                          value={profileData.twitter}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='grid gap-2'>
                        <Label htmlFor='github'>GitHub</Label>
                        <Input
                          id='github'
                          name='github'
                          value={profileData.github}
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
                      <Button
                        variant='outline'
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col gap-8 md:flex-row'>
                <div className='flex flex-col items-center'>
                  <Avatar className='h-32 w-32'>
                    {profileData.avatarUrl ? (
                      <AvatarImage
                        src={profileData.avatarUrl}
                        alt={profileData.name}
                      />
                    ) : (
                      <AvatarFallback className='text-3xl'>
                        {profileData.name.charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className='mt-4 text-center'>
                    <h3 className='text-xl font-bold'>{profileData.name}</h3>
                    <p className='text-muted-foreground mt-1 text-sm'>
                      {profileData.bio}
                    </p>
                  </div>
                </div>

                <div className='mt-6 grid flex-1 grid-cols-1 gap-4 md:mt-0 md:grid-cols-2'>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium'>Email</p>
                    <p className='text-muted-foreground text-sm'>
                      {profileData.email}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium'>Website</p>
                    <p className='text-muted-foreground text-sm'>
                      {profileData.website}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium'>Twitter</p>
                    <p className='text-muted-foreground text-sm'>
                      {profileData.twitter}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium'>GitHub</p>
                    <p className='text-muted-foreground text-sm'>
                      {profileData.github}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between border-t pt-6'>
              <p className='text-muted-foreground text-xs'>
                Profile data is stored securely using SIWE authentication
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value='wallet' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Wallet Information</CardTitle>
              <CardDescription>
                Details about your connected wallet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium'>Address</p>
                    <p className='text-muted-foreground text-xs break-all'>
                      {account.addresses?.[0] || 'Unknown address'}
                    </p>
                  </div>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium'>Chain</p>
                    <p className='text-muted-foreground text-xs'>
                      ID: {account.chainId}
                    </p>
                  </div>
                </div>

                <div className='border-t pt-4'>
                  <h3 className='mb-2 text-sm font-medium'>
                    Transaction History
                  </h3>
                  <div className='bg-muted/50 rounded-md p-4 text-center'>
                    <p className='text-muted-foreground text-sm'>
                      No recent transactions
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='settings' className='mt-6'>
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='emailNotifications'
                    checked={profileData.emailNotifications}
                    onCheckedChange={checked =>
                      handleCheckboxChange(
                        'emailNotifications',
                        checked as boolean,
                      )
                    }
                  />
                  <Label htmlFor='emailNotifications'>
                    Receive email notifications
                  </Label>
                </div>
              </div>

              <div className='space-y-4 border-t pt-4'>
                <h3 className='text-sm font-medium'>Privacy Settings</h3>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='publicProfile'
                    checked={profileData.publicProfile}
                    onCheckedChange={checked =>
                      handleCheckboxChange('publicProfile', checked as boolean)
                    }
                  />
                  <Label htmlFor='publicProfile'>Make profile public</Label>
                </div>
              </div>

              <div className='space-y-4 border-t pt-4'>
                <h3 className='text-sm font-medium'>Danger Zone</h3>
                <Button variant='destructive' size='sm'>
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
