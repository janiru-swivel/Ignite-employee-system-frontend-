import { employeeSchema } from "../lib/validations/employeeSchema";
import { z } from "zod";

describe("Employee Schema Validation", () => {
  // Valid test data
  const validEmployee = {
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael@example.com",
    phoneNumber: "+94712345678",
    gender: "M",
    createdAt: "2024-03-20T10:00:00Z",
  };

  describe("First Name Validation", () => {
    it("should accept valid first name", () => {
      const result = employeeSchema.safeParse(validEmployee);
      expect(result.success).toBe(true);
    });

    it("should reject first name less than 6 characters", () => {
      const data = { ...validEmployee, firstName: "John" };
      const result = employeeSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "First name must be at least 6 characters"
        );
      }
    });

    it("should reject first name more than 10 characters", () => {
      const data = { ...validEmployee, firstName: "Christopher" };
      const result = employeeSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "First name cannot exceed 10 characters"
        );
      }
    });

    it("should reject first name with numbers or special characters", () => {
      const data = { ...validEmployee, firstName: "Michael1" };
      const result = employeeSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "First name must only contain alphabets"
        );
      }
    });
  });

  describe("Last Name Validation", () => {
    it("should accept valid last name", () => {
      const result = employeeSchema.safeParse(validEmployee);
      expect(result.success).toBe(true);
    });

    it("should reject last name less than 6 characters", () => {
      const data = { ...validEmployee, lastName: "Smith" };
      const result = employeeSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Last name must be at least 6 characters"
        );
      }
    });

    it("should reject last name more than 10 characters", () => {
      const data = { ...validEmployee, lastName: "Williamsons" }; // 11 characters
      const result = employeeSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Last name cannot exceed 10 characters"
        );
      }
    });

    it("should reject last name with numbers or special characters", () => {
      const data = { ...validEmployee, lastName: "Johnson2" };
      const result = employeeSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Last name must only contain alphabets"
        );
      }
    });
  });

  describe("Email Validation", () => {
    it("should accept valid email", () => {
      const result = employeeSchema.safeParse(validEmployee);
      expect(result.success).toBe(true);
    });

    it("should reject invalid email format", () => {
      const data = { ...validEmployee, email: "invalid-email" };
      const result = employeeSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Invalid email address");
      }
    });
  });

  describe("Phone Number Validation", () => {
    it("should accept valid Sri Lankan phone number with +94", () => {
      const result = employeeSchema.safeParse(validEmployee);
      expect(result.success).toBe(true);
    });

    it("should accept valid Sri Lankan phone number with 0", () => {
      const data = { ...validEmployee, phoneNumber: "0712345678" };
      const result = employeeSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject invalid phone number format", () => {
      const data = { ...validEmployee, phoneNumber: "1234567890" }; // Right length, wrong format
      const result = employeeSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Invalid Sri Lankan phone number"
        );
      }
    });
  });

  describe("Gender Validation", () => {
    it('should accept valid gender "M"', () => {
      const result = employeeSchema.safeParse(validEmployee);
      expect(result.success).toBe(true);
    });

    it('should accept valid gender "F"', () => {
      const data = { ...validEmployee, gender: "F" };
      const result = employeeSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should reject invalid gender value", () => {
      const data = { ...validEmployee, gender: "X" };
      const result = employeeSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Gender must be either 'M' for Male or 'F' for Female"
        );
      }
    });
  });

  describe("CreatedAt Validation", () => {
    it("should accept valid date format", () => {
      const result = employeeSchema.safeParse(validEmployee);
      expect(result.success).toBe(true);
    });

    it("should reject invalid date format", () => {
      const data = { ...validEmployee, createdAt: "invalid-date" };
      const result = employeeSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Invalid date format for createdAt"
        );
      }
    });

    it("should accept missing createdAt field", () => {
      const { createdAt, ...dataWithoutCreatedAt } = validEmployee;
      const result = employeeSchema.safeParse(dataWithoutCreatedAt);
      expect(result.success).toBe(true);
    });
  });
});
