'use client'

import { useEffect, useState } from 'react'

import { IpInfoDataType, IpInfoResponse } from '@/app/api/ipinfo/controller'
import { Info, Sender } from './component'
import { ToolTitle } from '@/components/ToolTitle'

export default function Page() {
  const [result, setResult] = useState<IpInfoDataType | null>(null)

  const requestTargetIpInfo = async () => {
    const res = await fetch('/api/ipinfo')
    const data: IpInfoResponse = await res.json()

    setResult(data.data)
  }

  useEffect(() => {
    requestTargetIpInfo()
  }, [])

  return (
    <div className='w-full h-full flex flex-col'>
      <ToolTitle />
      <div className='flex-1 flex flex-col justify-center items-center'>
        {result && (
          <>
            <h3 className='text-lg mb-4'>Your IP Address:</h3>
            <Info result={result} />
          </>
        )}
        <Sender />
      </div>
    </div>
  )
}
