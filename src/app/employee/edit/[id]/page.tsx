import EditEmployeeForm from "@/components/forms/EditEmployeeForm";

export default function EditEmployeePage({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Employee</h1>
      <EditEmployeeForm employeeId={params.id} />
    </div>
  );
}
