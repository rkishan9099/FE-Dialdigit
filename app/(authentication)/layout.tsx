import AuthLayout from '@/components/WebLayout/AuthLayout'
import Layout from '@/components/WebLayout/Layout'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Digitechnobits',
  description: 'Digitechnobits',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout type='auth'>
          {children}</Layout>
        </body>
    </html>
  )
}
