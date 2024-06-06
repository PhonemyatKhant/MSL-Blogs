import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import moment from "moment";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <Link to={`/post/${post.slug}`}>
      <Card className="max-w-sm overflow-hidden">
        <CardContent className="px-0 ">
          <img
            className=" w-full h-48 object-cover"
            src={post.image}
            alt={post.title}
          />
        </CardContent>
        <CardFooter className=" space-y-3 flex flex-col">
          <h1 className=" truncate w-full">{post.title} </h1>
          <div className="w-full flex justify-between ">
            <Badge>{post.category} </Badge>
            <h1 className=" italic text-sm">
              {moment(post.updatedAt).fromNow()}{" "}
            </h1>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostCard;
