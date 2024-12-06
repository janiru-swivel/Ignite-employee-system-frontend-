import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link
        href="/"
        className="text-2xl font-bold hover:underline cursor-pointer"
      >
        Employee Management
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/employee/list"
              className="text-white hover:bg-blue-500 py-2 px-4 rounded transition duration-300 cursor-pointer"
            >
              Employee List
            </Link>
          </li>
          <li>
            <Link
              href="/employee/add"
              className="text-white hover:bg-blue-500 py-2 px-4 rounded transition duration-300 cursor-pointer"
            >
              Add Employee
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
