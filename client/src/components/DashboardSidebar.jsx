import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Library,
  LogOut,
  MessageSquareMore,
  PanelRightClose,
  User,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const DashboardSidebar = () => {
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

  const userTabs = [
    { id: 0, name: "profile", label: "Profile", icon: <User /> },

    { id: 1, name: "sign-out", label: "Sign Out", icon: <LogOut /> },
  ];
  const adminTabs = [
    { id: 0, name: "dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
    { id: 1, name: "profile", label: "Profile", icon: <User /> },
    { id: 2, name: "posts", label: "Posts", icon: <Library /> },
    { id: 3, name: "users", label: "Users", icon: <Users /> },
    { id: 4, name: "comments", label: "Comments", icon: <MessageSquareMore /> },
    // { id: 5, name: "sign-out", label: "Sign Out", icon: <LogOut /> },
  ];

  return (
    <div className="my-4  ">
      <Sheet key={"left"}>
        <SheetTrigger className=" text-lg flex items-center gap-2 text-primary font-semibold">
          <PanelRightClose />
          <span>Tabs</span>
        </SheetTrigger>
        <SheetContent className=" bg-primary/50 text-white   border-0 " side="left">
          <SheetHeader className="mt-5">
            <SheetTitle className=" text-white flex items-center justify-between ">
              MSL BLOGS<Badge>{currentUser.isAdmin ? "ADMIN" : "USER"}</Badge>
            </SheetTitle>
            <ul className="w-full flex flex-col">
              {currentUser?.isAdmin
                ? adminTabs.map((userTab) => (
                    <div key={userTab.id}>
                      <li className=" flex gap-2 items-center my-3 text-xl">
                        {userTab.icon}
                        <Link to={`/dashboard?tab=${userTab.name}`}>
                          <h1
                            className={cn({
                              " font-semibold underline": tab === userTab.name,
                            })}
                          >
                            {userTab.label}
                          </h1>{" "}
                        </Link>
                      </li>
                      <Separator />
                    </div>
                  ))
                : userTabs.map((userTab) => (
                    <div key={userTab.id}>
                      <li className=" flex gap-2 items-center my-3 text-xl">
                        {userTab.icon}
                        <Link to={`/dashboard?tab=${userTab.name}`}>
                          <h1
                            className={cn({
                              " font-semibold underline": tab === userTab.name,
                            })}
                          >
                            {userTab.label}
                          </h1>{" "}
                        </Link>
                      </li>
                      <Separator />
                    </div>
                  ))}
            </ul>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default DashboardSidebar;
