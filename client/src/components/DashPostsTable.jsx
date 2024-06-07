import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DashPostTable = ({ headers, data }) => {
 
  return (
    <Table>
      <TableCaption>A list of your recent articles.</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header} </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.posts?.slice(0, 5).map((post, index) => (
          <TableRow key={index}>
            <TableCell>
              <img
                className="object-cover"
                width={64}
                height={32}
                src={post.image}
                alt={post.name}
              />
            </TableCell>
            <TableCell className='truncate max-w-[300px]'>{post.title}</TableCell>
            <TableCell>{post.category}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashPostTable;
