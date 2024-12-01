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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  useEffect(() => {
    async function fetchEmployeeData() {
      try {
        const employee = await employeeApi.getEmployeeById(employeeId);
        setValue("firstName", employee.firstName);
        setValue("lastName", employee.lastName);
        setValue("email", employee.email);
        setValue("phoneNumber", employee.phoneNumber);
        setValue("gender", employee.gender);
      } catch (error) {
        errorToast("Failed to load employee data");
        router.push("/employee/list");
      }
    }

    fetchEmployeeData();
  }, [employeeId, setValue, router]);

  const onSubmit = async (data: EmployeeFormData) => {
    setIsSubmitting(true);
    try {
      await employeeApi.updateEmployee(employeeId, data);
      successToast("Employee updated successfully");
      router.push("/employee/list");
    } catch (error) {
      errorToast("Failed to update employee");
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <Input
        label="First Name"
        type="text"
        {...register("firstName")}
        error={errors.firstName?.message}
      />
      <Input
        label="Last Name"
        type="text"
        {...register("lastName")}
        error={errors.lastName?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        label="Phone Number"
        type="tel"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message}
      />
      <div>
        <label className="block mb-2">Gender</label>
        <select {...register("gender")} className="w-full p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Updating..." : "Update Employee"}
      </Button>
    </form>
  );
}
