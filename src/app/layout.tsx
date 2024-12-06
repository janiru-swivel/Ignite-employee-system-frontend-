"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
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
            <header className="bg-gray-800 text-white p-4 shadow-md">
              <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                  Employee Management System
                </h1>
              </div>
            </header>

            <div className="flex flex-1">
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

              <main className="flex-1 p-6 bg-gray-50">{children}</main>
            </div>
          </div>

          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
