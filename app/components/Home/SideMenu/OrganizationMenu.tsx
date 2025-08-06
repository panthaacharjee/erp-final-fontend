import { ClearUserSuccess, UserCreateAndUpdateFail, UserCreateAndUpdateRequest, UserCreateAndUpdateSuccess } from '@/app/redux/reducers/HrReducer';
import React, { useEffect } from 'react'
import { FaRegCopy } from 'react-icons/fa';
import { IoIosMail, IoIosPrint, IoMdClose, IoMdSave } from 'react-icons/io';
import { LuDownload } from 'react-icons/lu';
import { RiRefreshLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../../Axios';
import { RootState } from '@/app/redux/rootReducer';
import { RemoveTabRequest, RemoveTabSuccess } from '@/app/redux/reducers/tabReducer';
import { toast } from 'react-toastify';

const OrganizationMenu = ({setValue, setIdDisable, setTabDisable, setChecked, getValues, tab, setTab, props, id, user}:any) => {
    const dispatch = useDispatch()
    const {items, content} = useSelector((state:RootState)=>state.tab)

    const handleClose =()=>{
            dispatch(RemoveTabRequest())
            const data = {
                loading:false,
                items: items.filter((val:any)=>val.id !== props.id),
                content: content.filter((val:any)=>val.id !== props.id)
            }
            localStorage.setItem('tabData', JSON.stringify(data))
            dispatch(RemoveTabSuccess(data))
            if(tab !== props.id){
                            setTab(tab)
            }
            if(tab === props.id){
                const index =  items.findIndex((val:any)=>val.id===props.id)
                setTab(items[index-1].id)
            }
    }

    
  return (
        <div>
                <div  className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc]'>
                  <p className='text-2xl'><RiRefreshLine/></p>
                  <p className='text-xs mt-1 cursor-pointer'>Refresh</p>
                </div>
                <div onClick={handleClose}  className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
                  <p className='text-2xl'><IoMdClose/></p>
                  <p className='text-xs mt-1 cursor-pointer'>Close</p>
                </div>
                 <div  className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
                  <div className="tooltip tooltip-left" data-tip="Ctrl + S Or Enter">
                    <p className='text-2xl'><IoMdSave/></p>
                    <p className='text-xs mt-1 cursor-pointer'>Save</p>
                  </div>
                </div>
              
               
                <div className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
                  <p className='text-2xl'><IoIosMail/></p>
                  <p className='text-xs mt-1 cursor-pointer'>Mail</p>
                </div>
        </div>
  )
}

export default OrganizationMenu