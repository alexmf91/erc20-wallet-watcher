import { Header, Footer } from '@/components'

type Props = {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[85vh]">{children}</main>
      <Footer />
    </>
  )
}
