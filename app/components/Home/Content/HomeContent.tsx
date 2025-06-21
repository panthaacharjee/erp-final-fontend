import { RootState } from '@/app/redux/rootReducer'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { useSelector } from 'react-redux'

import { RiRefreshLine } from "react-icons/ri";
import { LuUser } from "react-icons/lu";

const HomeContent = () => {
  const {data:session} = useSession()
  const {user, loading} = useSelector((state:RootState)=>state.user)
  console.log(session, user)
  return (
    <div className='flex  '>
        <div className='w-[93%] px-3 pt-14 '>lorem*100</div>
        <div className='w-[7%] bg-[#d3e6ec]  min-h-screen pt-14 px-2'>
            <div className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc]'>
              <p className='text-2xl'><RiRefreshLine/></p>
              <p className='text-xs mt-1 cursor-pointer'>Refresh</p>
            </div>
             <div onClick={()=>signOut()} className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
              <p className='text-2xl'><LuUser/></p>
              <p className='text-xs mt-1 cursor-pointer'>Logout</p>
            </div>
        </div>
    </div>
  )
}

export default HomeContent