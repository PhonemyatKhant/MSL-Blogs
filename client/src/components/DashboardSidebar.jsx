import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, PanelRightClose, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

const DashboardSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

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
  return (
    <div className="mt-4 ">
      <Sheet key={"left"}>
        <SheetTrigger className=" text-lg flex items-center gap-2 text-muted-foreground font-semibold">
          {" "}
          <PanelRightClose />
          <span>Tabs</span>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="mt-5">
            <SheetTitle className="flex items-center justify-between ">
              MSL BLOGS<Badge>User</Badge>
            </SheetTitle>
            <ul className="w-full flex flex-col">
              {userTabs.map((userTab) => (
                <div key={userTab.id}>
                  <li className=" flex gap-2 items-center my-3 text-xl">
                    {userTab.icon}
                    <Link to="/dashboard?tab=profile">
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
