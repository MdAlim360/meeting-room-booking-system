/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/admin/userManagementApi";
import Header from "../Header";
import { toast } from "sonner";

const UserManagement = () => {
  const { data: users, isLoading } = useGetAllUsersQuery("");
  const [updateUser] = useUpdateUserMutation();

  const handleUpdateUserSubmit = async (id: string) => {
    try {
      const res = await updateUser({
        id: id,
        updateData: { role: "admin" },
      }).unwrap();
      if (!res.data) throw new Error("User update failed");
      toast.success("User promoted successfully", { duration: 2000 });
    } catch (err) {
      const errorMessage =
        (err as any).data?.errorSources?.[0]?.message || "An error occurred";
      toast.error(errorMessage, { duration: 2000 });
    }
  };

  return (
    <div className="p-4 w-full min-h-screen">
      <Header title="User Management" />

      <div className="max-w-5xl mx-auto">
        {users?.data?.map((user: any) => (
          <div
            key={user._id}
            className="flex flex-wrap justify-between items-center mt-5 border border-gray-300 p-4 rounded-md bg-white shadow-md"
          >
            <p className="flex-1 text-left min-w-[150px]">{user.name}</p>

            <p
              className={`flex-1 mr-2 text-center min-w-[120px] px-2 py-1 text-white rounded-md ${
                user.role === "admin" ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {user.role}
            </p>

            {user.role === "user" ? (
              <button
                onClick={() => handleUpdateUserSubmit(user._id)}
                className="flex-1 min-w-[120px] bg-yellow-500 text-white py-1 px-3 rounded-md text-center mt-2 md:mt-0"
              >
                Make Admin
              </button>
            ) : (
              <button
                disabled
                className="flex-1 min-w-[120px] bg-gray-500 text-white py-1 px-3 rounded-md text-center mt-2 md:mt-0"
              >
                Promoted
              </button>
            )}
          </div>
        ))}

        {isLoading && <h1 className="text-center text-red-600">Loading...</h1>}
      </div>
    </div>
  );
};

export default UserManagement;
