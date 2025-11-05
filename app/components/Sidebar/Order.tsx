import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AddTabDataRequest,
  AddTabDataSuccess,
} from "@/app/redux/reducers/tabReducer";
import { RootState } from "@/app/redux/rootReducer";
import { OrderManagementData } from "./SidebarData";
import { ClearUserSuccess } from "@/app/redux/reducers/HrReducer";

/* ============ REACT ICONS ===== ======== */
import {
  FaRegArrowAltCircleLeft,
  FaStar,
  FaShippingFast,
} from "react-icons/fa";
import { Si1001Tracklists } from "react-icons/si";
import { IoDocumentOutline } from "react-icons/io5";
import {
  LiaFileInvoiceDollarSolid,
  LiaShippingFastSolid,
} from "react-icons/lia";
import { MdPayments } from "react-icons/md";

interface tabStateData {
  title: string;
  icon: string;
  element: string;
}

const Order = ({ setSidebar, setSelected, setTab }: any) => {
  const dispatch = useDispatch();
  const { items, content } = useSelector((state: RootState) => state.tab);
  const closeFunc = () => {
    setSelected(undefined);
    setSidebar(false);
  };

  const setupFunc = (dataProps: tabStateData) => {
    setSelected(undefined);
    setSidebar(false);
    dispatch(AddTabDataRequest());
    dispatch(ClearUserSuccess());
    const sameTab = items.filter((val: any) => val.title === dataProps.title);
    if (sameTab.length === 0) {
      const id = `Tab-${Date.now()}`;
      const data = {
        loading: false,
        items: [
          ...items,
          {
            id,
            title: dataProps.title,
            icon: dataProps.icon,
          },
        ],
        content: [
          ...content,
          {
            id,
            element: dataProps.element,
          },
        ],
      };
      localStorage.setItem("tabData", JSON.stringify(data));
      dispatch(AddTabDataSuccess(data));
    } else {
      setTab(sameTab[0].id);
    }
  };
  const reportFunc = () => {
    setSelected(undefined);
    setSidebar(false);
  };
  return (
    <div className="px-4 py-8 relative">
      <button
        onClick={closeFunc}
        className="bg-black text-white text-4xl p-1 fixed right-10 cursor-pointer select-none rounded-lg"
      >
        <FaRegArrowAltCircleLeft />
      </button>
      <div className="flex">
        <div className="w-[230px]">
          <p className="text-white text-xs font-bold text-shadow-2xl text-shadow-black uppercase text-center">
            Order Management
          </p>
          <div className="mt-5">
            <div
              onClick={() => setupFunc(OrderManagementData[0])}
              className=" sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  shadow-md"
            >
              <p className="text-xl">
                <LiaShippingFastSolid />
              </p>
              <p className="ml-2 text-xs cursor-default">Order Create</p>
              <p className=" sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer">
                <FaStar />
              </p>
            </div>
            <div
              onClick={() => setupFunc(OrderManagementData[1])}
              className=" sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  mt-4 shadow-md"
            >
              <p className="text-xl">
                <FaShippingFast />
              </p>
              <p className="ml-2 text-xs cursor-default">Sample Order</p>
              <p className=" sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer">
                <FaStar />
              </p>
            </div>
            <div
              onClick={() => setupFunc(OrderManagementData[2])}
              className=" sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  mt-4 shadow-md"
            >
              <p className="text-xl">
                <Si1001Tracklists />
              </p>
              <p className="ml-2 text-xs cursor-default">Order Tracking</p>
              <p className=" sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer">
                <FaStar />
              </p>
            </div>
          </div>
        </div>
        <div className="w-[230px] ml-4">
          <p className="text-white text-xs font-bold text-shadow-2xl text-shadow-black uppercase text-center">
            Bill Management
          </p>
          <div className="mt-5">
            <div
              onClick={() => setupFunc(OrderManagementData[3])}
              className=" sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  shadow-md"
            >
              <p className="text-xl">
                <LiaFileInvoiceDollarSolid />
              </p>
              <p className="ml-2 text-xs cursor-default">Proforma Invoice</p>
              <p className=" sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer">
                <FaStar />
              </p>
            </div>
            <div
              onClick={() => setupFunc(OrderManagementData[4])}
              className=" sidebar-content-div hover:bg-[#13a7ec] flex justify-between items-center  bg-black text-white uppercase font-semibold w-full px-4 py-2 rounded-lg  mt-4 shadow-md"
            >
              <p className="text-xl">
                <MdPayments />
              </p>
              <p className="ml-2 text-xs cursor-default">Bill Preparation</p>
              <p className=" sidebar-content-div-p text-md hover:text-yellow-300 cursor-pointer">
                <FaStar />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-10">
        <div className="w-[230px]">
          <p className="text-white text-xs font-bold uppercase text-center">
            Reports
          </p>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
        </div>
        <div className="w-[230px] ml-4">
          <p className="text-white text-xs font-bold uppercase text-center">
            Reports
          </p>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
        </div>
        <div className="w-[230px] ml-4">
          <p className="text-white text-xs font-bold uppercase text-center">
            Reports
          </p>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
        </div>
        <div className="w-[230px] ml-4">
          <p className="text-white text-xs font-bold uppercase text-center">
            Reports
          </p>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
          <div
            onClick={() => reportFunc()}
            className="flex justify-between items-center  bg-white text-black uppercase font-semibold w-full px-4 py-2 rounded-lg shadow-md mt-6"
          >
            <p className="text-xl">
              <IoDocumentOutline />
            </p>
            <p className="ml-2 text-xs cursor-default">Order Report</p>
            <p className=" text-md hover:text-yellow-300 cursor-pointer">
              <FaStar />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
