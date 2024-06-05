import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";

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

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Frown } from "lucide-react";
import { Badge } from "./ui/badge";
import Comment from "./Comment";

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
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const { register, setValue } = form;

  //submit

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
      const data = await res.json();

      if (res.ok) {
        setComments((prevComments) => [data, ...prevComments]);
        setValue("comment", "");
        setCount(0);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //get comments

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/get-comments/${postId}`);
        const data = await res.json();

        if (res.ok) setComments(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
  }, [postId]);

  //on like handler function

  const onLikeHandler = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/like-comment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();

        // replace that individual comment with updated like arrray and count

        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  likesCount: data.likesCount,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" space-y-5 my-8">
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
      {comments.length === 0 ? (
        // no comments alert
        <Alert variant="destructive">
          <Frown className="h-4 w-4" />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>No comments yet!</AlertDescription>
        </Alert>
      ) : (
        <div>
          {/* comments count  */}

          <h1 className=" flex items-center gap-2">
            Comments <Badge className="">{comments.length} </Badge>
          </h1>

          {/* comment section  */}
          
          {comments.map((comment) => (
            <Comment
              onLike={onLikeHandler}
              comment={comment}
              key={comment._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
