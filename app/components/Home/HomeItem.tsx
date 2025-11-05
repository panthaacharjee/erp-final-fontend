import React from "react";
import HomeContent from "./Content/HomeContent";
import { TiHome } from "react-icons/ti";
import UserCreateContent from "./Content/UserCreateContent";
import { FaRegMoneyBillAlt, FaUserCheck, FaUserEdit } from "react-icons/fa";
import Attendence from "./Content/Attendence";
import SalaryCreate from "./Content/SalaryCreate";
import ProductCreate from "./Content/ProductCreate";
import SampleProduct from "./Content/SampleProduct";
import ProductApproval from "./Content/ProductApproval";
import { PiHandWithdraw } from "react-icons/pi";
import { TiSocialDribbbleCircular } from "react-icons/ti";
import { FcApproval, FcProcess, FcViewDetails } from "react-icons/fc";
import Organization from "./Content/Organization";
import ProductDetails from "./Content/ProductDetails";
import ProductProcess from "./Content/ProductProcess";
import { IoIosBusiness } from "react-icons/io";
import { LiaShippingFastSolid } from "react-icons/lia";
import OrderCreate from "./Content/OrderCreate";

export const HomeComponent = ({ props, tab, setTab }: any) => {
  switch (props.element) {
    case "tab-Home":
      return <HomeContent />;
    case "user_create":
      return <UserCreateContent props={props} tab={tab} setTab={setTab} />;
    case "attendence":
      return <Attendence />;
    case "salary":
      return <SalaryCreate props={props} tab={tab} setTab={setTab} />;
    case "organization":
      return <Organization props={props} tab={tab} setTab={setTab} />;
    case "product_details":
      return <ProductDetails props={props} tab={tab} setTab={setTab} />;
    case "product_process":
      return <ProductProcess />;
    case "product_create":
      return <ProductCreate props={props} tab={tab} setTab={setTab} />;
    case "sample_product":
      return <SampleProduct props={props} tab={tab} setTab={setTab} />;
    case "product_approval":
      return <ProductApproval props={props} tab={tab} setTab={setTab} />;
    case "order_create":
      return <OrderCreate props={props} tab={tab} setTab={setTab} />;
    default:
      return <HomeContent />;
  }
};

export const HomeIcon = ({ props }: any) => {
  switch (props) {
    case "tab-Home":
      return <TiHome />;
    case "user_create":
      return <FaUserEdit />;
    case "attendence":
      return <FaUserCheck />;
    case "salary":
      return <FaRegMoneyBillAlt />;
    case "organization":
      return <IoIosBusiness />;
    case "product_details":
      return <FcViewDetails />;
    case "product_process":
      return <FcProcess />;
    case "product_create":
      return <PiHandWithdraw />;
    case "sample_product":
      return <TiSocialDribbbleCircular />;
    case "product_approval":
      return <FcApproval />;
    case "order_create":
      return <LiaShippingFastSolid />;
    default:
      return <TiHome />;
  }
};
