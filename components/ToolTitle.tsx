'use client'

import { FC, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { TOOL_CONFIG } from '@/shared/toolConfig'

export const ToolTitle: FC = () => {
  const pathname = usePathname()

  const [title, setTitle] = useState<string>('')
  const [desc, setDesc] = useState<string>('')

  useEffect(() => {
    const config = TOOL_CONFIG.find(({ path }) => pathname === path)
    if (config) {
      setTitle(config.title)
      setDesc(config.desc ?? '')
    }
  }, [pathname])

  return (
    <div>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <p className='text-gray-400 italic'>{desc}</p>
    </div>
  )
}
