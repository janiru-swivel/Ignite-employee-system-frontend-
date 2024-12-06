import AddEmployeeForm from "@/components/forms/AddEmployeeForm";

export default function AddEmployeePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Employee</h1>
      <AddEmployeeForm />
    </div>
  );
}
