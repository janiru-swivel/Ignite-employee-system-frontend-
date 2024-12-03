import axios from "axios";
import { Employee, EmployeeFormData } from "@/types/employee";

const BASE_URL = "http://localhost:8000/api";

export const employeeApi = {
  async getAllEmployees(): Promise<Employee[]> {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  },

  async getEmployeeById(id: string): Promise<Employee> {
    const response = await axios.get(`${BASE_URL}/user/${id}`);
    return response.data;
  },

  async createEmployee(data: EmployeeFormData): Promise<Employee> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof EmployeeFormData] as string);
    });

    const response = await axios.post(`${BASE_URL}/user`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  },

  async updateEmployee(id: string, data: EmployeeFormData): Promise<Employee> {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key as keyof EmployeeFormData] as string);
    });

    const response = await axios.put(
      `${BASE_URL}/update/user/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  },

  async deleteEmployee(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/delete/user/${id}`);
  },
};
