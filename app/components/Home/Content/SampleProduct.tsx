"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ISampleProduct } from "@/app/redux/interfaces/productInterface";
import { SubmitHandler, useForm } from "react-hook-form";
import Axios from "../../Axios";
import {
  buyer,
  category,
  contact,
  line,
  vendor,
} from "@/app/redux/interfaces/businessInterface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/rootReducer";
import {
  GetOrganizationError,
  GetOrganizationRequest,
  GetOrganizationSuccess,
  GetProductLineFail,
  GetProductLineRequest,
  GetProductLineSuccess,
} from "@/app/redux/reducers/businessReducer";
import { toast } from "react-toastify";
import {
  ClearSampleProductError,
  ClearSampleProductSuccess,
  SampleProductFail,
  SampleProductRequest,
  SampleProductSuccess,
} from "@/app/redux/reducers/productReducer";
import Processing from "../../Processing";
import ProductCreateMenu from "../SideMenu/ProductCreateMenu";
import SampleAddProcess from "../../utils/SampleAddProcess";

const SampleProduct = ({ props, setTab, tab }: any) => {
  const dispatch = useDispatch();
  const {
    sampleProductLoading,
    sampleProductSuccess,
    sampleProductError,

    sampleProduct,
  } = useSelector((state: RootState) => state.sampleProduct);

  const [idDisable, setIdDisable] = useState(false);

  const [productProcess, setProductProcess] = useState(false);

  /* =========== ADD PROCESS SHOW ============= */
  const [showProcessActive, setShowProcessActive] = useState(true);

  const handleShowAddProcess = (e: any) => {
    e.preventDefault();

    const validateWithRegex = (pid: string) => {
      const pattern = /^SMPL\/\d{4}\/\d{5}$/;
      return pattern.test(pid);
    };

    const p_id = getValues("p_id");
    const productLine = watch("line");
    const productDesc = watch("desc");

    if (validateWithRegex(p_id) === false) {
      return toast.error("NEED VALID PID");
    }
    if (idDisable === false) {
      return toast.error("PLEASE ENTER A VALID PID NUMBER THEN PRESS ENTER");
    }

    if (productLine === undefined || productLine === "") {
      return toast.error("NEED A PRODUCT LINE");
    }

    if (productDesc === "") {
      return toast.error("NEED PRODUCT DESCRIPTION");
    }

    const modal = document.getElementById("my_modal_2");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
      setShowProcessActive(false);

      const handleModalClose = () => {
        setShowProcessActive(true);
        modal.removeEventListener("close", handleModalClose);
      };

      modal.addEventListener("close", handleModalClose);
    } else {
      console.error("Modal element not found!");
    }
  };

  /* ================================================= */
  /* ============== STATIC DATA SECTION ============== */
  /* ================================================= */

  const {
    register: sampleProductRegister,
    handleSubmit: phandleSubmit,
    setValue,
    getValues,
    setFocus,
    watch,
  } = useForm<ISampleProduct>({
    defaultValues: {},
  });

  const handleSave: SubmitHandler<ISampleProduct> = async (dataInput: any) => {
    if (dataInput.p_id === "New") {
      if (dataInput.buyer === "") {
        return setFocus("buyer");
      }
      if (dataInput.sales === "") {
        return setFocus("sales");
      }
      try {
        dispatch(SampleProductRequest());
        const userData = {
          p_id: dataInput.p_id,
          recieve: dataInput.recieve,
          buyer: dataInput.buyer,
          vendor: dataInput.vendor,
          contact: dataInput.contact,
          sales: dataInput.sales,
          line: dataInput.line,
          category: dataInput.category,
          desc: dataInput.desc,
          ref: dataInput.ref,
          code: dataInput.code,
          hs_code: dataInput.hs_code,
          height: parseFloat(dataInput.height as unknown as string) || 0,
          width: parseFloat(dataInput.width as unknown as string) || 0,
          length: parseFloat(dataInput.length as unknown as string) || 0,
          dimension_unit: dataInput.dimension_unit,
          page_part: dataInput.page_part,
          set: dataInput.set,
          weight: parseFloat(dataInput.weight as unknown as string) || 0,
          weight_per_pcs: dataInput.weight_per_pcs,
          weight_unit: dataInput.weight_unit,
          order_unit: dataInput.order_unit,
          moq: parseInt(dataInput.moq as unknown as string) || 0,
          moq_unit: dataInput.moq_unit,
          last_price: dataInput.last_price,
          currency: dataInput.currency,
          full_part: parseFloat(dataInput.full_part as unknown as string) || 0,
          half_part: parseFloat(dataInput.half_part as unknown as string) || 0,
          price_unit: dataInput.price_unit,
          sample_date: dataInput.sample_date,
          comments: dataInput.comments,
        };
        const { data } = await Axios.post("/create/sample/product", userData);
        console.log(data);

        dispatch(SampleProductSuccess(data));
      } catch (err: any) {
        dispatch(SampleProductFail(err.response.data.message));
      }
    } else {
      try {
        dispatch(SampleProductRequest());
        const userData = {
          p_id: dataInput.p_id,
          recieve: dataInput.recieve,
          buyer: dataInput.buyer,
          vendor: dataInput.vendor,
          contact: dataInput.contact,
          sales: dataInput.sales,
          line: dataInput.line,
          category: dataInput.category,
          desc: dataInput.desc,
          ref: dataInput.ref,
          code: dataInput.code,
          hs_code: dataInput.hs_code,
          height: parseFloat(dataInput.height as unknown as string) || 0,
          width: parseFloat(dataInput.width as unknown as string) || 0,
          length: parseFloat(dataInput.length as unknown as string) || 0,
          dimension_unit: dataInput.dimension_unit,
          page_part: dataInput.page_part,
          set: dataInput.set,
          weight: parseFloat(dataInput.weight as unknown as string) || 0,
          weight_per_pcs: dataInput.weight_per_pcs,
          weight_unit: dataInput.weight_unit,
          order_unit: dataInput.order_unit,
          moq: parseInt(dataInput.moq as unknown as string) || 0,
          moq_unit: dataInput.moq_unit,
          last_price: dataInput.last_price,
          currency: dataInput.currency,
          full_part: parseFloat(dataInput.full_part as unknown as string) || 0,
          half_part: parseFloat(dataInput.half_part as unknown as string) || 0,
          price_unit: dataInput.price_unit,
          sample_date: dataInput.sample_date,
          comments: dataInput.comments,
        };
        const { data } = await Axios.post("/create/sample/product", userData);

        dispatch(SampleProductSuccess(data));
        console.log(data);
      } catch (err: any) {
        dispatch(SampleProductFail(err.response.data.message));
      }
    }
  };

  /* ======== Contact Details Section ============ */
  const [showSelectedBuyer, setShowSelectedBuyer] = useState<
    buyer | undefined
  >();

  const handleShowBuyerChange = (e: any) => {
    const buyerTitle = e.target.value;
    if (!buyerTitle) {
      setShowSelectedBuyer(undefined);
      setShowSelectedVendor(undefined);
      setShowSelectedContact(undefined);
      return;
    }
    const buyer = organization.find((b: any) => b.title === buyerTitle);
    setShowSelectedBuyer(buyer);
    setShowSelectedVendor(undefined);
    setShowSelectedContact(undefined);
    setValue("buyer", buyerTitle);
    setValue("vendor", "");
    setValue("contact", "");
  };

  const [showSelectedVendor, setShowSelectedVendor] = useState<
    vendor | undefined
  >();
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
    setValue("vendor", vendorTitle);
    setValue("contact", "");
  };

  const [showSelectedContact, setShowSelectedContact] = useState<
    contact | undefined
  >();
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
    setValue("contact", contactName);
  };

  /* ======== Product Details Section ============ */
  const [selectedLine, setSelectedLine] = useState<line | undefined>();
  const handleLineChange = (e: any) => {
    const lineName = e.target.value;
    if (!lineName) {
      setSelectedLine(undefined);
      setSelectedCategory(undefined);
    }
    const line = getLine.find((b: any) => b.name === lineName);
    if (line) {
      setSelectedLine(line);
      setSelectedCategory(undefined);
      setValue("line", lineName);
      setValue("category", "");
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const handleCategoryChange = (e: any) => {
    const categoryName = e.target.value;
    if (!categoryName) {
      setSelectedCategory(undefined);
    }
    setSelectedCategory(categoryName);
    setValue("category", categoryName);
  };

  /* ============ GET ORGANIZATION ============ */
  const { organization } = useSelector(
    (state: RootState) => state.organization
  );
  const getOrganization = useCallback(async () => {
    try {
      dispatch(GetOrganizationRequest());
      const { data } = await Axios.get("/get/organization");
      dispatch(GetOrganizationSuccess(data.organization));
    } catch (err: any) {
      dispatch(GetOrganizationError(err.response.data.message));
    }
  }, [dispatch]);

  /* ============ GET PRODUCT DETAILS ============ */
  const { getLine } = useSelector((state: RootState) => state.product_details);
  const getProductLine = useCallback(async () => {
    try {
      dispatch(GetProductLineRequest());
      const { data } = await Axios.get("/get/product/line");
      dispatch(GetProductLineSuccess(data.line));
    } catch (err: any) {
      dispatch(GetProductLineFail(err.response.data.message));
    }
  }, [dispatch]);

  useEffect(() => {
    if (showProcessActive === true) {
      const handleKeyDown = async (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          e.preventDefault();

          phandleSubmit(handleSave)();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [showProcessActive]);

  useEffect(() => {
    if (sampleProductSuccess) {
      toast.success(sampleProductSuccess);
    }

    if (sampleProductError) toast.error(sampleProductError);

    dispatch(ClearSampleProductSuccess());
    dispatch(ClearSampleProductError());

    if (watch("price_unit") !== "Set") {
      setValue("half_part", NaN);
    }
  }, [sampleProductSuccess, sampleProductError]);

  useEffect(() => {
    if (sampleProduct) {
      setIdDisable(true);
      setProductProcess(sampleProduct?.process.length > 0 ? true : false);
      setValue("p_id", sampleProduct?.p_id ? sampleProduct.p_id : "New");

      setValue(
        "recieve",
        sampleProduct?.recieve
          ? (new Date(sampleProduct.recieve).toISOString().split("T")[0] as any)
          : (new Date(Date.now()).toISOString().split("T")[0] as any)
      );
      setValue(
        "last_price",
        sampleProduct?.price.last_price
          ? (new Date(sampleProduct?.price.last_price)
              .toISOString()
              .split("T")[0] as any)
          : (new Date(Date.now()).toISOString().split("T")[0] as any)
      );
      setValue(
        "sample_date",
        sampleProduct?.sample_submission?.date
          ? (new Date(sampleProduct?.sample_submission.date)
              .toISOString()
              .split("T")[0] as any)
          : (new Date(Date.now()).toISOString().split("T")[0] as any)
      );

      setValue("buyer", sampleProduct?.contactDetails.buyer || "");
      setValue("vendor", sampleProduct?.contactDetails.vendor || "");
      setValue("contact", sampleProduct?.contactDetails.contact || "");
      setValue("sales", sampleProduct?.contactDetails.sales || "");
      setValue("line", sampleProduct?.product.line || "");
      setValue("category", sampleProduct?.product.category || "");
      setValue("desc", sampleProduct?.product.desc || "");
      setValue("hs_code", sampleProduct?.product.hs_code || "");
      setValue("code", sampleProduct?.product.code || "");
      setValue("ref", sampleProduct?.product.ref || "");
      setValue("height", sampleProduct?.dimensionDetails.measure.height || NaN);
      setValue("width", sampleProduct?.dimensionDetails.measure.width || NaN);
      setValue("length", sampleProduct?.dimensionDetails.measure.length || NaN);
      setValue(
        "dimension_unit",
        sampleProduct?.dimensionDetails.measure.dimension_unit || ""
      );
      setValue("page_part", sampleProduct?.dimensionDetails.page || "");
      setValue("set", sampleProduct?.dimensionDetails.set || "false");
      setValue("weight", sampleProduct?.weight.weight_value || NaN);
      setValue("weight_unit", sampleProduct?.weight.weight_unit || "");
      setValue("weight_per_pcs", sampleProduct?.weight.per_pcs || "");
      setValue("order_unit", sampleProduct?.quantity.unit_type || "");
      setValue("moq", sampleProduct?.quantity.moq || NaN);
      setValue("moq_unit", sampleProduct?.quantity.moq_unit || "");
      setValue("currency", sampleProduct?.price.currency || "");
      setValue(
        "price_unit",
        sampleProduct?.price.price_unit ? sampleProduct?.price.price_unit : ""
      );
      setValue("full_part", sampleProduct?.price.full_part || NaN);
      setValue("half_part", sampleProduct?.price.half_part || NaN);
      setValue(
        "comments",
        sampleProduct?.sample_submission.buyer_comment || ""
      );
    }
  }, [sampleProduct]);

  useEffect(() => {
    if (organization) {
      getOrganization();
    }
    if (getLine) {
      getProductLine();
    }
  }, []);

  return (
    <div className="flex  relative bg-white">
      {sampleProductLoading && <Processing />}
      <form onSubmit={phandleSubmit(handleSave)} className="w-[93%] px-3 pt-12">
        <div className="flex justify-between items-center">
          <div className="w-[180px]">
            <label className="text-xs font-bold">Product ID</label>

            <br />
            <input
              type="text"
              className="input w-full"
              {...sampleProductRegister("p_id")}
              disabled={idDisable}
              defaultValue={"New"}
            />
          </div>
          <div className="w-3/12">
            <label className="text-xs font-bold">Receving Date</label>
            <br />
            <input
              type="date"
              className="input"
              defaultValue={new Date(Date.now()).toISOString().split("T")[0]}
              {...sampleProductRegister("recieve")}
            />
          </div>
          <div>
            <label className="text-xs font-bold">Status</label>
            <br />
            <button className="border border-black rounded-sm px-4 py-1 text-sm bg-red-300 cursor-pointer">
              Entry Mode
            </button>
          </div>
        </div>
        <div className="flex mt-4">
          <div className="w-9/12">
            <div className="collapse collapse-plus bg-base-100 border border-base-300">
              <input type="checkbox" name="my-accordion-3" defaultChecked />
              <div className="collapse-title font-semibold">
                Contact Details
              </div>
              <div className="collapse-content text-sm">
                <div className="flex items-center flex-wrap">
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Buyer Name</legend>
                    <select
                      {...sampleProductRegister("buyer")}
                      onChange={handleShowBuyerChange}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      {organization ? (
                        <option value="" className="hidden"></option>
                      ) : (
                        <option
                          value={
                            sampleProduct?.contactDetails.buyer &&
                            sampleProduct.contactDetails.buyer
                          }
                        >
                          {sampleProduct?.contactDetails.buyer &&
                            sampleProduct.contactDetails.buyer}
                        </option>
                      )}
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
                      value={
                        showSelectedVendor?.title ||
                        (sampleProduct
                          ? sampleProduct.contactDetails.vendor
                          : "")
                      }
                      onChange={handleShowVendorChange}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      {showSelectedBuyer ? (
                        <option value="" className="hidden"></option>
                      ) : (
                        getValues("buyer") !== "" &&
                        getValues("buyer") ===
                          sampleProduct?.contactDetails?.buyer &&
                        sampleProduct?.contactDetails?.vendor && (
                          <option
                            value={
                              sampleProduct?.contactDetails &&
                              sampleProduct?.contactDetails.vendor
                            }
                          >
                            {sampleProduct?.contactDetails &&
                              sampleProduct?.contactDetails.vendor}
                          </option>
                        )
                      )}
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
                    <legend className="fieldset-legend">Contact Person</legend>
                    <select
                      value={showSelectedContact?.name || ""}
                      onChange={handleShowContactChange}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      {showSelectedVendor ? (
                        <option value="" className="hidden"></option>
                      ) : (
                        getValues("vendor") !== "" &&
                        getValues("vendor") ===
                          sampleProduct?.contactDetails?.vendor &&
                        sampleProduct?.contactDetails?.contact && (
                          <option value={sampleProduct.contactDetails.contact}>
                            {sampleProduct.contactDetails.contact}
                          </option>
                        )
                      )}
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
                    <legend className="fieldset-legend">Sales Person</legend>
                    <select
                      {...sampleProductRegister("sales")}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      <option value="" className="hidden"></option>
                      <option>Pantha Acharjee</option>
                      <option>Kawser Ahmed</option>
                      <option>Hasib Bin Hannan</option>
                      <option>Shuvonkor Roy Chodhury</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300 mt-4">
              <input type="checkbox" name="my-accordion-3" defaultChecked />
              <div className="collapse-title font-semibold">
                Product Details
              </div>
              <div className="collapse-content text-sm">
                <div className="flex items-center flex-wrap">
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Product Line</legend>
                    <select
                      {...sampleProductRegister("line")}
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
                    <select
                      value={
                        selectedCategory ||
                        (sampleProduct ? sampleProduct.product.category : "")
                      }
                      onChange={handleCategoryChange}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      {selectedLine ? (
                        <option value="" className="hidden"></option>
                      ) : (
                        getValues("line") !== "" &&
                        getValues("line") === sampleProduct?.product.line &&
                        sampleProduct?.product?.category && (
                          <option
                            value={
                              sampleProduct?.product &&
                              sampleProduct?.product.category
                            }
                          >
                            {sampleProduct?.product &&
                              sampleProduct?.product.category}
                          </option>
                        )
                      )}
                      {selectedLine?.category?.map((val: any, ind: any) => {
                        return (
                          <option key={ind} value={val.category}>
                            {val.category}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">
                      Product Description
                    </legend>
                    <input
                      type="text"
                      className="input w-11/12"
                      {...sampleProductRegister("desc")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Code</legend>
                    <input
                      type="text"
                      className="input w-11/12"
                      {...sampleProductRegister("code")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Reffer ID</legend>
                    <input
                      type="text"
                      className="input w-11/12"
                      {...sampleProductRegister("ref")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">HS Code</legend>
                    <input
                      type="text"
                      className="input w-11/12"
                      {...sampleProductRegister("hs_code")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300 mt-4">
              <input type="checkbox" name="my-accordion-3" defaultChecked />
              <div className="collapse-title font-semibold">Product</div>
              <div className="collapse-content text-sm">
                <div className="flex items-center flex-wrap">
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Product Width</legend>
                    <input
                      type="number"
                      className="input w-11/12"
                      {...sampleProductRegister("width")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Product Height</legend>
                    <input
                      type="number"
                      className="input w-11/12"
                      {...sampleProductRegister("height")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Product Length</legend>
                    <input
                      type="number"
                      className="input w-11/12"
                      {...sampleProductRegister("length")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Dimension Unit</legend>
                    <select
                      {...sampleProductRegister("dimension_unit")}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      <option value="" className="hidden"></option>
                      <option>mm</option>
                      <option>cm</option>
                      <option>Meter</option>
                      <option>Km</option>
                      <option>Inch</option>
                      <option>Feet</option>
                      <option>Yds</option>
                      <option>Roll/Coil</option>
                      <option>Den</option>
                      <option>DTex</option>
                      <option>gm/m</option>
                    </select>
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Page/Part</legend>
                    <select
                      {...sampleProductRegister("page_part")}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      <option value="" className="hidden"></option>
                      <option>Page</option>
                      <option>Pair</option>
                      <option>Dz</option>
                    </select>
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Allow Set</legend>
                    <select
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                      {...sampleProductRegister("set")}
                      defaultValue={"false"}
                    >
                      <option value={"true"}>Yes</option>
                      <option value={"false"}>No</option>
                    </select>
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Weight Per Pcs</legend>
                    <select
                      {...sampleProductRegister("weight_per_pcs")}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      <option value="" className="hidden"></option>
                      <option>1000</option>
                      <option>2000</option>
                      <option>3000</option>
                      <option>4000</option>
                    </select>
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Weight</legend>
                    <input
                      type="number"
                      className="input w-11/12"
                      {...sampleProductRegister("weight")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Weight Unit</legend>
                    <select
                      {...sampleProductRegister("weight_unit")}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      <option value="" className="hidden"></option>
                      <option>gm</option>
                      <option>Kg</option>
                      <option>Metric Ton</option>
                      <option>Ounce (oz)</option>
                      <option>Pound (lb)</option>
                      <option>Tin</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300 mt-4">
              <input type="checkbox" name="my-accordion-3" />
              <div className="collapse-title font-semibold">Order Quantity</div>
              <div className="collapse-content text-sm">
                <div className="flex items-center flex-wrap">
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Unit Type</legend>
                    <select
                      {...sampleProductRegister("order_unit")}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      <option value="" className="hidden"></option>
                      <option>Quantity</option>
                      <option>Length</option>
                      <option>Weight</option>
                      <option>Area</option>
                      <option>Volume</option>
                      <option>Speed</option>
                      <option>Temparature</option>
                      <option>Time</option>
                      <option>Data</option>
                      <option>Electricity</option>
                    </select>
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">MOQ</legend>
                    <input
                      type="number"
                      className="input w-11/12"
                      {...sampleProductRegister("moq")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">MOQ Unit</legend>
                    <select
                      {...sampleProductRegister("moq_unit")}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      <option value="" className="hidden"></option>
                      <option>Pcs</option>
                      <option>Pair</option>
                      <option>Dz</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300 mt-4">
              <input type="checkbox" name="my-accordion-3" />
              <div className="collapse-title font-semibold">Product Price</div>
              <div className="collapse-content text-sm">
                <div className="flex items-center flex-wrap">
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">
                      Last Price Update
                    </legend>
                    <input
                      type="date"
                      className="input w-11/12"
                      defaultValue={
                        new Date(Date.now()).toISOString().split("T")[0]
                      }
                      {...sampleProductRegister("last_price")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Currency</legend>
                    <select
                      {...sampleProductRegister("currency")}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      <option value="" className="hidden"></option>
                      <option>USD</option>
                      <option>BDT</option>
                    </select>
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Price Unit</legend>
                    <select
                      {...sampleProductRegister("price_unit")}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                      defaultValue={"Pcs"}
                    >
                      <option value={"Pcs"}>Pcs</option>
                      <option value={"Pair"}>Pair</option>
                      <option value={"Dz"}>Dz</option>
                      <option value={"Set"}>Set</option>
                    </select>
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Full Part Price</legend>
                    <input
                      type="number"
                      className="input w-11/12"
                      {...sampleProductRegister("full_part")}
                    />
                  </div>
                  {watch("price_unit") === "Set" && (
                    <div className="fieldset w-3/12">
                      <legend className="fieldset-legend">
                        Half Part Price
                      </legend>
                      <input
                        type="number"
                        className="input w-11/12"
                        {...sampleProductRegister("half_part")}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300 mt-4">
              <input type="checkbox" name="my-accordion-3" />
              <div className="collapse-title font-semibold">
                Sample Submission Details
              </div>
              <div className="collapse-content text-sm">
                <div className="flex items-center flex-wrap">
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Submission Date</legend>
                    <input
                      type="date"
                      className="input w-11/12"
                      defaultValue={
                        new Date(Date.now()).toISOString().split("T")[0]
                      }
                      {...sampleProductRegister("sample_date")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Buyers Comments</legend>
                    <input
                      type="text"
                      className="input w-11/12"
                      {...sampleProductRegister("comments")}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-3/12 pl-3">
            <button
              onClick={handleShowAddProcess}
              className="w-full border border-black rounded-sm px-4 py-2 text-sm font-bold bg-blue-100 cursor-pointer"
            >
              Add Process
            </button>
            <div className="border border-black w-full h-96 mt-3 rounded-md px-4 py-3 overflow-y-auto scroll-auto">
              {productProcess &&
                sampleProduct?.process?.map((val: any, ind: any) => {
                  const groupedSpec = val?.spec?.reduce(
                    (groups: any[], item: any) => {
                      const existingGroup = groups?.find(
                        (group) => group?.name === item?.name
                      );
                      if (existingGroup) {
                        existingGroup?.items?.push(item);
                      } else {
                        groups?.push({ name: item?.name, items: [item] });
                      }
                      return groups;
                    },
                    []
                  );

                  // Flatten the groups back into an array
                  const sortedSpec = groupedSpec?.flatMap(
                    (group: any) => group?.items
                  );
                  return (
                    <div key={ind} className="mb-3">
                      <div className="">
                        <h4 className="pb-1 text-sm font-bold ">{val?.name}</h4>
                        <div className="border-[1px] border-black"></div>
                      </div>
                      <div>
                        {sortedSpec?.map((specItem: any, specIndex: any) => {
                          return (
                            <div className="mt-2" key={specIndex}>
                              <p className="text-xs">
                                <span className="mr-1">{specIndex + 1})</span>
                                <span className=" font-bold   rounded-2xl">
                                  {specItem?.name}
                                </span>
                                :
                                <span className="ml-1">
                                  {specItem?.value} {specItem?.item}
                                </span>
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>

            <button className="mt-5 w-full border border-black rounded-sm px-4 py-2 text-sm font-bold bg-blue-100 cursor-pointer">
              Add Sample
            </button>
            <div className="border border-black w-full h-96 mt-3 rounded-md px-4 py-3 overflow-y-auto scroll-auto"></div>
          </div>
        </div>
      </form>
      <div className="w-[7%] bg-[#d3e6ec]  min-h-screen pt-14 px-2">
        {/* <ProductCreateMenu
          getValues={getValues}
          setValue={setValue}
          setFocus={setFocus}
          setIdDisable={setIdDisable}
          setProductProcess={setProductProcess}
          tab={tab}
          setTab={setTab}
          props={props}
          product={sampleProduct}
          setShowSelectedBuyer={setShowSelectedBuyer}
          setShowSelectedVendor={setShowSelectedVendor}
          setShowSelectedContact={setShowSelectedContact}
          setSelectedLine={setSelectedLine}
          setSelectedCategory={setSelectedCategory}
        /> */}
      </div>
      <dialog id="my_modal_2" className="modal w-full">
        <SampleAddProcess
          productId={getValues("p_id")}
          productDesc={getValues("desc")}
          productLine={getValues("line")}
        />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default SampleProduct;
