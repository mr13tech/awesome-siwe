import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')

    if (address) {
      // Get a specific profile by address
      const profile = await prisma.profile.findUnique({
        where: {
          address,
        },
      })

      if (!profile) {
        // Return default empty profile instead of 404 error
        return NextResponse.json({
          profile: {
            address,
            name: '',
            ensName: '',
            avatar: '',
            header: '',
            description: '',
            location: '',
            email: '',
            url: '',
            socialmedia: [
              { platform: 'twitter', username: '' },
              { platform: 'github', username: '' },
            ],
          },
        })
      }

      return NextResponse.json({ profile })
    }

    // Get all profiles if no address is provided
    const profiles = await prisma.profile.findMany()
    return NextResponse.json({ profiles })
  } catch (error) {
    console.error('Error fetching profiles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profiles' },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Address is the only required field
    if (!body.address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 },
      )
    }

    const profile = await prisma.profile.create({
      data: {
        address: body.address,
        name: body.name || '',
        ensName: body.ensName || '',
        avatar: body.avatar || '',
        header: body.header || '',
        description: body.description || '',
        location: body.location || '',
        email: body.email || '',
        url: body.url || '',
        socialmedia: body.socialmedia || [
          { platform: 'twitter', username: '' },
          { platform: 'github', username: '' },
        ],
      },
    })

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Error creating profile:', error)
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 },
    )
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 },
      )
    }

    const body = await request.json()

    // Check if profile exists
    const existingProfile = await prisma.profile.findUnique({
      where: {
        address,
      },
    })

    if (!existingProfile) {
      // Create a new profile if it doesn't exist
      const newProfile = await prisma.profile.create({
        data: {
          address,
          name: body.name || '',
          ensName: body.ensName || '',
          avatar: body.avatar || '',
          header: body.header || '',
          description: body.description || '',
          location: body.location || '',
          email: body.email || '',
          url: body.url || '',
          socialmedia: body.socialmedia || [
            { platform: 'twitter', username: '' },
            { platform: 'github', username: '' },
          ],
        },
      })

      return NextResponse.json({ profile: newProfile })
    }

    // Update the profile
    const updatedProfile = await prisma.profile.update({
      where: {
        address,
      },
      data: {
        name: body.name || existingProfile.name,
        ensName: body.ensName || existingProfile.ensName,
        avatar: body.avatar || existingProfile.avatar,
        header: body.header || existingProfile.header,
        description: body.description || existingProfile.description,
        location: body.location || existingProfile.location,
        email: body.email || existingProfile.email,
        url: body.url || existingProfile.url,
        socialmedia: body.socialmedia || existingProfile.socialmedia,
      },
    })

    return NextResponse.json({ profile: updatedProfile })
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 },
    )
  }
}
