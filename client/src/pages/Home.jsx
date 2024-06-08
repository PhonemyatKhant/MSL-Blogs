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

const Home = () => {
  return (
    <div className=" min-h-screen ">
      <div className="flex my-24 items-center px-10 max-md:flex-col justify-between w-full">
        <div className="dark:text-white my-3 space-y-6 w-full max-w-screen-sm flex-1">
          <h1 className="text-primary text-9xl font-semibold max-md:text-6xl max-lg:text-7xl">
            msl.
            <br />
            <span className=" underline ">blogs</span>
          </h1>
          <p className="text-lg max-md:text-base">
            "Welcome to MSL, a Blog Website Dedicated to Sharing Knowledge and
            Insights about Spanish Learners in Myanmar. Connect with a Community
            of Enthusiastic Learners, Access Comprehensive Lessons, and Discover
            Rich Resources Tailored to Your Learning Journey."
          </p>
          <Button className="max-w-[100px]">Explore</Button>
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
          <Button variant="link">View More of Recent Articles</Button>
        </CardFooter>
      </Card>
      <AdCard adImage={Projects} />
    </div>
  );
};

export default Home;
