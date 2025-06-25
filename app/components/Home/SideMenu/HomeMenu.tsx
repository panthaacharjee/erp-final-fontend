"use client"
import React from 'react'

import { RiLockPasswordFill, RiRefreshLine } from "react-icons/ri";
import { LuUser } from "react-icons/lu";
import { IoHelpCircle, IoSettingsSharp } from "react-icons/io5";

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';


const HomeMenu = () => {
    const router = useRouter()
    const handleRefresh = ()=>{
        window.location.reload();    
    }
  return (
    <div>
            <div onClick={handleRefresh} className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc]'>
              <p className='text-2xl'><RiRefreshLine/></p>
              <p className='text-xs mt-1 cursor-pointer'>Refresh</p>
            </div>
            <div className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
              <p className='text-2xl'><IoHelpCircle/></p>
              <p className='text-xs mt-1 cursor-pointer'>Support</p>
            </div>
            <div className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
              <p className='text-2xl'><IoSettingsSharp/></p>
              <p className='text-xs mt-1 cursor-pointer'>Settings</p>
            </div>
            <div className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
              <p className='text-2xl'><RiLockPasswordFill/></p>
              <p className='text-xs mt-1 cursor-pointer text-center'>Change <br/> Password</p>
            </div>
             <div onClick={()=>signOut()} className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
              <p className='text-2xl'><LuUser/></p>
              <p className='text-xs mt-1 cursor-pointer'>Logout</p>
            </div>
    </div>
  )
}

export default HomeMenu