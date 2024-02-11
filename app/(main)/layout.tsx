import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import 'react-perfect-scrollbar/dist/css/styles.css'

// import '@/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '@/styles/globals.css'
import Layout from '@/components/WebLayout/Layout'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Digitechnobits',
  description: 'Digitechnobits',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const  session = await  auth()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
        <Layout type='main'>{children}</Layout>
        </SessionProvider>
        </body>
    </html>
  )
}
