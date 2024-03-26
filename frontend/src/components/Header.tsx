import { ConnectWalletButton } from './ui'

export default function Header() {
  return (
    <header className="p-8 flex justify-center items-center">
      <div className="border border-gray-600 w-1/2 p-2 rounded-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/ethereum-logo.svg" alt="eth-logo" width={40} />
          <h1 className="text-gray-100 text-2xl">ERC20 Wallet Watcher</h1>
        </div>
        <ConnectWalletButton />
      </div>
    </header>
  )
}
