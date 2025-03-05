import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { injected, walletConnect, metaMask, safe } from "wagmi/connectors";

// Ensure the WalletConnect Project ID is available
const walletConnectProjectId = process.env.NEXT_PUBLIC_WC_PID || '';

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia],
    connectors: [
      injected(),
      metaMask(),
      safe(),
      walletConnect({ projectId: walletConnectProjectId }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
} 