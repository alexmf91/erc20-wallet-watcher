import { Footer, Header } from '@/components'

type Props = {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[80vh] px-5 py-20 lg:py-40">{children}</main>
      <Footer />
    </>
  )
}
