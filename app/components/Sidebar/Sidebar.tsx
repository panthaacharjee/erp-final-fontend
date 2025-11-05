import React, { useState } from "react";
import Image from "next/image";

/* ========== Components ========= */
import { SidebarData } from "../StaticData";

/* ========== Images ========= */
import Logo from "../../../images/bandlogo.svg";
import HrandAdmin from "./HrandAdmin";
import ProductDevelopment from "./ProductDevelopment";
import BusinessDevelopment from "./BuissnessDevelopment";
import Order from "./Order";

const Sidebar = ({ setTab }: any) => {
  const [sidebar, setSidebar] = useState(false);
  const [selected, setSelected] = useState<number | undefined>();
  const sidebarFunc = (props: number) => {
    if (sidebar === false) {
      setSidebar(true);
      setSelected(props);
    } else if (selected !== props) {
      setSidebar(true);
      setSelected(props);
    } else {
      setSidebar(false);
      setSelected(undefined);
    }
  };
  return (
    <div className="flex h-screen relative">
      <div className=" bg-black text-white w-1/12 h-screen fixed z-50 top-0 left-0 ">
        {SidebarData?.map((val, ind) => {
          return (
            <div
              onClick={() => sidebarFunc(val.sl)}
              key={ind}
              className={`flex flex-col items-center py-3 border-b-[1px] border-gray-400 px-4  ${
                selected === val.sl
                  ? "bg-[#13a7ec]"
                  : "hover:bg-[#13a7ecde] hover:text-black"
              }`}
            >
              <span className="text-xl mb-1">{val.icon}</span>
              <p
                className="text-xs text-center cursor-default select-none"
                dangerouslySetInnerHTML={{ __html: val.title }}
              />
            </div>
          );
        })}
        <div className=""></div>
        <div className="mt-[-5px]">
          <div className="">
            <Image
              src={Logo}
              alt="Logo"
              className="h-16 w-16 mx-auto select-none"
            />
          </div>
        </div>
      </div>
      {sidebar && (
        <div
          className={` bg-[#70b5d4] z-50 fixed h-screen  opacity-85 top-0 right-0 w-11/12 text-black`}
        >
          {selected === 2 && (
            <HrandAdmin
              setSidebar={setSidebar}
              setSelected={setSelected}
              setTab={setTab}
            />
          )}
          {selected === 3 && (
            <BusinessDevelopment
              setSidebar={setSidebar}
              setSelected={setSelected}
              setTab={setTab}
            />
          )}
          {selected === 4 && (
            <ProductDevelopment
              setSidebar={setSidebar}
              setSelected={setSelected}
              setTab={setTab}
            />
          )}
          {selected === 5 && (
            <Order
              setSidebar={setSidebar}
              setSelected={setSelected}
              setTab={setTab}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
