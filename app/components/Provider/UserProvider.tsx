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
    const {items, content} = useSelector((state:RootState)=>state.tab)

    const {data:session, status} = useSession()
    const {user, isAuthenticated} = useSelector((state:RootState)=>state.user)
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
        }
    }

   
    useEffect(()=>{
        if(status === "authenticated"){
            userFunc()
            if(items.length<=1 && content.length<=1){
                const data = {
                    loading:false,
                    items,
                    content
                }
                localStorage.setItem("tabData", JSON.stringify(data))
            }
        }
    },[  items, content, status])

    if(status==="loading"){
        return <Processing/>
    }
  return <div>{children}</div>
  
}

export default UserProvider