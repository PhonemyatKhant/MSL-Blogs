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
    <Link className="" to={`/post/${post.slug}`}>
      <Card className="w-full overflow-hidden flex flex-col h-full">
        <CardContent className="p-0 flex-grow">
          <img
            className="w-full h-48 object-cover"
            src={post.image}
            alt={post.title}
          />
        </CardContent>
        <CardFooter className="p-4 space-y-3 flex flex-col flex-grow">
          <h1 className="truncate w-full">{post.title}</h1>
          <div className="w-full flex justify-between items-center">
            <Badge>{post.category}</Badge>
            <h1 className="italic text-sm">
              {moment(post.updatedAt).fromNow()}
            </h1>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PostCard;
