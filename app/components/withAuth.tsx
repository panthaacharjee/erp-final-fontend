// components/withAuth.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import Processing from './Processing'

export function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter()
    const {status} = useSession()
    const {loading, isAuthenticated, error} = useSelector((state:RootState)=>state.user)
    console.log(error)

    useEffect(() => {
      if (status==="unauthenticated" && !loading && !isAuthenticated) {
        router.push('/themes/login')
      }
    }, [status, router])

    if (status==="unauthenticated") {
      router.push("/login")
    }

    if(status==="authenticated"){
      return <Component {...props} />
    }
  }
}