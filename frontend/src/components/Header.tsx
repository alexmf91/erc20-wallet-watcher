import { ConnectWalletButton } from './ui/buttons'

export default function Header() {
  return (
    <header className="p-8 flex justify-center items-center">
      <div className="border border-gray-600 lg:w-1/2 p-2 rounded-full flex items-center justify-between gap-10">
        <div className="flex items-center gap-4">
          <img src="/ethereum-logo.svg" alt="eth-logo" width={40} />
          <h1 className="text-gray-100 text-xl xl:text-2xl hidden lg:flex">ERC20 Wallet Watcher</h1>
        </div>
        <ConnectWalletButton />
      </div>
    </header>
  )
}
