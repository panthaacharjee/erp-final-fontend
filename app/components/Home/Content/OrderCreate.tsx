"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";

import Axios from "../../Axios";
import { RootState } from "@/app/redux/rootReducer";
import { toast } from "react-toastify";
import OrganizationMenu from "../SideMenu/OrganizationMenu";
import AttachOrderFile from "../../utils/AttachOrderFile";
import AttachArtworkFile from "../../utils/AttachArtworkFile";
import {
  buyer,
  contact,
  line,
  vendor,
} from "@/app/redux/interfaces/businessInterface";
import {
  GetOrganizationError,
  GetOrganizationRequest,
  GetOrganizationSuccess,
  GetProductLineFail,
  GetProductLineRequest,
  GetProductLineSuccess,
} from "@/app/redux/reducers/businessReducer";

import { IOrder, IOrderDetails } from "@/app/redux/interfaces/OrderInterface";
import {
  OrderFail,
  OrderRequest,
  OrderSuccess,
} from "@/app/redux/reducers/orderReducer";
import { IGetProduct } from "@/app/redux/interfaces/productInterface";

const OrderCreate = ({ props, setTab, tab }: any) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const { order } = useSelector((state: RootState) => state.order);

  const [idDisable, setIdDisable] = useState(false);
  const [isDetails, setIsDetails] = useState(false);

  const handleDetailCheck = () => {
    const validateWithRegex = (oid: string) => {
      const pattern = /^BTPL\/\d{4}\/\d{5}$/;
      return pattern.test(oid);
    };
    if (
      validateWithRegex(getValues("orderId")) === false &&
      idDisable === false
    ) {
      toast("SEARCH A VALID ORDER ID");
    } else {
      setIsDetails(!isDetails);
      setValue("isDetails", !isDetails as any);
    }

    if (isDetails === true) {
      //DATA VALUE UNDEFINED
      setValue("serial", (order && order?.orderDetails.length + 1) as any);
      setValue("product", "");
      setValue("line", "");
      setValue("category", "");
      setSelectedLine(undefined);
      setSelectedCategory(undefined);
      setSelectedDesc(undefined);

      setValue("desc", "");
      setValue("model", "");
      setValue("item_pact_art", "");
      setValue("style_cc_iman", "");
      setValue("variable", "");
      setValue("gmts_color", "");
      setValue("size_age", "");
      setValue("ean_number", "");
      setValue("order_qty", NaN);
      setValue("order_unit", "");
      setValue("page_part", NaN);
      setValue("isSize", false);
      setOrderDetails(null);
    }
  };

  const handleAttachFile = () => {
    const modal = document.getElementById("my_modal_1");
    if (isDetails === false) {
      if (modal) {
        (modal as HTMLDialogElement).showModal();

        const handleModalClose = () => {
          modal.removeEventListener("close", handleModalClose);
        };

        modal.addEventListener("close", handleModalClose);
      } else {
        console.error("Modal element not found!");
      }
    }
  };

  const handleAttachArtwork = () => {
    const modal = document.getElementById("my_modal_2");
    if (isDetails === true) {
      if (modal) {
        (modal as HTMLDialogElement).showModal();

        const handleModalClose = () => {
          modal.removeEventListener("close", handleModalClose);
        };

        modal.addEventListener("close", handleModalClose);
      } else {
        console.error("Modal element not found!");
      }
    }
  };

  const reversedOrderDetails = [...(order?.orderDetails || [])].sort(
    (a, b) => b.serial - a.serial
  );
  const book_quantity =
    order &&
    order.orderDetails.reduce(
      (accumulator, currentValue) => accumulator + currentValue.order_qty,
      0
    );

  const base_qty_full_part_total =
    order?.orderDetails &&
    order.orderDetails.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.base_qty_full_part,
      0
    );
  const base_qty_half_part_total =
    order?.orderDetails &&
    order.orderDetails.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.base_qty_half_part,
      0
    );

  const total_base_qty =
    (base_qty_full_part_total ?? 0) + (base_qty_half_part_total ?? 0);

  const [showSize, setShowSize] = useState(false);
  const [orderUnit, setOrderUnit] = useState<string | undefined>(undefined);
  const handleOrderUnit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("order_unit", e.target.value);
    setOrderUnit(e.target.value);
    if (e.target.value === "Pcs") {
      setValue("page_part", 1);
    } else if (e.target.value === "Pair") {
      setValue("page_part", 2);
    } else if (e.target.value === "Dz") {
      setValue("page_part", 12);
    } else if (e.target.value === "Set") {
      setValue("page_part", NaN);
    }
  };

  const [products, setProducts] = useState<IGetProduct[] | []>([]);
  const [selectedDesc, setSelectedDesc] = useState<IGetProduct | undefined>();

  const handleDescChange = (e: any) => {
    const descName = e.target.value;
    if (!descName) {
      setSelectedDesc(undefined);
      setValue("desc", "");
    }

    const desc = products.find((b: any) => b.product.desc === descName);

    if (desc) {
      setSelectedDesc(desc);
      setValue("desc", descName);
      setValue("product", desc._id);
    }

    //DATA VALUE UNDEFINED
    setValue("serial", (order && order?.orderDetails.length + 1) as any);
    setValue("model", "");
    setValue("item_pact_art", "");
    setValue("style_cc_iman", "");
    setValue("variable", "");
    setValue("gmts_color", "");
    setValue("size_age", "");
    setValue("ean_number", "");
    setValue("order_qty", NaN);
    setValue("order_unit", "");
    setValue("page_part", NaN);
    setValue("base_qty_full_part", NaN);
    setValue("base_qty_half_part", NaN);
  };

  const handleSave: SubmitHandler<IOrder> = async (dataInput: any) => {
    const userData = {
      orderId: dataInput.orderId,
      orderDate: dataInput.orderDate,
      buyer: dataInput.buyer,
      buyerRef: dataInput.buyerRef,
      vendor: dataInput.vendor,
      vendorRef: dataInput.vendorRef,
      contact: dataInput.contact,
      sales: dataInput.sales,
      req_date: dataInput.req_date,
      season: dataInput.season,
      serial: dataInput.serial,
      product: dataInput.product,
      line: dataInput.line,
      category: dataInput.category,
      desc: dataInput.desc,
      model: dataInput.model,
      item_pact_art: dataInput.item_pact_art,
      style_cc_iman: dataInput.style_cc_iman,
      variable: dataInput.variable,
      gmts_color: dataInput.gmts_color,
      size_age: dataInput.size_age,
      ean_number: dataInput.ean_number,
      order_qty: Number(dataInput.order_qty),
      order_unit: dataInput.order_unit,
      page_part: Number(dataInput.page_part),
      base_qty_full_part:
        Number((dataInput.order_qty * parseInt(dataInput.page_part)) as any) ||
        0,
      base_qty_half_part: isFloat(Number(dataInput.page_part))
        ? Number(dataInput.order_qty)
        : 0,
      isDetails: dataInput.isDetails,
    };

    function isFloat(value: number) {
      return (
        typeof value === "number" && !isNaN(value) && !Number.isInteger(value)
      );
    }

    const validateFields = () => {
      if (dataInput.orderId === "New") {
        if (dataInput.buyer === "") return setFocus("buyer");
        if (dataInput.sales === "") return setFocus("sales");
      }

      if (dataInput.isDetails && dataInput.orderId !== "New") {
        if (dataInput.desc === "") return setFocus("desc");
        if (dataInput.isSize === true && dataInput.size_age === "") {
          return setFocus("size_age");
        }
        if (isNaN(dataInput.order_qty) || dataInput.order_qty < 1)
          return setFocus("order_qty");
        if (dataInput.order_unit === "") return setFocus("order_unit");
        if (
          isNaN(dataInput.page_part) ||
          (dataInput.order_unit === "Set" && dataInput.page_part < 1)
        )
          return setFocus("page_part");
      }

      return true;
    };

    const submitOrder = async () => {
      try {
        dispatch(OrderRequest());
        const { data } = await Axios.post("/create/order", userData);
        dispatch(OrderSuccess(data));
      } catch (err: any) {
        dispatch(OrderFail(err.response.data.message));
      }
    };

    if (!validateFields()) return;

    if (dataInput.orderId === "New" && isDetails === false) {
      await submitOrder();
    } else if (dataInput.orderId !== "New") {
      if (!isDetails) {
        await submitOrder();
      }
    }
  };

  const {
    register: orderRegister,
    handleSubmit: ohandleSubmit,
    setValue,
    getValues,
    setFocus,
    watch,
  } = useForm<IOrder>({
    defaultValues: {
      serial: 1,
    },
  });

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
      setSelectedDesc(undefined);
    }

    const line = getLine.find((b: any) => b.name === lineName);
    if (line) {
      setSelectedLine(line);
      setSelectedCategory(undefined);
      setSelectedDesc(undefined);

      setValue("line", lineName);
      setValue("category", "");
      setValue("desc", "");

      //DATA VALUE UNDEFINED
      setValue("serial", (order && order?.orderDetails.length + 1) as any);
      setValue("model", "");
      setValue("item_pact_art", "");
      setValue("style_cc_iman", "");
      setValue("variable", "");
      setValue("gmts_color", "");
      setValue("size_age", "");
      setValue("ean_number", "");
      setValue("order_qty", NaN);
      setValue("order_unit", "");
      setValue("page_part", NaN);
      setOrderDetails(null);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const handleCategoryChange = (e: any) => {
    const categoryName = e.target.value;
    if (!categoryName) {
      setSelectedCategory(undefined);
      setSelectedDesc(undefined);
    }
    setSelectedCategory(categoryName);
    setSelectedDesc(undefined);

    setValue("category", categoryName);
    setValue("desc", "");

    //DATA VALUE UNDEFINED
    setValue("serial", (order && order?.orderDetails.length + 1) as any);
    setValue("model", "");
    setValue("item_pact_art", "");
    setValue("style_cc_iman", "");
    setValue("variable", "");
    setValue("gmts_color", "");
    setValue("size_age", "");
    setValue("ean_number", "");
    setValue("order_qty", NaN);
    setValue("order_unit", "");
    setValue("page_part", NaN);
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
    if (organization) {
      getOrganization();
    }
    if (getLine) {
      getProductLine();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();

        ohandleSubmit(handleSave)();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!order) return;

    // Set basic form values
    setIdDisable(true);
    setValue("orderId", order?.orderId || "New");
    setValue("serial", (order?.orderDetails?.length || 0) + 1);
    setValue("isDetails", true as any);
    setIsDetails(true);

    // Set contact details
    const contact = order?.contactDetails || {};
    setValue("buyer", contact.buyer || "");
    setValue("vendor", contact.vendor || "");
    setValue("buyerRef", contact.buyerRef || "");
    setValue("vendorRef", contact.vendorRef || "");
    setValue("contact", contact.contact || "");
    setValue("sales", contact.sales || "");
    setValue("season", contact.season || "");

    // Set dates with fallbacks
    const formatDate = (dateString: any) => {
      return new Date(dateString).toISOString().split("T")[0];
    };

    const today = new Date().toISOString().split("T")[0];
    setValue(
      "req_date",
      contact.req_date ? (formatDate(contact.req_date) as any) : today
    );
    setValue(
      "orderDate",
      order.orderDate ? (formatDate(order.orderDate) as any) : today
    );

    // Reset form fields based on conditions
    if (isDetails && getValues("serial") !== order?.orderDetails?.length) {
      setValue("order_qty", NaN);
      setValue("size_age", showSize ? "" : "");
      if (!showSize) {
        setValue("page_part", NaN);
      }
    }
    if (isDetails && showSize) {
      setFocus("size_age");
    }
  }, [order]);

  const getProducts = async () => {
    try {
      const { data } = await Axios.put("/order/product", {
        buyer: getValues("buyer"),
        vendor: getValues("vendor"),
        line: getValues("line"),
        category: getValues("category"),
      });
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      (isDetails === true && watch("line") !== "") ||
      (getValues("line") === "" && watch("category")) ||
      getValues("category")
    ) {
      getProducts();
    } else {
      setProducts([]);
    }
    if (getValues("isDetails") === undefined) {
      setValue("isDetails", false as any);
    }
  }, [
    isDetails,
    getValues("line"),
    watch("line"),
    getValues("category"),
    watch("category"),
  ]);

  /* ==================================== */
  /* =========  Updatation ========== */
  const [orderDetails, setOrderDetails] = useState<IOrderDetails | null>(null);

  const handleEnterKey = (e: any) => {
    const serial = e.target.value;
    if (serial && serial > 0) {
      const orderDetailsData = order?.orderDetails.find(
        (val: any) => val.serial === serial
      );
      if (orderDetailsData) {
        setOrderDetails(orderDetailsData);
        setValue("product", orderDetailsData?.product._id as string);
        setValue("line", orderDetailsData?.line as string);
        setValue("category", orderDetailsData?.category as string);
        setValue("desc", orderDetailsData?.desc as string);
        setValue("model", orderDetailsData?.model as string);
        setValue("item_pact_art", orderDetailsData?.item_pact_art as string);
        setValue("style_cc_iman", orderDetailsData?.style_cc_iman as string);
        setValue("gmts_color", orderDetailsData?.gmts_color as string);
        setValue("size_age", orderDetailsData?.size_age as string);
        setValue("ean_number", orderDetailsData?.ean_number as string);
        setValue("order_qty", orderDetailsData?.order_qty as number);
        setValue("order_unit", orderDetailsData?.order_unit as string);
        setValue("page_part", orderDetailsData?.page_part as number);
        setValue(
          "base_qty_full_part",
          orderDetails?.base_qty_full_part as number
        );
        setValue(
          "base_qty_half_part",
          orderDetails?.base_qty_half_part as number
        );

        setShowSize(orderDetailsData?.size_age ? true : false);

        setSelectedDesc(orderDetailsData?.product);
      }
    }
  };

  return (
    <div className="flex  relative bg-white">
      <div className="w-[93%]  px-3 pt-12 min-h-dvh">
        <div className="flex justify-between w-full border-[1px] border-[#b3b3b3]  p-2">
          <div className="fieldset w-2/12">
            <legend className="fieldset-legend">Order Number</legend>
            <input
              type="text"
              className="input w-full focus:outline-none focus:ring-0"
              defaultValue={"New"}
              {...orderRegister("orderId")}
              disabled={idDisable}
            />
          </div>
          <div className="fieldset w-2/12">
            <legend className="fieldset-legend">Order Date</legend>
            <input
              type="date"
              className="input w-full focus:outline-none focus:ring-0  "
              defaultValue={new Date(Date.now()).toISOString().split("T")[0]}
              {...orderRegister("orderDate")}
              disabled={isDetails === true}
            />
          </div>
          {order?.status.mode === "Validated" && (
            <div className="fieldset w-1/12">
              <legend className="fieldset-legend">Order Bag</legend>
              <button className="border border-[#b3b3b3] text-[#333333] rounded-sm px-4 py-2 text-sm  cursor-pointer  font-bold">
                Job Bag
              </button>
            </div>
          )}
          <div className="fieldset w-2/12">
            <legend className="fieldset-legend">Batch Job Bag</legend>
            <select className="focus:outline-none focus:ring-0  select">
              <option>Model</option>
              <option>Pack/Art/Item</option>
              <option>Style/CC/Item</option>
            </select>
          </div>
          <div className="fieldset w-2/12">
            <legend className="fieldset-legend">Status</legend>
            <button className="border border-black rounded-sm px-4 py-2 text-sm  cursor-pointer bg-red-300 font-bold">
              Entry Mode
            </button>
          </div>
        </div>
        <div className="border-[1px] border-[#b3b3b3]  p-2 mt-1">
          <div className="flex items-center flex-wrap justify-between">
            <div className="fieldset w-3/12">
              <legend className="fieldset-legend">Buyer Name</legend>
              <select
                {...orderRegister("buyer")}
                onChange={handleShowBuyerChange}
                className="w-11/12 focus:outline-none focus:ring-0  select"
                disabled={isDetails === true}
                // disabled={productStatus === "Entry Mode" ? false : true}
              >
                {organization ? (
                  <option value="" className="hidden"></option>
                ) : (
                  <option
                    value={
                      order?.contactDetails.buyer && order.contactDetails.buyer
                    }
                  >
                    {order?.contactDetails.buyer && order.contactDetails.buyer}
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
              <legend className="fieldset-legend">Buyer Order Ref</legend>
              <input
                type="text"
                className="w-11/12 focus:outline-none focus:ring-0 input "
                {...orderRegister("buyerRef")}
                disabled={isDetails === true}
              />
            </div>
            <div className="fieldset w-3/12">
              <legend className="fieldset-legend">CS Contact Name</legend>
              <select
                {...orderRegister("sales")}
                className="w-11/12 focus:outline-none focus:ring-0  select"
                disabled={isDetails === true}
              >
                <option value="" className="hidden"></option>
                <option>Pantha Acharjee</option>
                <option>Kawser Ahmed</option>
                <option>Hasib Bin Hannan</option>
                <option>Shuvonkor Roy Chodhury</option>
              </select>
            </div>
            <div className="fieldset w-3/12">
              <legend className="fieldset-legend">Req. Delivary Date</legend>
              <input
                type="date"
                className="w-11/12 focus:outline-none focus:ring-0 input"
                defaultValue={
                  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
                {...orderRegister("req_date")}
                disabled={isDetails === true}
              />
            </div>
            <div className="fieldset w-3/12">
              <legend className="fieldset-legend">Vendor Name</legend>
              <select
                value={
                  showSelectedVendor?.title ||
                  (order ? order.contactDetails.vendor : "")
                }
                onChange={handleShowVendorChange}
                className="w-11/12 focus:outline-none focus:ring-0  select"
                disabled={isDetails === true}
                // disabled={productStatus === "Entry Mode" ? false : true}
              >
                {showSelectedBuyer ? (
                  <option value="" className="hidden"></option>
                ) : (
                  getValues("buyer") !== "" &&
                  getValues("buyer") === order?.contactDetails?.buyer &&
                  order?.contactDetails?.vendor && (
                    <option
                      value={
                        order?.contactDetails && order?.contactDetails.vendor
                      }
                    >
                      {order?.contactDetails && order?.contactDetails.vendor}
                    </option>
                  )
                )}
                {showSelectedBuyer?.vendor?.map((val: any, ind: any) => {
                  return (
                    <option key={ind} value={val.title}>
                      {val.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="fieldset w-3/12">
              <legend className="fieldset-legend">Vendor Order Ref</legend>
              <input
                type="text"
                className="w-11/12 focus:outline-none focus:ring-0 input "
                {...orderRegister("vendorRef")}
                disabled={isDetails === true}
              />
            </div>
            <div className="fieldset w-3/12">
              <legend className="fieldset-legend">Vendor Contact Person</legend>
              <select
                value={showSelectedContact?.name || ""}
                onChange={handleShowContactChange}
                className="w-11/12 focus:outline-none focus:ring-0  select"
                disabled={isDetails === true}
                // disabled={productStatus === "Entry Mode" ? false : true}
              >
                {showSelectedVendor ? (
                  <option value="" className="hidden"></option>
                ) : (
                  getValues("vendor") !== "" &&
                  getValues("vendor") === order?.contactDetails?.vendor &&
                  order?.contactDetails?.contact && (
                    <option value={order.contactDetails.contact}>
                      {order.contactDetails.contact}
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
              <legend className="fieldset-legend">Season/Program</legend>
              <select
                {...orderRegister("season")}
                className="w-11/12 focus:outline-none focus:ring-0  select"
                disabled={isDetails === true}
              >
                {showSelectedVendor ? (
                  <option value="" className="hidden"></option>
                ) : (
                  getValues("vendor") !== "" &&
                  getValues("vendor") === order?.contactDetails?.vendor &&
                  order?.contactDetails?.season && (
                    <option value={order.contactDetails.season}>
                      {order.contactDetails.season}
                    </option>
                  )
                )}
                {showSelectedVendor &&
                  showSelectedVendor.program &&
                  showSelectedVendor?.program?.map((val: any, ind: any) => {
                    return <option key={ind}>{val.name}</option>;
                  })}
              </select>
            </div>
            <div className="flex w-full mt-4">
              <p
                onClick={handleAttachFile}
                className="py-2 px-4 border-[1px] border-[#b3b3b3] w-3/12 text-center cursor-pointer text-sm font-bold"
              >
                Attach Booking Sheet
              </p>
              <div className="w-8/12 py-4 px-4  border-[1px] border-[#b3b3b3] ml-4"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-between my-4">
          <div className="flex items-center w-3/12">
            <input
              type="checkbox"
              checked={isDetails}
              onChange={() => handleDetailCheck()}
              className="checkbox"
            />
            <p className="font-bold text-sm ml-2">Order Details</p>
          </div>

          <div className="flex w-9/12 items-center justify-end">
            {selectedDesc?.p_id && (
              <div className="flex items-center text-xs mr-10">
                <p className="mr-2">Product ID: </p>
                <p className=" text-cyan-900 font-bold">{selectedDesc?.p_id}</p>
              </div>
            )}
            <p className="text-xs">Total Booking Qty</p>
            <div className="border-[1px] border-[#b3b3b3]   w-2/12 ml-3 input text-right">
              <p className="text-md text-right font-medium w-full">
                {book_quantity &&
                  book_quantity > 0 &&
                  book_quantity?.toLocaleString("en-US")}
              </p>
            </div>
            <p className="text-xs ml-3">Total Base Qty</p>
            <div className="border-[1px] border-[#b3b3b3]  w-2/12 ml-3 input text-right">
              <p className="text-md text-right font-medium w-full">
                {total_base_qty > 0
                  ? total_base_qty.toLocaleString("en-US")
                  : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="border-[1px] border-[#b3b3b3]  p-2 mt-1">
          <div className="flex flex-wrap justify-between ">
            <div className=" w-3/12 ">
              <div className="border-[1px] border-[#b3b3b3] w-11/12 h-full flex justify-center items-center">
                <img src={selectedDesc?.image?.url} alt="" />
              </div>
            </div>
            <div className="w-9/12 flex flex-wrap h-fit">
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Product Line</legend>
                <select
                  {...orderRegister("line")}
                  onChange={handleLineChange}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                  disabled={isDetails === false}
                >
                  <option value="" className="hidden"></option>
                  {getLine?.map((val: any, ind: any) => {
                    return (
                      <option key={ind} value={val.name}>
                        {val.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Product Category</legend>
                <select
                  value={selectedCategory || ""}
                  onChange={handleCategoryChange}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                  disabled={isDetails === false || orderDetails ? true : false}
                >
                  {orderDetails ? (
                    <option value={orderDetails.category}>
                      {orderDetails?.category}
                    </option>
                  ) : (
                    <option value="" className="hidden"></option>
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
              <div className="fieldset w-5/12">
                <legend className="fieldset-legend">Product Description</legend>
                {orderDetails ? (
                  <input
                    className="w-11/12 focus:outline-none focus:ring-0  select"
                    disabled
                    value={orderDetails?.desc}
                  />
                ) : (
                  <select
                    className="w-11/12 focus:outline-none focus:ring-0  select"
                    {...orderRegister("desc")}
                    onChange={(e) => handleDescChange(e)}
                    disabled={
                      isDetails === false || orderDetails ? true : false
                    }
                  >
                    <option value="" className="hidden"></option>
                    {products &&
                      products.map((val: any, ind: any) => {
                        return (
                          <option key={ind} value={val.product.desc}>
                            {val.product.desc}
                          </option>
                        );
                      })}
                  </select>
                )}
              </div>
              <div className="fieldset w-1/12">
                <legend className="fieldset-legend">SL No.</legend>
                <input
                  type="number"
                  className="w-10/12 focus:outline-none focus:ring-0 input flex justify-items-center"
                  disabled={isDetails === false}
                  {...orderRegister("serial")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEnterKey(e);
                    }
                  }}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Model Code</legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  disabled={isDetails === false}
                  {...orderRegister("model")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Item/Pack/Art</legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  disabled={isDetails === false}
                  {...orderRegister("item_pact_art")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Style/CC/Iman</legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  disabled={isDetails === false}
                  {...orderRegister("style_cc_iman")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Variable</legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input "
                  disabled={isDetails === false}
                  {...orderRegister("variable")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Gmts Color</legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  disabled={isDetails === false}
                  {...orderRegister("gmts_color")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Size/Age</legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input "
                  disabled={isDetails === false || showSize === false}
                  {...orderRegister("size_age")}
                />
              </div>
              <div className="fieldset w-4/12">
                <legend className="fieldset-legend">Ean Number</legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  disabled={isDetails === false}
                  {...orderRegister("ean_number")}
                />
              </div>
              <div className="fieldset w-2/12 flex items-center mt-8">
                <legend className="fieldset-legend mr-3">Add Size</legend>
                <input
                  type="checkbox"
                  className="checkbox"
                  onClick={() => {
                    setShowSize(!showSize);
                    setValue("size_age", "");
                    setValue("isSize", !showSize);
                  }}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Order Quantity</legend>
                <input
                  type="number"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  disabled={isDetails === false}
                  {...orderRegister("order_qty")}
                />
              </div>
              <div className="fieldset w-2/12">
                <legend className="fieldset-legend">Order Unit</legend>
                <select
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                  disabled={isDetails === false}
                  {...orderRegister("order_unit")}
                  value={
                    getValues("order_unit")
                      ? getValues("order_unit")
                      : orderDetails
                      ? orderDetails.order_unit
                      : ""
                  }
                  onChange={handleOrderUnit}
                >
                  <option value="" className="hidden"></option>
                  <option value={"Pcs"}>Pcs</option>
                  <option value={"Pair"}>Pair</option>
                  <option value={"Dz"}>Dz</option>
                  {selectedDesc?.dimensionDetails.set === (true as any) && (
                    <option value={"Set"}>Set</option>
                  )}
                </select>
              </div>
              <div className="fieldset w-1/12">
                <legend className="fieldset-legend">Page/Part</legend>
                <input
                  type="number"
                  className="w-11/12 focus:outline-none focus:ring-0 input text-center"
                  disabled={isDetails === false || orderUnit !== "Set"}
                  {...orderRegister("page_part")}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Base Qty (Full Part)
                </legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  disabled
                  {...orderRegister("base_qty_full_part")}
                  value={orderDetails ? orderDetails?.base_qty_full_part : ""}
                  onChange={(e) => e.target.value}
                />
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Base Qty (Half Part)
                </legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  disabled
                  {...orderRegister("base_qty_half_part")}
                  value={orderDetails ? orderDetails?.base_qty_half_part : ""}
                  onChange={(e) => e.target.value}
                />
              </div>
              <div className="fieldset w-2/12">
                <legend className="fieldset-legend">Prdouct Weight</legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  disabled
                  defaultValue={selectedDesc?.weight.weight_value}
                />
              </div>

              <div className="fieldset w-2/12">
                <legend className="fieldset-legend">Weight Unit</legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  disabled
                  defaultValue={selectedDesc?.weight.weight_unit}
                />
              </div>
              <div className="fieldset w-2/12">
                <legend className="fieldset-legend">Width</legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  disabled
                  defaultValue={selectedDesc?.dimensionDetails.measure.width}
                />
              </div>
              <div className="fieldset w-2/12">
                <legend className="fieldset-legend">Length</legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  disabled
                  defaultValue={selectedDesc?.dimensionDetails.measure.length}
                />
              </div>
              <div className="fieldset w-2/12">
                <legend className="fieldset-legend">Height</legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  disabled
                  defaultValue={selectedDesc?.dimensionDetails.measure.height}
                />
              </div>
              <div className="fieldset w-2/12">
                <legend className="fieldset-legend">Dimension Unit</legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  disabled
                  defaultValue={
                    selectedDesc &&
                    selectedDesc?.dimensionDetails.measure.dimension_unit
                  }
                />
              </div>
            </div>
            <div className="flex w-full mt-4">
              <p
                onClick={handleAttachArtwork}
                className="py-2 px-4 border-[1px] border-[#b3b3b3] w-3/12 text-center cursor-pointer text-sm font-bold"
              >
                Attach Artwork
              </p>
              <div className="w-8/12 py-4 px-4  border-[1px] border-[#b3b3b3] ml-4"></div>
            </div>
          </div>
        </div>
        <div className="border-[1px] border-[#b3b3b3] mt-2 mb-3">
          <div className="">
            <div className="border border-gray-200 overflow-hidden">
              <div className="overflow-auto h-60">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-24">
                        SL No.
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-48">
                        Product Description
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                        Size/Age
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-40">
                        Style/Iman/CC
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-40">
                        Pack/Article/Item
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                        Model Code
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-36">
                        Product Id
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                        Gmts Colour
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                        Ean
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                        Booking Qty
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                        Order Unit
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                        Page/Part
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                        Base Full
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-32">
                        Base Half
                      </th>
                    </tr>
                  </thead>

                  {/* Scrollable Body */}
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reversedOrderDetails?.map((val, index) => (
                      <tr key={index} className="hover:bg-gray-50 h-12">
                        <td className="px-4 py-3 text-sm text-gray-900 align-middle h-12">
                          {val.serial}
                        </td>
                        <td
                          className="px-4 py-3 text-sm text-gray-900 align-middle h-12 truncate"
                          title={val.desc}
                        >
                          {val.desc || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 align-middle h-12">
                          {val.size_age || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 align-middle h-12">
                          {val.style_cc_iman || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 align-middle h-12">
                          {val.item_pact_art || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 align-middle h-12">
                          {val.model || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 align-middle h-12">
                          {val.product.p_id || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 align-middle h-12">
                          {val.gmts_color || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 align-middle h-12">
                          {val.ean_number || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 align-middle h-12">
                          {val.order_qty || "0"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 align-middle h-12">
                          {val.order_unit || ""}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 align-middle h-12">
                          {val.page_part || "0"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 align-middle h-12">
                          {val.base_qty_full_part || "0"}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 align-middle h-12">
                          {val.base_qty_half_part || "0"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[7%] bg-[#d3e6ec]  min-h-screen pt-14 px-2">
        <OrganizationMenu tab={tab} setTab={setTab} props={props} />
      </div>
      <dialog id="my_modal_1" className="modal w-full">
        <AttachOrderFile
          orderId={getValues("orderId")}
          order_date={getValues("orderDate")}
          buyer={getValues("buyer")}
          vendor={getValues("vendor")}
          sales={getValues("sales")}
          cs={getValues("contact")}
          season={getValues("season")}
          req_date={getValues("req_date")}
        />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="my_modal_2" className="modal w-full">
        <AttachArtworkFile />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default OrderCreate;
