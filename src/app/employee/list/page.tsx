"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchEmployees, deleteEmployee } from "@/redux/features/employeeSlice";
// import { Employee } from "@/types/employee";
import Link from "next/link";

export default function EmployeeListPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const dispatch = useDispatch<AppDispatch>();
  const { employees, status, error } = useSelector(
    (state: RootState) => state.employees
  );

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      dispatch(deleteEmployee(id));
    }
  };

  const renderListView = () => (
    <table className="w-full border-collapse table-auto shadow-lg bg-white rounded-lg">
      <thead>
        <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <th className="border p-4 text-left">Profile</th>
          <th className="border p-4 text-left">First Name</th>
          <th className="border p-4 text-left">Last Name</th>
          <th className="border p-4 text-left">Email</th>
          <th className="border p-4 text-left">Phone Number</th>
          <th className="border p-4 text-left">Gender</th>
          <th className="border p-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr
            key={employee._id}
            className="hover:bg-gray-100 transition-all duration-300"
          >
            <td className="border p-4 text-center">
              <img
                src={employee.profilePicture || "/default-profile.png"}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-16 h-16 object-cover rounded-full mx-auto shadow-md"
              />
            </td>
            <td className="border p-4">{employee.firstName}</td>
            <td className="border p-4">{employee.lastName}</td>
            <td className="border p-4">{employee.email}</td>
            <td className="border p-4">{employee.phoneNumber}</td>
            <td className="border p-4">
              {employee.gender === "M" ? "Male" : "Female"}
            </td>
            <td className="border p-4 text-center">
              <Link
                href={`/employee/edit/${employee._id}`}
                className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300"
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  if (employee._id) handleDelete(employee._id);
                  else console.error("Employee ID is undefined");
                }}
                className="text-red-600 hover:text-red-800 ml-3 font-semibold transition duration-300"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderGridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {employees.map((employee) => (
        <div
          key={employee._id}
          className="border rounded-lg shadow-xl bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          <img
            src={employee.profilePicture || "/default-profile.png"}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-32 h-32 object-cover rounded-full mx-auto mt-6 border-4 border-white shadow-md"
          />
          <div className="p-6 text-center space-y-4">
            <h3 className="text-xl font-semibold text-white">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-white text-opacity-80">{employee.email}</p>
            <p className="text-white text-opacity-80">{employee.phoneNumber}</p>
            <p className="text-white text-opacity-80">
              {employee.gender === "M" ? "Male" : "Female"}
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <Link
                href={`/employee/edit/${employee._id}`}
                className="text-yellow-400 hover:text-yellow-500 font-semibold transition duration-300"
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  if (employee._id) handleDelete(employee._id);
                  else console.error("Employee ID is undefined");
                }}
                className="text-red-400 hover:text-red-500 font-semibold transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8 flex space-x-8 justify-center">
        <button
          onClick={() => setViewMode("list")}
          className={`flex items-center px-6 py-3 rounded-lg shadow-md transition-all duration-300 ${
            viewMode === "list"
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          List View
        </button>
        <button
          onClick={() => setViewMode("grid")}
          className={`flex items-center px-6 py-3 rounded-lg shadow-md transition-all duration-300 ${
            viewMode === "grid"
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h5.5m5 0h5.5M4 12h5.5m5 0h5.5M4 18h5.5m5 0h5.5M9.5 6v12m5-12v12"
            />
          </svg>
          Grid View
        </button>
      </div>
      {status === "loading" && (
        <div className="text-center text-xl font-semibold text-gray-700">
          Loading employees...
        </div>
      )}
      {status === "failed" && (
        <div className="text-center text-xl font-semibold text-red-500">
          Error: {error}
        </div>
      )}
      {status === "succeeded" &&
        (viewMode === "list" ? renderListView() : renderGridView())}
    </div>
  );
}
