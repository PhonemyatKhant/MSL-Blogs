import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";

const DashUserTable = ({ headers, data }) => {
  return (
    <Table>
      <TableCaption>A list of your recent users.</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header} </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.usersWithoutPassword?.slice(0, 5).map((user, index) => (
          <TableRow key={index}>
            <TableCell>
              <Avatar>
                <AvatarImage
                  className="object-cover"
                  src={user.profilePicture}
                  alt={user.username}
                />
                <AvatarFallback>
                  {user.username[0] + user.username[1]}{" "}
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>{user.username}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashUserTable;
