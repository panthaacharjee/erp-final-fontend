"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import { useForm, SubmitHandler } from "react-hook-form"

/* ============ Components ================ */


/* ============ IMAGES ================ */
import BandLogo from "@/images/bandlogo.svg"

/* ======== React Icns =========== */
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import { AiFillGithub } from "react-icons/ai";

import { signIn } from "next-auth/react";
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'


const Login = () => {
    const {loading} = useSelector((state:RootState)=>state.user)
    type Inputs = {
        userInput: string
        pass: string
    }
    const {
    register,
    handleSubmit,
  } = useForm<Inputs>()


  const onSubmit: SubmitHandler<Inputs> = async(data) => {
     signIn("credentials", {
          userName: data.userInput,
          password : data.pass,
        });
    
        localStorage.removeItem("tabData")
  }


  return (
    <div>
        <div className='bg-image flex justify-center items-center'>
            <div className='container mx-auto w-[60%] lg:w-[60%] 2xl-[50%]  bg-[#1b1c20] rounded-md px-8 py-4'>
                <div className=' w-full flex justify-center '>
                    <Image src={BandLogo} alt='Logo' height={50} width={120}/>
                </div>
                <div>
                    <p className='text-center text-sm mt-3'>Login with one of the following accounts</p>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='bg-[#3c455c] w-fit cursor-not-allowed flex  items-center pr-4 mt-5'>
                        <span className='flex items-center bg-[#f8f8ff] p-2 text-2xl text-black'><FaFacebookF/></span>
                        <p className='ml-5 font-bold text-sm'>Facebook</p>
                    </div>
                    <div className='bg-[#3c455c] w-fit cursor-cell flex  items-center pr-4 mt-5' onClick={()=>signIn('google')}>
                        <span className='flex items-center bg-[#f8f8ff] p-2 text-2xl '><FcGoogle/></span>
                        <p className='ml-5 font-bold text-sm'>Google</p>
                    </div>
                    <div className='bg-[#3c455c] w-fit cursor-not-allowed flex  items-center pr-4 mt-5'>
                        <span className='flex items-center bg-[#f8f8ff] p-2 text-2xl text-black'><FaApple/></span>
                        <p className='ml-5 font-bold text-sm'>Sign in with Apple</p>
                    </div>
                    <div className='bg-[#3c455c] w-fit cursor-cell flex  items-center pr-4 mt-5' onClick={()=>signIn('github')}>
                        <span className='flex items-center bg-[#f8f8ff] p-2 text-2xl text-black'><AiFillGithub/></span>
                        <p className='ml-5 font-bold text-sm'>Sign in with GitHub</p>
                    </div>
                </div>
                <div className='mt-8'>
                    <p className='text-center text-sm'>or login with ERPAC account</p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>email or username</label>
                            <input 
                                type='text' 
                                placeholder='Enter your email or username' 
                                className='w-full bg-[#fff] py-2 px-3 text-black mt-3'
                                {...register("userInput", { required: true })}
                            />
                        </div>
                        <div className='mt-6'>
                            <label>password</label>
                            <input 
                                type='password' 
                                placeholder='Enter your password' 
                                className='w-full bg-[#fff] py-2 px-3 text-black mt-3'
                                {...register("pass", { required: true })}
                            />
                        </div>
                        <div className='flex items-center'>
                            <input type="checkbox" className="checkbox che checkbox-sm mt-6 w-5 h-5 bg-white" />
                            <p className='mt-6 ml-3'>Remember me</p>
                        </div>
                        <button className='bg-[#3c455c] w-full rounded-sm py-2 mt-3 cursor-pointer'>{loading ? "Loading....":"Login"}</button>
                    </form>
                    <div>
                         <p className='text-center mt-3 text-sm'>Don't have an account? <span className='cursor-cell'>Create guest account</span></p>
                         <a className='text-center text-sm block underline mt-4'>© ERPAC - CLOUD ERP BUSINESS SOLUTION</a>
                         <p className='text-center text-sm'>All rights reserved 2025</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login