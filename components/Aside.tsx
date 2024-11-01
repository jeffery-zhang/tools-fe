'use client'

import { FC, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { TOOL_CONFIG } from '@/shared/toolConfig'
import { Button } from './ui/button'

export const Aside: FC = () => {
  const router = useRouter()

  return (
    <aside className='w-80 h-full rounded-md border p-4'>
      <ScrollArea>
        <nav className='flex flex-col items-end'>
          {TOOL_CONFIG.map(({ title: name, path }) => (
            <Button
              key={path}
              variant='ghost'
              className='text-lg'
              onClick={() => router.push(path)}
            >
              {name}
              <ChevronRight />
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}
