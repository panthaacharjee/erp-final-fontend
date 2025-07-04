import { useSession } from 'next-auth/react';
import React from 'react'
import { useDispatch } from 'react-redux';
import { SubmitHandler } from 'react-hook-form';
import { Usercreateform } from '@/app/components/formInterface/hrinformation';
import { UserCreateAndUpdateFail, UserCreateAndUpdateRequest, UserCreateAndUpdateSuccess } from '@/app/redux/reducers/HrReducer';
import Axios from '@/app/components/Axios';

const UserCreateForm = () => {
    const {data:session} = useSession()
    const dispatch = useDispatch()


    const handleSave:SubmitHandler<Usercreateform> = async(dataInput) => {
        try{
              dispatch(UserCreateAndUpdateRequest())
              console.log(dataInput)
    
              const config={headers:{Authorization:`Bearer ${session?.user.id}`, "Content-Type": "multipart/form-data"}}
              const {data} = await Axios.put(`/register/user`,{
                id: dataInput.employeeId,
                name: dataInput, 
                salary: parseInt(dataInput.salary), 
                joinDate: dataInput.joinDate, 
                section: dataInput.section, 
                category: dataInput.category, 
                designation: dataInput.designation, 
                department:dataInput.department, 
                vill: dataInput.vill, 
                thana: dataInput.thana,
                post:dataInput.post,
                postCode:dataInput.postCode, 
                district:dataInput.district, 
                father:dataInput.father, 
                mother:dataInput.mother,
                blood:dataInput.blood,
                nid:dataInput.nid, 
                dob:dataInput.dob,
                phone:dataInput.phone,
                qualification:dataInput.qualification,
                nomineeName:dataInput.nomineeName, 
                relation: dataInput.relation, 
                account:dataInput.account, 
                bankName:dataInput.bankName, 
                route:dataInput.route
              }, config)
              dispatch(UserCreateAndUpdateSuccess(data))
          }catch(err:any){
            dispatch(UserCreateAndUpdateFail(err.response.data.message))
          }
        
    };
  return (
    <div>UserCreateForm</div>
  )
}

export default UserCreateForm