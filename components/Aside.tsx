'use client'

import { FC, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from './ui/button'

type RouteConfig = {
  name: string
  path: string
}

export const Aside: FC = () => {
  const router = useRouter()
  const routes = useMemo(
    () => [
      {
        name: 'IP Information',
        path: '/toolbox/ipinformation',
      },
    ],
    [],
  )

  return (
    <aside className='w-80 h-full rounded-md border p-4'>
      <ScrollArea>
        <nav className='flex flex-col items-end'>
          {routes.map(({ name, path }) => (
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
