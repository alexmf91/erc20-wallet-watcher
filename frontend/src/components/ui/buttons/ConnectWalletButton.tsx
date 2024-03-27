import { formatAddress } from '@/utils'
import { ConnectKitButton } from 'connectkit'
import Button from './Button'

type Props = {
  className?: string
  children?: React.ReactNode
}

export default function ConnectWalletButton({ className, children }: Props) {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address }) => {
        return (
          <Button onClick={show} className={className}>
            {isConnected ? formatAddress(address) : children || 'Connect Wallet'}
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
