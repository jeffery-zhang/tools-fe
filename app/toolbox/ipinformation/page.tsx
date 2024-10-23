import { Info, Sender } from './components'

import { ResponseJson } from '@/shared/classes'
import { BASE_API_URL } from '@/shared/config'

export class IpInfoResponse extends ResponseJson<IpInfoDataType> {}

export type IpInfoDataType = {
  ip: string
  city: string
  region: string
  country: string
  loc: string
  org: string
  postal: string
  timezone: string
}

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export async function getIpInfo(ip: string = ''): Promise<IpInfoResponse> {
  const res = await fetch(`${BASE_API_URL}/api/ipinfo?ip=${ip}`, {
    method: 'GET',
    headers,
  })

  let response: IpInfoResponse
  try {
    const json = (await res.json()) as IpInfoResponse
    response = new IpInfoResponse(json.data)
  } catch (error) {
    response = new IpInfoResponse(
      null,
      false,
      'Oops, something went wrong!',
      res.status,
    )
  }
  return await new Response(JSON.stringify(response)).json()
}

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
