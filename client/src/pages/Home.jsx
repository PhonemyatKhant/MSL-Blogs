import React from "react";
import svg from "@/assets/Blog.svg";
import Projects from "@/assets/Projects.svg";
import { Button } from "@/components/ui/button";
import RecentArticles from "@/components/RecentArticles";
import AdCard from "@/components/AdCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" min-h-screen ">
      <div className="flex my-24 items-center px-10 max-md:flex-col justify-between w-full">
        <div className="dark:text-white my-3 flex flex-col  space-y-4  w-full max-w-screen-sm flex-1">
          <h1 className="text-primary text-9xl font-semibold max-md:text-6xl max-lg:text-7xl">
            msl.
            <br />
            <span className=" underline ">blogs</span>
          </h1>
          <p className="text-lg max-md:text-base">
            "Welcome to MSL, a personal blog where I share my thoughts,
            experiences, and insights. Join a community of like-minded
            individuals, explore a variety of topics to inspire and inform your
            journey."
          </p>
          <Link to={"/search"}>
            <Button className="max-w-[100px]">Explore</Button>
          </Link>
        </div>
        {/* svg */}
        <div className="flex-1 w-full max-w-screen-md">
          <img className="object-contain w-full h-full" src={svg} alt="svg" />
        </div>
      </div>

      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <RecentArticles limit={6} />
        </CardContent>
        <CardFooter className=" max-w-fit mx-auto">
          <Link to={"/search"}>
            <Button variant="link">View More of Recent Articles</Button>
          </Link>
        </CardFooter>
      </Card>
      <AdCard adImage={Projects} />
    </div>
  );
};

export default Home;
