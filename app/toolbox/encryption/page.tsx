import { ToolTitle } from '@/components/ToolTitle'
import { EncryptionTabs } from './component'

export default function Encryption() {
  return (
    <div className='w-full h-full flex flex-col'>
      <ToolTitle />
      <div className='py-12 px-16'>
        <EncryptionTabs />
      </div>
    </div>
  )
}
