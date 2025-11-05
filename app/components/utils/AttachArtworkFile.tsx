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

const AttachArtworkFile = ({ p_id }: any) => {
  const dispatch = useDispatch();
  const { productImageLoading } = useSelector(
    (state: RootState) => state.product
  );

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
      dispatch(ProductImageRequest());

      const formData = new FormData();
      formData.append("file", selectedImage);

      const { data } = await Axios.put("/product/image/upload", {
        file: selectedImage,
        p_id,
      });
      dispatch(ProductImageSuccess(data));
    } catch (err: any) {
      dispatch(ProductImageFail(err.response.data.message));
    }
  };
  return (
    <div className="modal-box min-w-4xl">
      <div className="flex justify-between">
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input file-input-neutral shadow-md"
        />
        <button onClick={handleSave} className="btn btn-neutral">
          {productImageLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Save"
          )}
        </button>
      </div>
      <div className=" h-96 w-full border-[1px] solid border-black mt-2 rounded-lg flex items-center justify-center">
        {selectedImage && (
          <img src={selectedImage as string} className=" w-[80%] h-[80%]" />
        )}
      </div>
    </div>
  );
};

export default AttachArtworkFile;
