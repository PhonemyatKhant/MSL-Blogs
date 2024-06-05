import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import moment from "moment";
import { Separator } from "./ui/separator";

const Comment = ({ comment }) => {
  const [user, setUser] = useState(null);
  console.log(user);
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

              <div>
                <h1>
                  <Heart className="w-4 h-4" />
                  <span></span>
                </h1>
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
