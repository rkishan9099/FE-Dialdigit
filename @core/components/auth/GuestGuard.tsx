// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import

// ** Hooks Import

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const auth ={
    user: {
      name: 'John Doe',
      role: 'Admin'
    },
    loading: true
  }
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (window.localStorage.getItem('userData')) {
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback
  }

  return <>{children}</>
}

export default GuestGuard
