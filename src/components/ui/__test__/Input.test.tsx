import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../Input"; // Adjust the path to your component
import "@testing-library/jest-dom";

describe("Input Component", () => {
  it("renders the email input field correctly", () => {
    render(
      <Input
        label="Email"
        type="email"
        id="email"
        placeholder="Enter your email"
      />
    );

    // Check if the label is rendered correctly
    expect(screen.getByLabelText("Email")).toBeInTheDocument();

    // Check if the input field is rendered with the correct type
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "Enter your email");
  });

  it("displays an error message when invalid email is provided", () => {
    render(
      <Input
        label="Email"
        type="email"
        id="email"
        placeholder="Enter your email"
        error="Please enter a valid email"
      />
    );

    // Check if the error message is displayed
    expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
  });

  it("does not display an error message when no error is passed", () => {
    render(
      <Input
        label="Email"
        type="email"
        id="email"
        placeholder="Enter your email"
      />
    );

    // Check if no error message is displayed
    expect(screen.queryByText("Please enter a valid email")).toBeNull();
  });

  it("updates the value when typing", () => {
    render(
      <Input
        label="Email"
        type="email"
        id="email"
        placeholder="Enter your email"
      />
    );

    const input = screen.getByRole("textbox");

    // Simulate typing in the input
    fireEvent.change(input, { target: { value: "test@example.com" } });

    // Check if the value of the input changes correctly
    expect(input).toHaveValue("test@example.com");
  });
});
