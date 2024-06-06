import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { DataTable } from "./ui/data-table";

import { userColumns } from "@/lib/UsersColumn";

const DashboardUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [allUsers, setAllUsers] = useState([]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await fetch(`/api/user/all-users?startIndex=${index}`);
        const data = await res.json();
      

        const { usersWithoutPassword, allUserCount, newUsersOneMonthAgo } =
          data;
        if (res.ok) setAllUsers(usersWithoutPassword);
        else {
          console.log(data.message);
          return;
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    currentUser.isAdmin && fetchAllUsers();
  }, [currentUser._id, index]);

  return (
    <div>
      <DataTable
      title='All Users'
        index={index}
        setIndex={setIndex}
        columns={userColumns}
        data={allUsers}
      />
    </div>
  );
};

export default DashboardUsers;
