"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import OrganizationMenu from "../SideMenu/OrganizationMenu";
import { useForm } from "react-hook-form";
import {
  category as Category,
  line as Line,
  program as Program,
} from "../../formInterface/bussinessform";
import {
  buyer as Buyer,
  vendor as Vendor,
} from "@/app/redux/interfaces/businessInterface";

import {
  ClearCreateProductCategoryError,
  ClearCreateProductCategorySuccess,
  ClearCreateProductLineError,
  ClearCreateProductLineSuccess,
  ClearCreateProgramFail,
  ClearCreateProgramSuccess,
  CreateProductCategoryFail,
  CreateProductCategoryRequest,
  CreateProductCategorySuccess,
  CreateProductLineFail,
  CreateProductLineRequest,
  CreateProductLineSuccess,
  CreateProgramFail,
  CreateProgramRequest,
  CreateProgramSuccess,
  GetOrganizationError,
  GetOrganizationRequest,
  GetOrganizationSuccess,
  GetProductLineFail,
  GetProductLineRequest,
  GetProductLineSuccess,
} from "@/app/redux/reducers/businessReducer";
import Axios from "../../Axios";
import { RootState } from "@/app/redux/rootReducer";
import { toast } from "react-toastify";

const ProductDetails = ({ props, setTab, tab }: any) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const {
    lineLoading,
    lineSuccess,
    lineError,
    categoryLoading,
    categorySuccess,
    categoryError,
    programLoading,
    programSuccess,
    programError,
    getLine,
  } = useSelector((state: RootState) => state.product_details);
  const { organization } = useSelector(
    (state: RootState) => state.organization
  );

  const { register: lregister, handleSubmit: lhandleSubmit } = useForm<Line>();

  const { register: cregister, handleSubmit: chandleSubmit } =
    useForm<Category>();

  const { register: pregister, handleSubmit: phandleSubmit } =
    useForm<Program>();

  const handleCreateLine = async (dataInput: any) => {
    try {
      dispatch(CreateProductLineRequest());
      const { data } = await Axios.post("/create/product/line", {
        name: dataInput.name,
        code: dataInput.code,
        others: dataInput.others,
      });
      dispatch(CreateProductLineSuccess(data.message));
    } catch (err: any) {
      dispatch(CreateProductLineFail(err.response.data.message));
    }
  };
  const handleCreateCategory = async (dataInput: any) => {
    try {
      dispatch(CreateProductCategoryRequest());
      const { data } = await Axios.post("/create/product/category", {
        line: dataInput.line,
        category: dataInput.category,
        code: dataInput.code,
      });
      dispatch(CreateProductCategorySuccess(data.message));
    } catch (err: any) {
      dispatch(CreateProductCategoryFail(err.response.data.message));
    }
  };
  const handleCreateProgram = async (dataInput: any) => {
    try {
      dispatch(CreateProgramRequest());
      const { data } = await Axios.post("/create/program", {
        name: dataInput.name,
        buyer: selectedBuyer?.title,
        vendor: selectedVendor?.title,
      });
      dispatch(CreateProgramSuccess(data.message));
    } catch (err: any) {
      dispatch(CreateProgramFail(err.response.data.message));
    }
  };

  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | undefined>(
    undefined
  );
  const handleBuyerChange = (e: any) => {
    const buyerTitle = e.target.value;
    const buyer = organization.find((b) => b.title === buyerTitle);
    if (buyer) {
      setSelectedBuyer(buyer);
      setSelectedVendor(undefined);
    }
  };

  const [selectedVendor, setSelectedVendor] = useState<Vendor | undefined>(
    undefined
  );
  const handleVendorChange = (e: any) => {
    const vendorTitle = e.target.value;
    if (!vendorTitle) {
      setSelectedVendor(undefined);
      return;
    }
    const vendor = selectedBuyer?.vendor?.find((b) => b.title === vendorTitle);
    if (vendor) {
      setSelectedVendor(vendor);
    }
  };

  const [showSelectedBuyer, setShowSelectedBuyer] = useState<Buyer | undefined>(
    undefined
  );
  const handleShowBuyerChange = (e: any) => {
    const buyerTitle = e.target.value;
    const buyer = organization.find((b) => b.title === buyerTitle);
    if (buyer) {
      setShowSelectedBuyer(buyer);
      setShowSelectedVendor(undefined);
    }
  };

  const [selectedLine, setSelectedLine] = useState<Line | undefined>(undefined);
  const handleLineChange = (e: any) => {
    const lineName = e.target.value;
    const line = getLine.find((b) => b.name === lineName);
    if (line) {
      setSelectedLine(line);
    }
  };

  const [showSelectedVendor, setShowSelectedVendor] = useState<
    Vendor | undefined
  >(undefined);
  const handleShowVendorChange = (e: any) => {
    const vendorTitle = e.target.value;

    const vendor = showSelectedBuyer?.vendor?.find(
      (b) => b.title === vendorTitle
    );
    if (vendor) {
      setShowSelectedVendor(vendor);
    }
  };

  const [firstCheck, setFirstCheck] = useState(true);
  const [secondCheck, setSecondCheck] = useState(true);

  const getProductLine = async () => {
    try {
      dispatch(GetProductLineRequest());
      const { data } = await Axios.get("/get/product/line");
      dispatch(GetProductLineSuccess(data.line));
    } catch (err: any) {
      dispatch(GetProductLineFail(err.response.data.message));
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
    if (lineSuccess) {
      toast.success(lineSuccess);
    }
    if (lineError) {
      toast.error(lineError);
    }

    if (categorySuccess) {
      toast.success(categorySuccess);
    }
    if (categoryError) {
      toast.error(categoryError);
    }

    if (programSuccess) {
      toast.success(programSuccess);
    }
    if (programError) {
      toast.error(programError);
    }

    dispatch(ClearCreateProductLineSuccess());
    dispatch(ClearCreateProductLineError());
    dispatch(ClearCreateProductCategorySuccess());
    dispatch(ClearCreateProductCategoryError());
    dispatch(ClearCreateProgramSuccess());
    dispatch(ClearCreateProgramFail());

    getProductLine();
    getOrganization();
  }, [
    lineSuccess,
    lineError,
    categorySuccess,
    categoryError,
    programSuccess,
    programError,
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
                Product Department Create
              </div>
              <div className="collapse-content text-sm flex justify-between">
                <form
                  onSubmit={lhandleSubmit(handleCreateLine)}
                  className="w-3/12 "
                >
                  <p className="text-sm font-bold text-black text-left">
                    PRODUCT LINE
                  </p>
                  <div className="flex-col flex items-center">
                    <div className="fieldset w-11/12">
                      <legend className="fieldset-legend">Line Code </legend>
                      <input
                        type="text"
                        className="input w-full"
                        {...lregister("code", { required: true })}
                      />
                    </div>
                    <div className="fieldset w-11/12">
                      <legend className="fieldset-legend">Line Name </legend>
                      <input
                        type="text"
                        className="input w-full"
                        {...lregister("name", { required: true })}
                      />
                    </div>
                    <div className="fieldset w-11/12">
                      <legend className="fieldset-legend">Others</legend>
                      <input
                        type="text"
                        className="input w-full"
                        {...lregister("others")}
                      />
                    </div>
                    <div className="fieldset w-11/12 mt-4">
                      <button className="button w-full py-3 cursor-pointer bg-amber-100 text-black text-xs rounded-sm font-bold">
                        {lineLoading ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "SUBMIT"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
                <form
                  onSubmit={chandleSubmit(handleCreateCategory)}
                  className="w-3/12 "
                >
                  <p className="text-sm font-bold text-black ">
                    PRODUCT CATEGORY
                  </p>
                  <div className="flex-col flex items-center">
                    <div className="fieldset w-11/12">
                      <legend className="fieldset-legend">Product Line </legend>
                      <select
                        {...cregister("line")}
                        className="focus:outline-none focus:ring-0  select"
                      >
                        <option value="" className="hidden"></option>
                        {getLine?.map((val, ind) => {
                          return (
                            <option key={ind} value={val.name}>
                              {val.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="fieldset w-11/12">
                      <legend className="fieldset-legend">Category </legend>
                      <input
                        type="text"
                        className="input w-full"
                        {...cregister("category", { required: true })}
                      />
                    </div>
                    <div className="fieldset w-11/12">
                      <legend className="fieldset-legend">Code </legend>
                      <input
                        type="text"
                        className="input w-full"
                        {...cregister("code")}
                      />
                    </div>
                    <div className="fieldset w-11/12 mt-4">
                      <button className="button w-full py-3 cursor-pointer bg-amber-100 text-black text-xs rounded-sm font-bold">
                        {categoryLoading ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "SUBMIT"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
                <form
                  onSubmit={phandleSubmit(handleCreateProgram)}
                  className="w-3/12 "
                >
                  <p className="text-sm font-bold text-black ">
                    PROGRAM/SEASON CREATE
                  </p>
                  <div className="flex-col flex items-center">
                    <div className="fieldset w-11/12">
                      <legend className="fieldset-legend">
                        Link With Buyer
                      </legend>
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
                      <legend className="fieldset-legend">Vendor</legend>
                      <select
                        value={selectedVendor?.title || ""}
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
                      <legend className="fieldset-legend">
                        Program/Season
                      </legend>
                      <input
                        type="text"
                        className="input w-full"
                        {...pregister("name", { required: true })}
                      />
                    </div>

                    <div className="fieldset w-11/12 mt-4">
                      <button className="button w-full py-3 cursor-pointer bg-amber-100 text-black text-xs rounded-sm font-bold">
                        {programLoading ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "SUBMIT"
                        )}
                      </button>
                    </div>
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
              <div className="collapse-title font-semibold">
                Product Department
              </div>
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
                    <legend className="fieldset-legend">Vendor</legend>
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
                    <legend className="fieldset-legend">Program/Season</legend>
                    <select className="w-11/12 focus:outline-none focus:ring-0  select">
                      <option value="" className="hidden"></option>
                      {showSelectedVendor?.program?.map((val, ind) => {
                        return (
                          <option key={ind} value={val.name}>
                            {val.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Product Line</legend>
                    <select
                      value={selectedLine?.name || ""}
                      onChange={handleLineChange}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      <option value="" className="hidden"></option>
                      {getLine?.map((val, ind) => {
                        return (
                          <option key={ind} value={val.name}>
                            {val.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">
                      Product Category
                    </legend>
                    <select className="w-11/12 focus:outline-none focus:ring-0  select">
                      <option value="" className="hidden"></option>
                      {selectedLine?.category?.map((val, ind) => {
                        return (
                          <option key={ind} value={val.category}>
                            {val.category}
                          </option>
                        );
                      })}
                    </select>
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

export default ProductDetails;
