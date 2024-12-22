"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "../../lib/validations/employeeSchema";
import { EmployeeFormData } from "../../types/employee";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addEmployee } from "../../redux/features/employeeSlice";
import { useRouter } from "next/navigation";
import { successToast, errorToast } from "../../utils/toastConfig";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

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
    const file = e.target.files?.[0]; // Use optional chaining to access the first file
    if (file) {
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
    <div className="container mx-auto p-8 max-w-lg bg-white shadow-lg rounded-lg mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <Input
            label="First Name"
            type="text"
            {...register("firstName")}
            error={errors.firstName?.message}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <Input
            label="Last Name"
            type="text"
            {...register("lastName")}
            error={errors.lastName?.message}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <Input
            label="Phone Number"
            type="tel"
            {...register("phoneNumber")}
            error={errors.phoneNumber?.message}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="gender" className="font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender" // Associating with the label via id
            {...register("gender")}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="profilePicture" className="font-medium text-gray-700">
            Profile Picture
          </label>
          <input
            id="profilePicture" // Associating with the label via id
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          {profilePicturePreview && (
            <div className="mt-4 flex justify-center">
              <img
                src={profilePicturePreview}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 shadow-md transition-all transform hover:scale-110"
              />
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          {isSubmitting ? "Adding..." : "Add Employee"}
        </Button>
      </form>
    </div>
  );
}
