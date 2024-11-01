import { NextRequest, NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

import { getIpInfo, IpInfoResponse } from './controller'

export const runtime = 'edge'

export async function GET(
  req: NextRequest,
): Promise<NextResponse<IpInfoResponse>> {
  const token = await getRequestContext().env.TOOLS_KV_NAMESPACE.get(
    'IP_INFO_TOKEN',
  )
  let ip: string | null
  const searchParamIp = req.nextUrl.searchParams.get('ip')
  if (searchParamIp) {
    ip = searchParamIp
  } else {
    const xForwardedFor = req.headers.get('x-forwarded-for')
    const xRealIp = req.headers.get('x-real-ip')
    const cfConnectingIp = req.headers.get('cf-connecting-ip')

    ip = xForwardedFor || xRealIp || cfConnectingIp
  }

  if (!ip)
    return new NextResponse(
      JSON.stringify(
        new IpInfoResponse(null, false, 'Target IP address is needed!', 400),
      ),
    )

  const res = await getIpInfo(token!, ip)

  console.log('in route ===>', res)

  return new NextResponse(JSON.stringify(res))
}
