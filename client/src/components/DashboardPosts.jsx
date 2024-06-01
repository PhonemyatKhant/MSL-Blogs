import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { DataTable } from "./ui/data-table";
import { postColumns } from "@/lib/PostsColumn";

const DashboardPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [allPosts, setAllPosts] = useState([]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/post/all-posts?userId=${currentUser._id}&startIndex=${index}`
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
  }, [currentUser._id, index]);

  return (
    <div>
      <DataTable index={index} setIndex={setIndex} columns={postColumns} data={allPosts} />
    </div>
  );
};

export default DashboardPosts;
