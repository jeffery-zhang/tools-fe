'use client'

import { FC, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IpInfoDataType, IpInfoResponse } from '@/app/api/ipinfo/api'

interface IInfoProps {
  result: IpInfoDataType
}

export const Info: FC<IInfoProps> = ({ result }) => {
  return (
    <div className='w-80 flex flex-col'>
      <span>IP: {result.ip}</span>
      <span>City: {result.city}</span>
      <span>Region: {result.region}</span>
      <span>Country: {result.country}</span>
      <span>Latitude/Longitude: {result.loc.split(',').join('/')}</span>
      <span>Timezone: {result.timezone}</span>
    </div>
  )
}

export const Sender: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [result, setResult] = useState<IpInfoDataType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const requestTargetIpInfo = async (ip: string) => {
    setLoading(true)
    const res = await fetch('/api/ipinfo?ip=' + ip)
    const data: IpInfoResponse = await res.json()

    setResult(data.data)
    setLoading(false)
  }

  return (
    <div>
      <div className='flex w-full max-w-sm items-center space-x-2 my-4'>
        <Input ref={inputRef} type='text' placeholder='Enter an ip address' />
        <Button
          type='submit'
          className='w-16'
          disabled={loading}
          onClick={() => {
            const val = inputRef.current?.value
            if (val) requestTargetIpInfo(inputRef.current!.value)
          }}
        >
          {loading ? <Loader2 className='animate-spin' /> : 'show'}
        </Button>
      </div>
      {result && (
        <>
          <h3 className='text-lg mb-4'>Target IP Address:</h3>
          <Info result={result} />
        </>
      )}
    </div>
  )
}
