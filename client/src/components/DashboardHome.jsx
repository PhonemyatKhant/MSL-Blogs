import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import {
  ArrowRight,
  Library,
  MessageSquareMore,
  User,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { useSelector } from "react-redux";
import DashPostTable from "./DashPostsTable";
import DashUserTable from "./DashUserTable";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const [comments, setComments] = useState([]);
  // console.log(posts);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (currentUser.isAdmin) {
        try {
          // fetch userdata
          const user = await fetch("/api/user/all-users?limit=0");
          const userData = await user.json();
          setUsers(userData);

          // fetch userdata
          const post = await fetch("/api/post/all-posts?limit=0");
          const postData = await post.json();
          setPosts(postData);

          // fetch userdata
          const comment = await fetch("/api/comment/get-comments?limit=0");
          const commentData = await comment.json();
          setComments(commentData);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid  gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Admin"
            value={1}
            info="1 admin user"
            icon={<User className="ml-auto h-4 w-4 opacity-50" />}
          />
          <DashboardCard
            title="Users"
            value={users.allUserCount}
            info={`${users.newUsersOneMonthAgo} more users last month`}
            icon={<Users className="ml-auto h-4 w-4 opacity-50" />}
          />
          <DashboardCard
            title="Posts"
            value={posts.totalPosts}
            info={`${posts.totalPostsOneMonthAgo} more posts last month`}
            icon={<Library className="ml-auto h-4 w-4 opacity-50" />}
          />
          <DashboardCard
            title="Comments"
            value={comments.allCommentCount}
            info={`${comments.newCommentsOneMonthAgo} more comments last month`}
            icon={<MessageSquareMore className="ml-auto h-4 w-4 opacity-50" />}
          />
        </div>
        {/* posts table  */}

        <div className=" mt-3 grid gap-3 grid-cols-1 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Recent Articles{" "}
                <Link to={"/dashboard?tab=posts"}>
                  <Button variant="link">
                    view all posts
                    <ArrowRight className=" w-4 h-4" />{" "}
                  </Button>{" "}
                </Link>{" "}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {" "}
              <DashPostTable
                headers={["Image", "Title", "Category"]}
                data={posts}
              />
            </CardContent>
          </Card>
          {/* //users  */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                Recent Users
                <Link to={"/dashboard?tab=users"}>
                  <Button variant="link">
                    view all users
                    <ArrowRight className=" w-4 h-4" />{" "}
                  </Button>{" "}
                </Link>{" "}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {" "}
              <DashUserTable headers={["Image", "Username"]} data={users} />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardHome;
