"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/lib/validations/employeeSchema";
import { EmployeeFormData } from "@/types/employee";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { successToast, errorToast } from "@/utils/toastConfig";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { employeeApi } from "@/lib/api/employee";

interface EditEmployeeFormProps {
  employeeId: string;
}

export default function EditEmployeeForm({
  employeeId,
}: EditEmployeeFormProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
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

  // Move fetchEmployeeData outside of useEffect for reuse
  const fetchEmployeeData = async () => {
    try {
      setFetchError(false);
      const employee = await employeeApi.getEmployeeById(employeeId);
      setValue("firstName", employee.firstName);
      setValue("lastName", employee.lastName);
      setValue("email", employee.email);
      setValue("phoneNumber", employee.phoneNumber);
      setValue("gender", employee.gender);
    } catch (error) {
      setFetchError(true);
      errorToast("Failed to load employee data");
    } finally {
      setLoading(false);
    }
  };

  // Call fetchEmployeeData in useEffect
  useEffect(() => {
    fetchEmployeeData();
  }, [employeeId, setValue]);

  const onSubmit = async (data: EmployeeFormData) => {
    setIsSubmitting(true);
    try {
      await employeeApi.updateEmployee(employeeId, data);
      successToast("Employee updated successfully");
      router.push("/employee/list");
    } catch (error) {
      errorToast("Failed to update employee");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center">Loading employee data...</p>;
  }

  if (fetchError) {
    return (
      <div className="text-center">
        <p className="text-red-500">Failed to fetch employee data.</p>
        <Button onClick={fetchEmployeeData} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <Input
        label="First Name"
        type="text"
        placeholder="Enter first name"
        {...register("firstName")}
        error={errors.firstName?.message}
      />
      <Input
        label="Last Name"
        type="text"
        placeholder="Enter last name"
        {...register("lastName")}
        error={errors.lastName?.message}
      />
      <Input
        label="Email"
        type="email"
        placeholder="Enter email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="Enter phone number"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message}
      />
      <div>
        <label className="block mb-2">Gender</label>
        <select
          {...register("gender")}
          className="w-full p-2 border rounded focus:ring focus:outline-none"
        >
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
        )}
      </div>
      <div className="flex space-x-4">
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Updating..." : "Update Employee"}
        </Button>
        <Button
          type="button"
          onClick={() => router.push("/employee/list")}
          className="w-full bg-gray-300 text-black"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
