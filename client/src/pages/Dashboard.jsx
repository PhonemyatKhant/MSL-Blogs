import DashboardPosts from "@/components/DashboardPosts";
import DashboardProfile from "@/components/DashboardProfile";
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardUsers from "@/components/DashboardUsers";
import DashboardComment from "@/components/DashboardComment";
import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import DashboardHome from "@/components/DashboardHome";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);

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
      {currentUser.isAdmin && (
        <div>
          <DashboardSidebar />
        </div>
      )}
      {/* right display  */}

      {/* dashboard  */}
      <div>{tab === "dashboard" && <DashboardHome />}</div>

      {/* profile  */}
      <div>{tab === "profile" && <DashboardProfile />}</div>
      {/* posts  */}

      <div>{tab === "posts" && <DashboardPosts />}</div>
      {/* users  */}

      <div>{tab === "users" && <DashboardUsers />}</div>
      {/* users  */}

      <div>{tab === "comments" && <DashboardComment />}</div>
    </div>
  );
};

export default Dashboard;
