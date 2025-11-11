import {
  ClearUserSuccess,
  UserCreateAndUpdateFail,
  UserCreateAndUpdateRequest,
  UserCreateAndUpdateSuccess,
} from "@/app/redux/reducers/HrReducer";
import React, { useEffect } from "react";
import { FaRegCopy } from "react-icons/fa";
import { IoIosMail, IoIosPrint, IoMdClose, IoMdSave } from "react-icons/io";
import { LuDownload } from "react-icons/lu";
import { RiRefreshLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../Axios";
import { RootState } from "@/app/redux/rootReducer";
import {
  RemoveTabRequest,
  RemoveTabSuccess,
} from "@/app/redux/reducers/tabReducer";
import { toast } from "react-toastify";
import {
  ClearOrderRefresh,
  OrderFail,
  OrderRequest,
  OrderSuccess,
} from "@/app/redux/reducers/orderReducer";
import { FcSearch } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";

const OrganizationMenu = ({
  setValue,
  setIdDisable,
  setIsDetails,
  setShowSelectedVendor,
  setShowSelectedContact,
  setSelectedCategory,
  getValues,
  isDetails,
  setFocus,
  showSize,
  setOrderDetails,
  setShowSize,
  setSelectedDesc,
  setOrderStatus,
  tab,
  setTab,
  props,
  id,
  user,
}: any) => {
  const dispatch = useDispatch();
  const { items, content } = useSelector((state: RootState) => state.tab);

  const handleRefresh = () => {
    setIdDisable(false);
    setValue("orderId", "New");
    setValue("serial", 1);
    setValue("isDetails", false as any);
    setIsDetails(false);

    setValue("buyer", "");
    setValue("vendor", "");
    setValue("buyerRef", "");
    setValue("vendorRef", "");
    setValue("contact", "");
    setValue("sales", "");
    setValue("season", "");
    setShowSelectedVendor(undefined);
    setShowSelectedContact(undefined);
    setSelectedCategory(undefined);
    setOrderDetails(null);
    // Set dates with fallbacks
    const formatDate = (dateString: any) => {
      return new Date(dateString).toISOString().split("T")[0];
    };

    const today = new Date().toISOString().split("T")[0];
    setValue("req_date", today);
    setValue("orderDate", today);

    setValue("batchJob", "None");
    setOrderStatus("Entry Mode");

    setValue("product", "");
    setValue("line", "");
    setValue("category", "");
    setValue("desc", "");
    setValue("model", "");
    setValue("item_pact_art", "");
    setValue("style_cc_iman", "");
    setValue("gmts_color", "");
    setValue("size_age", "");
    setValue("ean_number", "");
    setValue("order_qty", NaN);
    setValue("order_unit", "");
    setValue("page_part", NaN);
    setValue("base_qty_full_part", NaN);
    setValue("base_qty_half_part", NaN);

    setShowSize(false);

    setSelectedDesc(undefined);
    dispatch(ClearOrderRefresh());
  };

  const handleClose = () => {
    dispatch(RemoveTabRequest());
    const data = {
      loading: false,
      items: items.filter((val: any) => val.id !== props.id),
      content: content.filter((val: any) => val.id !== props.id),
    };
    localStorage.setItem("tabData", JSON.stringify(data));
    dispatch(RemoveTabSuccess(data));
    if (tab !== props.id) {
      setTab(tab);
    }
    if (tab === props.id) {
      const index = items.findIndex((val: any) => val.id === props.id);
      setTab(items[index - 1].id);
    }

    setIdDisable(false);
    setValue("orderId", "New");
    setValue("serial", 1);
    setValue("isDetails", false as any);
    setIsDetails(false);

    setValue("buyer", "");
    setValue("vendor", "");
    setValue("buyerRef", "");
    setValue("vendorRef", "");
    setValue("contact", "");
    setValue("sales", "");
    setValue("season", "");
    setShowSelectedVendor(undefined);
    setShowSelectedContact(undefined);

    // Set dates with fallbacks
    const formatDate = (dateString: any) => {
      return new Date(dateString).toISOString().split("T")[0];
    };

    const today = new Date().toISOString().split("T")[0];
    setValue("req_date", today);
    setValue("orderDate", today);

    setValue("batchJob", "None");
    setOrderStatus("Entry Mode");
    dispatch(ClearOrderRefresh());
  };

  const handleSaveButton = async () => {
    const userData = {
      orderId: getValues("orderId"),
      orderDate: getValues("orderDate"),
      buyer: getValues("buyer"),
      buyerRef: getValues("buyerRef"),
      vendor: getValues("vendor"),
      vendorRef: getValues("vendorRef"),
      contact: getValues("contact"),
      sales: getValues("sales"),
      req_date: getValues("req_date"),
      season: getValues("season"),
      serial: getValues("serial"),
      product: getValues("product"),
      line: getValues("line"),
      category: getValues("category"),
      desc: getValues("desc"),
      model: getValues("model"),
      item_pact_art: getValues("item_pact_art"),
      style_cc_iman: getValues("style_cc_iman"),
      variable: getValues("variable"),
      gmts_color: getValues("gmts_color"),
      size_age: getValues("size_age"),
      ean_number: getValues("ean_number"),
      order_qty: Number(getValues("order_qty")),
      order_unit: getValues("order_unit"),
      page_part: Number(getValues("page_part")),
      base_qty_full_part:
        Number(
          (getValues("order_qty") * parseInt(getValues("page_part"))) as any
        ) || 0,
      base_qty_half_part: isFloat(Number(getValues("page_part")))
        ? Number(getValues("order_qty"))
        : 0,
      isDetails: getValues("isDetails"),
    };

    function isFloat(value: number) {
      return (
        typeof value === "number" && !isNaN(value) && !Number.isInteger(value)
      );
    }

    const validateFields = () => {
      if (getValues("orderId") === "New") {
        if (getValues("buyer") === "") return setFocus("buyer");
        if (getValues("sales") === "") return setFocus("sales");
      }

      if (getValues("isDetails") && getValues("orderId") !== "New") {
        if (getValues("desc") === "") return setFocus("desc");
        if (getValues("isSize") === true && getValues("size_age") === "") {
          return setFocus("size_age");
        }
        if (isNaN(getValues("order_qty")) || getValues("order_qty") < 1)
          return setFocus("order_qty");
        if (getValues("order_unit") === "") return setFocus("order_unit");
        if (
          isNaN(getValues("page_part")) ||
          (getValues("order_unit") === "Set" && getValues("page_part") < 1)
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

    if (getValues("orderId") === "New" && isDetails === false) {
      await submitOrder();
      console.log("hjhj");
    } else if (getValues("orderId") !== "New") {
      if (!isDetails) {
        await submitOrder();
        if (showSize) {
          setFocus("size_age");
        }
      } else {
        await submitOrder();
      }
    } else {
      await submitOrder();
    }
  };

  const handlePrint = async () => {
    if (getValues("p_id") === "New") {
      return toast("PRODUCT NOT FOUND");
    } else {
      try {
        const response = await Axios.get(`/product/details/${id}`, {
          responseType: "blob",
        });

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        // Open in new window with proper null checks
        const printWindow = window.open(url);

        if (printWindow) {
          // Add event listener for when the window loads
          printWindow.addEventListener(
            "load",
            () => {
              // Additional safety check
              if (!printWindow.closed) {
                printWindow.print();
              }
            },
            { once: true }
          );

          // Fallback in case the load event doesn't fire
          setTimeout(() => {
            if (printWindow && !printWindow.closed) {
              printWindow.print();
            }
          }, 1000);
        } else {
          // Popup was blocked - use iframe fallback
          const iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.src = url;
          document.body.appendChild(iframe);

          iframe.onload = () => {
            setTimeout(() => {
              iframe.contentWindow?.print();
              // Clean up
              window.URL.revokeObjectURL(url);
              document.body.removeChild(iframe);
            }, 1000);
          };
        }

        // Cleanup URL object after printing
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 10000);
      } catch (err) {
        console.error("Error handling PDF:", err);
        // Add user feedback here
      }
    }
  };

  const handleDownload = async () => {
    try {
      const response = await Axios.get(`/product/details/${id}`, {
        responseType: "blob", // Important for binary data
      });
      // Create a blob URL for the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `prdocut-details.pdf`);
      document.body.appendChild(link);
      link.click();
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading PDF:", err);
    }
  };

  return (
    <div>
      <div
        onClick={handleRefresh}
        className="bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc]"
      >
        <p className="text-2xl">
          <RiRefreshLine />
        </p>
        <p className="text-xs mt-1 cursor-pointer">Refresh</p>
      </div>
      <div
        onClick={handleClose}
        className="bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4"
      >
        <p className="text-2xl">
          <IoMdClose />
        </p>
        <p className="text-xs mt-1 cursor-pointer">Close</p>
      </div>
      <div
        onClick={handleSaveButton}
        className="bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4"
      >
        <div className="tooltip tooltip-left" data-tip="Ctrl + S Or Enter">
          <p className="text-2xl">
            <IoMdSave />
          </p>
          <p className="text-xs mt-1 cursor-pointer">Save</p>
        </div>
      </div>
      <div
        onClick={handlePrint}
        className="bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4"
      >
        <p className="text-2xl">
          <FcSearch />
        </p>
        <p className="text-xs mt-1 cursor-pointer">Preview</p>
      </div>
      <div
        onClick={handleDownload}
        className="bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4"
      >
        <p className="text-2xl">
          <MdDeleteForever />
        </p>
        <p className="text-xs mt-1 cursor-pointer">Delete</p>
      </div>

      <div className="bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4">
        <p className="text-2xl">
          <IoIosMail />
        </p>
        <p className="text-xs mt-1 cursor-pointer">Mail</p>
      </div>
    </div>
  );
};

export default OrganizationMenu;
