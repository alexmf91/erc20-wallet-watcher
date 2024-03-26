import { formatAddress } from '@/utils'
import { ConnectKitButton } from 'connectkit'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
  children?: React.ReactNode
}

export default function ConnectWalletButton({ className, children }: Props) {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address }) => {
        return (
          <button
            onClick={show}
            className={twMerge(
              'text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center',
              className
            )}
          >
            {isConnected ? formatAddress(address) : children || 'Connect Wallet'}
          </button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
