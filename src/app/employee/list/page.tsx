"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchEmployees } from "@/redux/features/employeeSlice";
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

  const renderListView = () => (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">First Name</th>
          <th className="border p-2">Last Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id} className="hover:bg-gray-100">
            <td className="border p-2">{employee.firstName}</td>
            <td className="border p-2">{employee.lastName}</td>
            <td className="border p-2">{employee.email}</td>
            <td className="border p-2 text-center">
              <Link
                href={`/employee/edit/${employee._id}`}
                className="text-blue-500 mr-2"
              >
                Edit
              </Link>
              <button className="text-red-500">Delete</button>
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
          <h3 className="font-bold">
            {employee.firstName} {employee.lastName}
          </h3>
          <p>{employee.email}</p>
          <div className="mt-2">
            <Link
              href={`/employee/edit/${employee._id}`}
              className="text-blue-500 mr-2"
            >
              Edit
            </Link>
            <button className="text-red-500">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Employee List</h1>
        <div>
          <button
            onClick={() => setViewMode("list")}
            className={`mr-2 ${
              viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
            } px-4 py-2 rounded`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`${
              viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
            } px-4 py-2 rounded`}
          >
            Grid View
          </button>
        </div>
      </div>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" &&
        (viewMode === "list" ? renderListView() : renderGridView())}
    </div>
  );
}
