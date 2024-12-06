import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-6 h-screen shadow-lg">
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-center mb-4">
          Employee Management
        </h2>

        <nav className="flex flex-col space-y-4">
          <Link
            href="/employee/list"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-center shadow transition-all duration-300"
          >
            Employee List
          </Link>

          <Link
            href="/employee/add"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md text-center shadow transition-all duration-300"
          >
            Add Employee
          </Link>
        </nav>
      </div>
    </aside>
  );
}
