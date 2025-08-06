'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import * as XLSX from 'xlsx';

import { Salarycreateform } from '../../formInterface/hrinformation'
import { toast } from 'react-toastify'
import Axios from '../../Axios'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { AllUserFail, AllUserRequest, AllUserSuccess, ClearExcelSalaryError, ClearExcelSalarySuccess, ClearSingleSalaryError, ClearSingleSalarySuccess, ExcelSalaryFail, ExcelSalaryRequest, ExcelSalarySuccess, SingleSalaryFail, SingleSalaryRequest, SingleSalarySuccess, } from '@/app/redux/reducers/HrReducer'
import { RootState } from '@/app/redux/rootReducer'
import SalaryCreateMenu from '../SideMenu/SalaryCreateMenu'


/*============ React Icons =============*/
import { TbBodyScan, TbSum } from "react-icons/tb";
import DateFormator from '../../utils/DateFormator'
import { IoCreateSharp } from 'react-icons/io5'
import { User } from '@/app/redux/interfaces/userInterface'
import { MdFilterAlt } from 'react-icons/md'
import { IoIosSettings } from 'react-icons/io'
import { CiFilter } from "react-icons/ci";


import SalaryFilter from '../../filter/SalaryFilter';
import InlineLoader from '../../InlineLoader';


const SalaryCreate = ({props, setTab, tab}:any) => {
  const { data:session} = useSession()
  const dispatch = useDispatch()
  const {users, filterUsers, loading} = useSelector((state:RootState)=>state.hr)
  console.log(filterUsers)
  const {
    salaryMessage, 
    salaryLoading, 
    salaryError, 
    singleSalaryLoading, 
    singleSalaryMessage, 
    singleSalaryError
  } = useSelector((state:RootState)=>state.salary)
  const {
      register,
      handleSubmit,
      trigger,
      setValue,
      setFocus,
      getValues,
      formState:{errors} 
  } = useForm<Salarycreateform>()

  const [tableHover, setTableHover] = useState()
  const [excelTableHover, setExcelHover] = useState()
  const [singleUser, setSingleUser] = useState<User>()
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isFilter, setIsFilter] = useState("1")
  const [filtedUser, setFiltedUser] = useState<User[]>([])

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [singleSalaryDate, setSingleSalaryDate] = useState(new Date().toISOString().split('T')[0])
  const [salaryPdfDate, setSalaryPdfDate] = useState(new Date().toISOString().split('T')[0])


  const staff = users?.filter((val:any)=>val.category==='Staff')
  const totalSalary = users?.reduce((acc, cur)=> (acc + cur.mainSalary), 0) ?? 0

  const {
    nameArray,
    nameSearch,
    selectedNames,
    nameSelectedItems,
    setSelectedNames,
    handleNameSearch,
    handleNameSelect,
    handleSelectAllNames,
    handleClearAllNames,

    idArray,
    idSearch,
    selectedIds,
    idSelectedItems,
    setSelectedIds,
    handleIdSearch,
    handleIdSelect,
    handleSelectAllIds,
    handleClearAllIds,

    categoryArray,
    categorySearch,
    selectedCategories,
    categorySelectedItems,
    setSelectedCategories,
    handleCategorySearch,
    handleCategorySelect,
    handleSelectAllCategories,
    handleClearAllCategories,
  } = SalaryFilter({ users });


  const [nameArrayFilter, setNameArrayFilter] = useState(false)
  const [idArrayFilter, setIdArrayFilter] = useState(false)
  const [categoryArrayFilter, setCategoryArrayFilter] = useState(false)


  const handleHover = (props:any)=>{
    setTableHover(props)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>, userId: string) => {
    e.stopPropagation();
    
    setSelectedItems(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };


  // For select all functionality
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && filterUsers) {
      setSelectedItems(filterUsers.map(user => user._id)); // Assuming each user has an 'id' property
    } else {
      setSelectedItems([]);
    }
  };

  const handleSalary = (props:any)=>{
      const modal = document.getElementById('my_modal_2');
      if (modal) { // Check if element exists
        (modal as HTMLDialogElement).showModal(); // Type assertion for `showModal()`
        setSingleUser(props)
      } else {
        console.error("Modal element not found!");
      }
  }

  const handleExcelSalary = ()=>{
     const modal = document.getElementById('my_modal_3');
      if (modal) { // Check if element exists
        (modal as HTMLDialogElement).showModal(); // Type assertion for `showModal()`
        setSingleUser(props)
      } else {
        console.error("Modal element not found!");
      }
  }

  const [jsonData, setJsonData] = useState<any>([]);
  
  const handleFileUpload = (e:any) => {
    const file = e.target.files[0];
     if (file) {
      const reader = new FileReader();
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ];
      
      if (validTypes.includes(file.type)) {
         reader.onload = (e:any) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const json:any = XLSX.utils.sheet_to_json(worksheet);
          setJsonData(json);
      };
    
      reader.readAsBinaryString(file);
      } else {
        toast("Please upload a valid Excel file")
        e.target.value = ''; // Reset input
      }
    }
    
   
  };
  
  const excelSalaryCreate = async() =>{
      try{
        dispatch(ExcelSalaryRequest())
        const {data} = await Axios.post("/employee/salary/create", {
          data:jsonData,
          date: date
        })
        dispatch(ExcelSalarySuccess(data.message))
      }catch(err:any){
        dispatch(ExcelSalaryFail(err.response.data.message))
      }
  }

  const handleUser = async()=>{
    try{
      dispatch(AllUserRequest())
      const {data} = await Axios.get('/all/user', {
        params: {
          nameFilter: selectedNames.join(','),
          idFilter : selectedIds.join(','),
          categoryFilter: selectedCategories.join(',')
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      dispatch(AllUserSuccess(data))
    }catch(err:any){
      dispatch(AllUserFail(err.response.data.message))
    }

    if(nameArray.length === selectedNames.length){
      setNameArrayFilter(false)
    }else{
      setNameArrayFilter(true)
    }

    if(idArray.length === selectedIds.length){
      setIdArrayFilter(false)
    }else{
      setIdArrayFilter(true)
    }

    
    if(categoryArray.length === selectedCategories.length){
      setCategoryArrayFilter(false)
    }else{
      setCategoryArrayFilter(true)
    }
    
    (document.activeElement as HTMLElement)?.blur()

  }

  const handleSave:SubmitHandler<Salarycreateform> = async(dataInput) => {
      try{
       const salaryData = {
           date:singleSalaryDate,
           id:singleUser?.employeeId,
           present:parseInt(dataInput.present.toString()),
           weekend:parseInt(dataInput.weekend.toString()),
           holidays:parseInt(dataInput.holidays.toString()),
           absent:parseInt(dataInput.absent.toString()),
           casual:parseInt(dataInput.casual.toString()),
           sick:parseInt(dataInput.sick.toString()),
           earn:parseInt(dataInput.earn.toString()),
           maternity:parseInt(dataInput.maternity.toString()),
           ot_hours: parseFloat(dataInput.ot_hours.toString()),
           ot_rate:parseFloat(dataInput.ot_rate.toString()),
           ot_amount:parseFloat(dataInput.ot_amount.toString()),
           advanced:parseFloat(dataInput.advanced.toString()),
           abseentism:parseFloat(dataInput.abseentism.toString()),
           loan:parseFloat(dataInput.loan.toString()),
           pf:parseFloat(dataInput.pf.toString()),
           others:parseFloat(dataInput.others.toString()),
           tax:parseFloat(dataInput.tax.toString())
       }
      dispatch(SingleSalaryRequest())
      const {data} = await Axios.post("/employee/single/salary/create", salaryData)
      dispatch(SingleSalarySuccess(data.message))     
         
      }catch(err:any){
        dispatch(SingleSalaryFail(err))
      }
    
  };

  
  useEffect(() => {
      
    if(salaryError){
      toast.error(salaryError)
    }
    if(salaryMessage){
      toast.success(salaryMessage)
    }
    if(singleSalaryMessage){
      toast.success(singleSalaryMessage)
    }
    if(singleSalaryError){
      toast.error(singleSalaryError)
    }
    dispatch(ClearSingleSalarySuccess())
    dispatch(ClearSingleSalaryError())
    dispatch(ClearExcelSalarySuccess())
    dispatch(ClearExcelSalaryError())
    
    handleUser()   
    

  }, [ salaryError, salaryMessage, singleSalaryMessage, singleSalaryError ]);

 useEffect(()=>{
  if (categoryArray.length > 0) {
    const saved = localStorage.getItem('selectedCategories');
    const initialSelectedCategories = saved 
      ? JSON.parse(saved) 
      : [...categoryArray]; 
    setSelectedCategories(initialSelectedCategories);
  }
  if (nameArray.length > 0) {
    const saved = localStorage.getItem('selectedNames');
    const initialSelectedNames = saved 
      ? JSON.parse(saved) 
      : [...nameArray]; 
    setSelectedNames(initialSelectedNames);
  }
  if (idArray.length > 0) {
    const saved = localStorage.getItem('selectedIds');
    const initialSelectedIds = saved 
      ? JSON.parse(saved) 
      : [...idArray];
    setSelectedIds(initialSelectedIds);
  }

  if(filterUsers.length>0){
      setFiltedUser(filterUsers)
    }else{
      setFiltedUser(users)
    }
 },[categoryArray, nameArray, idArray, filtedUser])

  return (
      <div className='flex  relative bg-white'>
            {loading && <InlineLoader/>}
            <div className='w-[93%] px-3 pt-12'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center w-8/12'>
                  <div className='border-2 border-[#bfbfbf] border-dashed flex justify-between items-center w-3/12 px-4 py-2'>
                    <p className='text-sm text-[#bfbfbf]'>Total Staff</p>
                    <p className='text-sm text-[#bfbfbf]'>{staff?.length}</p>
                  </div>
                  <div className='ml-2 border-2 border-[#bfbfbf] border-dashed flex justify-between items-center w-3/12 px-4 py-2'>
                    <p className='text-sm text-[#bfbfbf]'>Total Worker</p>
                    <p className='text-sm text-[#bfbfbf]'>{users?.length - staff?.length}</p>
                  </div>
                </div>
                <div className='flex items-center bg-amber-500 px-4 py-2 w-2/12'>
                  <div className='flex items-center'>
                    <p className='mr-2 text-lg'><TbSum/></p>
                    <p className='text-sm leading-3.5 text-white'>Total Salary</p>
                  </div>
                  <p className='text-sm text-white ml-4'>৳{totalSalary}</p>
                </div>
              </div>
              <div className='flex justify-between mt-5'>
                <div>
                  <button onClick={handleExcelSalary} className='bg-black w-8/12 text-white rounded-sm text-sm py-2 px-8 cursor-pointer'>Salary Import As Excel</button>
                  <input 
                    type='date' 
                    className='input w-8/12 mt-2 bg-[#e7e3e3]' 
                    onChange={(e:any)=>setSalaryPdfDate(e.target.value)} 
                    value={salaryPdfDate} 
                  />
                </div>
                <div>
                  {isFilter ? <button className='text-xl cursor-pointer' ><MdFilterAlt/></button>:<button className='text-xl cursor-pointer'><CiFilter/></button>}
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="text-xl ml-2 cursor-pointer"><IoIosSettings/></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-amber-100 rounded-box z-1 w-52 p-2 shadow-sm ">
                      <li><a 
                        href="https://docs.google.com/spreadsheets/d/18eo1fejYT569eTUJ30z9nNwB7WvO0oK1/edit?usp=sharing&ouid=106908150399270672868&rtpof=true&sd=true"
                        download
                        target='__blank'
                        className="download-link"
                      >
                        Salary Sample (Excel)
                      </a></li>
                      <li><a>Salary Upload Guidence</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='mt-4'>
                <div className="overflow-x-auto min-h-96">
                <table className="table table-sm">
                  <thead>
                    <tr className='border-b-2 border-b-black'>
                      <th>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={filterUsers && filterUsers.length > 0 && selectedItems.length === filterUsers.length}
                          onChange={handleSelectAll}
                          disabled={!filterUsers || filterUsers.length === 0}
                        />
                        </th>
                      <th>SL</th>
                      <th>
                        <div className='flex items-center justify-between'>
                          <p className=''>ID</p> 
                          {isFilter && <div className="dropdown dropdown-end">
                           <div tabIndex={0} role="button" className="text-xl ml-2 cursor-pointer">{idArrayFilter ? <button className='text-xl cursor-pointer'><MdFilterAlt/></button>:<button className='text-xl cursor-pointer'><CiFilter/></button>}</div>
                           <ul tabIndex={0} className="dropdown-content menu bg-base-300  rounded-box z-1 w-64 p-2 shadow-sm">
                              
                              <div className='flex items-center justify-between mt-3'>
                                <button className='cursor-pointer' onClick={handleSelectAllIds}>Select all({idSelectedItems.length})</button>
                                <button className='cursor-pointer' onClick={handleClearAllIds}>Clear</button>
                              </div>
                              <label className="input h-8 mt-2 focus:outline">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                  <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                  </g>
                                </svg>
                                <input 
                                  type="search" 
                                  required  
                                  className='focus:outline-noe' 
                                  onChange={(e) => handleIdSearch(e)}
                                  value={idSearch}
                                />
                              </label>
                              
                              <div className=' h-40 scroll-smooth overflow-y-auto py-2 border-b-[1px]'>
                                  {idSelectedItems.map((val:any, ind:any)=>{
                                    return <div key={ind} className='cursor-pointer flex justify-between items-center py-2 px-4 '>
                                      <li className='text-xs'>{val}</li>
                                      <input 
                                        type='checkbox' 
                                        className='cursor-pointer'
                                        checked={selectedIds.includes(val)}
                                        onChange={(e) => handleIdSelect(val, e.target.checked)}
                                      />
                                    </div>
                                  })}
                              </div>
                              <div className='flex justify-end'>
                                <button onClick={handleUser} className='mt-4 bg-green-500 py-1 text-white text-xs rounded-sm cursor-pointer px-4 w-fit'>Ok</button>
                                <button onClick={()=>(document.activeElement as HTMLElement)?.blur()} className='mt-4 bg-slate-400 py-1 text-white text-xs rounded-sm cursor-pointer px-4 w-fit ml-2'>Cancel</button>
                              </div>
                            </ul>
                          </div>}
                        </div>
                      </th>
                      <th>
                        <div className='flex items-center justify-between'>
                          <p className=''>Name</p> 
                          {isFilter && <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="text-xl ml-2 cursor-pointer">{nameArrayFilter ? <button className='text-xl cursor-pointer'><MdFilterAlt/></button>:<button className='text-xl cursor-pointer'><CiFilter/></button>}</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-300  rounded-box z-1 w-64 p-2 shadow-sm">
                              
                              <div className='flex items-center justify-between mt-3'>
                                <button className='cursor-pointer' onClick={handleSelectAllNames}>Select all({nameSelectedItems.length})</button>
                                <button className='cursor-pointer' onClick={handleClearAllNames}>Clear</button>
                              </div>
                              <label className="input h-8 mt-2 focus:outline">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                  <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                  </g>
                                </svg>
                                <input 
                                  type="search" 
                                  required  
                                  className='focus:outline-noe' 
                                  onChange={(e) => handleNameSearch(e)}
                                  value={nameSearch}
                                />
                              </label>
                              
                              <div className=' h-40 scroll-smooth overflow-y-auto py-2 border-b-[1px]'>
                                  {nameSelectedItems.map((val:any, ind:any)=>{
                                    return <div key={ind} className='cursor-pointer flex justify-between items-center py-2 px-4 '>
                                      <li className='text-xs'>{val}</li>
                                      <input 
                                        type='checkbox' 
                                        className='cursor-pointer'
                                        checked={selectedNames.includes(val)}
                                        onChange={(e) => handleNameSelect(val, e.target.checked)}
                                      />
                                    </div>
                                  })}
                              </div>
                              <div className='flex justify-end'>
                                <button onClick={handleUser} className='mt-4 bg-green-500 py-1 text-white text-xs rounded-sm cursor-pointer px-4 w-fit'>Ok</button>
                                <button onClick={()=>(document.activeElement as HTMLElement)?.blur()} className='mt-4 bg-slate-400 py-1 text-white text-xs rounded-sm cursor-pointer px-4 w-fit ml-2'>Cancel</button>
                              </div>
                            </ul>
                          </div>}
                        </div>
                      </th>
                      <th>
                        <div className='flex items-center justify-between'>
                          <p className=''>Category</p> 
                          {isFilter && <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="text-xl ml-2 cursor-pointer">{categoryArrayFilter ? <button className='text-xl cursor-pointer'><MdFilterAlt/></button>:<button className='text-xl cursor-pointer'><CiFilter/></button>}</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-300  rounded-box z-1 w-64 p-2 shadow-sm">
                              
                              <div className='flex items-center justify-between mt-3'>
                                <button className='cursor-pointer' onClick={handleSelectAllCategories}>Select all({categorySelectedItems.length})</button>
                                <button className='cursor-pointer' onClick={handleClearAllCategories}>Clear</button>
                              </div>
                              <label className="input h-8 mt-2 focus:outline">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                  <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                  </g>
                                </svg>
                                <input 
                                  type="search" 
                                  required  
                                  className='focus:outline-noe' 
                                  onChange={(e) => handleCategorySearch(e)}
                                  value={categorySearch}
                                />
                              </label>
                              
                              <div className=' h-40 scroll-smooth overflow-y-auto py-2 border-b-[1px]'>
                                  {categorySelectedItems.map((val:any, ind:any)=>{
                                    return <div key={ind} className='cursor-pointer flex justify-between items-center py-2 px-4 '>
                                      <li className='text-xs'>{val}</li>
                                      <input 
                                        type='checkbox' 
                                        className='cursor-pointer'
                                        checked={selectedCategories.includes(val)}
                                        onChange={(e) => handleCategorySelect(val, e.target.checked)}
                                      />
                                    </div>
                                  })}
                              </div>
                              <div className='flex justify-end'>
                                <button onClick={handleUser} className='mt-4 bg-green-500 py-1 text-white text-xs rounded-sm cursor-pointer px-4 w-fit'>Ok</button>
                                <button onClick={()=>(document.activeElement as HTMLElement)?.blur()} className='mt-4 bg-slate-400 py-1 text-white text-xs rounded-sm cursor-pointer px-4 w-fit ml-2'>Cancel</button>
                              </div>
                            </ul>
                          </div>}
                        </div>
                      </th>
                      <th>Salary</th>
                      <th>Join Date</th>
                      <th>Grade</th>
                      <th>Account</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtedUser?.map((val:any, ind:any)=>{
                      
                      return  <tr key={ind} onClick={()=>handleHover(ind)} className={`${tableHover===ind? "bg-amber-100":""} cursor-pointer`}>
                                <td>
                                  <input 
                                    type="checkbox" 
                                    checked={selectedItems.includes(val._id)}
                                    onChange={(e) => handleSelect(e, val._id)} 
                                    className="checkbox" 
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </td>
                                <td>{ind+1}</td>
                                <td>{val?.employeeId}</td>
                                <td>{val?.name}</td>
                                <td>{val?.category}</td>
                                <td>৳ {val?.mainSalary}</td>
                                <td>{DateFormator(val?.joinDate, 'none')}</td>
                                <td>{val?.grade?val.grade : 'N/A'}</td>
                                <td>{val?.bank?.account? val.bank.account : "None"}</td>
                                <td onClick={()=>handleSalary(val)} className='text-xl'><IoCreateSharp/></td>
                              </tr>
                    })}
                    
                  </tbody>
                </table>
              </div>
              </div>
            </div>
            <div className='w-[7%] bg-[#d3e6ec]  min-h-screen pt-14 px-2'>
                <SalaryCreateMenu 
                  props={props} 
                  tab={tab} 
                  setTab={setTab} 
                  selectedItems={selectedItems} 
                  salaryPdfDate={salaryPdfDate}
                  setIdArrayFilter={setIdArrayFilter}
                  setNameArrayFilter={setNameArrayFilter}
                  setCategoryArrayFilter={setCategoryArrayFilter}
                  users={users}
                />
            </div>
            
            {/* SALARY MODAL */}
            <dialog id="my_modal_2" className="modal w-full">
              <div className="modal-box max-w-4xl w-ful">
                <p className='text-center font-bold'>ERPAC GROUP LIMITED</p>
                <p className='text-center font-bold'>Plot # 2083-2085, Binodpur, Maijdee, Sadar, Noakhali-3800, <br/> Bangladesh</p>
                <div className='flex items-center justify-between mt-4'>
                  <p className='text-center font-bold'>Salary Sheet</p>
                  <input 
                    type="date" 
                    value={singleSalaryDate}  
                    className="input w-2/12" 
                    onChange={(e)=>setSingleSalaryDate(e.target.value)}
                  />
                </div>
                <form className='mt-4' onSubmit={handleSubmit(handleSave)}>
                  <div className="font-semibold text-sm">Employee Information (কর্মচারীর তথ্য)   </div>
                  <div className='flex items-center flex-wrap border-[1px] border-[#dfdddd] p-2 rounded-md mt-2'>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Employee ID (কর্মচারীর আইডি)</legend>
                          <div className={`input w-11/12 border-red-40`}>
                            {singleUser?.employeeId}
                          </div>
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Employee Name (কর্মচারীর নাম)</legend>
                          <div className={`input w-11/12 border-red-40`}>
                            {singleUser?.name}
                          </div>
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Section (সেকশন)</legend>
                          <div className={`input w-11/12 border-red-40`}>
                            {singleUser?.section}
                          </div>
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Category (ক্যাটাগরি)</legend>
                          <div className={`input w-11/12 border-red-40`}>
                            {singleUser?.category}
                          </div>
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Department (ডিপার্টমেন্ট)</legend>
                          <div className={`input w-11/12 border-red-40`}>
                            {singleUser?.department}
                          </div>
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Designation (পদবি)</legend>
                          <div className={`input w-11/12 border-red-40`}>
                            {singleUser?.designation}
                          </div>
                      </div>
                       <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Grade (গ্রেড)</legend>
                          <div className={`input w-11/12 border-red-40`}>
                            {singleUser?.grade}
                          </div>
                      </div>
                  </div>
                  <div className="font-semibold text-sm mt-4">Salary Information (বেতনের তথ্য)   </div>
                  <div className='flex items-center flex-wrap border-[1px] border-[#dfdddd] p-2 rounded-md mt-2'>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Salary (বেতন)</legend>
                          <div className={`input w-11/12 border-red-40`}>
                            {singleUser?.mainSalary}
                          </div>
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Basic Salary (মূল বেতন)</legend>
                          <div className={`input w-11/12 border-red-40`}>
                            {singleUser?.salary?.basic}
                          </div>
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Home Rent (বাসা ভাড়া)</legend>
                          <div className={`input w-11/12 border-red-40`}>
                            {singleUser?.salary?.home}
                          </div>
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Medical (চিকিৎসা ভাতা)</legend>
                          <div className={`input w-11/12 border-red-40`}>
                            {singleUser?.salary?.medical}
                          </div>
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Conveyance (যাতায়াত ভাতা)</legend>
                          <div className={`input w-11/12 border-red-40`}>
                            {singleUser?.salary?.conveyance}
                          </div>
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Food Allowence (খাদ্য ভাতা)</legend>
                          <div className={`input w-11/12 border-red-40`}>
                            {singleUser?.salary?.food}
                          </div>
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Special Allowence (বিশেষ ভাতা)</legend>
                          <div className={`input w-11/12 border-red-40`}>
                            {singleUser?.salary?.special}
                          </div>
                      </div>
                  </div>
                  <div className="font-semibold text-sm mt-4">Attendence (হাজিরা)   </div>
                  <div className='flex items-center flex-wrap border-[1px] border-[#dfdddd] p-2 rounded-md mt-2'>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Present (উপস্থিত)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('present', {required:true})}
                            
                          />
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Weekend (সাপ্তাহিক ছুটি)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('weekend', {required:true})}
                            
                          />
                      </div>
                     <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Holidays (ছুটি)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('holidays', {required:true})}
                            
                          />
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Absent (অনুপস্থিত)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('absent', {required:true})}
                            
                          />
                      </div>
                  </div>
                  <div className="font-semibold text-sm mt-4">Leave (ছুটি)   </div>
                  <div className='flex items-center flex-wrap border-[1px] border-[#dfdddd] p-2 rounded-md mt-2'> 
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Casual Leave (নৈমিত্তিক ছুটি)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('casual', {required:true})}
                            
                          />
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Sick Leave (অসুস্থতার ছুটি)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('sick', {required:true})}
                            
                          />
                      </div>
                     <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Earn Leave (অর্জিত ছুটি)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('earn',{required:true})}
                            
                          />
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Maternity Leave (মাতৃকালীন ছুটি)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('maternity', {required:true})}
                            
                          />
                      </div>
                  </div>
                  <div className="font-semibold text-sm mt-4">Over Time (অতিরিক্ত কর্ম)  </div>
                  <div className='flex items-center flex-wrap border-[1px] border-[#dfdddd] p-2 rounded-md mt-2'>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">OT Hours (অতিরিক্ত কর্মঘন্টা)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('ot_hours', {required:true})}
                            
                          />
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Over Time Rate (অতিরিক্ত কর্মহার)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('ot_rate', {required:true})}
                            
                          />
                      </div>
                     <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">OT Amount (অতিরিক্ত মজুরি)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('ot_amount', {required:true})}
                            
                          />
                      </div>
                  </div>
                   <div className="font-semibold text-sm mt-4">Deduction (কর্তন)  </div>
                  <div className='flex items-center flex-wrap border-[1px] border-[#dfdddd] p-2 rounded-md mt-2'>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Advanced (অগ্রিম)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('advanced', {required:true})}
                            
                          />
                      </div>
                      <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Abseentism (অনুপস্থিত কর্তন)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('abseentism', {required:true})}
                            
                          />
                      </div>
                     <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Loan (ঋণ)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('loan', {required:true})}
                            
                          />
                    </div>
                    <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">PF (পিএফ)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('pf', {required:true})}
                            
                          />
                    </div>
                    <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Others (অন্যান্য কর্তন)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('others', {required:true})}
                            
                          />
                    </div>
                    <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Income Tax (ট্যাক্স কর্তন)</legend>
                          <input 
                            type="number" 
                            className="input w-11/12" 
                            {...register('tax', {required:true})}
                            
                          />
                    </div>
                  </div>
                  <button className='bg-black text-white px-8 py-2 mt-5 cursor-pointer rounded-sm'>{singleSalaryLoading? <span className="loading loading-spinner loading-md"></span>:"SUBMIT"}</button>
                </form>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            
            {/* SALARY EXCEL MODAL */}
            <dialog id="my_modal_3" className="modal w-full">
              <div className="modal-box max-w-4xl w-ful">
                <p className='text-center font-bold'>ERPAC GROUP LIMITED</p>
                <p className='text-center font-bold'>Plot # 2083-2085, Binodpur, Maijdee, Sadar, Noakhali-3800, <br/>Bangladesh</p>
                <div className='flex justify-between items-center mt-4'>
                  <p className='font-bold mr-4'>Salary Sheet <span className=' font-light text-sm'>(Total Row: {jsonData.length})</span> </p>
                  <input
                    type='date'
                    onChange={(e)=>setDate(e.target.value)}
                    value={date}
                    className='input w-2/12'
                  />
                </div>
                <div className='flex justify-between items-center mt-3'>
                 <input 
                    type="file" 
                    className="file-input file-input-md"
                    onChange={handleFileUpload} 
                    accept=".xlsx,.xls,.csv"
                 />
                 <button onClick={excelSalaryCreate} className='bg-black rounded-lg text-white px-8 py-2 cursor-pointer'>{salaryLoading ? <span className="loading loading-spinner loading-md"></span> : "Save"}</button>
                </div>
                <p className='text-xs text-pink-400 mt-2'>[NB: Sample Salary Excel Found From Settings]</p>
                
                <div className='border-2 border-[#f1f1f1] mt-5 rounded-sm'>
                  <div className="overflow-x-auto overflow-y-auto">
                    <table className="table table-sm">
                      <thead className='text-xs'>
                        <tr>
                          <th>SL</th>
                          <th>Name</th>
                          <th>ID</th>
                          <th>Designation</th>
                          <th>Grade</th>
                          <th>Department</th>
                          <th>Salary</th>
                          <th>Special Allowence</th>
                          <th>Present Days</th>
                          <th>Weekend Days</th>
                          <th>Holi Days</th>
                          <th>Absent Days</th>
                          <th>CL</th>
                          <th>Sick Leave</th>
                          <th>Earn Leave</th>
                          <th>Maternity Leave</th>
                          <th>OT Hours</th>
                          <th>OT Rate </th>
                          <th>OT Amount</th>
                          <th>Advanced</th>
                          <th>Absenteeism</th>
                          <th>Loan</th>
                          <th>PF</th>
                          <th>Others Deduction</th>
                          <th>Income Tax</th>
                          <th>Bank Name</th>
                          <th>Account Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jsonData && jsonData.slice(0,10).map((val:any, ind:any)=>{
                          return <tr  key={ind} className={`${excelTableHover === ind && "bg-amber-100"}`} onClick={()=>setExcelHover(ind)}>
                            <th>{ind+1}</th>
                            <th>{val.Name}</th>
                            <th>{val.ID}</th>
                            <th>{val.Designation}</th>
                            <th>{val.Grade}</th>
                            <th>{val.Department}</th>
                            <th>{val.Salary}</th>
                            <th>{val.Special}</th>
                            <th>{val.Present}</th>
                            <th>{val.Weekend}</th>
                            <th>{val.Holidays}</th>
                            <th>{val.Absent}</th>
                            <th>{val.CL}</th>
                            <th>{val.Sick}</th>
                            <th>{val.Earn}</th>
                            <th>{val.Maternity}</th>
                            <th>{val.OTHours}</th>
                            <th>{val.OTRate}</th>
                            <th>{val.OTAmount}</th>
                            <th>{val.Advanced}</th>
                            <th>{val.Absenteeism}</th>
                            <th>{val.Loan}</th>
                            <th>{val.PF}</th>
                            <th>{val.Others}</th>
                            <th>{val.Income}</th>
                            <th>{val.Bank}</th>
                            <th>{val.Account}</th>
                          </tr>
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
        </div>
  )
}

export default SalaryCreate
