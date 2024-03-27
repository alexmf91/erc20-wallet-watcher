import { Modal } from '@/components/ui'
import { formatCaseString } from '@/utils'

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  data?: { [key: string]: string | number }
  isLoading: boolean
  error?: Error | null
}

const TokenInfoSkeleton = () => (
  <ul className="grid gap-4">
    {Array.from({ length: 3 }).map(() => (
      <li className="bg-[#2e2c3ee0] rounded-xl p-4 animate-pulse" />
    ))}
  </ul>
)

export default function TokenInfoModal({ isOpen, onClose, title, data, isLoading, error }: Props) {
  return (
    <Modal isOpen={isOpen}>
      <Modal.Header onClose={onClose}>
        <h2 className="text-white capitalize text-lg">{title}</h2>
      </Modal.Header>
      <Modal.Body>
        <ul className="grid gap-4">
          {(() => {
            if (isLoading) {
              return <TokenInfoSkeleton />
            }

            if (error || !data) {
              return (
                <div className="bg-red-300/10 rounded-xl p-4 text-red-500 text-sm">
                  <p>{error?.message || 'Something went wrong. Please try again later.'}</p>
                </div>
              )
            }

            if (data) {
              return (
                <ul className="grid gap-4">
                  {Object.entries(data).map(([key, value]) => (
                    <li className="bg-[#2e2c3ee0] rounded-xl flex p-2 justify-between text-zinc-300 px-4 text-base">
                      <p className="text-zinc-400 capitalize">{formatCaseString(key)}</p>
                      <p>{value}</p>
                    </li>
                  ))}
                </ul>
              )
            }
          })()}
        </ul>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  )
}
