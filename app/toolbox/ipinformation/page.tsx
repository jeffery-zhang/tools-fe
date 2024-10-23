import { Info, Sender } from './components'
import { getIpInfo, IpInfoDataType } from '@/app/api/ipinfo/route'

export default async function IpInformation() {
  const current = await getIpInfo()

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <h3 className='text-lg mb-4'>Your IP Address:</h3>
      <Info result={current.data as IpInfoDataType} />
      <Sender />
    </div>
  )
}
