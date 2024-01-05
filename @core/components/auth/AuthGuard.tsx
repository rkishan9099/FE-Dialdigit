// ** React Imports
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import

// ** Hooks Import

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth ={
    user: {
      name: 'John Doe',
      role: 'Admin'
    },
    loading: false
  }
  const router = useRouter()
const pathname =usePathname()
  useEffect(
    () => {
      if (!router) {
        return
      }

      if (auth.user === null && !window.localStorage.getItem('userData')) {
        if (pathname !== '/') {
          router.replace( '/login')
        } else {
          router.replace('/login')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  )

  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
