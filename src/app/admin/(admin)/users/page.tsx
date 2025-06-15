import UsersManagement from "@/components/admin/client_pages/users";
import api from "@/lib/axiosInstance";
import React from "react";

const getUsers = async () => {
  try {
    const response = await api.get("/users");
    console.log(response.data)
    return response.data.users;

  } catch (error) {
    console.log(error);
  }
};

const page = async () => {
  const users = await getUsers();
  return (
    <div>
      <UsersManagement users={users} />
    </div>
  );
};

export default page;
