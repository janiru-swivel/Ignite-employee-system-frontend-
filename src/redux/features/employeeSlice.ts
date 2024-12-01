import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Employee } from "@/types/employee";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await axios.get("http://localhost:8000/api/users");
    return response.data;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee: Omit<Employee, "_id">) => {
    const response = await axios.post(
      "http://localhost:8000/api/user",
      employee
    );
    return response.data;
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
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default employeeSlice.reducer;
