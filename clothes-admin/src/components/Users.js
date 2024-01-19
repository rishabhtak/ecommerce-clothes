"use client";
import { useEffect, useState } from "react";
import Table from "@/components/Table/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { ToastContainer, toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("sno", {
      header: () => "S.No.",
    }),
    columnHelper.accessor("name", {
      header: () => "Name",
    }),
    columnHelper.accessor("email", {
      header: () => "Email",
    }),
  ];

  async function getUsers() {
    try {
      const response = await fetch(`/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // Add sequential IDs to the data
      console.log(data);
      const usersWithIds = data.users.map((user, index) => ({
        ...user,
        sno: index + 1,
      }));

      setUsers(usersWithIds);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching users");
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="max-w-lg">
        <h2 className="text-gray-800 text-xl font-bold sm:text-2xl">Users</h2>
      </div>
      <Table columns={columns} data={users} />
    </>
  );
};

export default Users;
