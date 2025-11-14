import UsersManagement from "@/components/admin/client_pages/users";
import api from "@/lib/axiosInstance";
import { cookies } from "next/headers";
import React from "react";
const getUsers = async () => {
  const cookieStore = await cookies()
  try {
    const response = await api.get("/users",{
      headers:{
        cookie:cookieStore.toString()
      }
    });
    console.log(response.data);
    return response.data.users;
  } catch (error) {
    console.log(error);
  }
};

const page = async () => {
  const users = await getUsers();
  return (
    <div>
      <UsersManagement users={users} userRole="admin" />
    </div>
  );
};

export default page;
