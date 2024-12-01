import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-200 p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href="/employee/list"
              className="block py-2 px-4 hover:bg-gray-300 rounded"
            >
              Employee List
            </Link>
          </li>
          <li>
            <Link
              href="/employee/add"
              className="block py-2 px-4 hover:bg-gray-300 rounded"
            >
              Add Employee
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
