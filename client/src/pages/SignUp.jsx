import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { Frown, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import OAuth from "@/components/OAuth";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50)
    .trim(),

  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().trim(),
});

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // signup input form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  // onsubmit function POST values to create user
  async function onSubmit(values) {
    try {
      setLoading(true);
      // clear prev error message
      setErrorMessage(null);

      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      setLoading(false);
      setErrorMessage(data.message);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  }
  return (
    <div className="dark:text-white min-h-screen mt-20">
      <div
        className="flex flex-col md:flex-row  p-3 mx-auto max-w-6xl md:items-center 
       gap-9"
      >
        {/* left  */}
       
        <div className="dark:text-white my-3 space-y-6 w-full max-w-screen-sm flex-1">
          <h1 className="text-primary text-9xl font-semibold max-md:text-6xl max-lg:text-7xl">
            msl.
            <br />
            <span className=" underline ">blogs</span>
          </h1>
          <p>
            "Connect with a Community of Enthusiastic Learners, Access
            Comprehensive Lessons, and Discover Rich Resources Tailored to Your
            Learning Journey."
          </p>
          {/* <Button className="max-w-[100px]">Explore</Button> */}
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

              <Button className="w-full " type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>Sign Up</>
                )}
              </Button>
              <OAuth />
            </form>
          </Form>
          <div className="flex gap-2 items-center mt-4">
            <h1>Have an account?</h1>
            <Link className=" text-muted-foreground " to="/sign-in">
              Sign In
            </Link>{" "}
          </div>
          {/* alert dialog */}
          {errorMessage !== null && (
            <Alert variant="destructive" className="mt-4">
              <Frown className="h-4 w-4" />
              <AlertTitle>Oops!</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
