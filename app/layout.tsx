import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jingo Tools',
  description: 'Jingo website mini toolbox',
  icons: [
    {
      url: '/favicon.ico',
      sizes: '48x48',
      type: 'image/x-icon',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='w-full h-full'>
      <body className={inter.className + ' h-full w-full'}>{children}</body>
    </html>
  )
}
