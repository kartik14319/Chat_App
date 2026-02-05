import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();

  if (loading) return <p className="text-white px-4">Loading...</p>;

  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {Array.isArray(allUsers) && allUsers.length > 0 ? (
          allUsers.map((user, index) => <User key={index} user={user} />)
        ) : (
          <p className="text-white px-4">No users found</p>
        )}
      </div>
    </div>
  );
}

export default Users;
