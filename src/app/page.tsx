import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Employee Management System</h1>
      <div className="flex space-x-4">
        <Link
          href="/employee/list"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          View Employees
        </Link>
        <Link
          href="/employee/add"
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
        >
          Add Employee
        </Link>
      </div>
    </div>
  );
}
