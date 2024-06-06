import { commentColumns } from "@/lib/CommentsColumn";
import React, { useEffect, useState } from "react";
import { DataTable } from "./ui/data-table";

const DashboardComment = () => {
  const [comments, setComments] = useState([]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `/api/comment/get-comments?startIndex=${index}`
        );
        const data = await res.json();
        if (res.ok) {
          const { allComments, allCommentCount, newCommentsOneMonthAgo } = data;
          setComments(allComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComments();
  }, [index]);
  return (
    <div>
      <DataTable
        title="All Comments"
        index={index}
        setIndex={setIndex}
        columns={commentColumns}
        data={comments}
      />
    </div>
  );
};

export default DashboardComment;
