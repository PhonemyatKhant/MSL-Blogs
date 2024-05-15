import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";
import { Link } from "react-router-dom";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50),

  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

const SignUp = () => {
  // signup input form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  // onsubmit function
  async function onSubmit(values) {
    console.log(values);
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      // Log the raw response to see what the server returned
      // const text = await res.text();
      // console.log("Raw response text:", text);
      const data = await res.json();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className=" min-h-screen mt-20">
      <div
        className="flex flex-col md:flex-row  p-3 mx-auto max-w-6xl md:items-center 
       gap-9"
      >
        {/* left  */}
        <div className="flex-1 space-y-6">
          <h1 className=" text-9xl font-medium ">
            MSL
            <br /> BLOGS
          </h1>
          <p>
            "Welcome to MSL, a Blog Website Dedicated to Sharing Knowledge and
            Insights about Spanish Learners in Myanmar. Connect with a Community
            of Enthusiastic Learners, Access Comprehensive Lessons, and Discover
            Rich Resources Tailored to Your Learning Journey."
          </p>
        </div>
        {/* right  */}
        <div className="flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                form={form}
                placeholder="username"
                name="username"
                label="Username"
              />
              <FormInput
                form={form}
                placeholder="example@gmail.com"
                name="email"
                label="Email"
              />
              <FormInput
                type="password"
                form={form}
                placeholder="*****"
                name="password"
                label="Password"
              />

              <Button className="w-full " type="submit">
                Sign Up
              </Button>
            </form>
          </Form>
          <div className="flex gap-2 items-center mt-4">
            <h1>Have an account?</h1>
            <Link className=" text-muted-foreground " to="/sign-in">
              Sign In
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
