"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import "./globals.css";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Provider store={store}>
          {/* Header Section */}
          <header className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
              <h1 className="text-2xl font-bold">Employee Management System</h1>
            </div>
          </header>

          {/* Main Content with Sidebar */}
          <div className="flex flex-1">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-gray-200 p-6 shadow-lg">
              <nav>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/employee/list"
                      className="block text-gray-700 hover:bg-gray-300 py-2 px-4 rounded transition duration-300"
                    >
                      Employee List
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/employee/add"
                      className="block text-gray-700 hover:bg-gray-300 py-2 px-4 rounded transition duration-300"
                    >
                      Add Employee
                    </Link>
                  </li>
                </ul>
              </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 bg-gray-50">{children}</main>
          </div>

          {/* Toaster Notifications */}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
