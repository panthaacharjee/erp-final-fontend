import { RootState } from '@/app/redux/rootReducer'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image';




import ProfileBg from "@/images/profile-bg.jpg"
import AvatarSvg from "@/images/avatar-svg.jpg"
import HomeMenu from '../SideMenu/HomeMenu';
import DateFormator from '../../utils/DateFormator';

const HomeContent = () => {
  const {user, loading} = useSelector((state:RootState)=>state.user)

  
  return (
    <div className='flex  relative'>
        <div className='w-[93%]'>
          <div className=' h-72 overflow-hidden  w-full z-[-50px]'>
            <Image src={ProfileBg} alt='Profile Background'/>
          </div>
         <div  className='block mx-auto mt-[-90px] w-fit'>
            <div className='w-40 h-40 rounded-full overflow-hidden '>
              
              {loading ? <Image src={AvatarSvg} alt='Avatar'/>: <Image src={AvatarSvg} alt='Avatar'/>}
            </div>
            <div className='mt-4 text-center'>
              <p className='text-sm font-bold'>{user?.name}</p>
            </div>
            <div className='mt-1 text-center'>
              <p className='text-sm font-bold'>{user?.designation}</p>
            </div>
         </div>
         <div className='w-6/12 mt-8 px-3'>
            <p className='text-xl font-bold mb-4'>Last Login</p>
            <div className='flex items-center justify-between my-2'>
                <p>Login Time</p>
                <p>{DateFormator(new Date(user?.loginHistory.length ? user?.loginHistory[user?.loginHistory.length-1].timestamp : Date.now()), 'half')}</p>
            </div>
            <div className='flex items-center justify-between my-2'>
              <p>IP Address</p>
              <p>{user?.loginHistory[user?.loginHistory?.length-1].ipAddress}</p>
            </div>
         </div>
         <div className='px-3 mt-10 w-6/12'>
            <p className='text-xl font-bold mb-4'>Personal Information</p>
            <div className='flex items-center justify-between my-2'>
              <p>Father Name :</p>
              <p>{user?.personalInformation?.father ? user.personalInformation.father : "Not Found"}</p>
            </div>
            <div className='flex items-center justify-between my-2'>
              <p>Mother Name : </p>
              <p>{user?.personalInformation?.mother ? user.personalInformation.mother : "Not Found"}</p>
            </div>
           <div className='flex items-center justify-between my-2'>
             <p>Date of Birth : </p>
             <p>{user?.personalInformation?.dob ? DateFormator(user?.personalInformation?.dob as Date, 'none'): DateFormator(new Date(Date.now()), 'half')}</p>
           </div>
            <div className='flex items-center justify-between my-2'>
              <p>Blood Group : </p>
              <p>{user?.personalInformation?.blood ? user.personalInformation.blood : "Not Found"}</p>
            </div>
         </div>
         <div className='px-3 mt-10 w-6/12'>
            <p className='text-xl font-bold mb-4'>Proffessional Information</p>
            <div className='flex items-center justify-between my-2'>
              <p>Account Type :</p>
              <p>{user?.account ? user?.account : "Not Found"}</p>
            </div>
            <div className='flex items-center justify-between my-2'>
              <p>Join Date : </p>
              <p>{user?.joinDate ? DateFormator(new Date(user.joinDate), 'none') : "Not Found"}</p>
            </div>
           <div className='flex items-center justify-between my-2'>
             <p>Section : </p>
             <p>{user?.section ? user.section : "Not Found"}</p>
           </div>
            <div className='flex items-center justify-between my-2'>
              <p>Department : </p>
              <p>{user?.department ? user.department : "Not Found"}</p>
            </div>
            <div className='flex items-center justify-between my-2'>
              <p>Category : </p>
              <p>{user?.category ? user.category : "Not Found"}</p>
            </div>
         </div>
          <div className='px-3 mt-10 w-6/12'>
            <p className='text-xl font-bold mb-4'>Address</p>
            <div className='flex items-center justify-between my-2'>
              <p>Village :</p>
              <p>{user?.address?.vill ? user?.address.vill : "Not Found"}</p>
            </div>
            <div className='flex items-center justify-between my-2'>
              <p>Thana :</p>
              <p>{user?.address?.thana ? user?.address.thana : "Not Found"}</p>
            </div>
            <div className='flex items-center justify-between my-2'>
              <p>Post Office :</p>
              <p>{user?.address?.post ? user?.address.post : "Not Found"}</p>
            </div>
            <div className='flex items-center justify-between my-2'>
              <p>Post Code :</p>
              <p>{user?.address?.postCode ? user?.address.postCode : "Not Found"}</p>
            </div>
            <div className='flex items-center justify-between my-2'>
              <p>District : </p>
              <p>{user?.address?.district ? user.address.district : "Not Found"}</p>
            </div>
         </div>

        </div>
        <div className='w-[7%] bg-[#d3e6ec]  min-h-screen pt-14 px-2'>
            <HomeMenu/>
        </div>
    </div>
  )
}

export default HomeContent