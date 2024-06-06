import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

const RecentArticles = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  console.log(recentPosts);

  useEffect(() => {
    const fetchRecentArticles = async () => {
      try {
        const res = await fetch("/api/post/all-posts?limit=3");
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentArticles();
  }, []);
  return (
    <div className=" space-y-4">
      <h1 className=" font-semibold text-3xl text-center"> Recent Articles</h1>
      <div className=" grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {recentPosts.length !== 0 &&
          recentPosts.map((recentPost) => <PostCard post={recentPost} />)}
      </div>
    </div>
  );
};

export default RecentArticles;
