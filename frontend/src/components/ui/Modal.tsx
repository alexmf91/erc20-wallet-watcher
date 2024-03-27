import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { twMerge } from 'tailwind-merge'

function ModalWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const [body] = document.getElementsByTagName('body')
    body?.classList.add('overflow-hidden')
    return () => {
      body?.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
        <div className="relative my-6 mx-auto w-auto">
          <section
            role="dialog"
            className="relative flex w-full min-w-[400px] flex-col rounded-xl border-0 bg-[#1c1b27] shadow-xl outline-none focus:outline-none"
          >
            {children}
          </section>
        </div>
      </div>
    </>
  )
}

type ModalProps = {
  isOpen: boolean
  children: React.ReactNode
}

function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null

  return ReactDOM.createPortal(<ModalWrapper>{children}</ModalWrapper>, document.getElementById('root') as HTMLElement)
}

type SectionProps = {
  className?: string
  children?: React.ReactNode
}

Modal.Header = function ({ onClose, className, children }: SectionProps & { onClose?: () => void }) {
  return (
    <div className={twMerge('flex items-start rounded-t p-5 relative', className)}>
      {children}
      {onClose && (
        <button type="button" className="absolute top-4 right-4 h-8 w-8 text-gray-100 opacity-50" onClick={onClose}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

Modal.Body = function ({ className, children }: SectionProps) {
  return (
    <div className={twMerge('relative flex-auto px-6 py-2 text-lg leading-relaxed text-slate-500', className)}>
      {children}
    </div>
  )
}

Modal.Footer = function ({ className, children }: SectionProps) {
  return <div className={twMerge('p-4', className)}>{children}</div>
}

export default Modal
