import { ReactElement } from "react";
import ErrorToast from "../components/Toast/ErrorToast";
import InfoToast from "../components/Toast/InfoToast";
import SuccessToast from "../components/Toast/SuccessToast";
import WarningToast from "../components/Toast/WarningToast";
import { toast, Id, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface CustomToastOptions extends ToastOptions {}

export const warningAlert = (text: string, options: CustomToastOptions = {}) => {
  const { ...restOptions } = options;
  if (!restOptions.autoClose) {
    restOptions.autoClose = 5_000;
  }

  toast.warning(<WarningToast text={text} />, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: false,
    className: "bg-warning",
    ...restOptions,
  });
};

export const infoAlert = (text: string, options: CustomToastOptions = {}) => {
  const { ...restOptions } = options;
  if (!restOptions.autoClose) {
    restOptions.autoClose = 5_000;
  }

  toast.info(<InfoToast text={text} />, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: false,
    className: "bg-info",
    ...restOptions,
  });
};

export const errorAlert = (text: string | ReactElement, options: CustomToastOptions = {}) => {
  const { ...restOptions } = options;
  if (!restOptions.autoClose) {
    restOptions.autoClose = 5_000;
  }

  toast.error(<ErrorToast text={text} />, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: false,
    className: "bg-error",
    ...restOptions,
  });
};

export const successAlert = (text: string | ReactElement, options: CustomToastOptions = {}) => {
  const { ...restOptions } = options;
  if (!restOptions.autoClose) {
    restOptions.autoClose = 5_000;
  }

  toast.success(<SuccessToast text={text} />, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "bg-success",
    icon: false,
    ...restOptions,
  });
};

export const dismissAlert = (id: Id | undefined = undefined) => {
  toast.dismiss(id);
};
