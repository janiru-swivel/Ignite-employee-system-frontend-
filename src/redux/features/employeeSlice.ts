import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Employee } from "@/types/employee";

// Fetch employees
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch employees."
      );
    }
  }
);

// Add employee
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user",
        employee,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to add the employee."
      );
    }
  }
);

// Delete employee
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/user/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to delete the employee."
      );
    }
  }
);

interface EmployeeState {
  employees: Employee[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  status: "idle",
  error: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear previous errors
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch employees.";
      })

      // Add employee
      .addCase(addEmployee.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear previous errors
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to add the employee.";
      })

      // Delete employee
      .addCase(deleteEmployee.pending, (state) => {
        state.status = "loading";
        state.error = null; // Clear previous errors
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = state.employees.filter(
          (employee) => employee._id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to delete the employee.";
      });
  },
});

export default employeeSlice.reducer;
