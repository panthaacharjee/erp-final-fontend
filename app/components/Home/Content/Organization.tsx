"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/rootReducer";
import OrganizationMenu from "../SideMenu/OrganizationMenu";
import { useForm } from "react-hook-form";
import {
  ClearCreateBuyerError,
  ClearCreateBuyerSuccess,
  ClearCreateContactError,
  ClearCreateContactSuccess,
  ClearCreateVendorError,
  ClearCreateVendorSuccess,
  CreateBuyerFail,
  CreateBuyerRequest,
  CreateBuyerSuccess,
  CreateContactFail,
  CreateContactRequest,
  CreateContactSuccess,
  CreateVendorFail,
  CreateVendorRequest,
  CreateVendorSuccess,
  GetOrganizationError,
  GetOrganizationRequest,
  GetOrganizationSuccess,
} from "@/app/redux/reducers/businessReducer";
import Axios from "../../Axios";
import { buyer, contact, venodor } from "../../formInterface/bussinessform";
import {
  buyer as Buyer,
  vendor as Vendor,
  contact as Contact,
} from "@/app/redux/interfaces/businessInterface";
import { toast } from "react-toastify";

const Organization = ({ props, setTab, tab }: any) => {
  const dispatch = useDispatch();
  const {
    buyerLoading,
    buyerError,
    buyerSuccess,
    vendorLoading,
    vendorSuccess,
    vendorError,
    contactLoading,
    contactSuccess,
    contactError,
    organization,
  } = useSelector((state: RootState) => state.organization);

  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | undefined>(
    undefined
  );
  const handleBuyerChange = (e: any) => {
    const buyerTitle = e.target.value;
    const buyer = organization.find((b) => b.title === buyerTitle);
    setSelectedBuyer(buyer);
  };

  const [selectedVenor, setSelectedVendor] = useState<Vendor | undefined>(
    undefined
  );
  const handleVendorChange = (e: any) => {
    const vendorTitle = e.target.value;
    const vendor = selectedBuyer?.vendor?.find((b) => b.title === vendorTitle);
    setSelectedVendor(vendor);
  };

  const [showSelectedBuyer, setShowSelectedBuyer] = useState<Buyer | undefined>(
    undefined
  );
  const handleShowBuyerChange = (e: any) => {
    const buyerTitle = e.target.value;
    if (!buyerTitle) {
      setShowSelectedBuyer(undefined);
      setShowSelectedVendor(undefined);
      setShowSelectedContact(undefined);
      return;
    }
    const buyer = organization.find((b) => b.title === buyerTitle);
    setShowSelectedBuyer(buyer);
    setShowSelectedVendor(undefined);
    setShowSelectedContact(undefined);
  };

  const [showSelectedVendor, setShowSelectedVendor] = useState<
    Vendor | undefined
  >(undefined);
  const handleShowVendorChange = (e: any) => {
    const vendorTitle = e.target.value;
    if (!vendorTitle) {
      setShowSelectedVendor(undefined);
      setShowSelectedContact(undefined);
      return;
    }
    const vendor = showSelectedBuyer?.vendor?.find(
      (b) => b.title === vendorTitle
    );
    setShowSelectedVendor(vendor);
    setShowSelectedContact(undefined);
  };

  const [showSelectedContact, setShowSelectedContact] = useState<
    Contact | undefined
  >(undefined);
  const handleShowContactChange = (e: any) => {
    const contactName = e.target.value;
    if (!contactName) {
      setShowSelectedContact(undefined);
      return;
    }
    const foundContact = showSelectedVendor?.contact?.find(
      (c) => c.name === contactName
    );
    setShowSelectedContact(foundContact);
  };

  const [firstCheck, setFirstCheck] = useState(true);
  const [secondCheck, setSecondCheck] = useState(true);

  const { register: bregister, handleSubmit: bhandleSubmit } = useForm<buyer>();

  const {
    register: vregister,
    handleSubmit: vhandleSubmit,
    getValues,
  } = useForm<venodor>();

  const { register: cregister, handleSubmit: chandleSubmit } =
    useForm<contact>();

  const handleCreateBuyer = async (dataInput: any) => {
    try {
      dispatch(CreateBuyerRequest());
      const { data } = await Axios.post("/create/buyer", {
        name: dataInput.name,
        code: dataInput.code,
        address: dataInput.address,
      });
      dispatch(CreateBuyerSuccess(data.message));
    } catch (err: any) {
      dispatch(CreateBuyerFail(err.response.data.message));
    }
  };

  const handleCreateVenor = async (dataInput: any) => {
    try {
      dispatch(CreateVendorRequest());
      const { data } = await Axios.post("/create/vendor", {
        name: dataInput.name,
        buyer: dataInput.buyer,
        code: dataInput.code,
      });
      dispatch(CreateVendorSuccess(data.message));
    } catch (err: any) {
      dispatch(CreateVendorFail(err.response.data.message));
    }
    // console.log(dataInput)
  };

  const handleCreateContact = async (dataInput: any) => {
    try {
      dispatch(CreateContactRequest());
      const { data } = await Axios.post("/create/contact", {
        vendor: dataInput.vendor,
        name: dataInput.name,
        mail: dataInput.mail,
        phone: dataInput.phone,
      });
      dispatch(CreateContactSuccess(data.message));
    } catch (err: any) {
      dispatch(CreateContactFail(err.response.data.message));
    }
  };

  const getOrganization = async () => {
    try {
      dispatch(GetOrganizationRequest());
      const { data } = await Axios.get("/get/organization");
      dispatch(GetOrganizationSuccess(data.organization));
    } catch (err: any) {
      dispatch(GetOrganizationError(err.response.data.message));
    }
  };

  useEffect(() => {
    if (buyerSuccess) {
      toast(buyerSuccess);
    }
    if (buyerError) {
      toast(buyerError);
    }

    if (vendorSuccess) {
      toast(vendorSuccess);
    }
    if (vendorError) {
      toast(vendorError);
    }

    if (contactSuccess) {
      toast(contactSuccess);
    }
    if (contactError) {
      toast(contactError);
    }

    dispatch(ClearCreateBuyerSuccess());
    dispatch(ClearCreateBuyerError());

    dispatch(ClearCreateVendorSuccess());
    dispatch(ClearCreateVendorError());

    dispatch(ClearCreateContactSuccess());
    dispatch(ClearCreateContactError());

    getOrganization();
  }, [
    buyerSuccess,
    buyerError,
    vendorSuccess,
    vendorError,
    contactSuccess,
    contactError,
    organization,
  ]);

  return (
    <div className="flex  relative">
      <div className="w-[93%]  px-3 pt-12 min-h-dvh">
        <div>
          <div>
            <div className="collapse bg-base-100 border border-base-300">
              <input
                type="checkbox"
                name="my-accordion-3"
                checked={firstCheck}
                onChange={() => setFirstCheck(true)}
              />
              <div className="collapse-title font-semibold">
                Organization Create
              </div>
              <div className="collapse-content text-sm flex justify-between">
                <form
                  onSubmit={bhandleSubmit(handleCreateBuyer)}
                  className="w-3/12 "
                >
                  <p className="text-sm font-bold text-black text-left">
                    BUYER CREATE
                  </p>
                  <div className="flex-col flex items-center">
                    <div className="fieldset w-11/12">
                      <legend className="fieldset-legend">Buyer Code </legend>
                      <input
                        type="text"
                        className="input w-full"
                        {...bregister("code", { required: true })}
                      />
                    </div>
                    <div className="fieldset w-11/12">
                      <legend className="fieldset-legend">Buyer Name </legend>
                      <input
                        type="text"
                        className="input w-full"
                        {...bregister("name", { required: true })}
                      />
                    </div>
                    <div className="fieldset w-11/12">
                      <legend className="fieldset-legend">Buyer Address</legend>
                      <input
                        type="text"
                        className="input w-full"
                        {...bregister("address", { required: true })}
                      />
                    </div>
                    <div className="fieldset w-11/12 mt-4">
                      <button className="button w-full py-3 cursor-pointer bg-amber-100 text-black text-xs rounded-sm font-bold">
                        {buyerLoading ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "SUBMIT"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
                <form
                  onSubmit={vhandleSubmit(handleCreateVenor)}
                  className="w-3/12 "
                >
                  <p className="text-sm font-bold text-black ">VENDOR CREATE</p>
                  <div className="flex-col flex items-center">
                    <div className="fieldset w-11/12">
                      <legend className="fieldset-legend">Buyer Name </legend>
                      <select
                        {...vregister("buyer")}
                        className="focus:outline-none focus:ring-0  select"
                      >
                        <option value="" className="hidden"></option>
                        {organization?.map((val, ind) => {
                          return <option key={ind}>{val.title}</option>;
                        })}
                      </select>
                    </div>
                    <div className="fieldset w-11/12">
                      <legend className="fieldset-legend">Venodor Name </legend>
                      <input
                        type="text"
                        className="input w-full"
                        {...vregister("name", { required: true })}
                      />
                    </div>
                    <div className="fieldset w-11/12">
                      <legend className="fieldset-legend">Venodor Code </legend>
                      <input
                        type="text"
                        className="input w-full"
                        {...vregister("code", { required: true })}
                      />
                    </div>
                    <div className="fieldset w-11/12 mt-4">
                      <button className="button w-full py-3 cursor-pointer bg-amber-100 text-black text-xs rounded-sm font-bold">
                        {vendorLoading ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "SUBMIT"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
                <form
                  onSubmit={chandleSubmit(handleCreateContact)}
                  className="w-6/12"
                >
                  <p className="text-sm font-bold text-black ">
                    CONTACT CREATE
                  </p>
                  <div className="flex justify-between">
                    <div className="w-6/12 flex flex-col items-center">
                      <div className="fieldset w-11/12">
                        <legend className="fieldset-legend">Buyer Name </legend>
                        <select
                          onChange={handleBuyerChange}
                          className="focus:outline-none focus:ring-0  select"
                        >
                          <option value="" className="hidden"></option>
                          {organization?.map((val, ind) => {
                            return (
                              <option key={ind} value={val.title}>
                                {val.title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="fieldset w-11/12">
                        <legend className="fieldset-legend">Vendor Name</legend>
                        <select
                          value={selectedVenor?.title || ""}
                          {...cregister("vendor")}
                          onChange={handleVendorChange}
                          className="focus:outline-none focus:ring-0  select"
                        >
                          <option value="" className="hidden"></option>
                          {selectedBuyer?.vendor?.map((val, ind) => {
                            return (
                              <option key={ind} value={val.title}>
                                {val.title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="fieldset w-11/12">
                        <legend className="fieldset-legend">Person Name</legend>
                        <input
                          type="text"
                          className="input w-full"
                          {...cregister("name", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="w-6/12 flex  flex-col items-center">
                      <div className="fieldset w-11/12">
                        <legend className="fieldset-legend">
                          Mail Address
                        </legend>
                        <input
                          type="text"
                          className="input w-full"
                          {...cregister("mail", { required: true })}
                        />
                      </div>
                      <div className="fieldset w-11/12">
                        <legend className="fieldset-legend">
                          Phone Number{" "}
                        </legend>
                        <input
                          type="text"
                          className="input w-full"
                          {...cregister("phone", { required: true })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="fieldset w-full mt-4">
                    <button className="button w-full py-3 cursor-pointer bg-amber-100 text-black text-xs rounded-sm font-bold">
                      {contactLoading ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        "SUBMIT"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="collapse  bg-base-100 border border-base-300">
              <input
                type="checkbox"
                name="my-accordion-3"
                checked={secondCheck}
                onChange={() => setSecondCheck(true)}
              />
              <div className="collapse-title font-semibold">Organization</div>
              <div className="collapse-content text-sm">
                <div className="flex items-center flex-wrap">
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Buyer Name</legend>
                    <select
                      value={showSelectedBuyer?.title || ""}
                      onChange={handleShowBuyerChange}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      <option value="" className="hidden"></option>
                      {organization?.map((val, ind) => {
                        return (
                          <option key={ind} value={val.title}>
                            {val.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Vendor Name</legend>
                    <select
                      value={showSelectedVendor?.title || ""}
                      onChange={handleShowVendorChange}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      <option value="" className="hidden"></option>
                      {showSelectedBuyer?.vendor?.map((val, ind) => {
                        return (
                          <option key={ind} value={val.title}>
                            {val.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Contact Name</legend>
                    <select
                      value={showSelectedContact?.name || ""}
                      onChange={handleShowContactChange}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      <option value="" className="hidden"></option>
                      {showSelectedVendor?.contact?.map((val, ind) => {
                        return (
                          <option key={ind} value={val.name}>
                            {val.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Mail Address</legend>
                    <p className="input w-11/12 bg-[#e2e2e2]">
                      {showSelectedContact?.mail}
                    </p>
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Phone Number</legend>
                    <p className="input w-11/12 bg-[#e2e2e2]">
                      {showSelectedContact?.number}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[7%] bg-[#d3e6ec]  min-h-screen pt-14 px-2">
        <OrganizationMenu tab={tab} setTab={setTab} props={props} />
      </div>
    </div>
  );
};

export default Organization;
