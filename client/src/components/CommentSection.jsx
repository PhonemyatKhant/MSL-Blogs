import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "./ui/card";

const FormSchema = z.object({
  comment: z
    .string()
    .min(1, {
      message: "Comment cannot be empty.",
    })
    .max(160, {
      message: "Comment must not be longer than 160 characters.",
    }),
});

const CommentSection = ({ postId }) => {
  const [count, setCount] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const { register, setValue } = form;

  const onSubmit = async (values) => {
    // console.log(values);
    if (count > 160) return;

    try {
      const res = await fetch("/api/comment/create-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment: values.comment,
          userId: currentUser._id,
          postId,
        }),
      });
      // const data = await res.json();

      if (res.ok) {
        setValue("comment", "");
        setCount(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" my-8">
      <Card>
        <CardContent className=" pt-5 space-y-6">
          {currentUser ? (
            <div>
              <h1 className=" flex items-center gap-2 text-muted-foreground">
                Signed in as:{" "}
                <Link to="/dashboard?tab=profile">
                  <span className=" text-primary cursor-pointer flex items-center gap-2 ">
                    {" "}
                    {/* profile pic avatar */}
                    <Avatar className="inline-block w-5 h-5">
                      <AvatarImage src={currentUser.profilePicture} />
                      <AvatarFallback>
                        {currentUser.username[0] + currentUser.username[1]}{" "}
                      </AvatarFallback>
                    </Avatar>{" "}
                    {currentUser.username}{" "}
                  </span>
                </Link>
              </h1>
            </div>
          ) : (
            <div>
              <h1 className=" text-muted-foreground">
                Please sign in to comment.{" "}
                <Link to="/sign-in">
                  <span className="  hover:underline  text-primary">
                    Sign In{" "}
                  </span>
                </Link>
              </h1>
            </div>
          )}
          {/* form textarea */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-screen-sm space-y-6"
            >
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        {...register("comment", {
                          onChange: (e) => setCount(e.target.value.length),
                        })}
                        disabled={!currentUser}
                        placeholder="Write a comment..."
                        className="resize-none "
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {160 - count} characters remaining.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentSection;
