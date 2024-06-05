import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { badgeVariants } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AdCard from "@/components/AdCard";
import CommentSection from "@/components/CommentSection";

const PostPage = () => {
  const { postSlug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/all-posts?slug=${postSlug}`);
        const data = await res.json();
        const { posts } = data;
        setPost(posts[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchPost();
  }, [postSlug]);

  return (
    <div className=" min-h-screen">
      {/* loading  */}
      {loading && (
        <div className=" min-h-screen text-black  text-4xl mx-auto max-w-fit mt-6    ">
          <Loader2 className="inline-block mr-2 w-6 h-full animate-spin" />
          Loading...
        </div>
      )}
      {/* post */}
      {!loading && post !== null && (
        <>
          {/*  title category */}
          <div className=" space-y-6 text-center mt-9">
            <h1 className=" text-4xl sm:text-6xl ">{post.title} </h1>
            <Link to={"/"} className={badgeVariants({ variant: "default" })}>
              {post.category}{" "}
            </Link>
          </div>
          {/*  image */}
          <div className=" mt-10  max-w-3xl w-full  mx-auto overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className=" w-full max-h-[500px] object-cover"
            />
            {/* date time container  */}
            <div className=" my-4 flex justify-between items-center italic">
              <h1>{new Date(post.updatedAt).toLocaleDateString()} </h1>
              <h1>{`${(post.content.length / 1000).toFixed(0)} mins read`} </h1>
            </div>
            <Separator />
            {/* content  */}

            <div
              className=" content max-w-3xl w-full p-3  mx-auto"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>

            {/* <Separator /> */}

            <AdCard adImage={post.image} />

            {/* comment section of the post  */}

            <CommentSection postId={post._id} />
          </div>
        </>
      )}
    </div>
  );
};

export default PostPage;
