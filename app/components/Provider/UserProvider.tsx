"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import { LoadUserRequest, LoadUserSuccess, LoadUserFail } from '../../redux/reducers/userReducer'
import Axios from '../Axios'
import Processing from '../Processing'

interface Props{
    children: React.ReactNode
}
const UserProvider = ({children}:Props) => {
    const dispatch = useDispatch()
    const {data:session, status} = useSession()
    console.log(session, status)
    const {user} = useSelector((state:RootState)=>state.user)
    const userFunc = async()=>{
        try{
            dispatch(LoadUserRequest())
            const {data} = await Axios.get("/user/profile",{
                headers:{
                    Authorization:`Bearer ${session?.user.id}`
                }
            })
            dispatch(LoadUserSuccess(data.user))
        }catch(err:any){
            dispatch(LoadUserFail(""))
            console.log(err)
        }
    }
    useEffect(()=>{
        if(status === "authenticated"){
            userFunc()
        }
    },[status, user])

    if(status==="loading"){
        return <Processing/>
    }
  return <div>{children}</div>
  
}

export default UserProvider