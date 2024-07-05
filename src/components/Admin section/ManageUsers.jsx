import React, { useEffect, useState } from "react";
import { Axios } from "../../MainPage";
import LoadingSpinner from "../Assets/LoadingSpinner";
import DeleteIcon from "@mui/icons-material/Delete";
import Cookies from "js-cookie";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);

  useEffect(() => {
    Axios.get(`/admin/users-list?page=${currentPage}`, {
      headers: {
        Authorization: Cookies.get("adminToken"),
      },
    })
      .then((response) => {
        setUsers(response.data.users);
        setTotalPages(response.data.pagination.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch users", error);
        setIsLoading(false);
      });
  }, [currentPage]);

  // const handleNextPage = () => {
  //   setPage(page + 1);
  // };

  // const handlePreviousPage = () => {
  //   if (page > 1) {
  //     setPage(page - 1);
  //   }
  // };

  // const handleLimitChange = (e) => {
  //   setLimit(parseInt(e.target.value));
  //   setPage(1); // Reset page number when changing limit
  // };

  const openDeleteConfirmationModal = (userId) => {
    setUserToDelete(userId);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationModal = () => {
    setUserToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteUser = async () => {
    try {
      await Axios.delete(`/admin/user/delete/${userToDelete}`, {
        headers: {
          Authorization: Cookies.get("adminToken"),
        },
      });
      const updatedUsers = users.filter((user) => user._id !== userToDelete);
      setUsers(updatedUsers);
      closeDeleteConfirmationModal();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handleBlockUser = async (userId, isBlocked) => {
    try {
      const endpoint = isBlocked
        ? `/user/unblock/${userId}`
        : `/user/block/${userId}`;
      await Axios.patch(
        endpoint,
        {},
        {
          headers: {
            Authorization: Cookies.get("adminToken"),
          },
        }
      );
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

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl text-center text-green-800 font-bold mb-3">
        Manage Users
      </h1>
      <hr />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            {/* Pagination controls */}
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              {/* <div className="mb-4 flex justify-end">
              <select
                value={limit}
                onChange={handleLimitChange}
                className="px-3 py-1 border border-gray-300 rounded-md"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="ml-2 px-3 py-1 border border-gray-300 rounded-md"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                className="ml-2 px-3 py-1 border border-gray-300 rounded-md"               
              >
                Next
              </button>
            </div> */}

              {/* Pagination */}
              <div className="flex justify-end mt-1">
                <button
                  className={`px-1 rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-slate-700 text-white"
                  }`}
                  onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ArrowBackIcon />
                </button>
                <span className="mx-2 font-medium"> Page: {currentPage}</span>
                <button
                  className={`px-1 rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-slate-700 text-white"
                  }`}
                  onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ArrowForwardIcon />
                </button>
              </div>
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
                        Login type
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
                        <td className="px-6 py-4 capitalize whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">
                          {user.loginType}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            user.isBlocked ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {user.isBlocked === true ? "Blocked" : "Active"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex flex-row justify-between">
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
                            onClick={() =>
                              openDeleteConfirmationModal(user._id)
                            }
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
      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-700"
                onClick={handleDeleteUser}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 rounded text-black bg-gray-200 hover:bg-gray-300 ml-2"
                onClick={closeDeleteConfirmationModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
