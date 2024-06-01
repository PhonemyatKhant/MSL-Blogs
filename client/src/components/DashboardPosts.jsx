import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { DataTable } from "./ui/data-table";
import { postColumns } from "@/lib/PostsColumn";

const columns = [
  {
    label: "Date Updated",
    key: "updatedAt",
    className: "w-[100px] font-medium",
  },
  { label: "Image", key: "image" },
  { label: "Title", key: "title" },
  { label: "Category", key: "category" },
  { label: "Delete", key: "delete" },
  { label: "Edit", key: "edit" },
];

const DashboardPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/post/all-posts?userId=${currentUser._id}`
        );
        const data = await res.json();
        const { posts, totalPosts, totalPostsOneMonthAgo } = data;
        if (res.ok) setAllPosts(posts);
        else {
          console.log(data);
          return;
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    currentUser.isAdmin && fetchPosts();
  }, [currentUser._id]);

  return (
    <div>
      <DataTable columns={postColumns} data={allPosts} />
    </div>
  );
};

export default DashboardPosts;
