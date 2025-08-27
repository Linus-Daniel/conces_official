// lib/toast.ts
import { toast, ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showSuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    ...defaultOptions,
    ...options,
  });
};

export const showError = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    ...defaultOptions,
    autoClose: 5000, // Errors stay longer
    ...options,
  });
};

export const showInfo = (message: string, options?: ToastOptions) => {
  toast.info(message, {
    ...defaultOptions,
    ...options,
  });
};

export const showWarning = (message: string, options?: ToastOptions) => {
  toast.warn(message, {
    ...defaultOptions,
    ...options,
  });
};

// Specific approval messages
export const showApprovalSuccess = (
  entityName: string,
  action: "approved" | "rejected",
  count?: number
) => {
  const message =
    count && count > 1
      ? `${count} ${entityName}s ${action} successfully!`
      : `${entityName} ${action} successfully!`;
  showSuccess(message);
};

export const showApprovalError = (entityName: string, error?: string) => {
  const message = error || `Failed to update ${entityName}`;
  showError(message);
};

// Batch operation feedback
export const showBatchResult = (
  entityName: string,
  total: number,
  failed: number,
  action: "approved" | "rejected"
) => {
  const successful = total - failed;

  if (failed === 0) {
    showSuccess(`All ${total} ${entityName}s ${action} successfully!`);
  } else if (successful === 0) {
    showError(`Failed to ${action.slice(0, -1)} all ${entityName}s`);
  } else {
    showWarning(`${successful} ${entityName}s ${action}, ${failed} failed`);
  }
};

// CSS classes for custom styling (optional)
export const toastClasses = {
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  info: "bg-blue-500 text-white",
  warning: "bg-yellow-500 text-black",
};
