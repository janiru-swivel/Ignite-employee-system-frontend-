"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "@/lib/validations/employeeSchema";
import { EmployeeFormData } from "@/types/employee";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addEmployee } from "@/redux/features/employeeSlice";
import { useRouter } from "next/navigation";
import { successToast, errorToast } from "@/utils/toastConfig";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AddEmployee() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Create a preview of the profile picture
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setProfilePicture(file);
      setValue("profilePicture", file.name); // Store the file name in the form
    }
  };

  const onSubmit = async (data: EmployeeFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append all form fields
      Object.keys(data).forEach((key) => {
        const value = data[key as keyof EmployeeFormData];
        formData.append(key, value as string);
      });

      // Append the profile picture if it exists
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      // Dispatch the action to add the employee
      await dispatch(addEmployee(formData as any)).unwrap();
      successToast("Employee added successfully");
      router.push("/employee/list");
    } catch (error) {
      errorToast("Failed to add employee");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Employee</h1>
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
          <label className="block mb-2 font-medium">Gender</label>
          <select {...register("gender")} className="w-full p-2 border rounded">
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="w-full p-2 border rounded"
          />
          {profilePicturePreview && (
            <div className="mt-2">
              <img
                src={profilePicturePreview}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Adding..." : "Add Employee"}
        </Button>
      </form>
    </div>
  );
}
