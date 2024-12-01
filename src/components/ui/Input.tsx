import React, { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={props.id} className="block mb-2 text-sm font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full p-2 border rounded
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
