"use client"

/* ============= Components ============ */
import { withAuth } from "./components/withAuth";
import Sidebar from "./components/Sidebar/Sidebar";
import TabWrapper from "./components/Home/TabWrapper";





function Home() {
 
  return (
    <div className="flex w-full">
      <div className="w-1/12">
        <Sidebar/>
      </div>
      <div className="w-11/12 text-black">
        <TabWrapper/>
      </div>
    </div>
  );
}

export default withAuth(Home)