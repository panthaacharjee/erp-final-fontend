"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import OrganizationMenu from "../SideMenu/OrganizationMenu";
import { RootState } from "@/app/redux/rootReducer";
import { useForm } from "react-hook-form";
import {
  Iitem,
  Iprocess,
  Iserial,
  Ispecification,
  line,
} from "../../formInterface/bussinessform";
import {
  ClearItemError,
  ClearItemSuccess,
  ClearProcessError,
  ClearProcessSuccess,
  ClearSerialError,
  ClearSerialSuccess,
  ClearSpecError,
  ClearSpecSuccess,
  CreateItemFail,
  CreateItemRequest,
  CreateItemSuccess,
  CreateProcessFail,
  CreateProcessRequest,
  CreateProcessSuccess,
  CreateSerialFail,
  CreateSerialRequest,
  CreateSerialSuccess,
  CreateSpecFail,
  CreateSpecRequest,
  CreateSpecSuccess,
  GetProductLineFail,
  GetProductLineRequest,
  GetProductLineSuccess,
} from "@/app/redux/reducers/businessReducer";
import Axios from "../../Axios";
import { toast } from "react-toastify";

const ProductProcess = ({ props, setTab, tab }: any) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const {
    processLoading,
    processSuccess,
    processError,

    specLoading,
    specSuccess,
    specError,

    serialLoading,
    serialSuccess,
    serialError,

    itemLoading,
    itemSuccess,
    itemError,
  } = useSelector((state: RootState) => state.process);

  const { getLine } = useSelector((state: RootState) => state.product_details);

  const [processBlock, setProcessBlock] = useState(true);
  const [specBlock, setSpecBlock] = useState(true);
  const [serialBlock, setSerialBlock] = useState(true);
  const [itemBlock, setItemBlock] = useState(true);
  const [showBlock, setShowBlock] = useState(true);

  /* ================== SPECIFICATION FORM START =================== */
  const [specificationLine, setSpecificationLine] = useState<line | undefined>(
    undefined
  );
  const handleSpecificationLine = (e: any) => {
    const lineName = e.target.value;

    const line = getLine?.find((b) => b.name === lineName);
    setSpecificationLine(line);
    setSpecificationProcess(undefined);
  };

  const [specificationProcess, setSpecificationProcess] = useState<
    Iprocess | undefined
  >(undefined);

  const handleSpecificationProcess = (e: any) => {
    const processTitle = e.target.value;
    const process = specificationLine?.process?.find(
      (item: any) => item.title === processTitle
    );
    setSpecificationProcess(process);
  };

  /* ================== SPECIFICATION FORM END =================== */

  /* ================== SERIAL FORM START =================== */
  const [serialLine, setSerialLine] = useState<line | undefined>(undefined);
  const handleSerialLine = (e: any) => {
    const lineName = e.target.value;

    const line = getLine?.find((b) => b.name === lineName);
    setSerialLine(line);
    setSerialProcess(undefined);
  };

  const [serialProcess, setSerialProcess] = useState<Iprocess | undefined>(
    undefined
  );

  const handleSerialProcess = (e: any) => {
    const processTitle = e.target.value;
    const process = serialLine?.process?.find(
      (item: any) => item.title === processTitle
    );
    setSerialProcess(process);
  };

  const [serialSpec, setSerialSpec] = useState<Ispecification | undefined>(
    undefined
  );

  const handleSerialSpec = (e: any) => {
    const specTitle = e.target.value;
    const spec = serialProcess?.spec?.find(
      (item: any) => item.title === specTitle
    );
    setSerialSpec(spec);
  };
  /* ================== SERIAL FORM END =================== */

  /* ================== ITEM FORM START =================== */
  const [itemLine, setItemLine] = useState<line | undefined>(undefined);
  const handleItemLine = (e: any) => {
    const lineName = e.target.value;

    const line = getLine?.find((b) => b.name === lineName);
    setItemLine(line);
    setItemProcess(undefined);
    setItemSpec(undefined);
    setItemSerial(undefined);
  };

  const [itemProcess, setItemProcess] = useState<Iprocess | undefined>(
    undefined
  );

  const handleItemProcess = (e: any) => {
    const processTitle = e.target.value;
    const process = itemLine?.process?.find(
      (item: any) => item.title === processTitle
    );
    setItemProcess(process);
    setItemSpec(undefined);
    setItemSerial(undefined);
  };

  const [itemSpec, setItemSpec] = useState<Ispecification | undefined>(
    undefined
  );

  const handleItemSpec = (e: any) => {
    const specTitle = e.target.value;
    const spec = itemProcess?.spec?.find(
      (item: any) => item.title === specTitle
    );
    setItemSpec(spec);
    setItemSerial(undefined);
  };

  const [itemSerial, setItemSerial] = useState<Iserial | undefined>(undefined);

  const handleItemSerial = (e: any) => {
    const serialTitle = e.target.value;
    const serial = itemSpec?.serial?.find(
      (item: any) => item.title === serialTitle
    );
    setItemSerial(serial);
  };
  /* ================== ITEM FORM END =================== */

  /* ================== SHOW PROCESS FORM START =================== */
  const [showLine, setShowLine] = useState<line | undefined>(undefined);
  const handleShowLine = (e: any) => {
    const lineName = e.target.value;

    const line = getLine?.find((b) => b.name === lineName);
    setShowLine(line);
    setShowProcess(undefined);
    setShowSpec(undefined);
    setShowSerial(undefined);
  };

  const [showProcess, setShowProcess] = useState<Iprocess | undefined>(
    undefined
  );

  const handleShowProcess = (e: any) => {
    const processTitle = e.target.value;
    const process = showLine?.process?.find(
      (item: any) => item.title === processTitle
    );
    setShowProcess(process);
    setItemSpec(undefined);
    setItemSerial(undefined);
  };

  const [showSpec, setShowSpec] = useState<Ispecification | undefined>(
    undefined
  );

  const handleShowSpec = (e: any) => {
    const specTitle = e.target.value;
    const spec = showProcess?.spec?.find(
      (item: any) => item.title === specTitle
    );
    setShowSpec(spec);
    setShowSerial(undefined);
  };

  const [showSerial, setShowSerial] = useState<Iserial | undefined>(undefined);

  const handleShowSerial = (e: any) => {
    const serialTitle = e.target.value;
    const serial = showSpec?.serial?.find(
      (item: any) => item.title === serialTitle
    );
    setShowSerial(serial);
  };
  /* ================== SHOW PROCESS FORM END =================== */

  const { register: pregister, handleSubmit: phandleSubmit } =
    useForm<Iprocess>();

  const handleCreateProcess = async (dataInput: any) => {
    try {
      dispatch(CreateProcessRequest());
      const { data } = await Axios.post("/create/product/process", {
        title: dataInput.title,
        line: dataInput.line,
      });
      dispatch(CreateProcessSuccess(data.message));
    } catch (err: any) {
      dispatch(CreateProcessFail(err.response.data.message));
    }
  };

  const { register: sregister, handleSubmit: shandleSubmit } =
    useForm<Ispecification>();

  const handleCreateSpecification = async (dataInput: any) => {
    try {
      dispatch(CreateSpecRequest());
      const { data } = await Axios.post("/create/process/spec", {
        title: dataInput.title,
        line: specificationLine?.name,
        process: specificationProcess?.title,
      });
      dispatch(CreateSpecSuccess(data.message));
    } catch (err: any) {
      dispatch(CreateSpecFail(err.response.data.message));
    }
  };

  const { register: seregister, handleSubmit: sehandleSubmit } =
    useForm<Iserial>();

  const handleCreateSerial = async (dataInput: any) => {
    try {
      dispatch(CreateSerialRequest());
      const { data } = await Axios.post("/create/process/serial", {
        title: dataInput.title,
        line: serialLine?.name,
        process: serialProcess?.title,
        spec: serialSpec?.title,
      });
      dispatch(CreateSerialSuccess(data.message));
    } catch (err: any) {
      dispatch(CreateSerialFail(err.response.data.message));
    }
  };

  const { register: iregister, handleSubmit: ihandleSubmit } = useForm<Iitem>();
  const handleCreateItem = async (dataInput: any) => {
    try {
      dispatch(CreateItemRequest());
      const { data } = await Axios.post("/create/process/item", {
        title: dataInput.title,
        line: itemLine?.name,
        process: itemProcess?.title,
        spec: itemSpec?.title,
        serial: itemSerial?.title,
      });
      dispatch(CreateItemSuccess(data.message));
    } catch (err: any) {
      dispatch(CreateItemFail(err.response.data.message));
    }
  };

  const getProductLine = async () => {
    try {
      dispatch(GetProductLineRequest());
      const { data } = await Axios.post("/get/product/line");
      dispatch(GetProductLineSuccess(data.line));
    } catch (err: any) {
      dispatch(GetProductLineFail(err.response.data.message));
    }
  };

  useEffect(() => {
    if (processSuccess) {
      toast.success(processSuccess);
    }
    if (processError) {
      toast.error(processError);
    }

    if (specSuccess) {
      toast.success(specSuccess);
    }
    if (specError) {
      toast.error(specError);
    }

    if (serialSuccess) {
      toast.success(serialSuccess);
    }
    if (serialError) {
      toast.error(serialError);
    }

    if (itemSuccess) {
      toast.success(itemSuccess);
    }
    if (itemError) {
      toast.error(itemError);
    }

    dispatch(ClearProcessSuccess());
    dispatch(ClearProcessError());

    dispatch(ClearSpecSuccess());
    dispatch(ClearSpecError());

    dispatch(ClearSerialSuccess());
    dispatch(ClearSerialError());

    dispatch(ClearItemSuccess());
    dispatch(ClearItemError());

    getProductLine();
  }, [
    getLine,
    processSuccess,
    processError,
    specSuccess,
    specError,
    serialSuccess,
    serialError,
    itemSuccess,
    itemError,
  ]);

  return (
    <div className="flex  relative">
      <div className="w-[93%]  px-3 pt-12 min-h-dvh">
        <div className="collapse  bg-base-100 border border-base-300">
          <input
            type="checkbox"
            name="my-accordion-3"
            checked={processBlock}
            onChange={() => setProcessBlock(true)}
          />

          <form
            onSubmit={phandleSubmit(handleCreateProcess)}
            className="collapse-content text-sm"
          >
            <div className="flex justify-between mt-[-10px]">
              <p className="font-semibold text-lg ">Create Process</p>
              <button className="border-[1px] border-black px-6 py-2  rounded-sm bg-amber-200 text-xs cursor-pointer">
                {processLoading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "SAVE"
                )}
              </button>
            </div>
            <div className="flex items-center flex-wrap">
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Product Line</legend>
                <select
                  {...pregister("line")}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {getLine?.map((val, ind) => {
                    return (
                      <option key={ind} value={val.name}>
                        {val.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Process Name</legend>
                <input
                  type="text"
                  className="input w-full"
                  {...pregister("title", { required: true })}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="collapse  bg-base-100 border border-base-300">
          <input
            type="checkbox"
            name="my-accordion-3"
            checked={specBlock}
            onChange={() => setSpecBlock(true)}
          />

          <form
            onSubmit={shandleSubmit(handleCreateSpecification)}
            className="collapse-content text-sm"
          >
            <div className="flex justify-between mt-[-10px]">
              <p className="font-semibold text-lg ">Create Specification</p>
              <button className="border-[1px] border-black px-6 py-2  rounded-sm bg-amber-200 text-xs cursor-pointer">
                {specLoading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "SAVE"
                )}
              </button>
            </div>
            <div className="flex items-center flex-wrap">
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Product Line</legend>
                <select
                  onChange={handleSpecificationLine}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {getLine?.map((val, ind) => {
                    return (
                      <option key={ind} value={val.name}>
                        {val.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Process Name</legend>
                <select
                  value={specificationProcess?.title || ""}
                  onChange={handleSpecificationProcess}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {specificationLine?.process?.map((val, ind) => {
                    return (
                      <option key={ind} value={val.title}>
                        {val.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Specification</legend>
                <input
                  type="text"
                  className="input w-full"
                  {...sregister("title", { required: true })}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="collapse  bg-base-100 border border-base-300">
          <input
            type="checkbox"
            name="my-accordion-3"
            checked={serialBlock}
            onChange={() => setSerialBlock(true)}
          />

          <form
            onSubmit={sehandleSubmit(handleCreateSerial)}
            className="collapse-content text-sm"
          >
            <div className="flex justify-between mt-[-10px]">
              <p className="font-semibold text-lg ">Create Serial</p>
              <button className="border-[1px] border-black px-6 py-2  rounded-sm bg-amber-200 text-xs cursor-pointer">
                {serialLoading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "SAVE"
                )}
              </button>
            </div>
            <div className="flex items-center flex-wrap">
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Product Line</legend>
                <select
                  onChange={handleSerialLine}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {getLine?.map((val, ind) => {
                    return (
                      <option key={ind} value={val.name}>
                        {val.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Process Name</legend>
                <select
                  onChange={handleSerialProcess}
                  value={serialProcess?.title || ""}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {serialLine?.process?.map((val, ind) => {
                    return (
                      <option key={ind} value={val.title}>
                        {val.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Specification</legend>
                <select
                  onChange={handleSerialSpec}
                  value={serialSpec?.title || ""}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {serialProcess?.spec?.map((val, ind) => {
                    return (
                      <option key={ind} value={val.title}>
                        {val.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Serial</legend>
                <input
                  type="text"
                  className="input w-full"
                  {...seregister("title", { required: true })}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="collapse  bg-base-100 border border-base-300">
          <input
            type="checkbox"
            name="my-accordion-3"
            checked={itemBlock}
            onChange={() => setItemBlock(true)}
          />
          <form
            onSubmit={ihandleSubmit(handleCreateItem)}
            className="collapse-content text-sm"
          >
            <div className="flex justify-between mt-[-10px]">
              <p className="font-semibold text-lg ">Create Item</p>
              <button className="border-[1px] border-black px-6 py-2  rounded-sm bg-amber-200 text-xs cursor-pointer">
                {itemLoading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "SAVE"
                )}
              </button>
            </div>
            <div className="flex items-center flex-wrap">
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Product Line</legend>
                <select
                  onChange={handleItemLine}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {getLine?.map((val, ind) => {
                    return (
                      <option key={ind} value={val.name}>
                        {val.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Process Name</legend>
                <select
                  onChange={handleItemProcess}
                  value={itemProcess?.title || ""}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {itemLine?.process?.map((val, ind) => {
                    return (
                      <option key={ind} value={val.title}>
                        {val.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Specification</legend>
                <select
                  onChange={handleItemSpec}
                  value={itemSpec?.title || ""}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {itemProcess?.spec?.map((val, ind) => {
                    return (
                      <option key={ind} value={val.title}>
                        {val.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Serial</legend>
                <select
                  onChange={handleItemSerial}
                  value={itemSerial?.title || ""}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {itemSpec?.serial.map((val, ind) => {
                    return (
                      <option key={ind} value={val.title}>
                        {val.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Item</legend>
                <input
                  type="text"
                  className="input w-full"
                  {...iregister("title", { required: true })}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="collapse  bg-base-100 border border-base-300">
          <input
            type="checkbox"
            name="my-accordion-3"
            checked={showBlock}
            onChange={() => setShowBlock(true)}
          />
          <div className="collapse-title font-semibold">Product Process</div>
          <div className="collapse-content text-sm">
            <div className="flex items-center flex-wrap">
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Product Line</legend>
                <select
                  onChange={handleShowLine}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {getLine?.map((val, ind) => {
                    return (
                      <option key={ind} value={val.name}>
                        {val.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Product Process</legend>
                <select
                  onChange={handleShowProcess}
                  value={showProcess?.title || ""}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {showLine?.process?.map((val, ind) => {
                    return (
                      <option key={ind} value={val.title}>
                        {val.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">
                  Product Specification
                </legend>
                <select
                  onChange={handleShowSpec}
                  value={showSpec?.title || ""}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {showProcess?.spec?.map((val, ind) => {
                    return (
                      <option key={ind} value={val.title}>
                        {val.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Serial</legend>
                <select
                  onChange={handleShowSerial}
                  value={showSerial?.title || ""}
                  className="w-11/12 focus:outline-none focus:ring-0  select"
                >
                  <option value="" className="hidden"></option>
                  {showSpec?.serial.map((val, ind) => {
                    return (
                      <option key={ind} value={val.title}>
                        {val.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="fieldset w-3/12">
                <legend className="fieldset-legend">Item</legend>
                <select className="w-11/12 focus:outline-none focus:ring-0  select">
                  <option value="" className="hidden"></option>
                  {showSerial?.item.map((val, ind) => {
                    return (
                      <option key={ind} value={val.title}>
                        {val.title}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[7%] bg-[#d3e6ec]  min-h-screen pt-14 px-2">
        <OrganizationMenu tab={tab} setTab={setTab} props={props} />
      </div>
    </div>
  );
};

export default ProductProcess;
