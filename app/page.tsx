"use client"

/* ============= Components ============ */
import { withAuth } from "./components/withAuth";
import Sidebar from "./components/Sidebar/Sidebar";
import TabWrapper from "./components/Home/TabWrapper";
import { useState } from "react";





function Home() {
  const [tab, setTab] = useState<string | undefined>('tab-Home')
  return (
    <div className="flex w-full">
      <div className="w-1/12">
        <Sidebar setTab={setTab}/>
      </div>
      <div className="w-11/12 text-black">
        <TabWrapper tab={tab} setTab={setTab}/>
      </div>
    </div>
  );
}

export default withAuth(Home)