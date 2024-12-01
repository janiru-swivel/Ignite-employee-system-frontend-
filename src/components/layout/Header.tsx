import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">
        Employee Management
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/employee/list">Employees</Link>
          </li>
          <li>
            <Link href="/employee/add">Add Employee</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
