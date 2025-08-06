import { AllUserFail, AllUserRequest, AllUserSuccess, SalaryPdfFail} from '@/app/redux/reducers/HrReducer';
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
import SalaryFilter from '../../filter/SalaryFilter';

const SalaryCreateMenu = ({ tab, setTab, props, selectedItems, salaryPdfDate, users, setCategoryArrayFilter, setIdArrayFilter, setNameArrayFilter}:any) => {
    const dispatch = useDispatch()
    const {items, content} = useSelector((state:RootState)=>state.tab)
    const {nameArray, categoryArray, idArray, setSelectedCategories, setSelectedIds, setSelectedNames} = SalaryFilter({users})

    const handleRefresh = async()=>{
        try{
            dispatch(AllUserRequest())
            const {data}  = await Axios.get('/all/user')
            dispatch(AllUserSuccess(data))
        }catch(err:any){
            dispatch(AllUserFail(err.response.data.message))
        }
        setIdArrayFilter(false)
        setCategoryArrayFilter(false)
        setNameArrayFilter(false)

        const category = [...new Set(categoryArray.filter((item): item is string => item !== undefined))]
        const name = [...new Set(nameArray.filter((item): item is string => item !== undefined))]
        const id = [...new Set(idArray.filter((item): item is string => item !== undefined))]

        localStorage.setItem('selectedCategories', JSON.stringify(category));
        localStorage.setItem('selectedNames', JSON.stringify(name));
        localStorage.setItem('selectedIds', JSON.stringify(id));

    }
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
    const handleDownload =async()=>{
      if(salaryPdfDate === ""){
        return toast.error("DATE IS REQUIRED")
      }
      if(selectedItems.length>0){
        try{
          const dataInput = {
            date: salaryPdfDate,
            users: selectedItems
          }
          const response = await Axios.post("/employee/salary/pdf", dataInput, {
            responseType: 'blob' 
          })
            // Create a blob URL for the PDF
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `salary-details.pdf`);
          document.body.appendChild(link);
          link.click();
          
          // Clean up
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        }catch(err:any){
          dispatch(SalaryPdfFail(err))
        }
      }else{
        toast.error("SELECT ONE EMPLOYEE")
      }
      
    }
  return (
        <div>
                <div onClick={handleRefresh} className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc]'>
                  <p className='text-2xl'><RiRefreshLine/></p>
                  <p className='text-xs mt-1 cursor-pointer'>Refresh</p>
                </div>
                <div  onClick={handleClose} className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
                  <p className='text-2xl'><IoMdClose/></p>
                  <p className='text-xs mt-1 cursor-pointer'>Close</p>
                </div>
                <div  className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
                  <p className='text-2xl'><IoIosPrint/></p>
                  <p className='text-xs mt-1 cursor-pointer'>Print</p>
                </div>
                 <div onClick={handleDownload} className='bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4'>
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

export default SalaryCreateMenu