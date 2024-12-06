"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchEmployees, deleteEmployee } from "@/redux/features/employeeSlice";
import { Employee } from "@/types/employee";
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
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Profile</th>
          <th className="border p-2">First Name</th>
          <th className="border p-2">Last Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Phone Number</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id} className="hover:bg-gray-100">
            <td className="border p-2 text-center">
              <img
                src={employee.profilePicture || "/default-profile.png"}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-16 h-16 object-cover rounded-full mx-auto"
              />
            </td>
            <td className="border p-2">{employee.firstName}</td>
            <td className="border p-2">{employee.lastName}</td>
            <td className="border p-2">{employee.email}</td>
            <td className="border p-2">{employee.phoneNumber}</td>
            <td className="border p-2 text-center">
              <Link
                href={`/employee/edit/${employee._id}`}
                className="text-blue-500 mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  if (employee._id) handleDelete(employee._id);
                  else console.error("Employee ID is undefined");
                }}
                className="text-red-500"
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
    <div className="grid grid-cols-3 gap-4">
      {employees.map((employee) => (
        <div key={employee._id} className="border rounded p-4 shadow-md">
          <img
            src={employee.profilePicture || "/default-profile.png"}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
          />
          <h3 className="font-bold text-center">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-center">{employee.email}</p>
          <p className="text-center">{employee.phoneNumber}</p>
          <div className="mt-2 flex justify-center">
            <Link
              href={`/employee/edit/${employee._id}`}
              className="text-blue-500 mr-2"
            >
              Edit
            </Link>
            <button
              onClick={() => {
                if (employee._id) handleDelete(employee._id);
                else console.error("Employee ID is undefined");
              }}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setViewMode("list")}
          className={`px-4 py-2 mr-2 ${
            viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          List View
        </button>
        <button
          onClick={() => setViewMode("grid")}
          className={`px-4 py-2 ${
            viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Grid View
        </button>
      </div>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" &&
        (viewMode === "list" ? renderListView() : renderGridView())}
    </div>
  );
}
