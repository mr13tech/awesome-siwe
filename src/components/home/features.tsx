import { Shield, Wallet, Smartphone } from 'lucide-react'
import { HomeFeatureCard } from './feature-card'

const homeFeatures = [
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

export function HomeFeatures() {
  return (
    <div className='grid w-full gap-6 sm:grid-cols-3'>
      {homeFeatures.map(feature => (
        <HomeFeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  )
}
