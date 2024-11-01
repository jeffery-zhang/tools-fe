'use client'

import { FC, useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

enum SupportedEncryptionType {
  Base64 = 'BASE64',
  Reversible = 'Encrypt/Decrypt',
  HASH = 'HASH',
}

type TabItem = {
  title: string
  value: SupportedEncryptionType
}

interface IEncryptionContentProps {
  value: SupportedEncryptionType
}

const config: TabItem[] = [
  {
    title: 'BASE64',
    value: SupportedEncryptionType.Base64,
  },
  {
    title: 'Encrypt/Decrypt',
    value: SupportedEncryptionType.Reversible,
  },
  {
    title: 'HASH',
    value: SupportedEncryptionType.HASH,
  },
]

export const EncryptionTabs: FC = () => {
  return (
    <Tabs defaultValue={SupportedEncryptionType.Base64}>
      <TabsList>
        {config.map(({ title, value }) => (
          <TabsTrigger key={value} value={value}>
            {title}
          </TabsTrigger>
        ))}
      </TabsList>
      {config.map(({ value }) => (
        <TabsContent key={value} value={value}>
          <EncryptionContent value={value} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export const EncryptionContent: FC<IEncryptionContentProps> = ({ value }) => {
  const [encrypted, setE] = useState<string>('')
  const [decrypted, setD] = useState<string>('')
  const [algorithm, setAlgorithm] = useState<string>('')

  const encrypt = () => {
    if (!decrypted) return

    switch (value) {
      case SupportedEncryptionType.Base64:
        setE(btoa(decrypted))
        break
    }
  }

  const decrypt = () => {
    if (!encrypted) return

    switch (value) {
      case SupportedEncryptionType.Base64:
        setD(atob(encrypted))
        break
    }
  }

  return (
    <div className='flex'>
      <Textarea
        className='flex-1 h-96'
        value={decrypted}
        onChange={(e) => setD(e.target.value)}
      />
      <div className='flex flex-col items-center w-60 gap-4'>
        <Button onClick={encrypt}>
          Encrypt
          <ChevronRight />
        </Button>
        <Button onClick={decrypt}>
          <ChevronLeft />
          Decrypt
        </Button>
      </div>
      <Textarea
        className='flex-1 h-96'
        value={encrypted}
        onChange={(e) => setE(e.target.value)}
      />
    </div>
  )
}
