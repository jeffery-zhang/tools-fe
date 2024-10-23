import { Aside } from '@/components/Aside'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='w-full h-full flex'>
      <Aside />
      <div className='flex-1 p-10'>{children}</div>
    </div>
  )
}