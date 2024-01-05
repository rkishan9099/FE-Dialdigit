// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Import

// ** Types
import type { ACLObj, AppAbility } from '@/configs/acl'

// ** Context Imports
import { AbilityContext } from '@/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from '@/configs/acl'

// ** Component Import
import Spinner from '@/@core/components/spinner'
import BlankLayout from '@/@core/layouts/BlankLayout'

// ** Hooks

// ** Util Import
import getHomeRoute from '@/layouts/components/acl/getHomeRoute'
import { usePathname, useRouter } from 'next/navigation'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props

  // ** Hooks
 
    
  const auth ={
    user: {
      name: 'John Doe',
      role: 'admin'
    }
  }
  
  const router = useRouter()
  const pathname =usePathname();
 

  // ** Vars
  let ability: AppAbility

  useEffect(() => {
    if (auth.user && auth.user.role && !guestGuard && pathname === '/') {
      const homeRoute = getHomeRoute(auth.user.role)
      router.replace(homeRoute)
    }
  }, [auth.user, guestGuard, router])

  // User is logged in, build ability for the user based on his role
  if (auth.user && !ability) {
    ability = buildAbilityFor(auth.user.role, aclAbilities.subject)
    if (pathname === '/') {
      return <Spinner />
    }
  }

  // If guest guard or no guard is true or any error page
  if (guestGuard || pathname === '/404' || pathname === '/500' || !authGuard) {
    // If user is logged in and his ability is built
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      // If user is not logged in (render pages like login, register etc..)
      return <>{children}</>
    }
  }

  // Check the access of current user and render pages
  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    if (pathname === '/') {
      return <Spinner />
    }

    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <h1>UnAuthorized</h1>
      {/* <NotAuthorized /> */}
    </BlankLayout>
  )
}

export default AclGuard
