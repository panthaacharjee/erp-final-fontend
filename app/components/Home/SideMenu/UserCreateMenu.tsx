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

const UserCreateMenu = ({setValue, setIdDisable, setTabDisable, setChecked, getValues, tab, setTab, props}:any) => {
    const dispatch = useDispatch()
    const {items, content} = useSelector((state:RootState)=>state.tab)


     const handleRefresh = ()=>{
      setIdDisable(false)
      setValue('employeeId', 'new')
      setValue('name', "")
      setValue('userName', '')
      setValue('salary', "")
      setValue('joinDate', new Date().toISOString().split("T")[0] as any)
      setValue('category', "staff")
      setValue('section', "")
      setValue('designation', "")
      setValue('department', "")
      setValue('vill', "")
      setValue('thana', "")
      setValue('post', "")
      setValue('postCode', 0)
      setValue('district', '')
      setValue('father', '')
      setValue('mother', '')
      setValue('blood', 'Pick a Group')
      setValue('nid', '')
      setValue('dob', new Date(Date.now()))
      setValue('phone', '')
      setValue('qualification', '')
      setValue('nomineeName', '')
      setValue('relation',  '')
      setValue('bankName', '')
      setValue('account', '')
      setValue('route',  0)
      setValue('basic', 0)
      setValue('home', 0)
      setValue('medical', 0)
      setValue('conveyance', 0)
      setValue('food', 0)
      setValue('special',0)

      setTabDisable(true)
      setChecked(false)
      dispatch(ClearUserSuccess())
    }

    const handleSaveButton = async()=>{
        try{
                  dispatch(ClearUserSuccess())
                  dispatch(UserCreateAndUpdateRequest())
                 
                  const config={headers:{"Content-Type": "application/json"}}
                  const {data} = await Axios.post(`/register/user`,{
                    id: getValues('employeeId'),
                    name: getValues('name'), 
                    salary: parseInt(getValues('salary')), 
                    joinDate: getValues('joinDate'), 
                    section: getValues('section'), 
                    category: getValues('category'), 
                    designation: getValues('designation'), 
                    department:getValues('department'), 
                    vill: getValues('vill'), 
                    thana: getValues('thana'),
                    post:getValues('post'),
                    postCode:getValues('postCode'), 
                    district:getValues('district'), 
                    father:getValues('father'), 
                    mother:getValues('mother'),
                    blood:getValues('blood'),
                    nid:getValues('nid'), 
                    dob:getValues('dob'),
                    phone:getValues('phone'),
                    qualification:getValues('qualification'),
                    nomineeName:getValues('nomineeName'), 
                    relation: getValues('relation'), 
                    account:getValues('account'), 
                    bankName:getValues('bankName'), 
                    route:getValues('route'),
                    basic:getValues('basic'),
                    home:getValues('home'),
                    medical:getValues('medical'),
                    conveyance:getValues('conveyance'),
                    food:getValues('food'),
                    special:getValues('special')
                  }, config)
                  dispatch(UserCreateAndUpdateSuccess(data))
              }catch(err:any){
                dispatch(UserCreateAndUpdateFail(err.response.data.message))
              }
    }

    const handleCloseButton = ()=>{
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
    useEffect(()=>{
      handleRefresh()
    },[])
  return (
    <div>
                <div onClick={handleRefresh} className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc]'>
                  <p className='text-2xl'><RiRefreshLine/></p>
                  <p className='text-xs mt-1 cursor-pointer'>Refresh</p>
                </div>
                <div  onClick={handleCloseButton} className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
                  <p className='text-2xl'><IoMdClose/></p>
                  <p className='text-xs mt-1 cursor-pointer'>Close</p>
                </div>
                 <div onClick={handleSaveButton} className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
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