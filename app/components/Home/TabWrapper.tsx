import React, {useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { HomeComponent, HomeIcon } from './HomeItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/redux/rootReducer';
import { RemoveTabRequest, RemoveTabSuccess } from '@/app/redux/reducers/tabReducer';
import { ClearUserSuccess } from '@/app/redux/reducers/HrReducer';

const TabWrapper = ({tab, setTab}:any) => {
    const dispatch = useDispatch()
    // console.log(tab)
    const {items, content} = useSelector((state:RootState)=>state.tab)

    function tabFunc(props: string) {
        setTab(props);
    }

    const closeFunc = (id:string)=>{
            dispatch(RemoveTabRequest())
            const data = {
                loading:false,
                items: items.filter((val:any)=>val.id !== id),
                content: content.filter((val:any)=>val.id !== id)
            }
            localStorage.setItem('tabData', JSON.stringify(data))
            dispatch(RemoveTabSuccess(data))
            if(tab !== id){
                setTab(tab)
            }
            if(tab === id){
                const index =  items.findIndex((val:any)=>val.id===id)
                setTab(items[index-1].id)
            }
    }

   
  return (
    <div className='w-full h-full'>
        <div className='flex fixed  bg-[#d3e6ec] tab-cont h-[38px] w-full z-20'>
            {items.map((val:any, ind:number)=>{
                return <div  key={ind} className={`flex items-center min-w-32 inset-shadow-accent  border-r-2 border-r-black ${tab===val.id ? "border-t-[#13a7ec] border-t-2  bg-[#eaeaea] ": " bg-[#bfbfbf] "}`}>
                        <button className='flex items-center pr-5 pl-2   py-1' onClick={()=>tabFunc(val.id)}>
                            <p className='text-black'><HomeIcon props={val.icon}/></p>
                            <p className='text-black ml-5 font-bold text-sm' >{val.title}</p>
                        </button>
                        {ind !== 0 && <div onClick={()=>closeFunc(val.id)} className={`cursor-pointer pr-2`}><span><IoMdClose/></span></div>}
                    </div>
            })}
            
        </div>
        <div className='bg-[#eaeaea] '>
            {content?.map((val:any, ind:number)=>{
                return <div key={ind} className=''>
                    {tab===val.id && <HomeComponent props={val} setTab={setTab} tab={tab}/>}
                </div>
            })}
        </div>
    </div>
  )
}

export default TabWrapper