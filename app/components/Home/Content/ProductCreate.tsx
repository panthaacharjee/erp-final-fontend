"use client";

import React, { useCallback, useEffect, useState } from "react";
import AddProcess from "../../utils/AddProcess";
import { IProduct } from "@/app/redux/interfaces/productInterface";
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
  ClearProductError,
  ClearProductSuccess,
  ProductFail,
  ProductRequest,
  ProductSuccess,
} from "@/app/redux/reducers/productReducer";
import Processing from "../../Processing";
import { Princess_Sofia } from "next/font/google";
import ProductCreateMenu from "../SideMenu/ProductCreateMenu";

const ProductCreate = ({ props, setTab, tab }: any) => {
  const dispatch = useDispatch();
  const { productLoading, productSuccess, productError, product } = useSelector(
    (state: RootState) => state.product
  );

  const [idDisable, setIdDisable] = useState(false);

  /* =========== ADD PROCESS SHOW ============= */
  const handleShowAddProcess = (e: any) => {
    e.preventDefault();
    const modal = document.getElementById("my_modal_2");
    if (modal) {
      // Check if element exists
      (modal as HTMLDialogElement).showModal(); // Type assertion for `showModal()`
    } else {
      console.error("Modal element not found!");
    }
  };

  /* ================================================= */
  /* ============== STATIC DATA SECTION ============== */
  /* ================================================= */

  const {
    register: productRegister,
    handleSubmit: phandleSubmit,
    setValue,
    getValues,
    setFocus,
    watch,
  } = useForm<IProduct>({
    defaultValues: {},
  });

  const handleSave: SubmitHandler<IProduct> = async (dataInput: any) => {
    if (dataInput.p_id === "New") {
      if (dataInput.buyer === "") {
        return setFocus("buyer");
      }
      if (dataInput.vendor === "") {
        return setFocus("vendor");
      }
      if (dataInput.contact === "") {
        return setFocus("contact");
      }
      if (dataInput.sales === "") {
        return setFocus("sales");
      }
      console.log(dataInput.p_id);
    } else {
      try {
        dispatch(ProductRequest());
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
        const { data } = await Axios.post("/create/product", userData);

        dispatch(ProductSuccess(data));
      } catch (err: any) {
        dispatch(ProductFail(err.response.data.message));
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
    const handleKeyDown = async (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        phandleSubmit(handleSave)();
      }
    };

    getOrganization();
    getProductLine();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phandleSubmit]);

  useEffect(() => {
    if (productSuccess) {
      toast.success(productSuccess);
      setIdDisable(true);
      setValue("p_id", product?.p_id ? product.p_id : "New");

      setValue(
        "recieve",
        product?.recieve
          ? (new Date(product.recieve).toISOString().split("T")[0] as any)
          : (new Date(Date.now()).toISOString().split("T")[0] as any)
      );
      setValue(
        "last_price",
        product?.price.last_price
          ? (new Date(product?.price.last_price)
              .toISOString()
              .split("T")[0] as any)
          : (new Date(Date.now()).toISOString().split("T")[0] as any)
      );
      setValue(
        "sample_date",
        product?.sample_submission?.date
          ? (new Date(product?.sample_submission.date)
              .toISOString()
              .split("T")[0] as any)
          : (new Date(Date.now()).toISOString().split("T")[0] as any)
      );

      setValue("buyer", product?.contactDetails.buyer || "");
      setValue("vendor", product?.contactDetails.vendor || "");
      setValue("contact", product?.contactDetails.contact || "");
      setValue("sales", product?.contactDetails.sales || "");
      setValue("line", product?.product.line || "");
      setValue("category", product?.product.category || "");
      setValue("desc", product?.product.desc || "");
      setValue("hs_code", product?.product.hs_code || "");
      setValue("code", product?.product.code || "");
      setValue("ref", product?.product.ref || "");
      setValue("height", product?.dimensionDetails.measure.height || NaN);
      setValue("width", product?.dimensionDetails.measure.width || NaN);
      setValue("length", product?.dimensionDetails.measure.length || NaN);
      setValue(
        "dimension_unit",
        product?.dimensionDetails.measure.dimension_unit || ""
      );
      setValue("page_part", product?.dimensionDetails.page || "");
      setValue("set", product?.dimensionDetails.set || "false");
      setValue("weight", product?.weight.weight_value || NaN);
      setValue("weight_unit", product?.weight.weight_unit || "");
      setValue("weight_per_pcs", product?.weight.per_pcs || "");
      setValue("order_unit", product?.quantity.unit_type || "");
      setValue("moq", product?.quantity.moq || NaN);
      setValue("moq_unit", product?.quantity.moq_unit || "");
      setValue("currency", product?.price.currency || "");
      setValue(
        "price_unit",
        product?.price.price_unit ? product?.price.price_unit : ""
      );
      setValue("full_part", product?.price.full_part || NaN);
      setValue("half_part", product?.price.half_part || NaN);
      setValue("comments", product?.sample_submission.buyer_comment || "");
    }

    if (productError) toast.error(productError);

    dispatch(ClearProductSuccess());
    dispatch(ClearProductError());

    if (watch("price_unit") !== "Set") {
      setValue("half_part", NaN);
    }
  }, [productSuccess, productError]);

  return (
    <div className="flex  relative bg-white">
      {productLoading && <Processing />}
      <form onSubmit={phandleSubmit(handleSave)} className="w-[93%] px-3 pt-12">
        <div className="flex justify-between items-center">
          <div className="w-2/12">
            <label className="text-xs font-bold">Product ID</label>

            <br />
            <input
              type="text"
              className="input w-full"
              {...productRegister("p_id")}
              disabled={idDisable}
            />
          </div>
          <div className="w-3/12">
            <label className="text-xs font-bold">Receving Date</label>
            <br />
            <input
              type="date"
              className="input"
              defaultValue={new Date(Date.now()).toISOString().split("T")[0]}
              {...productRegister("recieve")}
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
                      {...productRegister("buyer")}
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
                      {showSelectedBuyer ? (
                        <option value="" className="hidden"></option>
                      ) : (
                        getValues("buyer") !== "" &&
                        getValues("buyer") === product?.contactDetails?.buyer &&
                        product?.contactDetails?.vendor && (
                          <option
                            value={
                              product?.contactDetails &&
                              product?.contactDetails.vendor
                            }
                          >
                            {product?.contactDetails &&
                              product?.contactDetails.vendor}
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
                          product?.contactDetails?.vendor &&
                        product?.contactDetails?.contact && (
                          <option value={product.contactDetails.contact}>
                            {product.contactDetails.contact}
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
                      {...productRegister("sales")}
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
                      {...productRegister("line")}
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
                      value={selectedCategory || ""}
                      onChange={handleCategoryChange}
                      className="w-11/12 focus:outline-none focus:ring-0  select"
                    >
                      {selectedLine ? (
                        <option value="" className="hidden"></option>
                      ) : (
                        getValues("line") !== "" &&
                        getValues("line") === product?.product.line &&
                        product?.product?.category && (
                          <option
                            value={
                              product?.product && product?.product.category
                            }
                          >
                            {product?.product && product?.product.category}
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
                      {...productRegister("desc")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Code</legend>
                    <input
                      type="text"
                      className="input w-11/12"
                      {...productRegister("code")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Reffer ID</legend>
                    <input
                      type="text"
                      className="input w-11/12"
                      {...productRegister("ref")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">HS Code</legend>
                    <input
                      type="text"
                      className="input w-11/12"
                      {...productRegister("hs_code")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300 mt-4">
              <input type="checkbox" name="my-accordion-3" defaultChecked />
              <div className="collapse-title font-semibold">
                Product Dimension
              </div>
              <div className="collapse-content text-sm">
                <div className="flex items-center flex-wrap">
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Product Width</legend>
                    <input
                      type="number"
                      className="input w-11/12"
                      {...productRegister("width")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Product Height</legend>
                    <input
                      type="number"
                      className="input w-11/12"
                      {...productRegister("height")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Product Length</legend>
                    <input
                      type="number"
                      className="input w-11/12"
                      {...productRegister("length")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Dimension Unit</legend>
                    <select
                      {...productRegister("dimension_unit")}
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
                      {...productRegister("page_part")}
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
                      {...productRegister("set")}
                      defaultValue={"false"}
                    >
                      <option value={"true"}>Yes</option>
                      <option value={"false"}>No</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300 mt-4">
              <input type="checkbox" name="my-accordion-3" defaultChecked />
              <div className="collapse-title font-semibold">Product Weight</div>
              <div className="collapse-content text-sm">
                <div className="flex items-center flex-wrap">
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">No of Pcs</legend>
                    <select
                      {...productRegister("weight_per_pcs")}
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
                      {...productRegister("weight")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Unit Type</legend>
                    <select
                      {...productRegister("weight_unit")}
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
              <input type="checkbox" name="my-accordion-3" defaultChecked />
              <div className="collapse-title font-semibold">Order Quantity</div>
              <div className="collapse-content text-sm">
                <div className="flex items-center flex-wrap">
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Unit Type</legend>
                    <select
                      {...productRegister("order_unit")}
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
                      {...productRegister("moq")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">MOQ Unit</legend>
                    <select
                      {...productRegister("moq_unit")}
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
              <input type="checkbox" name="my-accordion-3" defaultChecked />
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
                      {...productRegister("last_price")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Currency</legend>
                    <select
                      {...productRegister("currency")}
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
                      {...productRegister("price_unit")}
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
                      {...productRegister("full_part")}
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
                        {...productRegister("half_part")}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-100 border border-base-300 mt-4">
              <input type="checkbox" name="my-accordion-3" defaultChecked />
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
                      {...productRegister("sample_date")}
                    />
                  </div>
                  <div className="fieldset w-3/12">
                    <legend className="fieldset-legend">Buyers Comments</legend>
                    <input
                      type="text"
                      className="input w-11/12"
                      {...productRegister("comments")}
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
            <div className="border border-black w-full min-h-96 mt-3 rounded-md"></div>
          </div>
        </div>
      </form>
      <div className="w-[7%] bg-[#d3e6ec]  min-h-screen pt-14 px-2">
        <ProductCreateMenu
          getValues={getValues}
          setValue={setValue}
          setFocus={setFocus}
          setIdDisable={setIdDisable}
          tab={tab}
          setTab={setTab}
          props={props}
          product={product}
          setShowSelectedVendor={setShowSelectedVendor}
          setShowSelectedContact={setShowSelectedContact}
        />
      </div>
      <dialog id="my_modal_2" className="modal w-full">
        <AddProcess />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ProductCreate;
