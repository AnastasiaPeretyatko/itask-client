import AppLayout from '@/components/layout/AppLayout'
import dynamic from 'next/dynamic'

const HaveProblems = dynamic(
  () => import('@/components/assets/animation/problems'),
  { ssr: false }
)

export default function Home() {
  return (
    <AppLayout>
      <HaveProblems />
    </AppLayout>
  )
}
