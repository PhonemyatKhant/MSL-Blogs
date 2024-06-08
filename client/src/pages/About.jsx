import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Dog from "@/assets/Dog.svg";

const About = () => {
  return (
    <div className=" min-h-screen">
      <Card className="mt-10 ">
        <CardHeader>
          <CardTitle className=" text-3xl text-primary">About</CardTitle>
        </CardHeader>
        <CardContent className='flex justify-evenly max-md:flex-col items-center'>
          {/* left  */}
          <div className="flex-1 space-y-5">
            <h1 className=" font-semibold text-primary text-lg">
              Why This Blog Website?
            </h1>
            <li>
              This blog is my platform to share insights, tutorials, and
              personal experiences from my journey as a spanish learner. Whether
              you are a beginner looking to learn the basics or an experienced
              learner seeking advanced tips, I aim to provide valuable content
              that caters to all levels.
            </li>
            <h1 className=" font-semibold text-primary text-lg">My Mission</h1>
            <li>
              My mission is to inspire and empower others to pursue their
              passion for learning spanish. Through this blog, I hope to build a
              community where we can all learn, grow, and support each other.
            </li>
            <h1 className=" font-semibold text-primary text-lg">
              Connect With Me
            </h1>
            <li>
              I'm always excited to connect with fellow developers, enthusiasts,
              and anyone interested in web development. Feel free to email me
              and follow me on github.
            </li>
          </div>
          <div className=" w-full flex-1">
            <img className=" w-full" src={Dog} alt="dogsvg" />
          </div>
        </CardContent>
        <CardFooter>
          Thank you for visiting my blog website. Let's embark on this learning
          journey together!
        </CardFooter>
      </Card>
    </div>
  );
};

export default About;
