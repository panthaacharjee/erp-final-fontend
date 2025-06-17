"use client"
import Login from '@/app/components/Login'
import { RootState } from '@/app/redux/rootReducer'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'
import Processing from '@/app/components/Processing'

const page = () => {
  const {status} = useSession()
  const {isAuthenticated, loading} = useSelector((state:RootState)=>state.user)
  
  useEffect(()=>{
    if(status==="authenticated" && isAuthenticated){
      redirect("/")
    }
  },[status, isAuthenticated])
  if(loading===true){
    return <Processing/>
  }
  if(status === "unauthenticated" && !loading){
    return <Login/>
  }
}

export default page