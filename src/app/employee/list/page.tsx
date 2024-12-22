"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import {
  fetchEmployees,
  deleteEmployee,
} from "../../../redux/features/employeeSlice";
import Link from "next/link";

export default function EmployeeListPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortCriterion, setSortCriterion] = useState<"alphabetical" | "time">(
    "alphabetical"
  );

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

  // Apply sorting and filtering logic dynamically
  const sortedAndFilteredEmployees = [...employees]
    .filter((employee) =>
      `${employee.firstName} ${employee.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriterion === "alphabetical") {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else if (sortCriterion === "time") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });

  const renderListView = () => (
    <table className="w-full border-collapse table-auto shadow-lg bg-white rounded-lg">
      <thead>
        <tr className="bg-blue-600 text-white">
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
        {sortedAndFilteredEmployees.map((employee, index) => (
          <tr
            key={employee._id ?? index}
            className="hover:bg-gray-100 transition-all duration-300"
          >
            <td className="border p-4 text-center">
              <img
                src={employee.profilePicture ?? "/default-profile.png"}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-16 h-16 object-cover rounded-full mx-auto"
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
                className="px-3 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700"
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  if (employee._id) handleDelete(employee._id);
                }}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md shadow-md hover:bg-red-700"
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
      {sortedAndFilteredEmployees.map((employee) => (
        <div
          key={employee._id}
          className="bg-gray-100 rounded-lg shadow-md p-6 hover:scale-105 transition-transform"
        >
          <img
            src={employee.profilePicture ?? "/default-profile.png"}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-center mb-2">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-center text-gray-600">{employee.email}</p>
          <p className="text-center text-gray-600">{employee.phoneNumber}</p>
          <p className="text-center text-gray-600">
            {employee.gender === "M" ? "Male" : "Female"}
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link
              href={`/employee/edit/${employee._id}`}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              Edit
            </Link>
            <button
              onClick={() => {
                if (employee._id) handleDelete(employee._id);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3 p-2 border rounded-md shadow-sm"
        />
        <div className="flex items-center space-x-4">
          <select
            value={sortCriterion}
            onChange={(e) =>
              setSortCriterion(e.target.value as "alphabetical" | "time")
            }
            className="p-2 border rounded-md shadow-sm"
          >
            <option value="alphabetical">Sort Alphabetical</option>
            <option value="time">Sort By Time</option>
          </select>
          <button
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700"
          >
            {sortOrder === "asc"
              ? sortCriterion === "time"
                ? "Earliest to Latest"
                : "A-Z"
              : sortCriterion === "time"
              ? "Latest to Earliest"
              : "Z-A"}
          </button>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setViewMode("list")}
          className={`px-4 py-2 rounded-md shadow-md ${
            viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          List View
        </button>
        <button
          onClick={() => setViewMode("grid")}
          className={`px-4 py-2 rounded-md shadow-md ${
            viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Grid View
        </button>
      </div>
      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "failed" && (
        <p className="text-center text-red-500">{error}</p>
      )}
      {status === "succeeded" &&
        (sortedAndFilteredEmployees.length > 0 ? (
          viewMode === "list" ? (
            renderListView()
          ) : (
            renderGridView()
          )
        ) : (
          <p className="text-center">No employees found.</p>
        ))}
    </div>
  );
}
