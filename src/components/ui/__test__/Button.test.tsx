import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button"; // Adjust path if necessary
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("renders with the correct text", () => {
    render(<Button>Click Me</Button>);

    // Check if the button contains the text "Click Me"
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("applies the correct classes for the primary variant", () => {
    render(<Button variant="primary">Primary Button</Button>);

    const button = screen.getByText("Primary Button");
    expect(button).toHaveClass("bg-blue-500");
    expect(button).toHaveClass("text-white");
    expect(button).toHaveClass("hover:bg-blue-600");
  });

  it("applies the correct classes for the secondary variant", () => {
    render(<Button variant="secondary">Secondary Button</Button>);

    const button = screen.getByText("Secondary Button");
    expect(button).toHaveClass("bg-gray-500");
    expect(button).toHaveClass("text-white");
    expect(button).toHaveClass("hover:bg-gray-600");
  });

  it("applies the correct classes for the danger variant", () => {
    render(<Button variant="danger">Danger Button</Button>);

    const button = screen.getByText("Danger Button");
    expect(button).toHaveClass("bg-red-500");
    expect(button).toHaveClass("text-white");
    expect(button).toHaveClass("hover:bg-red-600");
  });

  it("applies custom classes when passed via className", () => {
    render(<Button className="custom-class">Custom Button</Button>);

    const button = screen.getByText("Custom Button");
    expect(button).toHaveClass("custom-class");
  });

  it("disables the button when the disabled prop is passed", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByText("Disabled Button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("opacity-50");
    expect(button).toHaveClass("cursor-not-allowed");
  });

  it("fires the onClick event when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByText("Click Me");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
