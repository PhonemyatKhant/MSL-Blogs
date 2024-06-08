import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Menu, Moon, Search, Sun } from "lucide-react";
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/redux/theme/themeSlice";

const Header = () => {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const keyword = urlParams.get("searchTerm");

    if (keyword) {
      setSearchTerm(keyword);
    } else {
      setSearchTerm("");
    }
  }, [location.search]);

  const onSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };
  return (
    <nav className="dark:text-white bg-transparent border-b-2 p-2 flex justify-between items-center">
      <div className=" flex items-center justify-between gap-3">
        <Link
          to="/"
          className=" self-center whitespace-nowrap    text-sm sm:text-xl  dark:text-white"
        >
          <span className="  px-2 py-1  bg-primary mr-1  text-primary-foreground  rounded-lg">
            msl.
          </span>
          <span className="underline">Blogs</span>
        </Link>
        {/* search input */}
        <form
          onSubmit={onSubmit}
          className="relative max-sm:max-w-[150px] flex items-center justify-center "
        >
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-3xl w-full"
            type="text"
            value={searchTerm}
            placeholder="Search..."
          />
          <span className="absolute text-muted-foreground mr-3  right-0">
            <Search />{" "}
          </span>
        </form>
      </div>

      {/* dark mode icon and Sign in button */}
      <div className="flex gap-4 ">
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
                  Blogs
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button
          onClick={() => dispatch(toggleTheme())}
          className="p-0"
          variant="icon"
        >
          {theme !== "light" ? (
            <Sun className="dark:text-primary" />
          ) : (
            <Moon className="text-primary" />
          )}
        </Button>
        {currentUser ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                {/* profile pic avatar */}
                <Avatar>
                  <AvatarImage src={currentUser.profilePicture} />
                  <AvatarFallback>
                    {currentUser.username[0] + currentUser.username[1]}{" "}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel className="text-wrap truncate">
                  {currentUser.email}{" "}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/dashboard?tab=profile">
                  {" "}
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link to="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
        )}
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
                  Blogs
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Header;
