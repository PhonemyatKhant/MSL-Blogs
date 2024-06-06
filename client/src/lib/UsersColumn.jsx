import PopUpDialog from "@/components/PopUpDialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Check, MoreHorizontal, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const userColumns = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer max-w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const formattedDate = new Date(row.getValue("createdAt"));
      const day = String(formattedDate.getUTCDate()).padStart(2, "0");
      const month = String(formattedDate.getUTCMonth() + 1).padStart(2, "0");
      const year = formattedDate.getUTCFullYear();
      return <h1>{`${day}/${month}/${year}`} </h1>;
    },
  },
  {
    accessorKey: "profilePicture",
    header: () => <div className=" text-center">Image</div>,
    cell: ({ row }) => {
      const currentUser = row.original;
      return (
        <div className=" mx-auto  max-w-fit">
          {/* <img
            className=" w-full h-full"
            src={row.getValue("profilePicture")}
            alt={row.getValue("username")}
          />{" "} */}
          <Avatar>
            <AvatarImage src={currentUser.profilePicture} />
            <AvatarFallback>
              {currentUser.username[0] + currentUser.username[1]}{" "}
            </AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer max-w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <h1
          className=" mx-auto  cursor-pointer max-w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="inline ml-2 h-4 w-4" />
        </h1>
      );
    },
    cell: ({ row }) => {
      return <h1 className=" text-center">{row.getValue("email")} </h1>;
    },
  },
  {
    accessorKey: "isAdmin",
    header: ({ column }) => {
      return (
        <h1
          className=" mx-auto  cursor-pointer max-w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Admin
          <ArrowUpDown className="inline ml-2 h-4 w-4" />
        </h1>
      );
    },
    cell: ({ row }) => {
      const isAdmin = row.getValue("isAdmin");
      return (
        <h1 className=" mx-auto max-w-fit">
          {" "}
          {isAdmin ? (
            <Check className=" text-green-600" />
          ) : (
            <X className=" text-red-600" />
          )}{" "}
        </h1>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const navigate = useNavigate();

      const user = row.original;
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
                onClick={() => navigator.clipboard.writeText(user._id)}
              >
                Copy user ID
              </DropdownMenuItem>

              {/* delete  */}
              <DropdownMenuItem onClick={() => setOpen(true)}>
                Delete User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <PopUpDialog
            setOpen={setOpen}
            open={open}
            handlerFunction={() =>
              deleteUserHandler(user._id, user.creatorId, navigate)
            }
          />
        </>
      );
    },
  },
];

const deleteUserHandler = async (userId, creatorId, navigate) => {
  try {
    const res = await fetch(`/api/user/delete/${userId}`, {
      method: "DELETE",
    });
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
