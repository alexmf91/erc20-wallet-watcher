import { ConnectWalletButton } from '@/components/ui'

export default function Home() {
  return (
    <section className="grid place-items-center gap-12">
      <h2 className="text-7xl text-gray-100 font-medium">Empower Your Crypto Experience</h2>
      <p className="text-gray-500 text-xl">Effortlessly Connect, Analyze, and Optimize Your Digital Assets.</p>

      <ConnectWalletButton className="w-fit">Connect Your Wallet & Start Now!</ConnectWalletButton>
    </section>
  )
}
