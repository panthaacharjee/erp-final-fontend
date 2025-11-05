import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../Axios";
import {
  ProductImageFail,
  ProductImageRequest,
  ProductImageSuccess,
} from "@/app/redux/reducers/productReducer";
import { RootState } from "@/app/redux/rootReducer";
import {
  BookingFileError,
  BookingFileRequest,
  BookingFileSuccess,
} from "@/app/redux/reducers/orderReducer";

const AttachOrderFile = ({
  orderId,
  buyer,
  vendor,
  sales,
  cs,
  season,
  req_date,
  order_date,
}: any) => {
  const dispatch = useDispatch();
  const { bookingLoading } = useSelector((state: RootState) => state.order);

  const [selectedImage, setSelectedFile] = useState<any>();

  const handleFileChange = (e: any) => {
    if (e.target.name === "file") {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setSelectedFile(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      dispatch(BookingFileRequest());

      const formData = new FormData();
      formData.append("file", selectedImage);

      const { data } = await Axios.put("/booking/file/upload", {
        file: selectedImage,
        orderId: orderId,
      });
      dispatch(BookingFileSuccess(data));
    } catch (err: any) {
      dispatch(BookingFileError(err.response.data.message));
    }
  };
  return (
    <div className="modal-box min-w-4xl">
      <div className="flex justify-between">
        <input
          type="file"
          name="file"
          accept="/"
          onChange={handleFileChange}
          className="file-input file-input-neutral shadow-md"
        />
        <button onClick={handleSave} className="btn btn-neutral">
          {bookingLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Save"
          )}
        </button>
      </div>
      <div className="flex flex-wrap">
        <div className="fieldset w-4/12">
          <legend className="fieldset-legend">Order ID</legend>
          <p className="w-11/12 focus:outline-none focus:ring-0 input ">
            {orderId}
          </p>
        </div>
        <div className="fieldset w-4/12">
          <legend className="fieldset-legend">Order Date</legend>
          <p className="w-11/12 focus:outline-none focus:ring-0 input ">
            {order_date}
          </p>
        </div>
        <div className="fieldset w-4/12">
          <legend className="fieldset-legend">Request Date</legend>
          <p className="w-11/12 focus:outline-none focus:ring-0 input ">
            {req_date}
          </p>
        </div>
        <div className="fieldset w-4/12">
          <legend className="fieldset-legend">Buyer</legend>
          <p className="w-11/12 focus:outline-none focus:ring-0 input ">
            {buyer}
          </p>
        </div>
        <div className="fieldset w-4/12">
          <legend className="fieldset-legend">Vendor</legend>
          <p className="w-11/12 focus:outline-none focus:ring-0 input ">
            {vendor}
          </p>
        </div>

        <div className="fieldset w-4/12">
          <legend className="fieldset-legend">Contact</legend>
          <p className="w-11/12 focus:outline-none focus:ring-0 input ">{cs}</p>
        </div>
        <div className="fieldset w-4/12">
          <legend className="fieldset-legend">Sales</legend>
          <p className="w-11/12 focus:outline-none focus:ring-0 input ">
            {sales}
          </p>
        </div>
        <div className="fieldset w-4/12">
          <legend className="fieldset-legend">Season</legend>
          <p className="w-11/12 focus:outline-none focus:ring-0 input ">
            {season}
          </p>
        </div>
      </div>
      <div className=" h-64 w-full border-[1px] solid border-black mt-2 rounded-lg flex items-center justify-center">
        {selectedImage && (
          <img src={selectedImage as string} className=" w-[80%] h-[80%]" />
        )}
      </div>
    </div>
  );
};

export default AttachOrderFile;
