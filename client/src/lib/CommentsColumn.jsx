import PopUpDialog from "@/components/PopUpDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const commentColumns = [
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer max-w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const formattedDate = new Date(row.getValue("updatedAt"));
      const day = String(formattedDate.getUTCDate()).padStart(2, "0");
      const month = String(formattedDate.getUTCMonth() + 1).padStart(2, "0");
      const year = formattedDate.getUTCFullYear();
      return <h1>{`${day}/${month}/${year}`} </h1>;
    },
  },

  {
    accessorKey: "comment",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer max-w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      // console.log(row.original);
      const { slug } = row.original;
      return (
        <Link to={`/post/${slug}`}>
          {" "}
          <h1 className=" hover:underline cursor-pointer">
            {row.getValue("comment")}{" "}
          </h1>
        </Link>
      );
    },
  },
  {
    accessorKey: "likesCount",
    header: ({ column }) => {
      return (
        <h1
          className=" mx-auto  cursor-pointer max-w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Likes Count
          <ArrowUpDown className="inline ml-2 h-4 w-4" />
        </h1>
      );
    },
    cell: ({ row }) => {
      return <h1 className=" text-center">{row.getValue("likesCount")} </h1>;
    },
  },
  //   {
  //     accessorKey: "postId",
  //     header: "Post ID",
  //   },
  {
    accessorKey: "userId",
    header: "User ID",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);

      const navigate = useNavigate();

      const comment = row.original;
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(comment._id)}
              >
                Copy comment ID
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(row.getValue("postId"))
                }
              >
                Copy post ID
              </DropdownMenuItem>

              {/* delete  */}
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Delete Comment
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <PopUpDialog
            setOpen={setOpen}
            open={open}
            handlerFunction={() =>
              deleteCommentHandler(
                comment._id,
                comment.userId,
                navigate,
              
              )
            }
          />
        </>
      );
    },
  },
];

const deleteCommentHandler = async (commentId, userId, navigate) => {
  try {
    const res = await fetch(
      `/api/comment/delete-comment/${commentId}/${userId}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
    } else {
      navigate(0);
    }
  } catch (error) {
    console.log(error);
  }
};

const updatePostHandler = async (postId, creatorId, navigate) => {
  navigate(`/update-post/${postId}/${creatorId}`);
};
