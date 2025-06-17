import React from 'react'
import { TiHome } from 'react-icons/ti'

const TabWrapper = () => {
  return (
    <div className=''>
        <div className='flex fixed h-[35px] bg-white w-full'>
            <div className='flex items-center  bg-[#bfbfbf] border-t-2 border-t-[#13a7ec] min-w-32 inset-shadow-accent px-2 py-1'>
                <p className='text-black'><TiHome/></p>
                <p className='text-black ml-5 font-bold text-sm' >Home</p>
            </div>
            <div className='flex items-center bg-[#eaeaea] border-t-2 border-t-[#13a7ec] min-w-32 inset-shadow-accent px-2 py-1'>
                <p className='text-black'><TiHome/></p>
                <p className='text-black ml-5 font-bold text-sm' >User</p>
            </div>
        </div>
        <div className='bg-[#eaeaea] h-screen pt-14 px-3'>
            
        </div>
    </div>
  )
}

export default TabWrapper