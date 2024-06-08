import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

const RecentArticles = ({limit}) => {
  const [recentPosts, setRecentPosts] = useState([]);
  

  useEffect(() => {
    const fetchRecentArticles = async () => {
      try {
        const res = await fetch(`/api/post/all-posts?limit=${limit}`);
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
      <div className=" items-center grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {recentPosts.length !== 0 &&
          recentPosts.map((recentPost,index) => <PostCard key={index} post={recentPost} />)}
      </div>
    </div>
  );
};

export default RecentArticles;
