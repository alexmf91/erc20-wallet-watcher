import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'

const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(import.meta.env.VITE_RPC_PROVIDER_URL)
    },
    appName: 'Erc20 Wallet Watcher',
    appDescription: 'Track your ERC20 tokens with ease.',
    appUrl: 'https://erc20-wallet-watcher.vercel.app',
    appIcon: 'https://erc20-wallet-watcher.vercel.app/ethereum-logo.svg'
  })
)

const queryClient = new QueryClient()

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
