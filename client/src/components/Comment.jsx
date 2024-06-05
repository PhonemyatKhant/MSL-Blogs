import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Heart, Trash2, X } from "lucide-react";
import moment from "moment";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

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
                <div className=" cursor-pointer  flex gap-1 items-center">
                  <Edit className=" text-yellow-400 w-4 h-4" />
                  <span className=" text-xs">edit </span>
                </div>
                {/* delete */}
                <div className=" cursor-pointer flex  items-center">
                  <Trash2 className=" text-red-400 w-4 h-4" />
                  <span className=" text-xs">delete </span>
                </div>
              </div>
            </div>
          </div>
          <Separator className="mt-4" />
        </div>
      )}
    </>
  );
};

export default Comment;
