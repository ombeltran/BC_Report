"use client";
import React, { useState } from "react";

type UserFormData = {
  id: number;
  codEmployee: number;
  name: string;
  lastName: string;
  password: string;
  role: string;
};

type Props = {
  users: UserFormData[];
};

export default function EditDeleteUsers({ users: initialUsers }: Props) {
  const [users, setUsers] = useState<UserFormData[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<UserFormData | null>(null);

  // Controlled form states
  const [codEmployee, setCodEmployee] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Edit user
  const handleEdit = (user: UserFormData) => {
    setSelectedUser(user);
    setCodEmployee(user.codEmployee.toString());
    setName(user.name);
    setLastName(user.lastName);
    setPassword(user.password);
    setRole(user.role);
  };


  // Delete user
  const handleDelete = async (user: UserFormData) => {
    const confirmDelete = confirm(`Are you sure you want to delete ${user.name}?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/auth/register/${user.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Error: ${data.error}`);
        return;
      }

      alert(`User ${user.name} deleted successfully!`);
      // UI update...
      setUsers(users.filter((u) => u.id !== user.id));

      // Clean the form if you were editing the deleted user
      if (selectedUser?.id === user.id) {
        setSelectedUser(null);
        setCodEmployee("");
        setName("");
        setLastName("");
        setPassword("");
        setRole("");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedUser) return;

    const updateData = {
      id: selectedUser.id,
      codEmployee: Number(codEmployee),
      name,
      lastName,
      password,
      role
    };

    const response = await fetch(`/api/auth/register/${selectedUser!.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      const updatedUser: UserFormData = await response.json();
      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));

      // Clean form
      setSelectedUser(null);
      setCodEmployee("");
      setName("");
      setLastName("");
      setPassword("");
      setRole("");
    }
    alert("User updated successfully!");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 my-[4%] w-screen">
      <h1 className="text-4xl font-bold py-4">Users Modification</h1>
      <div>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex justify-between sm:justify-normal gap-2 items-center">
              <p className="text-2xl">User code:</p>
              <input
                type="text"
                className="border-2 border-slate-100/50 rounded p-2"
                name="codEmployee"
                onChange={(e) => setCodEmployee(e.target.value)}
                value={codEmployee}
                placeholder="User code"
              />
            </div>

            <div className="flex justify-between sm:justify-normal gap-2 items-center">
              <p className="text-2xl">Name:</p>
              <input
                type="text"
                className="border-2 border-slate-100/50 rounded p-2"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="User name"
              />
            </div>

            <div className="flex justify-between sm:justify-normal gap-2 items-center">
              <p className="text-2xl">Last name:</p>
              <input
                type="text"
                className="border-2 border-slate-100/50 rounded p-2"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                placeholder="User last name"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="flex justify-between sm:justify-normal gap-2 items-center">
              <p className="text-2xl">Password:</p>
              <input
                type="password"
                className="border-2 border-slate-100/50 rounded p-2 bg-slate-900"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="User password"
              />
            </div>

            <div className="flex justify-between sm:justify-normal gap-2 items-center">
              <p className="text-2xl">Role:</p>
              <input
                type="text"
                className="border-2 border-slate-100/50 rounded p-2 bg-slate-900"
                name="role"
                // onChange={(e) => setRole(e.target.value)}
                value={role}
                readOnly
                placeholder="User role"
              />
            </div>
            {
              selectedUser && (
                <div className="text-end">
                  <button
                    className="border-2 border-slate-100/50 rounded p-2 w-[84px] bg-red-500 font-bold cursor-pointer"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              )
            }
          </div>
        </form>
      </div>

      {/* User Table */}
      <div className="w-[90%] md:w-[40%] pb-12">
        <table className="w-full border border-gray-300 border-collapse">
          <thead className="text-white">
            <tr>
              <th className="p-2">Code</th>
              <th className="p-2">Name</th>
              <th className="p-2">Last Name</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="odd:bg-gray-100/10">
                <td className="p-2 text-center">{user.codEmployee}</td>
                <td className="p-2 text-center">{user.name}</td>
                <td className="p-2 text-center">{user.lastName}</td>
                <td className="flex justify-center items-center gap-4 p-2">
                  <button
                    className="bg-green-600 px-3 py-1 rounded text-white font-bold"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 px-3 py-1 rounded text-white font-bold"
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
