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
    <Card className=" mt-24 overflow-hidden">
      <div className=" flex items-center  flex-col sm:flex-row">
        <div className=" flex-1">
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
        <CardContent className=" pt-6 flex-1">
          <img className=" w-full h-full" src={adImage} alt="github profile" />
        </CardContent>
      </div>
    </Card>
  );
};

export default AdCard;
