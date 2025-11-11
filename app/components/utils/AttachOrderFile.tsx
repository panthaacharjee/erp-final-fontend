import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../Axios";

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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(""); // Clear preview for non-image files
      }
    }
  };

  const handleSave = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    try {
      dispatch(BookingFileRequest());

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("orderId", orderId);

      const { data } = await Axios.put("/booking/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(BookingFileSuccess(data));
      alert("File uploaded successfully!");

      // Reset after successful upload
      setSelectedFile(null);
      setPreviewUrl("");
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err: any) {
      dispatch(
        BookingFileError(err.response?.data?.message || "Upload failed")
      );
      alert(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="modal-box min-w-4xl">
      <div className="flex justify-between mb-4">
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="file-input file-input-neutral shadow-md"
          accept=".xls,.xlsx,.pdf,.png,.jpg,.jpeg"
        />
        <button
          onClick={handleSave}
          className="btn btn-neutral"
          disabled={bookingLoading || !selectedFile}
        >
          {bookingLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Save"
          )}
        </button>
      </div>

      {/* Your existing order details */}
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

      {/* Preview section */}
      <div className="h-64 w-full border-[1px] solid border-black mt-2 rounded-lg flex items-center justify-center">
        {previewUrl ? (
          <img
            src={previewUrl}
            className="w-[80%] h-[80%] object-contain"
            alt="Preview"
          />
        ) : selectedFile ? (
          <div className="text-center">
            <p className="text-lg font-semibold">{selectedFile.name}</p>
            <p className="text-sm text-gray-500">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
            <p className="text-sm text-gray-500">{selectedFile.type}</p>
          </div>
        ) : (
          <p className="text-gray-500">No file selected</p>
        )}
      </div>
    </div>
  );
};

export default AttachOrderFile;
