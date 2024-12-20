import React from "react";
import EditEmployeeForm from "../../../../components/forms/EditEmployeeForm";

interface PageProps {
  params: {
    id: string;
  };
}

const EditEmployeePage: React.FC<PageProps> = ({ params }) => {
  const employeeId = params.id;

  return (
    <div>
      <h1>Edit Employee</h1>
      <EditEmployeeForm employeeId={employeeId} />
    </div>
  );
};

export default EditEmployeePage;
