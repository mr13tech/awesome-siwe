// Supported wallet configurations with styling information
export const walletConfig = [
  {
    id: 'metamask',
    name: 'MetaMask',
    iconSrc: '/icons/metamask.svg',
    description: 'Connect to your MetaMask wallet',
    color: 'bg-orange-100 hover:bg-orange-200',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-300',
  },
  {
    id: 'walletConnect',
    name: 'WalletConnect',
    iconSrc: '/icons/walletconnect.svg',
    description: 'Scan with WalletConnect to connect',
    color: 'bg-blue-100 hover:bg-blue-200',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-300',
  },
  {
    id: 'safe',
    name: 'Safe',
    iconSrc: '/icons/safe.svg',
    description: 'Connect to your Safe wallet',
    color: 'bg-green-100 hover:bg-green-200',
    textColor: 'text-green-800',
    borderColor: 'border-green-300',
  },
  {
    id: 'injected',
    name: 'Injected',
    iconSrc: '/icons/injected.svg',
    description: 'Connect with your browser wallet',
    color: 'bg-emerald-100 hover:bg-emerald-200',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-300',
  },
]

export type WalletConfigItem = (typeof walletConfig)[number]
