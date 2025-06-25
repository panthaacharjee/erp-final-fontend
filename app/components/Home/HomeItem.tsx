import React from 'react'
import HomeContent from './Content/HomeContent'
import { TiHome } from 'react-icons/ti'
import UserCreateContent from './Content/UserCreateContent'
import { FaRegMoneyBillAlt, FaUserCheck, FaUserEdit } from 'react-icons/fa'
import Attendence from './Content/Attendence'
import SalaryCreate from './Content/SalaryCreate'

export const HomeComponent = ({props}:any) => {
    console.log(props)
    switch(props.element){
        case "tab-Home":
            return <HomeContent/>
        case "user_create":
            return <UserCreateContent/>
        case "attendence":
            return <Attendence/>
        case "salary":
            return <SalaryCreate/>
        default:
            return <HomeContent/>
    }
}

export const HomeIcon = ({props}:any) => {

    switch(props.element){
        case "tab-Home":
            return <TiHome/>
         case "user_create":
            return <FaUserEdit/>
        case "attendence":
            return <FaUserCheck/>
        case "salary":
            return <FaRegMoneyBillAlt/>
        default:
            return <TiHome/>
    }
}
