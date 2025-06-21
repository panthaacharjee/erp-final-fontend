"use client"
import Login from '@/app/components/Login'
import { RootState } from '@/app/redux/rootReducer'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'
import Processing from '@/app/components/Processing'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const {status} = useSession()
  const {isAuthenticated, loading} = useSelector((state:RootState)=>state.user)
  
  useEffect(()=>{
    if(status==="authenticated"){
      router.push("/")
    }
  },[status])

  if(status==="loading"){
    return <Processing/>
  }
  if(status === "unauthenticated" && !loading){
    return <Login/>
  }
}

export default page