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
    <div className="min-h-screen">
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="text-3xl text-primary">About</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-evenly max-md:flex-col items-center">
          {/* left  */}
          <div className="flex-1 space-y-5">
            <h1 className="font-semibold text-primary text-lg">
              Why This Blog?
            </h1>
            <li>
              Welcome to my corner of the internet! This blog is where I share my thoughts, experiences, and insights on various topics I'm passionate about. Whether you're here to learn something new or just curious, I hope you find something that sparks your interest.
            </li>
            <h1 className="font-semibold text-primary text-lg">My Mission</h1>
            <li>
              My mission is to inspire and empower others to explore new ideas and perspectives. Through this blog, I hope to build a community where we can learn, grow, and support each other on our journeys.
            </li>
            <h1 className="font-semibold text-primary text-lg">
              Connect With Me
            </h1>
            <li>
              I love connecting with fellow enthusiasts and anyone curious about life's endless possibilities. Feel free to email me or follow my adventures on GitHub!
            </li>
          </div>
          <div className="w-full flex-1">
            <img className="w-full" src={Dog} alt="A cute dog" />
          </div>
        </CardContent>
        <CardFooter>
          Thank you for visiting my blog! I'm excited to embark on this journey together. Let's explore and learn side by side!
        </CardFooter>
      </Card>
    </div>
  );
};

export default About;
