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
import { encode } from '@/Utils/utils'
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
         {/* use This Element for audio call */}
      <audio id='mediaElement' controls />

      {/* use call ringtone play  */}
      <audio id='connectingRingTone' src='/sounds/ringtone.mp3' controls  loop />
      <audio id='InComingConnectingRingTone' src='/sounds/ringtone.mp3' controls loop />
        </SessionProvider>

        </body>
    </html>
  )
}
