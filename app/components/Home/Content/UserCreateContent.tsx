import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

import UserCreateMenu from '../SideMenu/UserCreateMenu'



const UserCreateContent = () => {
  const [tabDisable, setTabDisable] = useState(false)
  const [checked, setChecked] = useState(false)

  type Inputs = {
      userInput: string
      pass: string
  }
  const {
      register,
      handleSubmit,
  } = useForm<Inputs>()

  // const onSubmit: SubmitHandler<Inputs> = async(data) => {
      
  //   }
  const handleSave:SubmitHandler<Inputs> = async(data:any) => {
    // Your save logic here
    console.log('Document saved!');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+S (Windows/Linux) or Cmd+S (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault(); // Prevent the browser's default save dialog
        handleSave({
          userInput:"",
          pass:"",
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
      <div className='flex  relative'>
            <form className='w-[93%] px-3 py-12'>
                <div className="collapse collapse-plus bg-base-100 border border-base-300">
                  <input type="checkbox" name="my-accordion-3" defaultChecked/>
                  <div className="collapse-title font-semibold">User Information</div>
                  <div className="collapse-content text-sm">
                      <div className='flex items-center flex-wrap'>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Employee ID</legend>
                          <input type="text" className="input w-11/12"  placeholder="Employee ID" />
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Employee Name</legend>
                          <input type="text" className="input w-11/12" placeholder="Employee Name" />
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Username</legend>
                          <input type="text" className="input w-11/12" placeholder="Employee Username" disabled/>
                        </div>
                         <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Password</legend>
                          <input type="text" className="input w-11/12" placeholder="Employee Password" disabled/>
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Salary</legend>
                          <input type="text" className="input w-11/12" placeholder="Employee Salary"/>
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Section</legend>
                          <input type="text" className="input w-11/12" placeholder="Employee Section" />
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Category</legend>
                          <select defaultValue="Pick a category" className="select w-11/12">
                            <option disabled={true}>Pick a category</option>
                            <option>Staff</option>
                            <option>Delivary Man</option>
                            <option>Operator</option>
                            <option>Security</option>
                          </select>
                        </div>
                        <div className="fieldset w-3/12  ">
                          <legend className="fieldset-legend">Department</legend>
                          <input type="text" className="input w-11/12" placeholder="Employee Department" />
                        </div>
                         <div className="fieldset w-3/12 ">
                          <legend className="fieldset-legend">Designation</legend>
                          <input type="text" className="input w-11/12" placeholder="Employee Designation"/>
                        </div>
                        <div className="fieldset w-3/12 ">
                          <legend className="fieldset-legend">Join Date</legend>
                          <input type="date" className="input w-11/12" />
                        </div>
                      </div>
                  </div>
                </div>
                <div className="collapse collapse-plus bg-base-100 border border-base-300">
                  <input type="checkbox" name="my-accordion-3" defaultChecked/>
                  <div className="collapse-title font-semibold">Personal Information</div>
                  <div className="collapse-content text-sm">
                      <div className='flex items-center flex-wrap'>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Father Name</legend>
                          <input type="text" className="input w-11/12" placeholder="Father Name" />
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Mother Name</legend>
                          <input type="text" className="input w-11/12" placeholder="Mother Name" />
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Date of Birth</legend>
                          <input type="date" className="input w-11/12" />
                        </div>
                         <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Blood Group</legend>
                          <select defaultValue="Pick a group" className="select w-11/12">
                            <option disabled={true}>Pick a group</option>
                            <option>A+</option>
                            <option>O+</option>
                            <option>B+</option>
                            <option>AB+</option>
                             <option>A-</option>
                            <option>O-</option>
                            <option>B-</option>
                            <option>AB-</option>
                          </select>
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Phone</legend>
                          <label className="input  w-11/12">
                              <p>+880</p>
                              <input
                                type="text"
                                placeholder="10 digit phone number"
                              />
                            </label>
                        </div>
                      </div>
                  </div>
                </div>
                <div className="collapse collapse-plus bg-base-100 border border-base-300">
                  <input type="checkbox" name="my-accordion-3" disabled={tabDisable} />
                  <div className="collapse-title font-semibold">Address</div>
                  <div className="collapse-content text-sm">
                      <div className='flex items-center flex-wrap'>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Village</legend>
                          <input type="text" className="input w-11/12" placeholder="Enter Village" />
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Thana</legend>
                          <input type="text" className="input w-11/12" placeholder="Enter Police Station" />
                        </div>
                         <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Post Office</legend>
                          <input type="text" className="input w-11/12" placeholder="Enter Post Office" />
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Post Code</legend>
                          <input type="text" className="input w-11/12" placeholder="Enter Post Code" />
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">District</legend>
                          <input type="text" className="input w-11/12" placeholder="Enter District" />
                        </div>
                      </div>
                  </div>
                </div>
                 <div className="collapse collapse-plus bg-base-100 border border-base-300">
                  <input type="checkbox" name="my-accordion-3" disabled={tabDisable}/>
                  <div className="collapse-title font-semibold">Bank Information</div>
                  <div className="collapse-content text-sm">
                      <div className='flex items-center flex-wrap'>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Bank Name</legend>
                          <input type="text" className="input w-11/12" placeholder="Enter Bank Name" />
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Account Number</legend>
                          <input type="text" className="input w-11/12" placeholder="Enter Account Number" />
                        </div>
                         <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Routing Number</legend>
                          <input type="text" className="input w-11/12" placeholder="Enter Routing Number" />
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Nominee Name</legend>
                          <input type="text" className="input w-11/12" placeholder="Enter Nominee name" />
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Nominee Relation</legend>
                          <select defaultValue="Pick a group" className="select w-11/12">
                            <option disabled={true}>Pick a relation</option>
                            <option>Father</option>
                            <option>Mother</option>
                            <option>Sibling</option>
                            <option>Others</option>
                          </select>
                        </div>
                      </div>
                  </div>
                </div>
                 <div className="collapse collapse-plus bg-base-100 border border-base-300">
                  <input type="checkbox" name="my-accordion-3" disabled={tabDisable}/>
                  <div className="collapse-title font-semibold">Educational Information</div>
                  <div className="collapse-content text-sm">
                    <div className='flex items-center flex-wrap'>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Qualification</legend>
                          <input type="text" className="input w-11/12" placeholder="Enter Qualification" />
                        </div>
                        <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Certificate</legend>
                          <input type="file" className="file-input w-11/12" />
                        </div>
                      </div>
                  </div>
                </div>
             </form>
            <div className='w-[7%] bg-[#d3e6ec]  min-h-screen pt-14 px-2'>
                <UserCreateMenu/>
            </div>
        </div>
  )
}

export default UserCreateContent