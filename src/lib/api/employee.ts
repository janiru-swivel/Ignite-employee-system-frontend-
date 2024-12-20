import axios from "axios";
import { Employee, EmployeeFormData } from "@/types/employee";

// Base URL is directly accessed from the environment variables
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error(
    "Environment variable NEXT_PUBLIC_API_BASE_URL is not defined."
  );
}

export const employeeApi = {
  // Fetch all employees
  async getAllEmployees(): Promise<Employee[]> {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  },

  // Fetch an employee by ID
  async getEmployeeById(id: string): Promise<Employee> {
    const response = await axios.get(`${BASE_URL}/user/${id}`);
    return response.data;
  },

  // Create a new employee
  async createEmployee(data: EmployeeFormData): Promise<Employee> {
    const formData = createFormData(data);

    const response = await axios.post(`${BASE_URL}/user`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  },

  // Update an existing employee by ID
  async updateEmployee(id: string, data: EmployeeFormData): Promise<Employee> {
    const formData = createFormData(data);

    const response = await axios.put(
      `${BASE_URL}/update/user/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  },

  // Delete an employee by ID
  async deleteEmployee(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/delete/user/${id}`);
  },
};

// Helper function to create FormData
function createFormData(data: EmployeeFormData): FormData {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key as keyof EmployeeFormData] as string);
  });
  return formData;
}
