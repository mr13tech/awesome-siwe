'use client'

import { useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash } from 'lucide-react'
import type { ProfileFormData } from '@/lib/schemas/profile'

export function SocialMediaForm() {
  const { control } = useFormContext<ProfileFormData>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialmedia',
  })

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Social Media</CardTitle>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={() => append({ platform: 'twitter', username: '' })}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Platform
        </Button>
      </CardHeader>
      <CardContent className='space-y-4'>
        {fields.map((field, index) => (
          <div key={field.id} className='flex items-end gap-4'>
            <FormField
              control={control}
              name={`socialmedia.${index}.platform`}
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>Platform</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select platform' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='twitter'>Twitter</SelectItem>
                      <SelectItem value='github'>GitHub</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`socialmedia.${index}.username`}
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Your username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={() => remove(index)}
            >
              <Trash className='h-4 w-4' />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
