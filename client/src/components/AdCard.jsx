import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

const AdCard = ({ adImage }) => {
  return (
    <Card className=" max-w-screen-lg mx-auto mt-24 overflow-hidden">
      <div className=" flex items-center w-full  justify-evenly px-10   flex-col sm:flex-row">
        <div className=" w-full flex-1">
          <CardHeader>
            <CardTitle>Want to see more of my recent projects?</CardTitle>
            <CardDescription>
              Checkout my github profile with different javascipt projects!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button> CLICK ME </Button>
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
