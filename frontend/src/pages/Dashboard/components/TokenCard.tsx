import { Button } from '@/components/ui/buttons'
import { CoinsApiResource, type CoinsApiUrlSegment } from '../types'

type Props = {
  token: { name: string; symbol: string; path: CoinsApiUrlSegment }
  address: string
  onFetchData: (path: CoinsApiUrlSegment, resource: CoinsApiResource, address?: string) => void
}

export default function TokenCard({ token, onFetchData, address }: Props) {
  return (
    <li className="bg-indigo-400/10 px-4 sm:px-6 py-8 rounded-lg flex justify-between items-center flex-col gap-6 w-fit lg:flex-row lg:w-full">
      <h3 className="text-xl font-semibold text-gray-200">
        {token.name} ({token.symbol})
      </h3>
      <div className="space-x-2 sm:space-x-4">
        <Button
          className="px-4 py-2 rounded"
          color="indigo"
          onClick={() => onFetchData(token.path, CoinsApiResource.Details)}
        >
          Details
        </Button>
        <Button
          className="px-4 py-2 rounded"
          color="indigo"
          onClick={() => onFetchData(token.path, CoinsApiResource.TotalSupply)}
        >
          Total Supply
        </Button>
        <Button
          className="px-4 py-2 rounded"
          color="indigo"
          onClick={() => onFetchData(token.path, CoinsApiResource.Balance, address)}
        >
          Balance
        </Button>
      </div>
    </li>
  )
}
