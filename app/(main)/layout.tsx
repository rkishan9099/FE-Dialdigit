import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

// import '@/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '@/styles/globals.css'
import Layout from '@/components/WebLayout/Layout'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Digitechnobits',
  description: 'Digitechnobits',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout type='main'>{children}</Layout>
        </body>
    </html>
  )
}
