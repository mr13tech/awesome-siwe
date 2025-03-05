import { Shield, Wallet, Smartphone } from 'lucide-react'
import { FeatureCard } from './feature-card'

const features = [
  {
    icon: Shield,
    title: 'Secure Authentication',
    description: 'Authenticate securely using your Ethereum wallet',
  },
  {
    icon: Wallet,
    title: 'Multiple Wallets',
    description: 'Connect with your preferred wallet provider',
  },
  {
    icon: Smartphone,
    title: 'Mobile Ready',
    description: 'Fully responsive design works on all devices',
  },
]

export function FeatureGrid() {
  return (
    <div className='grid w-full gap-6 sm:grid-cols-3'>
      {features.map(feature => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  )
}
