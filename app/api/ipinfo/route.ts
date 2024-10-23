import { NextRequest, NextResponse } from 'next/server'

import { getIpInfo, IpInfoResponse } from './api'

export async function GET(
  req: NextRequest,
): Promise<NextResponse<IpInfoResponse>> {
  const sp = req.nextUrl.searchParams
  const ip = sp.get('ip')

  const res = await getIpInfo(ip ?? '')

  return new NextResponse(JSON.stringify(res))
}
