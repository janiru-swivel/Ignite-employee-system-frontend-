import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import AddEmployee from "../AddEmployeeForm";
import { addEmployee } from "@/redux/features/employeeSlice";
import { successToast, errorToast } from "@/utils/toastConfig";

// Mock the dependencies
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/utils/toastConfig", () => ({
  successToast: jest.fn(),
  errorToast: jest.fn(),
}));

// Mock store
const mockStore = configureStore({
  reducer: {
    employees: (state = {}, action) => state,
  },
});

// Mock dispatch
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("AddEmployee Component", () => {
  const setup = () => {
    return render(
      <Provider store={mockStore}>
        <AddEmployee />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with all required fields", () => {
    setup();

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/profile picture/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add employee/i })
    ).toBeInTheDocument();
  });

  it("displays validation errors for required fields", async () => {
    setup();

    const submitButton = screen.getByRole("button", { name: /add employee/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/gender is required/i)).toBeInTheDocument();
    });
  });

  it("handles file upload and shows preview", async () => {
    setup();

    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    const fileInput = screen.getByLabelText(
      /profile picture/i
    ) as HTMLInputElement;

    await userEvent.upload(fileInput, file);

    expect(fileInput.files?.[0]).toBe(file);
    expect(fileInput.files).toHaveLength(1);
  });

  it("submits the form successfully", async () => {
    setup();
    mockDispatch.mockImplementation(() => Promise.resolve());

    // Fill out the form
    await userEvent.type(screen.getByLabelText(/first name/i), "John");
    await userEvent.type(screen.getByLabelText(/last name/i), "Doe");
    await userEvent.type(
      screen.getByLabelText(/email/i),
      "john.doe@example.com"
    );
    await userEvent.type(screen.getByLabelText(/phone number/i), "1234567890");

    const genderSelect = screen.getByLabelText(/gender/i);
    await userEvent.selectOptions(genderSelect, "M");

    const file = new File(["dummy content"], "profile.png", {
      type: "image/png",
    });
    const fileInput = screen.getByLabelText(
      /profile picture/i
    ) as HTMLInputElement;
    await userEvent.upload(fileInput, file);

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /add employee/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(successToast).toHaveBeenCalledWith("Employee added successfully");
    });
  });

  it("handles submission errors", async () => {
    setup();
    mockDispatch.mockRejectedValue(new Error("Failed to add employee"));

    // Fill out the form
    await userEvent.type(screen.getByLabelText(/first name/i), "John");
    await userEvent.type(screen.getByLabelText(/last name/i), "Doe");
    await userEvent.type(
      screen.getByLabelText(/email/i),
      "john.doe@example.com"
    );
    await userEvent.type(screen.getByLabelText(/phone number/i), "1234567890");
    await userEvent.selectOptions(screen.getByLabelText(/gender/i), "M");

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /add employee/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(errorToast).toHaveBeenCalledWith("Failed to add employee");
    });
  });

  it("disables submit button while submitting", async () => {
    setup();
    mockDispatch.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    // Fill out and submit form
    await userEvent.type(screen.getByLabelText(/first name/i), "John");
    await userEvent.type(screen.getByLabelText(/last name/i), "Doe");
    await userEvent.type(
      screen.getByLabelText(/email/i),
      "john.doe@example.com"
    );
    await userEvent.type(screen.getByLabelText(/phone number/i), "1234567890");
    await userEvent.selectOptions(screen.getByLabelText(/gender/i), "M");

    const submitButton = screen.getByRole("button", { name: /add employee/i });
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent("Adding...");

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent("Add Employee");
    });
  });
});
