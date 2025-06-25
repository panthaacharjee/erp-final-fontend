import React from 'react'
import { FaRegCopy } from 'react-icons/fa';
import { IoIosMail, IoIosPrint, IoMdClose, IoMdSave } from 'react-icons/io';
import { LuDownload } from 'react-icons/lu';
import { RiRefreshLine } from 'react-icons/ri';

const UserCreateMenu = ({props}:any) => {
     const handleRefresh = ()=>{
        window.location.reload();    
    }
  return (
    <div>
                <div onClick={handleRefresh} className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc]'>
                  <p className='text-2xl'><RiRefreshLine/></p>
                  <p className='text-xs mt-1 cursor-pointer'>Refresh</p>
                </div>
                <div  className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
                  <p className='text-2xl'><IoMdClose/></p>
                  <p className='text-xs mt-1 cursor-pointer'>Close</p>
                </div>
                 <div className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
                  <div className="tooltip tooltip-left" data-tip="Ctrl + S">
                    <p className='text-2xl'><IoMdSave/></p>
                    <p className='text-xs mt-1 cursor-pointer'>Save</p>
                  </div>
                </div>
                <div className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
                  <p className='text-2xl'><IoIosPrint/></p>
                  <p className='text-xs mt-1 cursor-pointer'>Print</p>
                </div>
                 <div className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
                  <p className='text-2xl'><LuDownload/></p>
                  <p className='text-xs mt-1 cursor-pointer'>Download</p>
                </div>
               
                <div className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
                  <p className='text-2xl'><IoIosMail/></p>
                  <p className='text-xs mt-1 cursor-pointer'>Mail</p>
                </div>
        </div>
  )
}

export default UserCreateMenu