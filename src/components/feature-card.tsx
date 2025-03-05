import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className='bg-muted/30 hover:border-primary/50 flex h-full flex-col rounded-lg border p-6 transition-all duration-300 hover:shadow-md'>
      <Icon className='text-primary/80 mb-3 h-8 w-8' />
      <h3 className='mb-2 font-medium'>{title}</h3>
      <p className='text-muted-foreground mt-auto text-sm'>{description}</p>
    </div>
  )
}
