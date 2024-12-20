import React from "react";
import { render, screen } from "@testing-library/react";
import AddEmployeePage from "../../components/forms/AddEmployeeForm";
import "@testing-library/jest-dom";

// Mock AddEmployeeForm
jest.mock("../../components/forms/AddEmployeeForm", () => () => (
  <div data-testid="add-employee-form">Mock AddEmployeeForm</div>
));

describe("AddEmployeePage", () => {
  it("renders the AddEmployeePage with the correct title", () => {
    render(<AddEmployeePage />);

    // Match title explicitly if the title is within AddEmployeePage
    expect(screen.getByText("Add New Employee")).toBeInTheDocument();
  });

  it("renders the AddEmployeeForm component", () => {
    render(<AddEmployeePage />);

    // Check if the mocked AddEmployeeForm is rendered
    expect(screen.getByTestId("add-employee-form")).toBeInTheDocument();
  });
});
