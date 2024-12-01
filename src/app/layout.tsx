"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white p-4">
              Employee Management System
            </header>
            <div className="flex flex-1">
              <aside className="w-64 bg-gray-200 p-4">
                {/* Sidebar Navigation */}
                <nav>
                  <ul>
                    <li>
                      <a href="/employee/list">Employee List</a>
                    </li>
                    <li>
                      <a href="/employee/add">Add Employee</a>
                    </li>
                  </ul>
                </nav>
              </aside>
              <main className="flex-1 p-4">{children}</main>
            </div>
          </div>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
