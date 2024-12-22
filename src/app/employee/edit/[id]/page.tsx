import React from "react";
import EditEmployeeForm from "@/components/forms/EditEmployeeForm";

export type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditEmployeePage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Employee</h1>
      <EditEmployeeForm employeeId={id} />
    </div>
  );
}
