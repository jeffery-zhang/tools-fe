import { ResponseJson } from '@/shared/classes'
import { IP_INFO_HOST } from '@/shared/config'

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
  bogon?: boolean
}

const tokenInEnv = process.env.IP_INFO_TOKEN

export async function getIpInfo(
  token: string,
  ip: string,
): Promise<IpInfoResponse> {
  let errorMsg: string = 'Oops, something went wrong!'

  try {
    const res = await fetch(
      `${IP_INFO_HOST}/${ip}?token=${token ?? tokenInEnv}`,
    )
    if (!res || res.status !== 200) throw new Error('Internall Error!')
    try {
      const json = (await res.json()) as IpInfoDataType

      if (json.bogon) {
        errorMsg = 'Invalid IP address!'
        return new IpInfoResponse(null, false, errorMsg, 400)
      }

      return new IpInfoResponse(json)
    } catch (error) {
      errorMsg = 'Invalid response data!'
      return new IpInfoResponse(null, false, errorMsg, 500)
    }
  } catch (error) {
    if (error instanceof Error) errorMsg = error.message
    return new IpInfoResponse(null, false, errorMsg, 500)
  }
}
