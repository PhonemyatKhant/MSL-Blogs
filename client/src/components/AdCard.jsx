import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const AdCard = ({ adImage, category }) => {
  return (
    <Card className=" max-w-screen-lg mx-auto mt-24 overflow-hidden">
      <div className=" flex items-center w-full  justify-evenly px-10   flex-col sm:flex-row">
        <div className=" w-full flex-1">
          <CardHeader>
            <CardTitle>Want to see more like this?</CardTitle>
            <CardDescription>
              Checkout all the different posts related to this category!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to={`/search?startIndex=0&category=${category}`}>
              <Button> CLICK ME </Button>
            </Link>
          </CardContent>
        </div>
        <CardContent className=" max-w-screem-md w-full pt-6 flex-1">
          <img className=" w-full h-full" src={adImage} alt="svg" />
        </CardContent>
      </div>
    </Card>
  );
};

export default AdCard;
