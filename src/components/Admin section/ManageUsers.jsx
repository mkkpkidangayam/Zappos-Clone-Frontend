import React, { useEffect, useState } from "react";
import { Axios } from "../../MainPage";
import LoadingSpinner from "../Assets/LoadingSpinner";
import DeleteIcon from "@mui/icons-material/Delete";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Axios.get("/admin/users-manage")
      .then((response) => {
        setUsers(response.data.users);
        console.log(response.data.users);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch users", error);
        setIsLoading(false);
      });
  }, []);

  // const fetchUsers = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await Axios.get('/admin/users-manage');
  //     setUsers(response.data.users);
  //     console.log(response.data.users);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error('Failed to fetch users', error);
  //     setIsLoading(false);
  //   }
  // };

  const deleteUser = async (userId) => {
    try {
      await Axios.delete(`/admin/user/delete/${userId}`);
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleBlockUser = async (userId, isBlocked) => {
    try {
      const endpoint = isBlocked
        ? `/user/unblock/${userId}`
        : `/user/block/${userId}`;
      await Axios.patch(endpoint);
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, isBlocked: !isBlocked };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Failed to block/unblock user", error);
    }
  };

  users.map((item) => console.log(item));

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl text-center text-green-800 font-bold mb-4">
        Manage Users
      </h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user, index) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            user.isBlocked ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {user.isBlocked === true ? "Blocked" : "Active"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row justify-evenly">
                          <button
                            onClick={() =>
                              handleBlockUser(user._id, user.isBlocked)
                            }
                            className={`${
                              user.isBlocked
                                ? "text-green-500"
                                : "text-yellow-500"
                            } ${
                              user.isBlocked
                                ? "hover:text-green-800"
                                : "hover:text-yellow-800"
                            }`}
                          >
                            {user.isBlocked ? "Unblock" : "Block"}
                          </button>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <DeleteIcon />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
