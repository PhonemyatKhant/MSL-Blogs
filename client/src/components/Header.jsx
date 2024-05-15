import React from "react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { Input } from "./ui/input";
import { Menu, Moon, Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const path = useLocation().pathname;
  return (
    <nav className=" border-b-2 p-4 flex justify-between items-center">
      <Link
        to="/"
        className=" self-center whitespace-nowrap text-sm sm:text-xl  dark:text-white"
      >
        <span className=" px-2 py-1  bg-black text-white  rounded-lg">MSL</span>
        Blogs
      </Link>
      {/* search input */}
      <form className="relative hidden lg:flex items-center justify-center ">
        <Input type="text" placeholder="Search..." />
        <span className="absolute text-muted-foreground mr-3  right-0">
          <Search />{" "}
        </span>
      </form>
      {/* search icon mobile view */}
      <Button className="p-3 lg:hidden" variant="outline">
        <Search />{" "}
      </Button>
      {/* dark mode icon and Sign in button */}
      <div className="flex gap-4 md:order-2">
        <Button variant="icon">
          <Moon />
        </Button>
        <Link to="/sign-in">
          <Button variant='outline' >Sign In</Button>
        </Link>
        {/* navigation menu mobile  */}
        <div className="flex md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />{" "}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/">
                {" "}
                <DropdownMenuItem
                  className={cn({ "font-semibold": path === "/" })}
                >
                  Home
                </DropdownMenuItem>
              </Link>
              <Link to="/about">
                {" "}
                <DropdownMenuItem
                  className={cn({ "font-semibold": path === "/about" })}
                >
                  About
                </DropdownMenuItem>
              </Link>
              <Link to="/projects">
                {" "}
                <DropdownMenuItem
                  className={cn({ "font-semibold": path === "/projects" })}
                >
                  Projects
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* navigation menu desktop */}
      <NavigationMenu className="hidden md:inline">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <Button
                className={cn({ underline: path === "/" })}
                variant="link"
              >
                Home
              </Button>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/about">
              <Button
                className={cn({ underline: path === "/about" })}
                variant="link"
              >
                About
              </Button>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/projects">
              <Button
                className={cn({ underline: path === "/projects" })}
                variant="link"
              >
                Projects
              </Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Header;
