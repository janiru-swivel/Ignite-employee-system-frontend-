import EditEmployeeForm from "@/components/forms/EditEmployeeForm";

interface EditEmployeePageProps {
  params: { id: string };
}

export default function EditEmployeePage({ params }: EditEmployeePageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Employee</h1>
      <EditEmployeeForm employeeId={params.id} />
    </div>
  );
}

// If using server-side data fetching
export async function getServerSideProps(context: { params: { id: string } }) {
  // Here you can fetch the necessary data for the employee
  return {
    props: {
      params: context.params,
    },
  };
}
