import DashboardProfile from "@/components/DashboardProfile";
import DashboardSidebar from "@/components/DashboardSidebar";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    // has searchParams variables
    const tabFromURL = new URLSearchParams(location.search).get("tab");
    tabFromURL !== null && setTab(tabFromURL);

    // url after ? sign
    // console.log(location.search);
  }, [location.search]);
  return (
    <div className=" min-h-screen">
      {/* sidebar  */}
      <div>
        <DashboardSidebar />
      </div>
      {/* right  */}
      <div>{tab === "profile" && <DashboardProfile />}</div>
    </div>
  );
};

export default Dashboard;
