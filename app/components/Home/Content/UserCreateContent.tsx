"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import UserCreateMenu from "../SideMenu/UserCreateMenu";
import { User } from "@/app/redux/interfaces/userInterface";
import { Usercreateform } from "../../formInterface/hrinformation";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import Axios from "../../Axios";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearSuccess,
  ClearUserError,
  ClearUserSuccess,
  UserCreateAndUpdateFail,
  UserCreateAndUpdateRequest,
  UserCreateAndUpdateSuccess,
} from "@/app/redux/reducers/HrReducer";
import { RootState } from "@/app/redux/rootReducer";
import Processing from "../../Processing";

const UserCreateContent = ({ props, setTab, tab }: any) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { user, success, error, message, loading } = useSelector(
    (state: RootState) => state.hr
  );
  console.log(user?.joinDate, typeof user?.joinDate);
  const [tabDisable, setTabDisable] = useState(true);
  const [checked, setChecked] = useState(false);
  const [idDisable, setIdDisable] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    setFocus,
    getValues,
    formState: { errors },
  } = useForm<Usercreateform>({
    defaultValues: {
      employeeId: "new",
      category: "Pick a Category",
      medical: 750,
      conveyance: 450,
      food: 1250,
    },
  });

  const handleSave: SubmitHandler<Usercreateform> = async (dataInput) => {
    try {
      dispatch(ClearUserSuccess());
      dispatch(UserCreateAndUpdateRequest());

      const config = { headers: { "Content-Type": "application/json" } };
      const salary = dataInput.salary;
      const salaryBasic =
        (salary - dataInput.medical - dataInput.conveyance - dataInput.food) /
        1.5;
      const salaryHome = salaryBasic / 2;
      const basic = Math.ceil(salaryBasic);
      const home = Math.ceil(salaryHome);

      const { data } = await Axios.post(
        `/register/user`,
        {
          id: dataInput.employeeId,
          name: dataInput.name,
          mainSalary: dataInput.salary,
          joinDate: dataInput.joinDate,
          grade: dataInput.grade,
          section: dataInput.section,
          category: dataInput.category,
          designation: dataInput.designation,
          department: dataInput.department,
          basic: basic,
          home: home,
          medical: dataInput.medical,
          conveyance: dataInput.conveyance,
          food: dataInput.food,
          special: dataInput.special,
          vill: dataInput.vill,
          thana: dataInput.thana,
          post: dataInput.post,
          postCode: dataInput.postCode,
          district: dataInput.district,
          father: dataInput.father,
          mother: dataInput.mother,
          blood: dataInput.blood,
          nid: dataInput.nid,
          dob: dataInput.dob,
          phone: dataInput.phone,
          qualification: dataInput.qualification,
          nomineeName: dataInput.nomineeName,
          relation: dataInput.relation,
          account: dataInput.account,
          bankName: dataInput.bankName,
          route: dataInput.route,
        },
        config
      );
      dispatch(UserCreateAndUpdateSuccess(data));
    } catch (err: any) {
      dispatch(UserCreateAndUpdateFail(err.response.data.message));
    }
  };

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      // Check for Ctrl+S (Windows/Linux) or Cmd+S (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault(); // Prevent the browser's default save dialog

        const isValid = await trigger();
        if (!isValid) {
          // Focus the first error field
          if (errors.employeeId) {
            setFocus("employeeId");
          } else if (errors.name) {
            setFocus("name");
          }
        } else {
          handleSubmit(handleSave)();
        }
      }
    };
    if (success) {
      setIdDisable(true);
      setValue("employeeId", user?.employeeId ? user.employeeId : "new");
      setValue("name", user?.name ? user.name : "");
      setValue("salary", user?.mainSalary ? user?.mainSalary : 0);
      setValue("grade", user?.grade ? user.grade : "");
      setValue("userName", user?.userName ? user.userName : "");
      setValue(
        "joinDate",
        user?.joinDate
          ? new Date(user.joinDate).toISOString().split("T")[0]
          : (new Date().toISOString().split("T")[0] as any)
      );
      setValue("category", user?.category ? user.category : "Pick a Category");
      setValue("section", user?.section ? user.section : "");
      setValue("designation", user?.designation ? user.designation : "");
      setValue("department", user?.department ? user.department : "");
      setValue("vill", user?.address?.vill ? user.address.vill : "");
      setValue("thana", user?.address?.thana ? user.address.thana : "");
      setValue("post", user?.address?.post ? user.address.vill : "");
      setValue("postCode", user?.address?.postCode ? user.address.postCode : 0);
      setValue(
        "district",
        user?.address?.district ? user.address.district : ""
      );
      setValue(
        "father",
        user?.personalInformation?.father ? user.personalInformation.father : ""
      );
      setValue(
        "mother",
        user?.personalInformation?.mother ? user.personalInformation.mother : ""
      );
      setValue(
        "blood",
        user?.personalInformation?.blood
          ? user.personalInformation.blood
          : "Pick a Category"
      );
      setValue(
        "nid",
        user?.personalInformation?.nid ? user.personalInformation.nid : ""
      );
      setValue(
        "dob",
        user?.personalInformation?.dob
          ? new Date(user.personalInformation.dob).toISOString().split("T")[0]
          : (new Date().toISOString().split("T")[0] as any)
      );
      setValue(
        "phone",
        user?.personalInformation?.phone ? user.personalInformation.phone : ""
      );
      setValue(
        "qualification",
        user?.education?.qualification ? user.education.qualification : ""
      );
      setValue("nomineeName", user?.nominee?.name ? user.nominee.name : "");
      setValue(
        "relation",
        user?.nominee?.relation ? user.nominee.relation : ""
      );
      setValue("bankName", user?.bank?.name ? user.bank.name : "");
      setValue("account", user?.bank?.account ? user.bank.account : "");
      setValue("route", user?.bank?.route ? user.bank.route : 0);
      setValue("basic", user?.salary?.basic ? user?.salary.basic : 0);
      setValue("home", user?.salary?.home ? user?.salary.home : 0);
      setValue("special", user?.salary?.special ? user?.salary.special : 0);

      setTabDisable(false);
      setChecked(true);
      toast.success(message);
      dispatch(ClearSuccess());
    }
    if (error) {
      if (
        error ==
        "getaddrinfo ENOTFOUND ac-shhoh7s-shard-00-00.qzk1nes.mongodb.net"
      ) {
        toast("Netowrk Error");
      } else {
        toast.error(error);
      }
      dispatch(ClearUserError());
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit, trigger, errors, error, success, tabDisable]);

  return (
    <div className="flex  relative">
      {loading && <Processing />}
      <form onSubmit={handleSubmit(handleSave)} className="w-[93%] px-3 pt-12">
        <div className="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="checkbox" name="my-accordion-3" defaultChecked />
          <div className="collapse-title font-semibold">
            Employee Information (কর্মচারীর তথ্য জানতে আইডি নাম্বার দিয়ে সার্চ
            দিন) (Example: 2){" "}
          </div>
          <div className="collapse-content text-sm">
            <div className="flex items-center flex-wrap">
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Employee ID (কর্মচারীর আইডি)
                </legend>
                <input
                  type="text"
                  className={`${
                    errors.employeeId
                      ? "input w-11/12 border-red-400"
                      : "input w-11/12"
                  }`}
                  placeholder="Employee ID"
                  {...register("employeeId")}
                  disabled={idDisable}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Employee Name (কর্মচারীর নাম)
                </legend>
                <input
                  type="text"
                  placeholder="Employee Name"
                  className={`${
                    errors.name
                      ? "input w-11/12 border-red-400"
                      : "input w-11/12 "
                  }`}
                  {...register("name")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Username (সফটওয়্যার নাম)
                </legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Employee Username"
                  disabled
                  value={user?.userName ? user?.userName : ""}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Password (সফটওয়্যার পাসওয়ার্ড)
                </legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Employee Password"
                  disabled
                />
              </div>
              {/* <div className="fieldset w-3/12">
                          <legend className="fieldset-legend">Salary</legend>
                          <input 
                            type="number" 
                            placeholder="Employee Salary"
                            className={`${errors.salary ? 'input w-11/12 border-red-400':'input w-11/12'}`}  
                            {...register("salary")}
                            onPaste={(e)=>e.preventDefault()}
                            />
                            
                          </div> */}
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Section (সেকশন)</legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Employee Section"
                  {...register("section")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Category (ক্যাটাগরি)
                </legend>
                <select
                  {...register("category")}
                  defaultValue="P"
                  className="select w-11/12"
                >
                  <option disabled={true}>Pick a category</option>
                  <option value={"Staff"}>Staff</option>
                  <option>Delivary Man</option>
                  <option>Operator</option>
                  <option>Security</option>
                </select>
              </div>
              <div className="fieldset w-3/12  ">
                <legend className="fieldset-legend">
                  Department (ডিপার্টমেন্ট)
                </legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Employee Department"
                  {...register("department")}
                />
              </div>
              <div className="fieldset w-3/12 ">
                <legend className="fieldset-legend">Designation (পদবি)</legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Employee Designation"
                  {...register("designation")}
                />
              </div>
              <div className="fieldset w-3/12 ">
                <legend className="fieldset-legend">
                  Join Date (যোগদানের তারিখ)
                </legend>
                <input
                  type="date"
                  className="input w-11/12"
                  {...register("joinDate")}
                />
              </div>
              <div className="fieldset w-3/12 ">
                <legend className="fieldset-legend">Grade (গ্রেড)</legend>
                <input
                  type="text"
                  className="input w-11/12"
                  {...register("grade")}
                  placeholder="Employee Grade"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="collapse  bg-base-100 border border-base-300">
          <input
            type="checkbox"
            name="my-accordion-3"
            disabled={tabDisable}
            checked={checked}
          />
          <div className="collapse-title font-semibold">Salary (বেতন)</div>
          <div className="collapse-content text-sm">
            <div className="flex items-center flex-wrap">
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Salary (বেতন)</legend>
                <input
                  type="number"
                  className="input w-11/12"
                  placeholder="Enter Basic Salary"
                  {...register("salary")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Basic Salary (মূল বেতন)
                </legend>
                <input
                  type="number"
                  className="input w-11/12"
                  placeholder="Enter Basic Salary"
                  {...register("basic")}
                  disabled
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Home Rent (বাড়ি ভাড়া)
                </legend>
                <input
                  type="number"
                  className="input w-11/12"
                  placeholder="Enter Home Rent"
                  {...register("home")}
                  disabled
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Medical Allowence (চিকিৎসা ভাতা)
                </legend>
                <input
                  type="number"
                  className="input w-11/12"
                  placeholder="Enter Medical Allowence"
                  {...register("medical")}
                  disabled
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Conveyance Allowence (যাতায়াত ভাতা)
                </legend>
                <input
                  type="number"
                  className="input w-11/12"
                  placeholder="Enter Conveyance Allowence"
                  {...register("conveyance")}
                  disabled
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Food Allowence (খাদ্য ভাতা)
                </legend>
                <input
                  type="number"
                  className="input w-11/12"
                  placeholder="Enter Food Allowence"
                  {...register("food")}
                  disabled
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Special Allowence (বিশেষ ভাতা)
                </legend>
                <input
                  type="number"
                  className="input w-11/12"
                  placeholder="Enter Special Allowence"
                  {...register("special")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="collapse  bg-base-100 border border-base-300">
          <input
            type="checkbox"
            name="my-accordion-3"
            disabled={tabDisable}
            checked={checked}
          />
          <div className="collapse-title font-semibold">
            Personal Information (ব্যাক্তিগত তথ্য)
          </div>
          <div className="collapse-content text-sm">
            <div className="flex items-center flex-wrap">
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Father Name (বাবার নাম)
                </legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Father Name"
                  {...register("father")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Mother Name (মায়ের নাম)
                </legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Mother Name"
                  {...register("mother")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Date of Birth (জন্ম তারিখ)
                </legend>
                <input
                  type="date"
                  className="input w-11/12"
                  {...register("dob")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Blood Group (রক্তের গ্রুপ)
                </legend>
                <select
                  {...register("blood")}
                  defaultValue={
                    user?.personalInformation?.blood
                      ? user.personalInformation.blood
                      : "Pick a Group"
                  }
                  className="select w-11/12"
                >
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
                <legend className="fieldset-legend">
                  NID (এনআইডি নাম্বার)
                </legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Enter Nid Number"
                  {...register("nid")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Phone (ফোন নাম্বার)</legend>
                <label className="input  w-11/12">
                  <p>+880</p>
                  <input
                    type="text"
                    placeholder="10 digit phone number"
                    {...register("phone")}
                  />
                </label>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Profile (কর্মচারীর ছবি)
                </legend>
                <input type="file" className="file-input w-11/12" />
              </div>
            </div>
          </div>
        </div>
        <div className="collapse  bg-base-100 border border-base-300">
          <input
            type="checkbox"
            name="my-accordion-3"
            disabled={tabDisable}
            checked={checked}
          />
          <div className="collapse-title font-semibold">Address (ঠিকানা)</div>
          <div className="collapse-content text-sm">
            <div className="flex items-center flex-wrap">
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Village (গ্রাম)</legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Enter Village"
                  {...register("vill")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Thana/Upazilla (থানা/উপজিলা)
                </legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Enter Police Station"
                  {...register("thana")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Post Office (পোস্ট অফিস)
                </legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Enter Post Office"
                  {...register("post")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Post Code (পোস্ট কোড)
                </legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Enter Post Code"
                  {...register("postCode")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">District (জিলা)</legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Enter District"
                  {...register("district")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="collapse bg-base-100 border border-base-300">
          <input
            type="checkbox"
            name="my-accordion-3"
            disabled={tabDisable}
            checked={checked}
          />
          <div className="collapse-title font-semibold">
            Bank Information (ব্যাংকের তথ্য)
          </div>
          <div className="collapse-content text-sm">
            <div className="flex items-center flex-wrap">
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Bank Name (ব্যাংকের নাম)
                </legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Enter Bank Name"
                  {...register("bankName")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Account Number (একাউন্ট নাম্বার)
                </legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Enter Account Number"
                  {...register("account")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Routing Number (রাউটিং নাম্বার)
                </legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Enter Routing Number"
                  {...register("route")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Nominee Name (নমিনির নাম)
                </legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Enter Nominee name"
                  {...register("nomineeName")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Nominee Relation (সম্পর্ক)
                </legend>
                <select
                  {...register("relation")}
                  defaultValue="Pick a group"
                  className="select w-11/12"
                >
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
        <div className="collapse bg-base-100 border border-base-300">
          <input
            type="checkbox"
            name="my-accordion-3"
            disabled={tabDisable}
            checked={checked}
          />
          <div className="collapse-title font-semibold">
            Educational Information (শিক্ষাগত তথ্য)
          </div>
          <div className="collapse-content text-sm">
            <div className="flex items-center flex-wrap">
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Qualification (যোগ্যতা)
                </legend>
                <input
                  type="text"
                  className="input w-11/12"
                  placeholder="Enter Qualification"
                  {...register("qualification")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Certificate (সার্টিফিকেট)
                </legend>
                <input type="file" className="file-input w-11/12" />
              </div>
            </div>
          </div>
        </div>
        <button className="hidden">Hidden Button</button>
      </form>
      <div className="w-[7%] bg-[#d3e6ec]  min-h-screen pt-14 px-2">
        <UserCreateMenu
          getValues={getValues}
          setValue={setValue}
          setIdDisable={setIdDisable}
          setTabDisable={setTabDisable}
          setChecked={setChecked}
          tab={tab}
          setTab={setTab}
          props={props}
          id={user?._id}
          user={user}
        />
      </div>
    </div>
  );
};

export default UserCreateContent;
