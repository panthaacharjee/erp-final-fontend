import { RootState } from "@/app/redux/rootReducer";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../Axios";
import {
  process,
  serial,
  specification,
} from "@/app/redux/interfaces/businessInterface";

const AddProcess = ({ productId, productDesc, productLine }: any) => {
  const dispatch = useDispatch();

  /* ============ GET PRODUCT DETAILS ============ */
  const { getLine } = useSelector((state: RootState) => state.product_details);

  const Line = getLine.find((val) => val.name === productLine);

  const [selectedProcess, setSelectedProcess] = useState<process | undefined>();
  const handleProcessChange = (e: any) => {
    const processName = e.target.value;
    if (!processName) {
      setSelectedProcess(undefined);
      setSelectedSerial(undefined);
      setSelectedSpec(undefined);
    }

    const process = Line?.process?.find((b: any) => b.title === processName);
    if (process) {
      setSelectedProcess(process);
      setSelectedSpec(undefined);
      setSelectedSerial(undefined);
    }
  };

  const [selectedSpec, setSelectedSpec] = useState<specification | undefined>();
  const handleSpecChange = (e: any) => {
    const specName = e.target.value;
    if (!specName) {
      setSelectedSpec(undefined);
      setSelectedSerial(undefined);
    }

    const spec = selectedProcess?.spec?.find((b: any) => b.title === specName);
    if (spec) {
      setSelectedSpec(spec);
      setSelectedSerial(undefined);
    }
  };

  const [selectedSerial, setSelectedSerial] = useState<serial | undefined>();
  const handleSerialChange = (e: any) => {
    const serialName = e.target.value;
    if (!serialName) {
      setSelectedSerial(undefined);
    }

    const serial = selectedSpec?.serial?.find(
      (b: any) => b.title === serialName
    );
    if (serial) {
      setSelectedSerial(serial);
    }
  };
  return (
    <div className="modal-box min-w-4xl">
      <p className="text-center font-bold">ERPAC GROUP LIMITED</p>
      <p className="text-center font-bold">
        Plot # 2083-2085, Binodpur, Maijdee, Sadar, Noakhali-3800, <br />
        Bangladesh
      </p>

      <div className="flex mt-4">
        <form className="w-9/12">
          <div className="font-semibold text-sm">Product Information</div>
          <div className="flex items-center flex-wrap border-[1px] border-[#dfdddd] p-2 rounded-md mt-2">
            <div className="fieldset w-6/12">
              <legend className="fieldset-legend">Product ID</legend>
              <div className={`input w-11/12 border-red-40 bg-gray-300`}>
                {productId}
              </div>
            </div>
            <div className="fieldset w-6/12">
              <legend className="fieldset-legend">Product Description</legend>
              <div className={`input w-11/12 border-red-40 bg-gray-300`}>
                {productDesc}
              </div>
            </div>
            <div className="fieldset w-6/12">
              <legend className="fieldset-legend">Process </legend>
              <select
                value={selectedProcess?.title}
                onChange={handleProcessChange}
                className="w-11/12 focus:outline-none focus:ring-0  select"
              >
                <option value="" className="hidden"></option>
                {Line?.process?.map((val, ind) => {
                  return (
                    <option key={ind} value={val.title}>
                      {val.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="fieldset w-6/12">
              <legend className="fieldset-legend">Specification</legend>
              <select
                value={selectedSpec?.title}
                onChange={handleSpecChange}
                className="w-11/12 focus:outline-none focus:ring-0  select"
              >
                <option value="" className="hidden"></option>
                {selectedProcess?.spec?.map((val, ind) => {
                  return (
                    <option key={ind} value={val.title}>
                      {val.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="fieldset w-6/12">
              <legend className="fieldset-legend">Serial</legend>
              <select
                value={selectedSerial?.title}
                onChange={handleSerialChange}
                className="w-11/12 focus:outline-none focus:ring-0  select"
              >
                <option value="" className="hidden"></option>
                {selectedSpec?.serial?.map((val, ind) => {
                  return (
                    <option key={ind} value={val.title}>
                      {val.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="fieldset w-6/12">
              <legend className="fieldset-legend">Process Value</legend>
              <select className="w-11/12 focus:outline-none focus:ring-0  select">
                <option value="" className="hidden"></option>
                {selectedSerial?.item?.map((val, ind) => {
                  return (
                    <option key={ind} value={val.title}>
                      {val.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="fieldset w-6/12">
              <legend className="fieldset-legend">Remarks</legend>
              <input type="text" className="input w-11/12" />
            </div>
          </div>
          <button className="bg-black text-white px-8 py-1 mt-5 cursor-pointer rounded-sm">
            Save (Alt + S)
          </button>
        </form>
        <div className="pl-2 w-3/12">
          <p className="text-sm font-bold">Process Sequence</p>
          <div className="border border-black w-full min-h-80 mt-2 rounded-md"></div>
          <div className="flex justify-between">
            <button className="border border-black rounded-sm px-3 py-1 mt-2 cursor-pointer text-xs ">
              Delete
            </button>
            <button className="border border-black rounded-sm px-3 py-1 mt-2 cursor-pointer text-xs ">
              UP
            </button>
            <button className="border border-black rounded-sm px-3 py-1 mt-2 cursor-pointer text-xs ">
              Down
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProcess;
