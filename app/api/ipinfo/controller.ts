import { ResponseJson, ResponseError } from '@/shared/classes'
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
  status?: number
  error?: {
    title?: string
    message?: string
  }
}

const tokenInEnv = process.env.IP_INFO_TOKEN

export async function getIpInfo(
  token: string,
  ip: string,
): Promise<IpInfoResponse | ResponseError> {
  let errorMsg: string = 'Oops, something went wrong!'

  if (!token && !tokenInEnv) return new ResponseError(errorMsg)

  try {
    const res = await fetch(
      `${IP_INFO_HOST}/${ip}?token=${token ?? tokenInEnv}`,
    )

    if (!res) throw new Error('Internal Error! Please try again later!')

    try {
      const json: IpInfoDataType = await res.json()

      if (json.error && json.error.message) {
        errorMsg = json.error.message
        return new ResponseError(errorMsg, 400)
      }

      if ((json as IpInfoDataType).bogon) {
        errorMsg = 'Bogon IP addresses are not supported!'
        return new ResponseError(errorMsg, 400)
      }

      return new IpInfoResponse(json)
    } catch (error) {
      errorMsg = 'Invalid response data!'
      return new ResponseError(errorMsg)
    }
  } catch (error) {
    if (error instanceof Error) errorMsg = error.message
    return new ResponseError(errorMsg)
  }
}
