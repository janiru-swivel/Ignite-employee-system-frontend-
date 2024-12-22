"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "../../lib/validations/employeeSchema";
import { EmployeeFormData } from "../../types/employee";
import { useRouter } from "next/navigation";
import { successToast, errorToast } from "../../utils/toastConfig";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { employeeApi } from "../../lib/api/employee";

export interface EditEmployeeFormProps {
  employeeId: string;
}

export default function EditEmployeeForm({
  employeeId,
}: Readonly<EditEmployeeFormProps>) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const fetchEmployeeData = async () => {
    try {
      setFetchError(false);
      const employee = await employeeApi.getEmployeeById(employeeId);
      setValue("firstName", employee.firstName);
      setValue("lastName", employee.lastName);
      setValue("email", employee.email);
      setValue("phoneNumber", employee.phoneNumber);
      setValue("gender", employee.gender);
    } catch (error: any) {
      setFetchError(true);
      if (error?.response?.data?.message) {
        errorToast(error.response.data.message);
      } else {
        errorToast("Failed to load employee data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [employeeId]);

  const onSubmit = async (data: EmployeeFormData) => {
    setIsSubmitting(true);
    try {
      await employeeApi.updateEmployee(employeeId, data);
      successToast("Employee updated successfully");
      router.push("/employee/list");
    } catch (error: any) {
      errorToast(error?.response?.data?.message || "Failed to update employee");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-600">Loading employee data...</p>
    );
  }

  if (fetchError) {
    return (
      <div className="text-center">
        <p className="text-red-500">Failed to fetch employee data.</p>
        <Button
          onClick={fetchEmployeeData}
          className="mt-4 w-full bg-red-600 text-white hover:bg-red-700"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200"
      >
        <Input
          id="firstName"
          label="First Name"
          type="text"
          placeholder="Enter first name"
          {...register("firstName")}
          error={errors.firstName?.message}
        />
        <Input
          id="lastName"
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          {...register("lastName")}
          error={errors.lastName?.message}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Enter email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          id="phoneNumber"
          label="Phone Number"
          type="tel"
          placeholder="Enter phone number"
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
        />
        <label
          htmlFor="gender"
          className="block text-lg font-medium text-gray-700"
        >
          Gender
        </label>
        <select
          {...register("gender")}
          id="gender"
          className="w-full p-3 border rounded-lg bg-gray-50 text-gray-700"
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
        )}

        <div className="flex space-x-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            {isSubmitting ? "Updating..." : "Update Employee"}
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/employee/list")}
            className="w-full bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
