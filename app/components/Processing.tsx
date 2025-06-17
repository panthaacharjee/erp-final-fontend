"use client"
import React from 'react'

const Processing = () => {
  return (
    <div className='h-screen w-full flex items-center fixed top-0 left-0 z-50 bg-black opacity-45' >
        <div className='bg-white h-2/6 w-full flex items-center px-10 shadow-2xl shadow-black'>
            <span className="loading loading-spinner h-24 w-24 bg-black" ></span>
            <p className='text-black mx-5 text-2xl font-semibold'>Please wait sometimes</p>
            <span className="loading loading-ring loading-xs bg-black"></span>
            <span className="loading loading-ring loading-sm bg-black"></span>
            <span className="loading loading-ring loading-md bg-black"></span>
            <span className="loading loading-ring loading-lg bg-black"></span>
            <span className="loading loading-ring loading-xl bg-black"></span>
        </div>
    </div>
  )
}

export default Processing