import { RootState } from "@/app/redux/rootReducer";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../Axios";
import {
  process,
  serial,
  specification,
} from "@/app/redux/interfaces/businessInterface";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  IProcess,
  ISampleProcess,
} from "@/app/redux/interfaces/productInterface";
import {
  ClearProcessProductError,
  ClearProcessProductSuccess,
  ClearSampleUpDownFail,
  ClearSampleUpDownSuccess,
  ClearUpDownFail,
  ClearUpDownSuccess,
  CreateProductProcessFail,
  CreateProductProcessRequest,
  CreateProductProcessSucess,
  CreateSampleProductProcessFail,
  CreateSampleProductProcessRequest,
  CreateSampleProductProcessSucess,
  UpDownProcessFail,
  UpDownProcessRequest,
  UpDownProcessSuccess,
  UpDownSampleProcessFail,
  UpDownSampleProcessRequest,
  UpDownSampleProcessSuccess,
} from "@/app/redux/reducers/productReducer";
import { toast } from "react-toastify";

const SampleAddProcess = ({ productId, productDesc, productLine }: any) => {
  const dispatch = useDispatch();

  const {
    sampleProcessLoading,
    sampleProcessSuccess,
    sampleProcessError,
    sampleUpDownSuccess,
    sampleUpDownError,
    sampleProduct,
  } = useSelector((state: RootState) => state.sampleProduct);
  const {
    register: processRegister,
    handleSubmit: phandleSubmit,
    setValue,
    getValues,
    setFocus,
    watch,
  } = useForm<ISampleProcess>({
    defaultValues: {},
  });

  const [showProcessError, setShowProcessError] = useState<string | undefined>(
    undefined
  );
  const [elementId, setElementId] = useState();
  const [elementInd, setElementInd] = useState();

  const handleProcessValueChange = (value: any, ind: any) => {
    if (elementId === "" || elementInd === "") {
      setShowProcessError("PLEASE ");
    } else {
      setElementId(value);
      setElementInd(ind);
    }
  };

  /* ============ GET PRODUCT DETAILS ============ */
  const { getLine } = useSelector((state: RootState) => state.product_details);

  const Line = getLine.find((val) => val.name === productLine);

  /* =================== SUBMIT SECTION ===================== */
  const handleSave: SubmitHandler<ISampleProcess> = async (dataInput: any) => {
    try {
      dispatch(CreateSampleProductProcessRequest());
      const processData = {
        process: dataInput.process,
        spec: dataInput.spec,
        serial: dataInput.serial,
        value: dataInput.value,
        product: productId,
        category: productDesc,
      };
      const { data } = await Axios.put(
        "/create/sample/product/process",
        processData
      );
      dispatch(CreateSampleProductProcessSucess(data));
    } catch (err: any) {
      dispatch(CreateSampleProductProcessFail(err.response.data.message));
    }
  };

  const handleUpDown = async (props: any) => {
    try {
      dispatch(UpDownSampleProcessRequest());
      const userData = {
        props: props,
        product: productId,
        element: elementId,
        ind: elementInd,
      };
      const { data } = await Axios.put("/updown/sample/process", userData);
      dispatch(UpDownSampleProcessSuccess(data));
    } catch (err: any) {
      dispatch(UpDownSampleProcessFail(err.response.data.message));
    }
  };

  /* ============= PROCESS SELECTION ============= */
  const [selectedProcess, setSelectedProcess] = useState<process | undefined>();
  const handleProcessChange = (e: any) => {
    const processName = e.target.value;
    if (!processName) {
      setSelectedProcess(undefined);
      setSelectedSerial(undefined);
      setSelectedSpec(undefined);
      setValue("spec", "");
      setValue("serial", "");
      setValue("value", "");
    }

    const process = Line?.process?.find((b: any) => b.title === processName);
    if (process) {
      setSelectedProcess(process);
      setSelectedSpec(undefined);
      setSelectedSerial(undefined);
      setValue("process", processName);
      setValue("spec", "");
      setValue("serial", "");
      setValue("value", "");
    }
  };

  const [selectedSpec, setSelectedSpec] = useState<specification | undefined>();
  const handleSpecChange = (e: any) => {
    const specName = e.target.value;
    if (!specName) {
      setSelectedSpec(undefined);
      setSelectedSerial(undefined);
      setValue("spec", "");
      setValue("serial", "");
      setValue("value", "");
    }

    const spec = selectedProcess?.spec?.find((b: any) => b.title === specName);
    if (spec) {
      setSelectedSpec(spec);
      setSelectedSerial(undefined);

      setValue("spec", specName);
      setValue("serial", "");
      setValue("value", "");
    }
  };

  const [selectedSerial, setSelectedSerial] = useState<serial | undefined>();
  const handleSerialChange = (e: any) => {
    const serialName = e.target.value;
    if (!serialName) {
      setSelectedSerial(undefined);
      setValue("serial", "");
    }

    const serial = selectedSpec?.serial?.find(
      (b: any) => b.title === serialName
    );
    if (serial) {
      setSelectedSerial(serial);
      setValue("serial", serialName);
      setValue("value", "");
    }
  };

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if ((e.altKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        phandleSubmit(handleSave)();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (sampleProcessError) {
      setShowProcessError(sampleProcessError);
    }

    dispatch(ClearProcessProductError());
    if (sampleUpDownSuccess) {
      setElementId(undefined);
      setElementInd(undefined);
    }

    if (sampleUpDownError) {
      setElementId(undefined);
      setElementInd(undefined);
    }

    dispatch(ClearSampleUpDownSuccess());
    dispatch(ClearSampleUpDownFail());
  }, [sampleProcessError, sampleUpDownSuccess, sampleUpDownError]);

  return (
    <div className="modal-box min-w-4xl">
      <p className="text-center font-bold">ERPAC GROUP LIMITED</p>
      <p className="text-center font-bold">
        Plot # 2083-2085, Binodpur, Maijdee, Sadar, Noakhali-3800, <br />
        Bangladesh
      </p>
      <div className="flex justify-between">
        <form onSubmit={phandleSubmit(handleSave)} className="w-9/12">
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
                {...processRegister("process", { required: true })}
                value={selectedProcess?.title || ""}
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
                {...processRegister("spec", { required: true })}
                value={selectedSpec?.title || ""}
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
            {selectedSpec?.serial &&
            selectedSpec?.serial[0]?.title === "N/A" ? (
              <div className="fieldset w-6/12">
                <legend className="fieldset-legend">Serial</legend>
                <select
                  {...processRegister("serial")}
                  disabled
                  defaultValue={"N/A"}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="N/A">N/A</option>
                </select>
              </div>
            ) : (
              <div className="fieldset w-6/12">
                <legend className="fieldset-legend">Serial</legend>
                <select
                  value={selectedSerial?.title || ""}
                  onChange={handleSerialChange}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {selectedSpec?.serial?.map((val, ind) => {
                    return (
                      <option key={ind} value={val?.title}>
                        {val?.title}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            {selectedSpec?.serial &&
            selectedSpec?.serial[0]?.title === "N/A" ? (
              <div className="fieldset w-6/12">
                <legend className="fieldset-legend">Process Value</legend>
                <input
                  type="text"
                  className="w-11/12 focus:outline-none focus:ring-0 input"
                  {...processRegister("value", { required: true })}
                />
              </div>
            ) : (
              <div className="fieldset w-6/12">
                <legend className="fieldset-legend">Process Value</legend>
                <select
                  {...processRegister("value")}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {selectedSerial?.item?.map((val, ind) => {
                    return (
                      <option key={ind} value={val?.title}>
                        {val?.title}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <div className="fieldset w-6/12">
              <legend className="fieldset-legend">Remarks</legend>
              <input type="text" className="input w-11/12" />
            </div>
          </div>
          <button className="bg-gray-700 text-white px-8 py-1 mt-5 cursor-pointer rounded-sm">
            {sampleProcessLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <p>Save (Alt + S)</p>
            )}
          </button>
          <button className=" bg-gray-700 text-white px-8 py-1 mt-5 cursor-pointer rounded-sm ml-2">
            Delete
          </button>
        </form>
        <div className="pl-2 w-3/12">
          <p className="text-sm font-bold">Process Sequence</p>
          <div className="border border-black w-full min-h-80 mt-2 rounded-md px-4 py-3">
            {showProcessError && <p>{showProcessError}</p>}
            {sampleProduct?.process?.map((val: any, ind) => {
              return (
                <div className="flex items-center" key={ind}>
                  {sampleProduct?.process?.length > 0 && (
                    <input
                      type="radio"
                      className="mr-2"
                      name="manufacturing-process"
                      value={val?._id}
                      checked={elementId === val?._id}
                      onChange={() => handleProcessValueChange(val?._id, ind)}
                    />
                  )}
                  <h4 className="text-md">{val?.name}</h4>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => handleUpDown("DELETE")}
              className="border border-black rounded-sm px-3 py-1 mt-2 cursor-pointer text-xs "
            >
              Delete
            </button>
            <button
              onClick={() => handleUpDown("UP")}
              className="border border-black rounded-sm px-3 py-1 mt-2 cursor-pointer text-xs "
            >
              UP
            </button>
            <button
              onClick={() => handleUpDown("DOWN")}
              className="border border-black rounded-sm px-3 py-1 mt-2 cursor-pointer text-xs "
            >
              Down
            </button>
          </div>
        </div>
      </div>
      {/* <div className="overflow-x-auto">
        <table className="table table-zebra border-[1px] w-full border-gray-300 mt-1">
          <thead className="block w-full">
            <tr>
              <th>Process</th>
              <th>Specification</th>
              <th>Serial</th>
              <th>Process Value</th>
            </tr>
          </thead>
          <tbody className="block w-full h-20 overflow-y-auto">
            <tr>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>Blue</td>
            </tr>
            <tr>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>Blue</td>
            </tr>
            <tr>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>Blue</td>
            </tr>
            <tr>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>Blue</td>
            </tr>
            <tr>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>Blue</td>
            </tr>
            <tr>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>Blue</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default SampleAddProcess;
