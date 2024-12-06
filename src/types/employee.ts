export interface Employee {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: "M" | "F";
  profilePicture?: string;
  createdAt: string; // ISO string for timestamp
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: "M" | "F";
  profilePicture?: string;
}
