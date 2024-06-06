import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Heart, Trash2, X } from "lucide-react";
import moment from "moment";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import PopUpDialog from "./PopUpDialog";

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

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState({ status: false, commentId: "" });

  const { currentUser } = useSelector((state) => state.user);
  const [count, setCount] = useState(0);

  const [openPopUp, setOpenPopUp] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const { register, setValue } = form;

  //get user based on the commenter id from comment

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      };
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  }, [comment]);

  //on submit aka on edit

  const onSubmit = async (values) => {
    const res = await onEdit(comment._id, values, comment.userId);
    if (res.ok) {
      setIsEditing({ status: false, commentId: null });
    }
  };

  //edit click handler
  const editClickHandler = (commentId) => {
    if (isEditing.status === false && isEditing.commentId !== commentId) {
      setIsEditing({ status: true, commentId });

      setValue("comment", comment.comment);
    } else {
      setIsEditing({ status: false, commentId: null });
      setValue("comment", "");
    }
  };

  //   return

  return (
    <>
      {user && (
        <div className=" p-3">
          <div className="  flex items-start gap-4">
            {/* userimage  */}
            <Avatar className="mt-1">
              <AvatarImage src={user.profilePicture} alt={user.username} />
              <AvatarFallback>
                {user.username[0] + user.username[1]}{" "}
              </AvatarFallback>
            </Avatar>

            {/* right */}
            {isEditing.status && isEditing.commentId === comment._id ? (
              // edit form

              <div className=" w-full">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full  space-y-6"
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
                                onChange: (e) =>
                                  setCount(e.target.value.length),
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
                    <div className=" space-x-2">
                      <Button
                        onClick={() =>
                          editClickHandler(comment._id, comment.comment)
                        }
                        size="sm"
                        variant="destructive"
                        type="button"
                      >
                        Cancel
                      </Button>
                      <Button size="sm" type="submit">
                        Submit
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            ) : (
              // display comment data
              <div className=" space-y-1">
                {/* name + date  */}
                <h1 className="text-sm  font-semibold">
                  {user.username}{" "}
                  <span className=" font-thin italic text-muted-foreground  text-xs">
                    {moment(comment.createdAt).fromNow()}{" "}
                  </span>{" "}
                </h1>
                {/* comment */}

                <p className="font-light">{comment.comment} </p>

                {/* like, edit and delete  */}

                <div className=" pt-5 flex items-center gap-2">
                  {/* like */}
                  <div
                    onClick={() => onLike(comment._id)}
                    className=" cursor-pointer  flex gap-1 items-center"
                  >
                    {" "}
                    {currentUser && comment.likes.includes(currentUser._id) ? (
                      <FaHeart className=" text-primary" />
                    ) : (
                      <Heart className="  text-primary w-4 h-4" />
                    )}
                    <span className=" text-xs">{comment.likesCount} </span>
                  </div>
                  {/* edit */}

                  {currentUser &&
                    (currentUser.isAdmin ||
                      currentUser._id === comment.userId) && (
                      <div
                        onClick={() => editClickHandler(comment._id)}
                        className="  cursor-pointer  flex gap-1 items-center"
                      >
                        <Edit className=" text-yellow-400 w-4 h-4" />
                        <span className=" text-xs">edit </span>
                      </div>
                    )}
                  {/* delete */}
                  {currentUser &&
                    (currentUser.isAdmin ||
                      currentUser._id === comment.userId) && (
                      <>
                        <div
                          onClick={() => setOpenPopUp(true)}
                          className="  cursor-pointer  flex gap-1 items-center"
                        >
                          <Trash2 className=" text-red-400 w-4 h-4" />
                          <span className=" text-xs">delete </span>
                        </div>
                        <PopUpDialog
                          setOpen={setOpenPopUp}
                          open={openPopUp}
                          noTrigger={true}
                          handlerFunction={() =>
                            onDelete(comment._id, comment.userId)
                          }
                        />
                      </>
                    )}
                </div>
              </div>
            )}
          </div>
          <Separator className="mt-4" />
        </div>
      )}
    </>
  );
};

export default Comment;
