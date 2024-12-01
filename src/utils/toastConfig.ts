import { toast, ToastOptions } from "react-hot-toast";

export const successToast = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    position: "top-right",
    duration: 3000,
    ...options,
  });
};

export const errorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    position: "top-right",
    duration: 3000,
    ...options,
  });
};
