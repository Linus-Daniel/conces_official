import UsersManagement from "@/components/admin/client_pages/users";
import api from "@/lib/axiosInstance";
import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import React from "react";

const getUsers = async (id: string) => {
  try {
    console.log(id);
    const response = await api.get(`/chapters/${id}/members/`);
    return response.data.users;
  } catch (error) {
    console.log(error);
  }
};

const page = async () => {
  const session = await getServerSession(authOptions);
  const id = session?.user.chapter as string;
  console.log(id);
  const users = await getUsers(id);
  const userRole = session?.user.role;
  return (
    <div>
      <UsersManagement users={users} userRole={userRole as string} />
    </div>
  );
};

export default page;
