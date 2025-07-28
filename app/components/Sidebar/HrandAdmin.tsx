import React from 'react'

/* ============ REACT ICONS ===== ======== */
import { FaRegArrowAltCircleLeft, FaUserEdit, FaStar, FaUserCheck, FaRegMoneyBillAlt, FaUserSecret, FaUsers } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import {RiUserShared2Fill } from "react-icons/ri";

import { useDispatch, useSelector } from 'react-redux';
import { AddTabDataRequest, AddTabDataSuccess } from '@/app/redux/reducers/tabReducer';
import { RootState } from '@/app/redux/rootReducer';
import { HrandAdminData } from './SidebarData';
import { ClearUserSuccess } from '@/app/redux/reducers/HrReducer';


interface tabStateData {
  title: string,
  icon:string,
  element:string,
}

const HrandAdmin = ({setSidebar, setSelected, setTab}:any) => {
  const dispatch = useDispatch()
  const {items, content} = useSelector((state:RootState)=>state.tab)
  const closeFunc = ()=>{
    setSelected(undefined)
    setSidebar(false)
  }

  const setupFunc = (dataProps:tabStateData)=>{
        setSelected(undefined)
        setSidebar(false)  
        dispatch(AddTabDataRequest())
        dispatch(ClearUserSuccess())
        const sameTab = items.filter((val:any)=>val.title === dataProps.title)
        if(sameTab.length===0){
            const id = `Tab-${Date.now()}`
            const data = {
              loading:false,
              items:[...items, {
              id,
              title:dataProps.title,
              icon:dataProps.icon,
              }],
              content:[...content, {
              id,
              element: dataProps.element
              }]
            }
            localStorage.setItem('tabData', JSON.stringify(data))
            dispatch(AddTabDataSuccess(data))
        }else{
          setTab(sameTab[0].id)
        }
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
                <div onClick={()=>setupFunc(HrandAdminData[0])} className=' sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  shadow-md'>
                  <p className='text-xl'><FaUserEdit/></p>
                  <p className='ml-2 text-sm cursor-default'>User Create</p>
                  <p className=' sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>setupFunc(HrandAdminData[1])} className=' sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  mt-4 shadow-md'>
                  <p className='text-xl'><FaUserCheck/></p>
                  <p className='ml-2 text-sm cursor-default'>Attendence</p>
                  <p className=' sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>setupFunc(HrandAdminData[2])} className=' sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  mt-4 shadow-md'>
                  <p className='text-xl'><FaRegMoneyBillAlt/></p>
                  <p className='ml-2 text-sm cursor-default'>Salary Review</p>
                  <p className=' sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
            </div>
          </div>
          <div className='w-2/12 ml-5'>
            <p className='text-white text-shadow-2xl text-shadow-black text-sm font-bold uppercase text-center'>User Management</p>
            <div className='mt-5'>
                <div onClick={()=>setupFunc(HrandAdminData[0])} className=' sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  shadow-md'>
                  <p className='text-xl'><FaUserEdit/></p>
                  <p className='ml-2 text-sm cursor-default'>User Create</p>
                  <p className=' sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>setupFunc(HrandAdminData[1])} className=' sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  mt-4 shadow-md'>
                  <p className='text-xl'><FaUserCheck/></p>
                  <p className='ml-2 text-sm cursor-default'>Attendence</p>
                  <p className=' sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer'><FaStar/></p>
                </div>
                <div onClick={()=>setupFunc(HrandAdminData[2])} className=' sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  mt-4 shadow-md'>
                  <p className='text-xl'><FaRegMoneyBillAlt/></p>
                  <p className='ml-2 text-sm cursor-default'>Salary Review</p>
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