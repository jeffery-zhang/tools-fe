import { NextRequest, NextResponse } from 'next/server'

import { getIpInfo, IpInfoResponse } from '@/app/toolbox/ipinformation/page'

export async function GET(
  req: NextRequest,
): Promise<NextResponse<IpInfoResponse>> {
  const sp = req.nextUrl.searchParams
  const ip = sp.get('ip')

  const res = await getIpInfo(ip ?? '')

  return new NextResponse(JSON.stringify(res))
}
