import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Usermange = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      fetchUsers(); // Refresh the list after deleting
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const startEdit = (user) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      await axios.put(`/api/users/${editingUser.id}`, editForm);
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold mb-4">Manage Users</h1>
      {isLoading ? <p>Loading users...</p> : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => startEdit(user)}
                            className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="text-red-600 hover:text-red-900 ml-4">
                            Delete
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
      {editingUser && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg">Edit User</h2>
            <form className="space-y-4">
              <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className="border p-2 w-full" placeholder="Name"/>
              <input type="text" name="email" value={editForm.email} onChange={handleEditChange} className="border p-2 w-full" placeholder="Email"/>
              <input type="text" name="role" value={editForm.role} onChange={handleEditChange} className="border p-2 w-full" placeholder="Role"/>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => setEditingUser(null)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Cancel
                </button>
                <button type="button" onClick={saveEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usermange;
