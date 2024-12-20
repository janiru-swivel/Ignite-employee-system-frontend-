import React from "react";
import { render, screen } from "@testing-library/react";
import EditEmployeePage from "../employee/edit/[id]/page"; // Adjust the import path as necessary
import "@testing-library/jest-dom";

// Mock EditEmployeeForm
jest.mock(
  "../../components/forms/EditEmployeeForm",
  () =>
    ({ employeeId }: { employeeId: string }) =>
      (
        <div data-testid="edit-employee-form">
          Mock EditEmployeeForm for ID: {employeeId}
        </div>
      )
);

describe("EditEmployeePage", () => {
  it("renders the EditEmployeePage with the correct title", async () => {
    const mockParams = {
      params: {
        id: "123",
      },
    };

    const { findByText } = render(
      <EditEmployeePage params={mockParams.params} />
    );

    // Check if the title is rendered
    expect(await findByText("Edit Employee")).toBeInTheDocument();
  });

  it("renders the EditEmployeeForm with the correct employeeId", async () => {
    const mockParams = {
      params: {
        id: "123",
      },
    };

    render(<EditEmployeePage params={mockParams.params} />);

    // Check if the mocked EditEmployeeForm is rendered with the correct ID
    expect(await screen.findByTestId("edit-employee-form")).toHaveTextContent(
      "Mock EditEmployeeForm for ID: 123"
    );
  });
});
