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

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().trim(),
});

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // SignIn input form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      setLoading(false);
      setErrorMessage(data.message);
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
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
          <h1 className=" text-9xl font-semibold ">
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
                  <>Sign In</>
                )}
              </Button>
            </form>
          </Form>
          <div className="flex gap-2 items-center mt-4">
            <h1>Don't have an account?</h1>
            <Link className=" text-muted-foreground " to="/sign-up">
              Sign Up
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

export default SignIn;
