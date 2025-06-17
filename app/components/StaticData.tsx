import React from "react"
/* ========== Icons ========== */
import { IoSettings } from "react-icons/io5";
import { GrUserManager } from "react-icons/gr";
import { MdOutlineEngineering } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdAccountBalance } from "react-icons/md";
import { GiShop } from "react-icons/gi";


export const SidebarData = [
    {
        title:"Security <br/> Administration",
        icon: <IoSettings/>,
        sl : 1,
    },
    {
        title:"HR & Admin",
        icon: <GrUserManager/>,
        sl:2,
    },
    {
        title:"Product<br/> Development",
        icon: <MdOutlineEngineering/>,
        sl:3,
    },
    {
        title:"Order<br/> Management",
        icon: <FaClipboardList/>,
        sl:4,
    },
    {
        title:"Dispatch <br/>& Delivery",
        icon: <TbTruckDelivery/>,
        sl:5
    },
    {
        title:"Commercial <br/> & Accounts",
        icon: <MdAccountBalance/>,
        sl:6
    },
    {
        title:"Inventory",
        icon: <GiShop/>,
        sl:7
    },
    
]

