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
  ClearProductRefresh,
  ClearProductSuccess,
  ProductFail,
  ProductRequest,
  ProductSuccess,
} from "@/app/redux/reducers/productReducer";

const ProductCreateMenu = ({
  setValue,
  setIdDisable,
  setProductProcess,
  setShowSelectedBuyer,
  setShowSelectedVendor,
  setShowSelectedContact,
  setSelectedLine,
  setSelectedCategory,
  getValues,
  tab,
  setTab,
  props,
  setFocus,
  setProductStatus,
  setProductImage,
  id,
}: any) => {
  const dispatch = useDispatch();
  const { items, content } = useSelector((state: RootState) => state.tab);

  const handleRefresh = () => {
    setIdDisable(false);
    setProductProcess(false);
    setValue("p_id", "New");
    setValue(
      "recieve",
      new Date(Date.now()).toISOString().split("T")[0] as any
    );
    setValue(
      "last_price",
      new Date(Date.now()).toISOString().split("T")[0] as any
    );
    setValue(
      "sample_date",
      new Date(Date.now()).toISOString().split("T")[0] as any
    );
    setValue("buyer", "");
    setValue("vendor", "");
    setValue("contact", "");
    setValue("sales", "");
    setValue("line", "");
    setValue("category", "");
    setValue("desc", "");
    setValue("hs_code", "");
    setValue("code", "");
    setValue("ref", "");
    setValue("height", NaN);
    setValue("width", NaN);
    setValue("length", NaN);
    setValue("dimension_unit", "");
    setValue("page_part", "");
    setValue("set", "false");
    setValue("weight", NaN);
    setValue("weight_unit", "");
    setValue("weight_per_pcs", "");
    setValue("order_unit", "");
    setValue("moq", NaN);
    setValue("moq_unit", "");
    setValue("currency", "");
    setValue("price_unit", "");
    setValue("full_part", NaN);
    setValue("half_part", NaN);
    setValue("comments", "");
    setProductImage(undefined);

    setShowSelectedBuyer(undefined);
    setShowSelectedContact(undefined);
    setShowSelectedVendor(undefined);
    setSelectedLine(undefined);
    setSelectedCategory(undefined);
    setProductStatus("Entry Mode");

    dispatch(ClearProductRefresh());
  };

  const handleSaveButton = async () => {
    if (getValues("p_id") === "New") {
      if (getValues("buyer") === "") {
        return setFocus("buyer");
      }
      if (getValues("sales") === "") {
        return setFocus("sales");
      }
    } else {
      try {
        dispatch(ClearProductSuccess());
        dispatch(ProductRequest());
        const config = { headers: { "Content-Type": "application/json" } };
        const userData = {
          p_id: getValues("p_id"),
          recieve: getValues("recieve"),
          buyer: getValues("buyer"),
          vendor: getValues("vendor"),
          contact: getValues("contact"),
          sales: getValues("sales"),
          line: getValues("line"),
          category: getValues("category"),
          desc: getValues("desc"),
          ref: getValues("ref"),
          code: getValues("code"),
          hs_code: getValues("hs_code"),
          height: getValues("height"),
          width: getValues("width"),
          length: getValues("length"),
          dimension_unit: getValues("dimension_unit"),
          page_part: getValues("page_part"),
          set: getValues("set"),
          weight: getValues("weight"),
          weight_per_pcs: getValues("weight_per_pcs"),
          weight_unit: getValues("weight_unit"),
          order_unit: getValues("order_unit"),
          moq: getValues("moq"),
          moq_unit: getValues("moq_unit"),
          last_price: getValues("last_price"),
          currency: getValues("currency"),
          full_part: getValues("full_part"),
          half_part: getValues("half_part"),
          price_unit: getValues("price_unit"),
          sample_date: getValues("sample_date"),
          comments: getValues("comments"),
        };
        const { data } = await Axios.post(
          `/create/product`,

          userData,
          config
        );
        dispatch(ProductSuccess(data));
      } catch (err: any) {
        dispatch(ProductFail(err.response.data.message));
      }
    }
  };

  const handleCloseButton = () => {
    setIdDisable(false);
    setProductProcess(false);
    setValue("p_id", "New");

    setValue(
      "recieve",
      new Date(Date.now()).toISOString().split("T")[0] as any
    );
    setValue(
      "last_price",
      new Date(Date.now()).toISOString().split("T")[0] as any
    );
    setValue(
      "sample_date",
      new Date(Date.now()).toISOString().split("T")[0] as any
    );

    setValue("buyer", "");
    setValue("vendor", "");
    setValue("contact", "");
    setValue("sales", "");
    setValue("line", "");
    setValue("category", "");
    setValue("desc", "");
    setValue("hs_code", "");
    setValue("code", "");
    setValue("ref", "");
    setValue("height", NaN);
    setValue("width", NaN);
    setValue("length", NaN);
    setValue("dimension_unit", "");
    setValue("page_part", "");
    setValue("set", "false");
    setValue("weight", NaN);
    setValue("weight_unit", "");
    setValue("weight_per_pcs", "");
    setValue("order_unit", "");
    setValue("moq", NaN);
    setValue("moq_unit", "");
    setValue("currency", "");
    setValue("price_unit", "");
    setValue("full_part", NaN);
    setValue("half_part", NaN);
    setValue("comments", "");

    setShowSelectedBuyer(undefined);
    setShowSelectedContact(undefined);
    setShowSelectedVendor(undefined);
    setSelectedLine(undefined);
    setSelectedCategory(undefined);

    dispatch(ClearProductRefresh());
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

  useEffect(() => {}, []);

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
        onClick={handleCloseButton}
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
          <IoIosPrint />
        </p>
        <p className="text-xs mt-1 cursor-pointer">Print</p>
      </div>
      <div
        onClick={handleDownload}
        className="bg-[#e0eef2] border-2 border-blue-100 px-3 py-2 rounded-lg flex items-center flex-col cursor-pointer hover:bg-[#96c8dc] mt-4"
      >
        <p className="text-2xl">
          <LuDownload />
        </p>
        <p className="text-xs mt-1 cursor-pointer">Download</p>
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

export default ProductCreateMenu;

// import React from "react";

// const ProductCreateMenu = ({
//   setValue,
//   setIdDisable,
//   setShowSelectedVendor,
//   setShowSelectedContact,
//   getValues,
//   tab,
//   setTab,
//   props,
//   setFocus,
//   product,
// }: any) => {
//   return <div></div>;
// };

// export default ProductCreateMenu;
