import React from "react";

const AddProcess = () => {
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
              <div className={`input w-11/12 border-red-40 bg-gray-300`}></div>
            </div>
            <div className="fieldset w-6/12">
              <legend className="fieldset-legend">Product Description</legend>
              <div className={`input w-11/12 border-red-40 bg-gray-300`}></div>
            </div>
            <div className="fieldset w-6/12">
              <legend className="fieldset-legend">Process </legend>
              <select className="w-11/12 focus:outline-none focus:ring-0  select">
                <option value="" className="hidden"></option>
                <option>Quantity</option>
                <option>Length</option>
                <option>Weight</option>
                <option>Area</option>
                <option>Volume</option>
                <option>Speed</option>
                <option>Temparature</option>
                <option>Time</option>
                <option>Data</option>
                <option>Electricity</option>
              </select>
            </div>
            <div className="fieldset w-6/12">
              <legend className="fieldset-legend">Specification</legend>
              <select className="w-11/12 focus:outline-none focus:ring-0  select">
                <option value="" className="hidden"></option>
                <option>Quantity</option>
                <option>Length</option>
                <option>Weight</option>
                <option>Area</option>
                <option>Volume</option>
                <option>Speed</option>
                <option>Temparature</option>
                <option>Time</option>
                <option>Data</option>
                <option>Electricity</option>
              </select>
            </div>
            <div className="fieldset w-6/12">
              <legend className="fieldset-legend">Serial</legend>
              <select className="w-11/12 focus:outline-none focus:ring-0  select">
                <option value="" className="hidden"></option>
                <option>Quantity</option>
                <option>Length</option>
                <option>Weight</option>
                <option>Area</option>
                <option>Volume</option>
                <option>Speed</option>
                <option>Temparature</option>
                <option>Time</option>
                <option>Data</option>
                <option>Electricity</option>
              </select>
            </div>
            <div className="fieldset w-6/12">
              <legend className="fieldset-legend">Process Value</legend>
              <select className="w-11/12 focus:outline-none focus:ring-0  select">
                <option value="" className="hidden"></option>
                <option>Quantity</option>
                <option>Length</option>
                <option>Weight</option>
                <option>Area</option>
                <option>Volume</option>
                <option>Speed</option>
                <option>Temparature</option>
                <option>Time</option>
                <option>Data</option>
                <option>Electricity</option>
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
