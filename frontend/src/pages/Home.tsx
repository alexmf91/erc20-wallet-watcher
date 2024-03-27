import { ConnectWalletButton } from '@/components/ui/buttons'
import { PrivateRoutes } from '@/utils/routes'
import { Navigate } from 'react-router-dom'
import { useAccount } from 'wagmi'

export default function Home() {
  const { address } = useAccount()

  if (address) {
    return <Navigate to={PrivateRoutes.DASHBOARD} replace />
  }

  return (
    <section className="grid place-items-center gap-12 py-20 lg:py-40">
      <h2 className="text-7xl text-gray-100 font-medium">Empower Your Crypto Experience</h2>
      <p className="text-gray-500 text-xl">Effortlessly Connect, Analyze, and Optimize Your Digital Assets.</p>

      <ConnectWalletButton className="w-fit">Connect Your Wallet & Start Now!</ConnectWalletButton>
    </section>
  )
}
