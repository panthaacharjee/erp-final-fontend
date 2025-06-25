import React, { useEffect, useState } from 'react'
import UserCreateMenu from '../SideMenu/UserCreateMenu'

const UserCreateContent = () => {
  const [tabDisable, setTabDisable] = useState(false)
  const [checked, setChecked] = useState(false)

  const handleSave = () => {
    // Your save logic here
    console.log('Document saved!');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+S (Windows/Linux) or Cmd+S (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault(); // Prevent the browser's default save dialog
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
      <div className='flex  relative'>
            <div className='w-[93%] px-3 py-12'>
                <div className="collapse collapse-plus bg-base-100 border border-base-300">
                  <input type="checkbox" name="my-accordion-3" defaultChecked/>
                  <div className="collapse-title font-semibold">User Information</div>
                  <div className="collapse-content text-sm">
                      <div className='flex items-center justify-between'>
                        <fieldset className="fieldset w-2/12">
                          <legend className="fieldset-legend">Employee ID</legend>
                          <input type="text" className="input w-full" placeholder="Employee ID" />
                        </fieldset>
                        <fieldset className="fieldset w-2/12 ml-2">
                          <legend className="fieldset-legend">Employee Name</legend>
                          <input type="text" className="input w-full" placeholder="Employee Name" />
                        </fieldset>
                        <fieldset className="fieldset w-2/12 ml-2">
                          <legend className="fieldset-legend">Username</legend>
                          <input type="text" className="input w-full" placeholder="Employee Username" disabled/>
                        </fieldset>
                         <fieldset className="fieldset w-2/12 ml-2">
                          <legend className="fieldset-legend">Password</legend>
                          <input type="text" className="input w-full" placeholder="Employee Password" disabled/>
                        </fieldset>
                        <fieldset className="fieldset w-2/12 ml-2">
                          <legend className="fieldset-legend">Salary</legend>
                          <input type="text" className="input w-full" placeholder="Employee Salary"/>
                        </fieldset>
                      </div>
                      <div className='flex items-center justify-between'>
                        <fieldset className="fieldset w-2/12">
                          <legend className="fieldset-legend">Section</legend>
                          <input type="text" className="input w-full" placeholder="Employee Section" />
                        </fieldset>
                        <fieldset className="fieldset w-2/12 ml-2">
                          <legend className="fieldset-legend">Category</legend>
                          <select defaultValue="Pick a category" className="select">
                            <option disabled={true}>Pick a category</option>
                            <option>Staff</option>
                            <option>Delivary Man</option>
                            <option>Operator</option>
                            <option>Security</option>
                          </select>
                        </fieldset>
                        <fieldset className="fieldset w-2/12 ml-2">
                          <legend className="fieldset-legend">Department</legend>
                          <input type="text" className="input w-full" placeholder="Employee Department" />
                        </fieldset>
                         <fieldset className="fieldset w-2/12 ml-2">
                          <legend className="fieldset-legend">Designation</legend>
                          <input type="text" className="input w-full" placeholder="Employee Designation"/>
                        </fieldset>
                        <fieldset className="fieldset w-2/12 ml-2">
                          <legend className="fieldset-legend">Join Date</legend>
                          <input type="date" className="input" />
                        </fieldset>
                      </div>
                  </div>
                </div>
                <div className="collapse collapse-plus bg-base-100 border border-base-300">
                  <input type="checkbox" name="my-accordion-3" defaultChecked/>
                  <div className="collapse-title font-semibold">Personal Information</div>
                  <div className="collapse-content text-sm">
                      <div className='flex items-center justify-between'>
                        <fieldset className="fieldset w-2/12">
                          <legend className="fieldset-legend">Father Name</legend>
                          <input type="text" className="input w-full" placeholder="Father Name" />
                        </fieldset>
                        <fieldset className="fieldset w-2/12 ml-2">
                          <legend className="fieldset-legend">Mother Name</legend>
                          <input type="text" className="input w-full" placeholder="Mother Name" />
                        </fieldset>
                        <fieldset className="fieldset w-2/12 ml-2">
                          <legend className="fieldset-legend">Date of Birth</legend>
                          <input type="date" className="input" />
                        </fieldset>
                         <fieldset className="fieldset w-2/12 ml-2">
                          <legend className="fieldset-legend">Blood Group</legend>
                          <select defaultValue="Pick a group" className="select">
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
                        </fieldset>
                        <fieldset className="fieldset w-2/12 ml-2">
                          <legend className="fieldset-legend">Phone</legend>
                          <input type="text" className="input w-full" placeholder="Employee Salary"/>
                        </fieldset>
                      </div>
                  </div>
                </div>
                <div className="collapse collapse-plus bg-base-100 border border-base-300">
                  <input type="checkbox" name="my-accordion-3" disabled={tabDisable} />
                  <div className="collapse-title font-semibold">Address</div>
                  <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                </div>
                 <div className="collapse collapse-plus bg-base-100 border border-base-300">
                  <input type="checkbox" name="my-accordion-3" disabled={tabDisable}/>
                  <div className="collapse-title font-semibold">Bank Information</div>
                  <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                </div>
                 <div className="collapse collapse-plus bg-base-100 border border-base-300">
                  <input type="checkbox" name="my-accordion-3" disabled={tabDisable}/>
                  <div className="collapse-title font-semibold">Educational Information</div>
                  <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                </div>
             </div>
            <div className='w-[7%] bg-[#d3e6ec]  min-h-screen pt-14 px-2'>
                <UserCreateMenu/>
            </div>
        </div>
  )
}

export default UserCreateContent