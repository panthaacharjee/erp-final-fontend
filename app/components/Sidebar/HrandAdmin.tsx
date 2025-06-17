import React from 'react'

/* ============ REACT ICONS ===== ======== */
import { FaRegArrowAltCircleLeft, FaUserEdit, FaStar, FaUserCheck, FaRegMoneyBillAlt, FaUserSecret, FaUsers } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import {RiUserShared2Fill } from "react-icons/ri";

const HrandAdmin = ({setSidebar, setSelected}:any) => {
  const closeFunc = ()=>{
    setSelected(undefined)
    setSidebar(false)
  }

  const setupFunc = ()=>{
        setSelected(undefined)
        setSidebar(false)
  }
  const reportFunc = ()=>{
        setSelected(undefined)
        setSidebar(false)
  }
  return (
    <div className='px-4 py-8 relative'>
        <button onClick={closeFunc} className='bg-black text-white text-4xl p-1 fixed right-10 cursor-pointer select-none rounded-lg'><FaRegArrowAltCircleLeft/></button>
        <div className='flex'>
          <div className='w-2/12'>
            <p className='text-white text-sm font-bold text-shadow-2xl text-shadow-black uppercase text-center'>User Management</p>
            <div className='mt-5'>
                <div onClick={()=>setupFunc()} className=' sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  shadow-md'>
                  <p className='text-xl'><FaUserEdit/></p>
                  <p className='ml-2 text-sm cursor-default'>User Create</p>
                  <p className=' sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>setupFunc()} className=' sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  mt-4 shadow-md'>
                  <p className='text-xl'><FaUserCheck/></p>
                  <p className='ml-2 text-sm cursor-default'>Attendence</p>
                  <p className=' sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>setupFunc()} className=' sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  mt-4 shadow-md'>
                  <p className='text-xl'><FaRegMoneyBillAlt/></p>
                  <p className='ml-2 text-sm cursor-default'>Salary Review</p>
                  <p className=' sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
            </div>
          </div>
          <div className='w-2/12 ml-5'>
            <p className='text-white text-shadow-2xl text-shadow-black text-sm font-bold uppercase text-center'>User Management</p>
            <div className='mt-5'>
                <div onClick={()=>setupFunc()} className=' sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  shadow-md'>
                  <p className='text-xl'><FaUserSecret/></p>
                  <p className='ml-2 text-sm cursor-default'>Guest User</p>
                  <p className=' sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>setupFunc()} className=' sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  mt-4 shadow-md'>
                  <p className='text-xl'><RiUserShared2Fill/></p>
                  <p className='ml-2 text-sm cursor-default'>Left User</p>
                  <p className=' sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>setupFunc()} className=' sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  mt-4 shadow-md'>
                  <p className='text-xl'><FaUsers/></p>
                  <p className='ml-2 text-sm cursor-default'>All User</p>
                  <p className=' sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
            </div>
          </div>
        </div>
        <div className='flex mt-10'>
          <div className='w-2/12 '>
            <p className='text-white text-sm font-bold uppercase text-center'>Reports</p>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
          </div>
          <div className='w-2/12 mt-5 ml-5'>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
          </div>
          <div className='w-2/12 mt-5 ml-5'>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                
          </div>
          <div className='w-2/12 mt-5 ml-5'>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>reportFunc()} className='flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-5'>
                    <p className='text-xl'><IoDocumentOutline/></p>
                    <p className='ml-2 text-sm cursor-default'>User Reports</p>
                    <p className=' text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
          </div>
        </div>
        
    </div>
  )
}

export default HrandAdmin