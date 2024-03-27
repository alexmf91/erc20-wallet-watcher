import { formatCaseString } from '@/utils'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { TokenCard, TokenInfoModal } from './components'
import { useFetchTokenData } from './hooks'
import { CoinsApiResource, type CoinsApiUrlSegment } from './types'

const AVAILABLE_TOKENS = [{ name: 'Chainlink Token', symbol: 'LINK', path: 'chainlink' }] as const

export default function Dashboard() {
  const { data, isLoading, error, fetchTokenData } = useFetchTokenData()
  const [title, setTitle] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)

  const { address } = useAccount()

  if (!address) {
    return (
      <p className="bg-red-300/10 rounded-xl p-4 text-red-500 text-sm">
        Please connect your wallet to view token data.
      </p>
    )
  }

  const handleFetchData = async (path: CoinsApiUrlSegment, resource: CoinsApiResource, address?: string) => {
    setTitle(`Token ${formatCaseString(resource)}`)
    setShowModal(true)
    await fetchTokenData(path, resource, address)
  }

  return (
    <>
      <section className="py-20 lg:px-20 space-y-6 grid place-items-center lg:place-items-start">
        <h2 className="text-2xl font-bold text-gray-100">Tokens</h2>
        <ul className="grid gap-4 lg:w-full">
          {AVAILABLE_TOKENS.map((token) => (
            <TokenCard key={token.symbol} token={token} onFetchData={handleFetchData} address={address} />
          ))}
        </ul>

        <p className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600 py-14 text-center mx-auto">
          More tokens
          <br /> coming soon!
        </p>
      </section>

      <TokenInfoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </>
  )
}
